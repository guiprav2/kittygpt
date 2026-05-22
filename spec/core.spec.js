// spec/core.spec.js
import { test, expect } from '@playwright/test';
import { runTools, spawnAgent, run } from '../core.js';

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function makeStream(lines) {
  let enc = new TextEncoder();
  return new ReadableStream({
    start(ctrl) {
      for (let line of lines) ctrl.enqueue(enc.encode(line + '\n'));
      ctrl.close();
    }
  });
}

// runTools tests
test('runTools: executes all calls in parallel', async () => {
  let started = [];
  let toolset = {
    a: { handler: async () => { started.push('a'); await sleep(40); return 'result-a'; } },
    b: { handler: async () => { started.push('b'); await sleep(40); return 'result-b'; } },
    c: { handler: async () => { started.push('c'); return 'result-c'; } },
  };
  let calls = [
    { name: 'a', call: 'c1', args: {} },
    { name: 'b', call: 'c2', args: {} },
    { name: 'c', call: 'c3', args: {} },
  ];
  let t0 = Date.now();
  let results = await runTools(calls, toolset, {});
  let elapsed = Date.now() - t0;

  expect(started.length).toBe(3);
  expect(elapsed).toBeLessThan(50); // parallel: ~40ms; sequential a+b alone would be ~80ms
  expect(results).toEqual(['result-a', 'result-b', 'result-c']);
});

test('runTools: catches handler errors and returns error object', async () => {
  let toolset = {
    boom: { handler: async () => { throw new Error('kaboom'); } },
  };
  let results = await runTools([{ name: 'boom', call: 'c1', args: {} }], toolset, {});
  expect(results[0]).toEqual({ success: false, error: 'Error: kaboom' });
});

test('runTools: returns undefined for missing tool', async () => {
  let results = await runTools([{ name: 'nonexistent', call: 'c1', args: {} }], {}, {});
  expect(results[0]).toBeUndefined();
});

test('runTools: calls metanull for define_tool', async () => {
  let called = null;
  let opts = {
    metanull: async (args) => { called = args; return 'defined'; }
  };
  let results = await runTools(
    [{ name: 'define_tool', call: 'c1', args: { tool_name: 'x', tool_description: 'y', parameters_schema: {} } }],
    {},
    opts
  );
  expect(called.name).toBe('x');
  expect(results[0]).toBe('defined');
});

// spawnAgent tests
test('spawnAgent: calls opts.subagent callback with prompt', async () => {
  let notified = null;
  let origFetch = globalThis.fetch;
  globalThis.fetch = async () => ({
    headers: { get: () => 'application/json' },
    json: async () => ({
      output: [{ type: 'message', role: 'assistant', content: [{ type: 'output_text', text: 'done' }] }]
    }),
  });

  await spawnAgent(
    { prompt: 'do a thing' },
    { model: 'oai:gpt-5', stream: false, subagent: p => { notified = p; } }
  );

  globalThis.fetch = origFetch;
  expect(notified).toBe('do a thing');
});

test('spawnAgent: returns final assistant text', async () => {
  let origFetch = globalThis.fetch;
  globalThis.fetch = async () => ({
    headers: { get: () => 'application/json' },
    json: async () => ({
      output: [{ type: 'message', role: 'assistant', content: [{ type: 'output_text', text: 'sub result' }] }]
    }),
  });

  let result = await spawnAgent({ prompt: 'task' }, { model: 'oai:gpt-5', stream: false });
  globalThis.fetch = origFetch;
  expect(result).toBe('sub result');
});

// run() streaming tests
test('run() streaming: text-only response is a final response', async () => {
  let narrations = [];
  let finalTexts = [];
  let origFetch = globalThis.fetch;
  globalThis.fetch = async () => ({
    headers: { get: () => 'text/event-stream' },
    body: makeStream([
      'data: {"type":"response.output_text.delta","delta":"Hello"}',
      'data: {"type":"response.output_text.done","text":"Hello"}',
    ]),
  });

  let logs = [{ type: 'message', role: 'user', content: ['hi'] }];
  await run(logs, { model: 'oai:gpt-5', stream: true, narration: t => narrations.push(t), text: (k, t) => { if (k === 'done') finalTexts.push(t); } });
  globalThis.fetch = origFetch;

  expect(narrations).toHaveLength(0);
  expect(finalTexts).toHaveLength(1);
  let last = logs.at(-1);
  expect(last.type).toBe('message');
  expect(last.role).toBe('assistant');
});

test('run() streaming: text + tool call → text is narration, loop continues', async () => {
  let narrations = [];
  let callCount = 0;
  let origFetch = globalThis.fetch;

  globalThis.fetch = async () => {
    callCount++;
    if (callCount === 1) {
      return {
        headers: { get: () => 'text/event-stream' },
        body: makeStream([
          'data: {"type":"response.output_text.delta","delta":"Checking..."}',
          'data: {"type":"response.output_text.done","text":"Checking..."}',
          'data: {"type":"response.output_item.added","item":{"type":"function_call","id":"i1","name":"my_tool","call_id":"c1"}}',
          'data: {"type":"response.function_call_arguments.done","item_id":"i1","arguments":"{}"}',
        ]),
      };
    }
    return {
      headers: { get: () => 'text/event-stream' },
      body: makeStream([
        'data: {"type":"response.output_text.delta","delta":"Done."}',
        'data: {"type":"response.output_text.done","text":"Done."}',
      ]),
    };
  };

  let logs = [{ type: 'message', role: 'user', content: ['do stuff'] }];
  await run(logs, {
    model: 'oai:gpt-5',
    stream: true,
    tools: { my_tool: { handler: async () => 'ok' } },
    narration: t => narrations.push(t),
  });
  globalThis.fetch = origFetch;

  expect(callCount).toBe(2);
  expect(narrations).toEqual(['Checking...']);
});

test('run() streaming: parallel tool calls all execute', async () => {
  let executed = [];
  let callCount = 0;
  let origFetch = globalThis.fetch;

  globalThis.fetch = async () => {
    callCount++;
    if (callCount === 1) return {
      headers: { get: () => 'text/event-stream' },
      body: makeStream([
        'data: {"type":"response.output_item.added","item":{"type":"function_call","id":"i1","name":"tool_a","call_id":"c1"}}',
        'data: {"type":"response.function_call_arguments.done","item_id":"i1","arguments":"{}"}',
        'data: {"type":"response.output_item.added","item":{"type":"function_call","id":"i2","name":"tool_b","call_id":"c2"}}',
        'data: {"type":"response.function_call_arguments.done","item_id":"i2","arguments":"{}"}',
      ]),
    };
    return {
      headers: { get: () => 'text/event-stream' },
      body: makeStream([
        'data: {"type":"response.output_text.delta","delta":"done"}',
        'data: {"type":"response.output_text.done","text":"done"}',
      ]),
    };
  };

  let logs = [{ type: 'message', role: 'user', content: ['go'] }];
  await run(logs, {
    model: 'oai:gpt-5',
    stream: true,
    tools: {
      tool_a: { handler: async () => { executed.push('a'); return 'a'; } },
      tool_b: { handler: async () => { executed.push('b'); return 'b'; } },
    },
  });
  globalThis.fetch = origFetch;

  expect(executed).toContain('a');
  expect(executed).toContain('b');
});
