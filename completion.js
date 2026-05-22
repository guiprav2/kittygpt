// completion.js
import { run } from './core.js';

async function completion(logs, opts = {}) {
  return run(logs, opts);
}

completion.defaultModel = 'oai:gpt-5';
completion.defaultLogger = logs => {
  let last = logs.at(-1);
  let preview = (last?.content || last?.details?.arguments || '')
    .toString().slice(0, 50).replace(/\n/g, '\\n');
  let label = `📩 Completion: ${preview}…`;
  console.groupCollapsed(label);
  for (let x of logs)
    console.log(`[${x.role || 'unknown'}]`, x.content || x.details?.arguments || '[no content]');
  console.groupEnd();
};

export default completion;
