import { lookup as mimeLookup } from 'mrmime';

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

      if (mime.startsWith('image/')) {
        media.push({ type: 'img', url });
      } else if (mime.startsWith('audio/')) {
        media.push({ type: 'audio', url });
      } else if (mime.startsWith('video/')) {
        media.push({ type: 'video', url });
      }
    }
  }

  if (!media.length) return x;
  return { ...x, content: [...x.content, ...media] };
}

let providers = {
  //
  // ============================================================
  // OPENAI RESPONSES API  (oai:)
  // ============================================================
  //
  oai: {
    endpoint: 'https://api.openai.com/v1/responses',
    modelsEndpoint: 'https://api.openai.com/v1/models',
    key: globalThis.process?.env?.OPENAI_API_KEY,

    fmt: x => {
      switch (x.type) {

        case 'message':
          return {
            type: 'message',
            role: x.role,
            content: x.content.flatMap(y => providers.oai.fmtc(x.role, y))
          };

        case 'tool_call': {
          let tc = x.calls[0];
          return {
            type: 'function_call',
            name: tc.name,
            arguments: JSON.stringify(tc.args),
            call_id: tc.call,
          };
        }

        case 'tool_call_result':
          return {
            type: 'function_call_output',
            call_id: x.call,
            output: typeof x.output === 'object'
              ? JSON.stringify(x.output)
              : x.output
          };

        // ✅ NEW: outbound reasoning blocks
        case 'reasoning':
          return {
            type: 'reasoning',
            // Responses API expects: type: "reasoning", id?, summary?
            id: x.id,
            summary: x.summary || []
          };

        default:
          throw new Error(`Unknown message type: ${x.type}`);
      }
    },

    fmtc: (role, x) => {
      if (typeof x === 'string') {
        return [{ type: role === 'assistant' ? 'output_text' : 'input_text', text: x }];
      }
      if (!Array.isArray(x)) {
        switch (x.type) {
          case 'img': return [{ type: 'input_image', image_url: x.url }];
          case 'audio': return [{ type: 'input_audio', audio_url: x.url }];
          case 'video': return [{ type: 'input_video', video_url: x.url }];
          case 'json': return [{ type: 'input_json', json: x.data }];
        }
        throw new Error(`Unknown content type: ${x.type}`);
      }
      return x.flatMap(y => providers.oai.fmtc(role, y));
    },

    defmt: x => {
      switch (x.type || 'message') {

        case 'message':
          return {
            type: 'message',
            role: x.role,
            content: x.content.map(providers.oai.defmtc)
          };

        case 'function_call':
          return {
            type: 'tool_call',
            calls: [{
              name: x.name,
              call: x.call_id,
              args: JSON.parse(x.arguments)
            }]
          };

        case 'function_call_output': {
          let output;
          try { output = JSON.parse(x.output) } catch { output = x.output }
          return {
            type: 'tool_call_result',
            call: x.call_id,
            output
          };
        }

        // ✅ NEW: inbound reasoning block from provider
        case 'reasoning':
          return {
            type: 'reasoning',
            id: x.id,
            summary: x.summary || []
          };

        default:
          throw new Error(`Unknown message type: ${x.type}`);
      }
    },

    defmtc: x => {
      switch (x.type) {
        case 'input_text':
        case 'output_text':
          return x.text;
        case 'input_image':
          return { type: 'img', url: x.image_url };
        case 'input_audio':
          return { type: 'audio', url: x.audio_url };
        case 'input_video':
          return { type: 'video', url: x.video_url };
        case 'input_json':
          return { type: 'json', data: x.json };
      }
      throw new Error(`Unknown content type: ${x.type}`);
    }
  },

  //
  // ============================================================
  // OPENAI CHAT COMPLETIONS (legacy) (oail:)
  // ============================================================
  //
  oail: {
    endpoint: 'https://api.openai.com/v1/chat/completions',
    modelsEndpoint: 'https://api.openai.com/v1/models',
    key: globalThis.process?.env?.OPENAI_API_KEY,

    fmt: x => {
      switch (x.type) {
        case 'message':
          return {
            role: x.role,
            content: x.content.flatMap(y => providers.oail.fmtc(x.role, y)).join('\n\n')
          };

        case 'tool_call':
          return {
            role: 'assistant',
            tool_calls: x.calls.map(tc => ({
              type: 'function',
              function: {
                name: tc.name,
                arguments: JSON.stringify(tc.args)
              }
            }))
          };

        case 'tool_call_result':
          return {
            role: 'tool',
            tool_call_id: x.call,
            content: typeof x.output === 'string'
              ? x.output
              : JSON.stringify(x.output)
          };

        default:
          throw new Error(`Unknown message type: ${x.type}`);
      }
    },

    fmtc: (role, x) => {
      if (typeof x === 'string') return x;
      if (!Array.isArray(x)) {
        switch (x.type) {
          case 'img':
          case 'audio':
          case 'video':
            return `[${x.type} not supported in chat/completions: ${x.url}]`;
          case 'json':
            return JSON.stringify(x.data);
        }
        throw new Error(`Unsupported content type: ${x.type}`);
      }
      return x.flatMap(y => providers.oail.fmtc(role, y)).join('\n\n');
    },

    defmt: x => {
      if (x.tool_calls) {
        return {
          type: 'tool_call',
          calls: x.tool_calls.map(tc => ({
            id: tc.id,
            name: tc.function.name,
            args: JSON.parse(tc.function.arguments)
          }))
        };
      }

      if (x.role === 'tool') {
        let output;
        try { output = JSON.parse(x.content) } catch { output = x.content }
        return {
          type: 'tool_call_result',
          call: x.tool_call_id,
          output
        };
      }

      return {
        type: 'message',
        role: x.role,
        content: [providers.oail.defmtc(x.content)]
      };
    },

    defmtc: c =>
      Array.isArray(c) ? c.map(providers.oail.defmtc) : c,
  },

  //
  // ============================================================
  // xAI (Grok) — identical structure to Chat Completions
  // ============================================================
  //
  xai: {
    endpoint: 'https://api.x.ai/v1/chat/completions',
    modelsEndpoint: 'https://api.x.ai/v1/models',
    key: globalThis.process?.env?.XAI_KEY,

    fmt: x => {
      switch (x.type) {
        case 'message':
          return {
            role: x.role,
            content: x.content.flatMap(y => providers.xai.fmtc(x.role, y)).join('\n\n')
          };

        case 'tool_call':
          return {
            role: 'assistant',
            tool_calls: x.calls.map(tc => ({
              id: tc.id ?? crypto.randomUUID(),
              type: 'function',
              function: {
                name: tc.name,
                arguments: JSON.stringify(tc.args)
              }
            }))
          };

        case 'tool_call_result':
          return {
            role: 'tool',
            tool_call_id: x.call,
            content: typeof x.output === 'string'
              ? x.output
              : JSON.stringify(x.output)
          };

        default:
          throw new Error(`Unknown message type: ${x.type}`);
      }
    },

    fmtc: (role, x) => {
      if (typeof x === 'string') return x;
      if (!Array.isArray(x)) {
        switch (x.type) {
          case 'img':
          case 'audio':
          case 'video':
            return `[${x.type} not supported in chat/completions: ${x.url}]`;
          case 'json':
            return JSON.stringify(x.data);
        }
        throw new Error(`Unsupported content type: ${x.type}`);
      }
      return x.flatMap(y => providers.oail.fmtc(role, y)).join('\n\n');
    },

    defmt: x => {
      if (x.tool_calls) {
        return {
          type: 'tool_call',
          calls: x.tool_calls.map(tc => ({
            id: tc.id,
            name: tc.function.name,
            args: JSON.parse(tc.function.arguments)
          }))
        };
      }

      if (x.role === 'tool') {
        let output;
        try { output = JSON.parse(x.content) } catch { output = x.content }
        return { type: 'tool_call_result', call: x.tool_call_id, output };
      }

      return {
        type: 'message',
        role: x.role,
        content: [providers.xai.defmtc(x.content)]
      };
    },

    defmtc: c =>
      Array.isArray(c) ? c.map(providers.oail.defmtc) : c,
  }
};

//
// ============================================================
// Streaming Implementations
// ============================================================
//

async function bodystream(body, { text, reasoning, tool, img, audio }) {
  let reader = body.getReader();
  let decoder = new TextDecoder('utf-8');
  let buffer = '';
  let pendingCalls = {};

  while (true) {
    let { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    let idx;
    while ((idx = buffer.indexOf('\n')) >= 0) {
      let line = buffer.slice(0, idx).trim();
      buffer = buffer.slice(idx + 1);

      if (!line || line === 'data: [DONE]') continue;

      let payload;
      try { payload = JSON.parse(line.replace(/^data:\s*/, '')); }
      catch { continue; }

      let { type } = payload;

      if (type === "response.output_text.delta")
        text?.('delta', payload.delta);

      else if (type === "response.output_text.done")
        text?.('done', payload.text);

      else if (type === "response.output_item.added") {
        if (payload.item?.type === "function_call") {
          pendingCalls[payload.item.id] = {
            type: 'function_call',
            name: payload.item.name,
            call_id: payload.item.call_id,
          };
        }
      }

      else if (type === "response.function_call_arguments.done") {
        const call = pendingCalls[payload.item_id];
        call.arguments = payload.arguments;
        await tool?.("done", call);
        delete pendingCalls[payload.item_id];
      }

      else if (type === "response.output_image.done")
        img?.('done', payload.image);

      else if (type === "response.output_audio.delta")
        audio?.('delta', payload.delta.audio);

      else if (type === "response.output_audio.done")
        audio?.('done', payload.audio);

      else if (type === "response.output_text.reasoning.delta")
        reasoning?.('delta', payload.delta);

      else if (type === "response.output_text.reasoning.done")
        reasoning?.('done', payload.text);
    }
  }
}

async function bodystreaml(body, cb) {
  let reader = body.getReader();
  let decoder = new TextDecoder('utf-8');
  let finalMessage = '';

  while (true) {
    let { value, done } = await reader.read();
    if (done) break;

    let chunk = decoder.decode(value, { stream: true });
    let lines = chunk.split('\n').filter(l => l.trim());

    for (let line of lines) {
      try {
        let json = JSON.parse(line.replace(/^data: /, ''));
        let content = json.choices?.[0]?.delta?.content;
        if (content) {
          finalMessage += content;
          cb(content);
        }
      } catch (e) {
        if (!(e instanceof SyntaxError)) throw e;
      }
    }
  }
  return finalMessage;
}
//
// ============================================================
// Main completion() with multi-call support
// ============================================================
//

async function completion(logs, opt = {}) {
  let model = opt.model || completion.defaultModel;
  let [prov, cmodel] = model.split(':');
  let provMod = providers[prov];
  if (!provMod) throw new Error(`Unknown provider: ${prov}`);

  let toolResults = [];
  let signal = opt.signal;

  // ---------------------------------------------
  // Abort helper (CRITICAL SEMANTICS)
  // ---------------------------------------------
  function checkAbort() {
    if (!signal?.aborted) return;
    if (signal.reason != null) {
      throw signal.reason instanceof Error
        ? signal.reason
        : new Error(String(signal.reason));
    }
    return true; // soft abort
  }

  for (let [i, x] of logs.entries()) {
    if (x.type) continue;
    !Array.isArray(x.content) && (x.content = [x.content]);
    logs[i] = { type: 'message', ...x };
  }

  // ---------------------------------------------
  // Automedia expansion (mutates logs)
  // ---------------------------------------------
  if (opt.automedia) {
    for (let i = 0; i < logs.length; i++) {
      let msg = logs[i];
      if (msg.role !== 'user') continue;
      let expanded = automedia(msg);
      if (expanded !== msg) { logs[i] = expanded }
    }
  }

  // Provider-formatted message buffer
  let msgs = logs.map(m => provMod.fmt(m));

  // ---------------------------------------------
  // OPENAI RESPONSES API
  // ---------------------------------------------
  if (prov === 'oai') {
    let key = opt.key || providers.oai.key;

    let toolChoice =
      !opt.call || /^(auto|required|none)$/.test(opt.call)
        ? (opt.call || 'auto')
        : { type: 'function', name: opt.call };

    while (true) {
      if (checkAbort()) return [logs, ...toolResults];

      // Build tool list dynamically
      let toolDefs = Object.entries(
        typeof opt.tools === 'function' ? opt.tools() : opt.tools || {}
      ).map(([name, spec]) => ({
        type: 'function',
        name,
        parameters: {},
        ...spec,
        handler: undefined
      }));

      // Meta-null tool support
      if (opt.metanull) {
        toolDefs.push({
          type: 'function',
          name: 'define_tool',
          description: 'Define a new meta tool',
          parameters: {
            type: 'object',
            properties: {
              tool_name: { type: 'string' },
              tool_description: { type: 'string' },
              parameters_schema: {
                type: 'object',
                description: `Mandatory. Must follow OpenAI's/xAI's tool parameters schema strictly.`,
                properties: {},
                additionalProperties: true,
              }
            },
            required: ['tool_name', 'tool_description', 'parameters_schema']
          },
        });
      }

      let payload = {
        model: cmodel,
        input: msgs,
        instructions: opt.instructions,
        tools: toolDefs.length ? toolDefs.map(t => ({ ...t, handler: undefined })) : undefined,
        tool_choice: toolDefs.length ? toolChoice : undefined,
        parallel_tool_calls: false,
        store: false,
        stream: opt.stream ?? true,
      };

      let headers = { 'Content-Type': 'application/json' };
      key && (headers['Authorization'] = `Bearer ${key}`);
      opt.reasoning && Object.assign(headers, { 'OpenAI-Beta': 'responses=experimental', conversation_id: opt.cid, session_id: opt.cid });

      let res = await fetch(providers.oai.endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        signal
      });

      // -----------------------------
      // STREAMING (Responses API)
      // -----------------------------
      if (opt.stream) {
        if (!res.body) throw new Error('Missing streaming body');

        let assembled = [];
        let textEmitted = false;
        let toolInvoked = false;

        await bodystream(res.body, {
          text: (kind, chunk) => {
            if (kind === 'delta') assembled.push(chunk);
            if (kind === 'done') textEmitted = true;
            opt.text?.(kind, chunk);
          },
          reasoning: (kind, chunk) => {
            opt.reasoning?.callback?.(kind, chunk);
          },
          img: (kind, image) => {
            assembled.push({ type: 'img', url: image.url });
            opt.img?.(kind, image);
          },
          audio: (kind, audio) => {
            assembled.push({ type: 'audio', data: audio });
            opt.audio?.(kind, audio);
          },
          tool: async (_, call) => {
            let toolset = typeof opt.tools === 'function' ? opt.tools() : opt.tools;

            let defmt = provMod.defmt(call);
            let defmt0 = defmt.calls[0];
            logs.push(defmt);
            msgs.push(call);

            let output;
            try {
              if (defmt0.name === 'define_tool') {
                output = await opt.metanull({
                  meta: true,
                  name: defmt0.args.tool_name,
                  description: defmt0.args.tool_description,
                  parameters: defmt0.args.parameters_schema,
                });
              } else if (toolset?.[defmt0.name]?.meta) {
                output = await opt.metainvoke?.(defmt0.name, defmt0.args);
              } else {
                output = await toolset?.[defmt0.name]?.handler?.(defmt0.args);
              }
            } catch (err) {
              output = { success: false, error: err.toString() };
            }

            output ??= 'OK';
            toolResults.push({ name: defmt0.name, args: defmt0.args, output });

            let resultMsg = {
              type: 'tool_call_result',
              call: defmt0.call,
              output,
            };

            logs.push(resultMsg);
            msgs.push(provMod.fmt(resultMsg));
          },
        });

        if (assembled.length) {
          let assistantMsg = { type: 'message', role: 'assistant', content: assembled };
          logs.push(assistantMsg);
          msgs.push(provMod.fmt(assistantMsg));
        }

        opt.checkpoint?.(logs);
        if (textEmitted) return [logs, ...toolResults];
        continue;
      }

      let data = await res.json();
      if (!data.output) { console.log(payload, data); throw new Error('Invalid response') }

      for (let item of data.output) {
        if (checkAbort()) return [logs, ...toolResults];

        let internal = provMod.defmt(item);

        // Assistant message
        if (internal.type === 'message') {
          logs.push(internal);
          msgs.push(provMod.fmt(internal));
          continue;
        }

        // Tool call(s)
        if (internal.type === 'tool_call') {
          logs.push(internal);
          msgs.push(provMod.fmt(internal));

          let toolset =
            typeof opt.tools === 'function' ? opt.tools() : opt.tools;

          for (let call of internal.calls) {
            if (checkAbort()) return [logs, ...toolResults];

            let output;
            try {
              if (call.name === 'define_tool') {
                output = await opt.metanull({
                  meta: true,
                  name: call.args.tool_name,
                  description: call.args.tool_description,
                  parameters: call.args.parameters_schema
                });
              } else if (toolset?.[call.name]?.meta) {
                output = await opt.metainvoke?.(call.name, call.args);
              } else {
                output = await toolset?.[call.name]?.handler?.(call.args);
              }
            } catch (err) {
              output = { success: false, error: err.toString() };
            }
            output ??= 'OK';

            toolResults.push({ name: call.name, args: call.args, output });

            let resultMsg = {
              type: 'tool_call_result',
              call: call.call,
              output
            };

            logs.push(resultMsg);
            msgs.push(provMod.fmt(resultMsg));
          }
        }
      }

      opt.checkpoint?.(logs);

      let last = logs.at(-1);
      if (last?.type === 'message' && last.role === 'assistant') {
        return [logs, ...toolResults];
      }
    }
  }

  // ---------------------------------------------
  // LEGACY PROVIDERS (oail / xai)
  // ---------------------------------------------
  if (prov === 'oail' || prov === 'xai') {
    let cfg = providers[prov];
    let key = opt.key || cfg.key;

    while (true) {
      if (checkAbort()) return [logs, ...toolResults];

      let tools =
        opt.tools &&
        Object.entries(typeof opt.tools === 'function' ? opt.tools() : opt.tools)
          .map(([name, spec]) => ({
            type: 'function',
            function: {
              name,
              parameters: spec.parameters || {},
              description: spec.description
            }
          }));

      let payload = {
        model: cmodel,
        messages: [opt.instructions && { type: 'message', role: 'system', content: opt.instructions }, ...msgs].filter(Boolean),
        tools,
        tool_choice: tools?.length ? opt.call || 'auto' : undefined,
        stream: opt.stream ?? true,
      };

      let headers = { 'Content-Type': 'application/json' };
      key && (headers['Authorization'] = `Bearer ${key}`);
      let res = await fetch(cfg.endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        signal
      });

      // -----------------------------
      // STREAMING (Chat Completions)
      // -----------------------------
      if (opt.stream) {
        if (!res.body) throw new Error('Missing streaming body');

        let finalText = '';

        await bodystreaml(res.body, chunk => {
          finalText += chunk;
          opt.text?.('delta', chunk);
        });
        opt.text?.('done', finalText);

        let assistantMsg = { type: 'message', role: 'assistant', content: [finalText] };
        logs.push(assistantMsg);
        msgs.push(provMod.fmt(assistantMsg));
        opt.checkpoint?.(logs);
        return [logs, ...toolResults];
      }

      let data = await res.json();
      let msg = data.choices?.[0]?.message;
      if (!msg) throw new Error('Invalid response');

      let internal = provMod.defmt(msg);
      logs.push(internal);
      msgs.push(provMod.fmt(internal));

      if (internal.type === 'tool_call') {
        let toolset =
          typeof opt.tools === 'function' ? opt.tools() : opt.tools;

        for (let call of internal.calls) {
          if (checkAbort()) return [logs, ...toolResults];

          let handler = toolset?.[call.name]?.handler;
          let output;

          try {
            output = await handler?.(call.args);
          } catch (err) {
            output = { success: false, error: err.toString() };
          }

          toolResults.push({ name: call.name, args: call.args, output });

          let result = {
            type: 'tool_call_result',
            call: call.call,
            output
          };

          logs.push(result);
          msgs.push(provMod.fmt(result));
        }

        continue;
      }

      opt.checkpoint?.(logs);
      return [logs, ...toolResults];
    }
  }
}

completion.defaultEndpoint = '/completion';
completion.defaultModel = 'oai:gpt-5';
completion.defaultLogger = logs => {
  let last = logs.at(-1);
  let preview =
    (last?.content || last?.details?.arguments || '')
      .slice(0, 50)
      .replace(/\n/g, '\\n');
  let label = `📩 Completion: ${preview}…`;
  console.groupCollapsed(label);
  for (let x of logs)
    console.log(`[${x.role || 'unknown'}]`, x.content || x.details?.arguments || '[no content]');
  console.groupEnd();
};

export { bodystream, bodystreaml };
export default completion;
