// spec/providers.spec.js
import { test, expect } from '@playwright/test';
import responses from '../providers/responses-api.js';
import oai from '../providers/oai.js';
import xai from '../providers/xai.js';
import oail from '../providers/oail.js';

test('fmt: user message with string content', () => {
  let result = responses.fmt({ type: 'message', role: 'user', content: ['hello'] });
  expect(result).toEqual({
    type: 'message', role: 'user',
    content: [{ type: 'input_text', text: 'hello' }]
  });
});

test('fmt: assistant message with string content', () => {
  let result = responses.fmt({ type: 'message', role: 'assistant', content: ['hi there'] });
  expect(result).toEqual({
    type: 'message', role: 'assistant',
    content: [{ type: 'output_text', text: 'hi there' }]
  });
});

test('fmt: tool_call returns array of function_call items', () => {
  let result = responses.fmt({ type: 'tool_call', calls: [{ name: 'foo', call: 'c1', args: { x: 1 } }] });
  expect(result).toEqual([{ type: 'function_call', name: 'foo', call_id: 'c1', arguments: '{"x":1}' }]);
});

test('fmt: tool_call_result returns function_call_output', () => {
  let result = responses.fmt({ type: 'tool_call_result', call: 'c1', output: { ok: true } });
  expect(result).toEqual({ type: 'function_call_output', call_id: 'c1', output: '{"ok":true}' });
});

test('fmt: null output becomes "OK"', () => {
  let result = responses.fmt({ type: 'tool_call_result', call: 'c1', output: null });
  expect(result).toEqual({ type: 'function_call_output', call_id: 'c1', output: 'OK' });
});

test('defmt: function_call → tool_call', () => {
  let result = responses.defmt({ type: 'function_call', name: 'foo', call_id: 'c1', arguments: '{"x":1}' });
  expect(result).toEqual({ type: 'tool_call', calls: [{ name: 'foo', call: 'c1', args: { x: 1 } }] });
});

test('defmt: message item', () => {
  let result = responses.defmt({ type: 'message', role: 'assistant', content: [{ type: 'output_text', text: 'hi' }] });
  expect(result).toEqual({ type: 'message', role: 'assistant', content: ['hi'] });
});

test('buildPayload: includes tools in output when provided', () => {
  let payload = responses.buildPayload([], [], {
    cmodel: 'gpt-5',
    tools: { my_tool: { description: 'does stuff', parameters: { type: 'object', properties: {} } } },
    stream: false,
  });
  expect(payload.tools).toHaveLength(1);
  expect(payload.tools[0].name).toBe('my_tool');
  expect(payload.model).toBe('gpt-5');
});

test('buildPayload: appends spawn_agent tool when opts.subagents is true', () => {
  let payload = responses.buildPayload([], [], { cmodel: 'gpt-5', subagents: true, stream: false });
  expect(payload.tools.some(t => t.name === 'spawn_agent')).toBe(true);
});

test('buildPayload: no tools key when no tools provided', () => {
  let payload = responses.buildPayload([], [], { cmodel: 'gpt-5', stream: false });
  expect(payload.tools).toBeUndefined();
});

// oai + xai config tests
test('oai: correct endpoint', () => {
  expect(oai.endpoint).toBe('https://api.openai.com/v1/responses');
});

test('xai: correct endpoint', () => {
  expect(xai.endpoint).toBe('https://api.x.ai/v1/responses');
});

test('oai: inherits fmt from responses-api', () => {
  let result = oai.fmt({ type: 'message', role: 'user', content: ['hi'] });
  expect(result.type).toBe('message');
});

test('xai: inherits fmt from responses-api', () => {
  let result = xai.fmt({ type: 'message', role: 'user', content: ['hi'] });
  expect(result.type).toBe('message');
});

// oail tests
test('oail fmt: message → role+content string', () => {
  let result = oail.fmt({ type: 'message', role: 'user', content: ['hello world'] });
  expect(result).toEqual({ role: 'user', content: 'hello world' });
});

test('oail fmt: tool_call → assistant with tool_calls array', () => {
  let result = oail.fmt({ type: 'tool_call', calls: [{ name: 'foo', call: 'id1', args: { a: 1 } }] });
  expect(result).toEqual({
    role: 'assistant',
    tool_calls: [{ id: 'id1', type: 'function', function: { name: 'foo', arguments: '{"a":1}' } }]
  });
});

test('oail fmt: reasoning → null (filtered)', () => {
  let result = oail.fmt({ type: 'reasoning' });
  expect(result).toBeNull();
});

test('oail defmt: message without tool_calls', () => {
  let result = oail.defmt({ role: 'assistant', content: 'hi' });
  expect(result).toEqual({ type: 'message', role: 'assistant', content: ['hi'] });
});

test('oail defmt: message with tool_calls', () => {
  let result = oail.defmt({
    role: 'assistant',
    tool_calls: [{ id: 'id1', type: 'function', function: { name: 'foo', arguments: '{"a":1}' } }]
  });
  expect(result).toEqual({ type: 'tool_call', calls: [{ name: 'foo', call: 'id1', args: { a: 1 } }] });
});

test('oail buildPayload: instructions become system message', () => {
  let payload = oail.buildPayload([], [], { cmodel: 'gpt-4o', instructions: 'be helpful', stream: false });
  expect(payload.messages[0]).toEqual({ role: 'system', content: 'be helpful' });
});

test('oail: supportsStreamingWithTools is false', () => {
  expect(oail.supportsStreamingWithTools).toBe(false);
});
