// core.js
import oai from './providers/oai.js';
import xai from './providers/xai.js';
import oail from './providers/oail.js';
let { lookup: mimeLookup } = await (typeof process !== 'undefined' && process.versions?.node
  ? import('mrmime')
  : import('https://esm.sh/mrmime'));

let arrayify = x => Array.isArray(x) ? x : [x];

let providerMap = { oai, xai, oail };

function resolveProvider(model) {
  let [prov, ...rest] = model.split(':');
  let cmodel = rest.join(':');
  let provider = providerMap[prov];
  if (!provider) throw new Error(`Unknown provider: ${prov}`);
  return { provider, cmodel };
}

export async function runTools(calls, toolset, opts) {
  let execute = async call => {
    try {
      if (call.name === 'define_tool') {
        return await opts.metanull?.({
          meta: true,
          name: call.args.tool_name,
          description: call.args.tool_description,
          parameters: call.args.parameters_schema,
        });
      }
      if (toolset?.[call.name]?.meta) return await opts.metainvoke?.(call.name, call.args);
      if (call.name === 'spawn_agent' && opts.subagents) return await spawnAgent(call.args, opts);
      return await toolset?.[call.name]?.handler?.(call.args);
    } catch (err) {
      return { success: false, error: err.toString() };
    }
  };
  return Promise.all(calls.map(execute));
}

export async function spawnAgent({ name, description, prompt, instructions, model }, parentOpts) {
  parentOpts.subagent?.(description || prompt, name);
  let subLogs = [{ type: 'message', role: 'user', content: [prompt] }];
  let resolvedModel = !model ? parentOpts.model
    : model.includes(':') ? model
    : parentOpts.model.split(':')[0] + ':' + model;
  let [resultLogs] = await run(subLogs, {
    ...parentOpts,
    model: resolvedModel,
    instructions: instructions !== undefined ? instructions : parentOpts.instructions,
    subagent: undefined,
    text: undefined,
    img: undefined,
    narration: text => parentOpts.narration?.('\x1b[2m[' + name + ']\x1b[0m ' + text),
  });
  let last = resultLogs.at(-1);
  return last?.content?.join?.('\n') || 'No response';
}

function automedia(x) {
  if (!Array.isArray(x.content)) return x;
  let media = [];
  for (let part of x.content) {
    if (typeof part !== 'string') continue;
    let urls = part.match(/\bhttps?:\/\/[^\s<>"']+/gi);
    if (!urls) continue;
    for (let url of urls) {
      let mime = mimeLookup(url);
      if (!mime) continue;
      if (mime.startsWith('image/')) media.push({ type: 'img', url });
      else if (mime.startsWith('audio/')) media.push({ type: 'audio', url });
      else if (mime.startsWith('video/')) media.push({ type: 'video', url });
    }
  }
  if (!media.length) return x;
  return { ...x, content: [...x.content, ...media] };
}

export async function run(logs, opts = {}) {
  let model = opts.model || 'oai:gpt-5';
  let { provider, cmodel } = resolveProvider(model);
  let resolvedOpts = { ...opts, cmodel };

  let toolResults = [];
  let signal = opts.signal;

  function checkAbort() {
    if (!signal?.aborted) return false;
    if (signal.reason != null) throw signal.reason instanceof Error ? signal.reason : new Error(String(signal.reason));
    return true;
  }

  // Normalize logs
  for (let [i, x] of logs.entries()) {
    if (x.type) continue;
    if (!Array.isArray(x.content)) x.content = [x.content];
    logs[i] = { type: 'message', ...x };
  }

  // Automedia expansion
  if (opts.automedia) {
    for (let i = 0; i < logs.length; i++) {
      if (logs[i].role !== 'user') continue;
      let expanded = automedia(logs[i]);
      if (expanded !== logs[i]) logs[i] = expanded;
    }
  }

  let msgs = logs.flatMap(m => provider.fmt(m)).filter(Boolean);
  let toolset = typeof opts.tools === 'function' ? opts.tools() : opts.tools;

  while (true) {
    if (checkAbort()) return [logs, ...toolResults];

    let useStream = (opts.stream ?? true) && provider.supportsStreamingWithTools !== false;
    let payload = provider.buildPayload(msgs, opts.preamble, { ...resolvedOpts, stream: useStream });
    let headers = provider.buildHeaders(resolvedOpts);

    let res = await fetch(provider.endpoint, { method: 'POST', headers, body: JSON.stringify(payload), signal });

    // ── Streaming path ─────────────────────────────────────────
    if (useStream && !res.headers.get('content-type')?.startsWith?.('application/json')) {
      if (!res.body) throw new Error('Missing streaming body');

      let assembled = [];
      let pendingCalls = [];
      let toolsInvoked = false;

      await provider.stream(res.body, {
        text: (kind, chunk) => {
          if (kind === 'delta') assembled.push(chunk);
          opts.text?.(kind, chunk);
        },
        reasoning: (kind, chunk) => {
          if (kind === 'done') {
            let msg = { type: 'reasoning', summary: [{ type: 'summary_text', text: chunk }] };
            logs.push(msg);
            msgs.push(...arrayify(provider.fmt(msg)));
          }
          opts.reasoning?.callback?.(kind, chunk);
        },
        tool: async (_, wireCall) => {
          toolsInvoked = true;
          let internal = provider.defmt(wireCall);
          logs.push(internal);
          msgs.push(wireCall);
          pendingCalls.push({ wire: wireCall, call: internal.calls[0] });
        },
      });

      // Execute all tool calls in parallel
      if (pendingCalls.length) {
        let rawCalls = pendingCalls.map(p => p.call);
        let outputs = await runTools(rawCalls, toolset, resolvedOpts);
        for (let [i, { call }] of pendingCalls.entries()) {
          let output = outputs[i] ?? 'OK';
          toolResults.push({ name: call.name, args: call.args, output });
          let resultMsg = { type: 'tool_call_result', call: call.call, output };
          logs.push(resultMsg);
          msgs.push(...arrayify(provider.fmt(resultMsg)));
        }
        opts.checkpoint?.(logs);
      }

      let text = assembled.join('');
      if (text) {
        let assistantMsg = { type: 'message', role: 'assistant', content: [text] };
        logs.push(assistantMsg);
        msgs.push(...arrayify(provider.fmt(assistantMsg)));
        if (toolsInvoked) {
          opts.narration?.(text);
        } else {
          opts.checkpoint?.(logs);
          return [logs, ...toolResults];
        }
      }

      opts.checkpoint?.(logs);
      continue;
    }

    // ── Non-streaming path ─────────────────────────────────────
    let data = await res.json();
    if (!data.output && !data.choices) { console.log(JSON.stringify(data, null, 2)); throw new Error('Invalid response'); }

    // Responses API (oai / xai)
    if (data.output) {
      let allCalls = [];
      let assistantText = null;

      for (let item of data.output) {
        if (checkAbort()) return [logs, ...toolResults];
        let internal = provider.defmt(item);

        if (internal.type === 'reasoning') {
          internal.summary.filter(s => s.type === 'summary_text').forEach(s => opts.reasoning?.callback?.('done', s.text));
          delete internal.id;
          logs.push(internal);
          msgs.push(...arrayify(provider.fmt(internal)));
          continue;
        }
        if (internal.type === 'tool_call') {
          logs.push(internal);
          msgs.push(...arrayify(provider.fmt(internal)));
          allCalls.push(...internal.calls);
          continue;
        }
        if (internal.type === 'message') {
          logs.push(internal);
          msgs.push(...arrayify(provider.fmt(internal)));
          assistantText = internal.content.join('');
          opts.text?.('done', internal.content);
          continue;
        }
      }

      if (allCalls.length) {
        let outputs = await runTools(allCalls, toolset, resolvedOpts);
        for (let [i, call] of allCalls.entries()) {
          let output = outputs[i] ?? 'OK';
          toolResults.push({ name: call.name, args: call.args, output });
          let resultMsg = { type: 'tool_call_result', call: call.call, output };
          logs.push(resultMsg);
          msgs.push(...arrayify(provider.fmt(resultMsg)));
        }
        opts.checkpoint?.(logs);
        if (assistantText) opts.narration?.(assistantText);
        continue;
      }

      opts.checkpoint?.(logs);
      let last = logs.at(-1);
      if (last?.type === 'message' && last.role === 'assistant') return [logs, ...toolResults];
      continue;
    }

    // Chat Completions (oail)
    if (data.choices) {
      let msg = data.choices?.[0]?.message;
      if (!msg) { console.log(data); throw new Error('Invalid response'); }
      if (msg.role === 'assistant' && !msg.content?.trim()) { console.log('LLM got lazy, retrying...'); continue; }

      let internal = provider.defmt(msg);
      logs.push(internal);
      msgs.push(...arrayify(provider.fmt(internal)));

      if (internal.type === 'tool_call') {
        let outputs = await runTools(internal.calls, toolset, resolvedOpts);
        for (let [i, call] of internal.calls.entries()) {
          let output = outputs[i] ?? 'OK';
          toolResults.push({ name: call.name, args: call.args, output });
          let result = { type: 'tool_call_result', call: call.call, output };
          logs.push(result);
          msgs.push(...arrayify(provider.fmt(result)));
        }
        opts.checkpoint?.(logs);
        continue;
      }

      opts.checkpoint?.(logs);
      return [logs, ...toolResults];
    }
  }
}
