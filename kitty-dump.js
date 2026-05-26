#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

if (process.argv.length < 3) {
  console.error('Usage: kitty-dump <state-file>');
  process.exit(1);
}

const statePath = path.resolve(process.argv[2]);
let raw;
try {
  raw = fs.readFileSync(statePath, 'utf8');
} catch (err) {
  console.error(`Failed to read ${statePath}: ${err.message}`);
  process.exit(1);
}

let state;
try {
  state = JSON.parse(raw);
} catch (err) {
  console.error(`Invalid JSON in ${statePath}: ${err.message}`);
  process.exit(1);
}

const logs = Array.isArray(state?.logs) ? state.logs : [];
const pendingCalls = new Map();

const coerceText = (value) => {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.map(coerceText).join('\n');
  if (typeof value === 'object') {
    if (typeof value.text === 'string') return value.text;
    if (Array.isArray(value.content)) return value.content.map(coerceText).join('\n');
    return JSON.stringify(value);
  }
  return String(value);
};

const joinContent = (entry) => {
  const content = entry?.content;
  if (Array.isArray(content)) return content.map(coerceText).join('\n');
  return coerceText(content);
};

const formatToolCall = (info, output) => {
  const paramsPayload = { tool: info?.name ?? 'unknown', args: info?.args ?? null };
  const paramsStr = JSON.stringify(paramsPayload, null, 2);
  let outStr;
  if (output == null) outStr = '';
  else if (typeof output === 'string') outStr = output;
  else outStr = JSON.stringify(output, null, 2);
  return `🤖 TOOL CALL: ${paramsStr}\n${outStr}`.trimEnd();
};

const formatAssistant = (entry) => `🤖 ASSISTANT: ${joinContent(entry)}`;
const formatUser = (entry) => `> User prompts\n${joinContent(entry)}`;

const formatted = [];

for (const entry of logs) {
  if (!entry) continue;
  switch (entry.type ?? entry.role) {
    case 'user':
      formatted.push(formatUser(entry));
      break;
    case 'assistant':
      formatted.push(formatAssistant(entry));
      break;
    case 'tool':
    case 'function':
      formatted.push(formatToolCall({ name: entry?.name ?? 'tool', args: entry?.arguments ?? null }, entry?.output));
      break;
    case 'tool_call': {
      const calls = Array.isArray(entry.calls) ? entry.calls : [];
      for (const call of calls) {
        pendingCalls.set(call.call, { name: call.name, args: call.args ?? null });
      }
      break;
    }
    case 'tool_call_result': {
      const info = pendingCalls.get(entry.call) ?? { name: 'tool', args: null };
      formatted.push(formatToolCall(info, entry.output));
      pendingCalls.delete(entry.call);
      break;
    }
    default:
      break;
  }
}

console.log(formatted.filter(Boolean).join('\n\n'));
