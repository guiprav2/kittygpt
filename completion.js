import { resolve, lineify } from './util.js';

let purrify = (logs, rolemap = {}) =>
  logs
    .filter(x => ['system', 'user', 'assistant', ...Object.keys(rolemap)].includes(x.role))
    .map(entry => ({
      role: ['system', 'assistant', 'user'].includes(entry.role) ? entry.role : rolemap[entry.role],
      content:
        Array.isArray(entry.content) && entry.content[0].type
          ? entry.content
          : lineify(entry.content),
    }))
    .reduce((acc, entry) => {
      let last = acc[acc.length - 1];
      if (last && last.role === entry.role) {
        last.content +=
          last.content && entry.content
            ? '\n\n' + entry.content
            : entry.content;
      } else {
        acc.push(entry);
      }
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
  let sysmsg = lineify(resolve(opt.sysmsg));
  let msgs = purrify([
    ...(sysmsg ? [{ role: 'system', content: sysmsg }] : []),
    ...logs
  ], opt.rolemap || {});
  let payload = { model: opt.model || completion.defaultModel, messages: msgs };
  if (Object.keys(opt.fns || {}).length) {
    payload.functions = Object.entries(opt.fns).map(([k, v]) => ({ ...v, name: k }));
    if (opt.call === 'force') {
      payload.function_call = 'auto';
    } else {
      payload.function_call = !opt.call || opt.call === 'auto' ? 'auto' : { name: opt.call };
    }
  }
  if (opt.format) {
    payload.response_format = { type: opt.format.type };
    if (opt.format.type === 'json_schema') payload.response_format.json_schema = opt.format.schema;
  }
  payload.stream = !!opt.stream || undefined;
  let logCompletion = () => null;
  if (opt.logger === true) logCompletion = completion.defaultLogger;
  else if (opt.logger) logCompletion = opt.logger;
  let tries = 0;
  while (true) {
    let headers = { 'Content-Type': 'application/json' };
    if (opt.key) headers['Authorization'] = `Bearer ${opt.key}`;
    let res = await fetch(opt.endpoint || completion.defaultEndpoint, { method: 'POST', headers, body: JSON.stringify(payload) });
    if (!res.ok) {
      let errorText;
      try { errorText = await res.text() }
      catch (e) { errorText = '[failed to read response body]' }
      throw new Error(`API error (${res.status}): ${errorText.slice(0, 200)}`);
    }
    let data = !res.headers.get('content-type')?.includes?.('text/event-stream') && await res.json();
    if (data && data.choices[0].message.function_call) {
      let call = data.choices[0].message.function_call;
      let fn = opt.fns[call.name];
      let ret = await fn.handler?.(JSON.parse(call.arguments));
      return { role: 'function_call', details: call, ret };
    }
    if (opt.stream) {
      let finalMessage = await bodystream(res.body, opt.stream);
      logCompletion([...payload.messages, { role: 'assistant', content: finalMessage }]);
      return { role: 'assistant', content: finalMessage };
    }
    if (opt.call === 'force') {
      if (tries++ > opt.maxRetries ?? 3) {
        logCompletion([...payload.messages, data.choices[0].message]);
        return data.choices[0].message;
      } else {
        continue;
      }
    }
    logCompletion([...payload.messages, data.choices[0].message]);
    return data.choices[0].message;
  }
}

completion.defaultEndpoint = '/completion';
completion.defaultModel = 'gpt-4o';

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
