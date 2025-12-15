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
            call_id: tc.id
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
              id: x.call_id,
              name: x.name,
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
        text?.('delta', payload.delta.text);

      else if (type === "response.output_text.done")
        text?.('done', payload.text);

      else if (type === "response.tool_call.done")
        tool?.('done', {
          call: payload.id,
          name: payload.name,
          args: typeof payload.args === 'string' ? JSON.parse(payload.args) : payload.args
        });

      else if (type === "response.output_image.done")
        img?.('done', payload.image);

      else if (type === "response.output_audio.delta")
        audio?.('delta', payload.delta.audio);

      else if (type === "response.output_audio.done")
        audio?.('done', payload.audio);

      else if (type === "response.output_text.reasoning.delta")
        reasoning?.('delta', payload.delta.text);

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

  // Apply role mappings
  let baseMsgs = logs
    .map(x =>
      x.type !== 'message' || !opt.rolemap
        ? x
        : ({ ...x, role: opt.rolemap[x.role] })
    )
    .filter(x => x.type !== 'message' || x.role);

  // Format for provider
  let msgs = baseMsgs.map(m => provMod.fmt(m));

  let logCompletion = () => null;
  if (opt.logger === true) logCompletion = completion.defaultLogger;
  else if (opt.logger) logCompletion = opt.logger;

  //
  // ============================================================
  // OPENAI RESPONSES API
  // ============================================================
  //
  if (prov === 'oai') {
    let key = opt.key || providers.oai.key;

    let cchoice =
      !opt.call || /^auto|required|none$/.test(opt.call)
        ? (opt.call || 'auto')
        : { type: 'function', name: opt.call };

    while (true) {
      let ctools = Object.entries(
        (typeof opt.tools === 'function' ? opt.tools() : opt.tools) || {}
      ).map(([name, spec]) => ({
        type: 'function',
        name,
        parameters: {},
        ...spec,
        handler: undefined,
      }));

      let payload = {
        model: cmodel,
        input: msgs,
        instructions: opt.instructions,
        tools: ctools,
        tool_choice: ctools?.length ? cchoice : undefined,
        parallel_tool_calls: false,
        reasoning: opt.reasoning && { ...opt.reasoning, callback: undefined },
        include: opt.reasoning && ['reasoning.encrypted_content'],
        store: false,
        prompt_cache_key: opt.cid,
      };

      let headers = { 'Content-Type': 'application/json' };
      key && (headers['Authorization'] = `Bearer ${key}`);
      if (opt.reasoning) {
        Object.assign(headers, {
          'OpenAI-Beta': 'responses=experimental',
          conversation_id: opt.cid,
          session_id: opt.cid
        });
      }

      let res = await fetch(opt.endpoint || providers.oai.endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        signal: opt.signal
      });

      //
      // STREAMING
      //
      if (opt.stream) {
        if (!res.body) throw new Error("Streaming response missing body");

        let assembled = [];

        await bodystream(res.body, {
          text: (kind, chunk) => {
            if (kind === 'delta') {
              assembled.push(chunk);
              opt.text?.(chunk);
            }
          },
          reasoning: (kind, chunk) => {
            opt.reasoning?.callback?.(chunk);
          },
          img: (kind, image) => {
            assembled.push({ type: 'img', url: image.url });
            opt.img?.(image);
          },
          audio: (kind, audio) => {
            assembled.push({ type: 'audio', data: audio });
            opt.audio?.(audio);
          },
          tool: async (kind, call) => {
            let rtools = typeof opt.tools === 'function' ? opt.tools() : opt.tools;
            let handler = rtools?.[call.name]?.handler;
            let result;

            try {
              result = await handler(call.args);
            } catch (err) {
              result = { success: false, error: err.toString() };
            }

            msgs.push(provMod.fmt({
              type: 'tool_call_result',
              call: call.call,
              output: result
            }));
          }
        });

        msgs.push(provMod.fmt({
          type: 'message',
          role: 'assistant',
          content: assembled
        }));

        return msgs.map(provMod.defmt);
      }

      //
      // NON-STREAMING
      //
      let ctype = res.headers.get('Content-Type');
      let body = ctype?.includes('application/json')
        ? await res.json()
        : await res.text();

      if (typeof body === 'string' || !body.output) {
        console.error("Unexpected response:", body);
        throw new Error("Unexpected response");
      }

      for (let item of body.output) {
        let internal = provMod.defmt(item);

        if (internal.type === 'message') {
          msgs.push(provMod.fmt(internal));
          continue;
        }

        if (internal.type === 'tool_call') {
          msgs.push(provMod.fmt(internal));

          let rtools = typeof opt.tools === 'function' ? opt.tools() : opt.tools;
          for (let call of internal.calls) {
            let handler = rtools?.[call.name]?.handler;
            let result;

            try { result = await handler(call.args); }
            catch (err) { result = { success: false, error: err.toString() }; }

            msgs.push(provMod.fmt({
              type: 'tool_call_result',
              call: call.id,
              output: result
            }));
          }
          continue;
        }

        if (internal.type === 'tool_call_result') {
          msgs.push(provMod.fmt(internal));
          continue;
        }
      }

      let lastInt = provMod.defmt(msgs.at(-1));
      if (lastInt.role === 'assistant') {
        return msgs.map(provMod.defmt);
      }
    }
  }

  //
  // ============================================================
  // LEGACY (oail / xai)
  // ============================================================
  //
  if (prov === 'oail' || prov === 'xai') {
    let cfgProv = providers[prov];
    let key = opt.key || cfgProv.key;

    let tool_choice = opt.call || 'auto';
    if (
      typeof opt.call === 'string' &&
      !['auto', 'required', 'none'].includes(opt.call)
    ) {
      tool_choice = {
        type: 'function',
        function: { name: opt.call }
      };
    }

    while (true) {
      let ctools = null;
      if (opt.tools) {
        let entries =
          Object.entries(typeof opt.tools === 'function' ? opt.tools() : opt.tools);
        ctools = entries.map(([name, spec]) => ({
          type: 'function',
          function: {
            name,
            parameters: spec.parameters || {},
            description: spec.description,
            strict: spec.strict
          }
        }));
      }
      if (opt.stream && ctools?.length) throw new Error(`This provider doesn't support streaming + tools`);

      let payload = {
        model: cmodel,
        messages: msgs,
        tools: ctools,
        tool_choice: ctools?.length ? tool_choice : undefined,
        stream: !!opt.stream
      };

      let headers = { 'Content-Type': 'application/json' };
      key && (headers['Authorization'] = `Bearer ${key}`);
      console.log(headers);

      let res = await fetch(opt.endpoint || cfgProv.endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        signal: opt.signal
      });

      //
      // STREAMING
      //
      if (opt.stream) {
        let finalText = '';

        await bodystreaml(res.body, chunk => {
          finalText += chunk;
          opt.text?.(chunk);
        });

        msgs.push(provMod.fmt({
          type: 'message',
          role: 'assistant',
          content: [finalText]
        }));

        return msgs.map(provMod.defmt);
      }

      //
      // NON-STREAMING
      //
      let data = await res.json();
      if (!data.choices?.length) {
        console.error("Unexpected response:", data);
        throw new Error("Unexpected response");
      }

      let choice = data.choices[0];
      let message = choice.message;

      if (message.tool_calls) {
        let internal = provMod.defmt(message);
        msgs.push(provMod.fmt(internal));

        let rtools = typeof opt.tools === 'function' ? opt.tools() : opt.tools;

        for (let call of internal.calls) {
          let handler = rtools?.[call.name]?.handler;
          let result;

          try { result = await handler(call.args); }
          catch (err) { result = { success: false, error: err.toString() }; }

          msgs.push(provMod.fmt({
            type: 'tool_call_result',
            call: call.id,
            output: result
          }));
        }

        continue;
      }

      let internal = provMod.defmt(message);
      msgs.push(provMod.fmt(internal));

      return msgs.map(provMod.defmt);
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
