// providers/oail.js
let provider = {
  endpoint: 'https://api.openai.com/v1/chat/completions',
  modelsEndpoint: 'https://api.openai.com/v1/models',
  get key() { return globalThis.process?.env?.OPENAI_API_KEY; },
  supportsStreamingWithTools: false,

  fmt(x) {
    switch (x.type) {
      case 'message':
        return { role: x.role, content: x.content.map(c => this.fmtc(x.role, c)).join('\n\n') };
      case 'tool_call':
        return {
          role: 'assistant',
          tool_calls: x.calls.map(tc => ({
            id: tc.call, type: 'function',
            function: { name: tc.name, arguments: JSON.stringify(tc.args) }
          }))
        };
      case 'tool_call_result': {
        let content = x.output == null ? 'OK' : typeof x.output === 'string' ? x.output : JSON.stringify(x.output);
        return { role: 'tool', tool_call_id: x.call, content };
      }
      case 'reasoning': return null;
      default: throw new Error(`Unknown message type: ${x.type}`);
    }
  },

  fmtc(_, x) {
    if (typeof x === 'string') return x;
    if (!Array.isArray(x)) {
      if (x.type === 'json') return JSON.stringify(x.data);
      return `[${x.type} unsupported]`;
    }
    return x.map(y => this.fmtc(_, y)).join('\n\n');
  },

  defmt(x) {
    if (x.tool_calls) {
      return {
        type: 'tool_call',
        calls: x.tool_calls.map(tc => ({
          name: tc.function.name, call: tc.id, args: JSON.parse(tc.function.arguments)
        }))
      };
    }
    if (x.role === 'tool') {
      let output; try { output = JSON.parse(x.content); } catch { output = x.content; }
      return { type: 'tool_call_result', call: x.tool_call_id, output };
    }
    return { type: 'message', role: x.role, content: [x.content] };
  },

  buildPayload(msgs, preamble, opts) {
    let tools = opts.tools && Object.entries(typeof opts.tools === 'function' ? opts.tools() : opts.tools)
      .map(([name, spec]) => ({
        type: 'function',
        function: { name, parameters: spec.parameters || {}, description: spec.description }
      }));

    let fmtPreamble = (typeof preamble === 'function' ? preamble() : preamble || [])
      .map(x => ({ ...x, type: x.type || 'message' }))
      .flatMap(x => this.fmt(x))
      .filter(Boolean);

    let systemMsg = opts.instructions ? { role: 'system', content: opts.instructions } : null;

    return {
      model: opts.cmodel,
      messages: [systemMsg, ...fmtPreamble, ...msgs].filter(Boolean),
      tools: tools?.length ? tools : undefined,
      tool_choice: tools?.length ? (opts.call || 'auto') : undefined,
      parallel_tool_calls: false,
      stream: false,
    };
  },

  buildHeaders(opts) {
    let headers = { 'Content-Type': 'application/json' };
    let key = opts.key || this.key;
    if (key) headers['Authorization'] = `Bearer ${key}`;
    return headers;
  },

  async stream(body, { text } = {}) {
    let reader = body.getReader();
    let decoder = new TextDecoder('utf-8');
    let finalMessage = '';

    while (true) {
      let { value, done } = await reader.read();
      if (done) break;
      let chunk = decoder.decode(value, { stream: true });
      for (let line of chunk.split('\n').filter(l => l.trim())) {
        try {
          let json = JSON.parse(line.replace(/^data: /, ''));
          let content = json.choices?.[0]?.delta?.content;
          if (content) { finalMessage += content; text?.('delta', content); }
        } catch (e) { if (!(e instanceof SyntaxError)) throw e; }
      }
    }
    return finalMessage;
  },
};

export default provider;
