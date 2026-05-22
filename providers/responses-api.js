// providers/responses-api.js
let arrayify = x => Array.isArray(x) ? x : [x];

let spawnAgentSchema = {
  type: 'function',
  name: 'spawn_agent',
  description: 'Spawns an async sub-agent with a fresh thread to handle an independent subtask. Multiple spawn_agent calls in the same batch run concurrently.',
  parameters: {
    type: 'object',
    properties: {
      name: { type: 'string', description: 'Short identifier for this sub-agent (shown in progress output)' },
      description: { type: 'string', description: 'One-line summary of what this sub-agent will do (shown in progress output)' },
      prompt: { type: 'string', description: 'The task for the sub-agent' },
      instructions: { type: 'string', description: 'System instructions (optional, defaults to parent)' },
      model: { type: 'string', description: 'Model override (optional, defaults to parent)' },
    },
    required: ['name', 'description', 'prompt'],
  },
};

let defineToolSchema = {
  type: 'function',
  name: 'define_tool',
  description: 'Define a new meta tool',
  parameters: {
    type: 'object',
    properties: {
      tool_name: { type: 'string' },
      tool_description: { type: 'string' },
      parameters_schema: { type: 'object', properties: {}, additionalProperties: true },
    },
    required: ['tool_name', 'tool_description', 'parameters_schema'],
  },
};

let provider = {
  endpoint: null,
  modelsEndpoint: null,
  key: null,
  supportsStreamingWithTools: true,

  fmt(x) {
    switch (x.type) {
      case 'message':
        return { type: 'message', role: x.role, content: x.content.flatMap(y => this.fmtc(x.role, y)) };
      case 'tool_call':
        return x.calls.map(y => ({ type: 'function_call', name: y.name, arguments: JSON.stringify(y.args), call_id: y.call }));
      case 'tool_call_result': {
        let output = x.output == null ? 'OK' : typeof x.output === 'string' ? x.output : JSON.stringify(x.output);
        return { type: 'function_call_output', call_id: x.call, output };
      }
      case 'reasoning':
        return { type: 'reasoning', id: x.id, summary: x.summary || [], encrypted_content: x.encrypted_content };
      default:
        throw new Error(`Unknown message type: ${x.type}`);
    }
  },

  fmtc(role, x) {
    if (typeof x === 'string') return [{ type: role === 'assistant' ? 'output_text' : 'input_text', text: x }];
    if (!Array.isArray(x)) {
      switch (x.type) {
        case 'img':   return [{ type: 'input_image', image_url: x.url }];
        case 'audio': return [{ type: 'input_audio', audio_url: x.url }];
        case 'video': return [{ type: 'input_video', video_url: x.url }];
        case 'json':  return [{ type: 'input_json', json: x.data }];
        default: throw new Error(`Unknown content type: ${x.type}`);
      }
    }
    return x.flatMap(y => this.fmtc(role, y));
  },

  defmt(x) {
    switch (x.type || 'message') {
      case 'message':
        return { type: 'message', role: x.role, content: x.content.map(c => this.defmtc(c)) };
      case 'function_call':
        return { type: 'tool_call', calls: [{ name: x.name, call: x.call_id, args: JSON.parse(x.arguments) }] };
      case 'function_call_output': {
        let output; try { output = JSON.parse(x.output); } catch { output = x.output; }
        return { type: 'tool_call_result', call: x.call_id, output };
      }
      case 'reasoning':
        return { type: 'reasoning', id: x.id, summary: x.summary || [], encrypted_content: x.encrypted_content };
      default:
        throw new Error(`Unknown message type: ${x.type}`);
    }
  },

  defmtc(x) {
    switch (x.type) {
      case 'input_text':
      case 'output_text': return x.text;
      case 'input_image': return { type: 'img', url: x.image_url };
      case 'input_audio': return { type: 'audio', url: x.audio_url };
      case 'input_video': return { type: 'video', url: x.video_url };
      case 'input_json':  return { type: 'json', data: x.json };
      default: throw new Error(`Unknown content type: ${x.type}`);
    }
  },

  buildPayload(msgs, preamble, opts) {
    let toolDefs = Object.entries(typeof opts.tools === 'function' ? opts.tools() : opts.tools || {})
      .map(([name, spec]) => ({ type: 'function', name, parameters: {}, ...spec, handler: undefined }));

    if (opts.metanull) toolDefs.push(defineToolSchema);
    if (opts.subagents) toolDefs.push(spawnAgentSchema);

    let toolChoice = !opts.call || /^(auto|required|none)$/.test(opts.call)
      ? (opts.call || 'auto')
      : { type: 'function', name: opts.call };

    let fmtPreamble = (typeof preamble === 'function' ? preamble() : preamble || [])
      .map(x => ({ ...x, type: x.type || 'message' }))
      .flatMap(x => this.fmt(x));

    return {
      model: opts.cmodel,
      input: [...fmtPreamble, ...msgs],
      instructions: opts.instructions || undefined,
      tools: toolDefs.length ? toolDefs : undefined,
      tool_choice: toolDefs.length ? toolChoice : undefined,
      parallel_tool_calls: true,
      stream: opts.stream ?? true,
      reasoning: opts.reasoning ? { ...opts.reasoning, callback: undefined } : undefined,
      include: opts.reasoning ? ['reasoning.encrypted_content'] : undefined,
    };
  },

  buildHeaders(opts) {
    let headers = { 'Content-Type': 'application/json' };
    let key = opts.key || this.key;
    if (key) headers['Authorization'] = `Bearer ${key}`;
    if (opts.reasoning) Object.assign(headers, {
      'OpenAI-Beta': 'responses=experimental',
      conversation_id: opts.cid,
      session_id: opts.cid,
    });
    return headers;
  },

  async stream(body, { text, reasoning, tool } = {}) {
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
        try { payload = JSON.parse(line.replace(/^data:\s*/, '')); } catch { continue; }

        let { type } = payload;
        if (type === 'response.output_text.delta') await text?.('delta', payload.delta);
        else if (type === 'response.output_text.done') await text?.('done', payload.text);
        else if (type === 'response.output_item.added' && payload.item?.type === 'function_call') {
          pendingCalls[payload.item.id] = { type: 'function_call', name: payload.item.name, call_id: payload.item.call_id };
        }
        else if (type === 'response.function_call_arguments.done') {
          let call = pendingCalls[payload.item_id];
          call.arguments = payload.arguments;
          await tool?.('done', call);
          delete pendingCalls[payload.item_id];
        }
        else if (type === 'response.reasoning_summary_text.delta') await reasoning?.('delta', payload.delta);
        else if (type === 'response.reasoning_summary_text.done') await reasoning?.('done', payload.text);
      }
    }
  },
};

export default provider;
