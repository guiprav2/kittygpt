import { resolve, lineify } from './util.js';

let cfg = {
  oai: {
    endpoint: 'https://api.openai.com/v1/responses',
    modelsEndpoint: 'https://api.openai.com/v1/models',
    key: globalThis.process?.env?.OPENAI_API_KEY,
  },
  oail: {
    endpoint: 'https://api.openai.com/v1/chat/completions',
    modelsEndpoint: 'https://api.openai.com/v1/models',
    key: globalThis.process?.env?.OPENAI_API_KEY,
  },
  xai: {
    endpoint: 'https://api.x.ai/v1/chat/completions',
    modelsEndpoint: 'https://api.x.ai/v1/models',
    key: globalThis.process?.env?.XAI_KEY,
  },
};

let purrify = (logs, rolemap = {}) =>
  logs
    .filter(x => (!x.type || x.type === 'message') && ['system', 'user', 'assistant', ...Object.keys(rolemap)].includes(x.role))
    .map(entry => ({
      role: ['system', 'assistant', 'user'].includes(entry.role) ? entry.role : rolemap[entry.role],
      content:
        Array.isArray(entry.content) && entry.content[0].type
          ? entry.content
          : lineify(entry.content), // FIXME
    }))
    .reduce((acc, entry) => {
      let last = acc[acc.length - 1];
      if (last && last.role === entry.role) { last.content.push(...entry.content) }
      else { acc.push(entry) }
      return acc;
    }, [])
    .filter(x => x.content);

async function bodystream(body, cb) {
  let reader = body.getReader();
  let decoder = new TextDecoder('utf-8');
  let finalMessage = '';
  while (true) {
    let { value, done } = await reader.read();
    if (done) break;
    let chunk = decoder.decode(value, { stream: true });
    let lines = chunk.split('\n').filter(line => line.trim());
    for (let line of lines) {
      try {
        let json = JSON.parse(line.replace(/^data: /, ''));
        let content = json.choices?.[0]?.delta?.content;
        if (content) { finalMessage += content; cb(content); }
      } catch (e) {
        if (!(e instanceof SyntaxError) || typeof e.message !== 'string' || !e.message.includes('JSON')) throw e;
      }
    }
  }
  return finalMessage;
}

async function completion(logs, opt = {}) {
  if (opt.call && opt.stream) throw new Error(`Function calling is incompatible with response streaming`);
  if (opt.format && opt.stream) throw new Error(`Special formats are incompatible with response streaming`);

  let msgs = purrify(logs, opt.rolemap || {});
  let model = opt.model || completion.defaultModel;
  let [prov, cmodel] = model.split(':');

  let logCompletion = () => null;
  if (opt.logger === true) logCompletion = completion.defaultLogger;
  else if (opt.logger) logCompletion = opt.logger;

  if (prov === 'oai') {
    let key = opt.key || cfg.oai.key;
    if (!key) throw new Error(`Missing API key for oai`);
    let cchoice = !opt.call || /^auto|required|none$/.test(opt.call) ? opt.call || 'auto' : (opt.call ? { type: 'function', name: opt.call } : 'auto');
    while (true) {
      let ctools = [...Object.entries((typeof opt.tools === 'function' ? opt.tools() : opt.tools) || {})].map(([name, spec]) => ({ type: 'function', name, parameters: {}, ...spec, handler: undefined }));
      let payload = {
        model: cmodel,
        input: msgs,
        instructions: opt.instructions,
        tools: ctools,
        tool_choice: cchoice,
        reasoning: opt.reasoning && { ...opt.reasoning, callback: undefined },
        parallel_tool_calls: false,
        store: false,
        prompt_cache_key: opt.cid,
      };
      //console.log('msgs:', JSON.stringify(msgs, null, 2));
      let headers = { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' };
      opt.reasoning && Object.assign(headers, { 'OpenAI-Beta': 'responses=experimental', conversation_id: opt.cid, session_id: opt.cid });
      let res = await fetch(cfg.oai.endpoint, { method: 'POST', headers, body: JSON.stringify(payload), signal: opt.signal });
      if (res.headers.get('Content-Type') === 'application/json') res = await res.json();
      else res = await res.text();
      if (typeof res === 'string' || !res.output) { console.error(`Unexpected response:`, res); throw new Error(`Unexpected response`) }
      //console.log('output:', JSON.stringify(res.output, null, 2));
      for (let item of res.output) {
        if (item.type === 'message') { msgs.push(item); continue }
        if (item.type === 'reasoning') { delete item.id; msgs.push(item); item.summary.filter(x => x.type === 'summary_text').forEach(x => opt.reasoning.callback?.(x.text)); continue }
        if (item.type === 'function_call') {
          msgs.push(item);
          let args = JSON.parse(item.arguments);
          let rtools = typeof opt.tools === 'function' ? opt.tools() : opt.tools;
          let handler = rtools[item.name]?.handler;
          let result;
          try {
            result = await handler?.({ ...args, meta: { name: item.name, call_id: item.call_id, raw: item } }) ?? { success: true };
          } catch (err) {
            result = { success: false, error: err.toString() };
          }
          msgs.push({ type: 'function_call_output', call_id: item.call_id, output: result != null && typeof result === 'object' ? JSON.stringify(result) : result });
          continue;
        }
      }
      if (msgs.at(-1).role === 'assistant') return msgs;
    }
  }

  if (prov === 'oail' || prov === 'xai') {
    let provider = cfg[prov];
    let key = opt.key || provider.key;
    if (!key) throw new Error(`Missing API key for ${prov}`);

    let ctools = [...Object.entries(opt.tools || {})]
      .filter(xs => typeof xs[1] === 'function' ? xs[1]() : xs[1])
      .filter(xs => xs[1])
      .map(([name, spec]) => ({ type: 'function', function: { name: null, parameters: {}, ...(typeof spec === 'function' ? spec() : spec), name, handler: undefined } }))
      .map(spec => resolve(spec));

    let cchoice = !opt.call || /^auto|required|none$/.test(opt.call)
      ? opt.call
      : (opt.call ? { type: 'function', name: opt.call } : 'auto');

    let messages = msgs.map(x => ({ role: x.role, content: Array.isArray(x.content) ? x.content.join('\n') : x.content }));

    while (true) {
      let body = { n: 1, model: cmodel, messages, tools: ctools, tool_choice: cchoice === 'required' ? 'auto' : cchoice };
      let res = await fetch(provider.endpoint, {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: opt.signal,
      });
      if (res.headers.get('Content-Type') === 'application/json') res = await res.json();
      else res = await res.text();
      if (typeof res === 'string') throw new Error(res);

      let choice = res.choices?.[0];
      let message = choice?.message || {};
      message.content = message.content?.replaceAll?.(/\n+/g, '\n')?.trim?.();

      let toolCalls = message.tool_calls || [];
      if (!toolCalls.length) {
        logCompletion([...msgs, { role: 'assistant', content: message.content }]);
        return { role: 'assistant', content: message.content };
      }

      // append assistant message with tool_calls and then tool results, then loop
      messages.push({ role: 'assistant', content: message.content || null, tool_calls: toolCalls });
      for (let y of toolCalls) {
        if (y.type !== 'function') continue;
        let args = {};
        try { args = JSON.parse(y.function.arguments || '{}') } catch {}
        let tool = typeof opt.tools?.[y.function.name] === 'function' ? opt.tools[y.function.name]() : opt.tools?.[y.function.name];
        let handler = tool?.handler;
        let result = null;
        try { result = handler ? await handler(args) : null } catch (err) { result = { success: false, error: err?.message || String(err) } }
        messages.push({ role: 'tool', tool_call_id: y.id || y.function?.name || 'call', content: typeof result === 'string' ? result : JSON.stringify(result ?? { success: true }) });
      }
    }
  }
}

completion.defaultEndpoint = '/completion';
completion.defaultModel = 'oai:gpt-5';

completion.defaultLogger = logs => {
  let last = logs.at(-1);
  let preview = (last?.content || last?.details?.arguments || '').slice(0, 50).replace(/\n/g, '\\n');
  let label = `📩 Completion: ${preview}…`;
  console.groupCollapsed(label);
  for (let x of logs) console.log(`[${x.role || 'unknown'}]`, x.content || x.details?.arguments || '[no content]');
  console.groupEnd();
};

export { purrify, bodystream };
export default completion;
