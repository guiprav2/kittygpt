// spec/providers.spec.js
import { test, expect } from '@playwright/test';
import provider from '../providers/responses-api.js';

test('fmt: user message with string content', () => {
  let result = provider.fmt({ type: 'message', role: 'user', content: ['hello'] });
  expect(result).toEqual({
    type: 'message', role: 'user',
    content: [{ type: 'input_text', text: 'hello' }]
  });
});

test('fmt: assistant message with string content', () => {
  let result = provider.fmt({ type: 'message', role: 'assistant', content: ['hi there'] });
  expect(result).toEqual({
    type: 'message', role: 'assistant',
    content: [{ type: 'output_text', text: 'hi there' }]
  });
});

test('fmt: tool_call returns array of function_call items', () => {
  let result = provider.fmt({ type: 'tool_call', calls: [{ name: 'foo', call: 'c1', args: { x: 1 } }] });
  expect(result).toEqual([{ type: 'function_call', name: 'foo', call_id: 'c1', arguments: '{"x":1}' }]);
});

test('fmt: tool_call_result returns function_call_output', () => {
  let result = provider.fmt({ type: 'tool_call_result', call: 'c1', output: { ok: true } });
  expect(result).toEqual({ type: 'function_call_output', call_id: 'c1', output: '{"ok":true}' });
});

test('fmt: null output becomes "OK"', () => {
  let result = provider.fmt({ type: 'tool_call_result', call: 'c1', output: null });
  expect(result).toEqual({ type: 'function_call_output', call_id: 'c1', output: 'OK' });
});

test('defmt: function_call → tool_call', () => {
  let result = provider.defmt({ type: 'function_call', name: 'foo', call_id: 'c1', arguments: '{"x":1}' });
  expect(result).toEqual({ type: 'tool_call', calls: [{ name: 'foo', call: 'c1', args: { x: 1 } }] });
});

test('defmt: message item', () => {
  let result = provider.defmt({ type: 'message', role: 'assistant', content: [{ type: 'output_text', text: 'hi' }] });
  expect(result).toEqual({ type: 'message', role: 'assistant', content: ['hi'] });
});

test('buildPayload: includes tools in output when provided', () => {
  let payload = provider.buildPayload([], [], {
    cmodel: 'gpt-5',
    tools: { my_tool: { description: 'does stuff', parameters: { type: 'object', properties: {} } } },
    stream: false,
  });
  expect(payload.tools).toHaveLength(1);
  expect(payload.tools[0].name).toBe('my_tool');
  expect(payload.model).toBe('gpt-5');
});

test('buildPayload: appends spawn_agent tool when opts.subagents is true', () => {
  let payload = provider.buildPayload([], [], { cmodel: 'gpt-5', subagents: true, stream: false });
  expect(payload.tools.some(t => t.name === 'spawn_agent')).toBe(true);
});

test('buildPayload: no tools key when no tools provided', () => {
  let payload = provider.buildPayload([], [], { cmodel: 'gpt-5', stream: false });
  expect(payload.tools).toBeUndefined();
});
