let resolve = x => (typeof x === 'function' ? x() : x);
let lineify = xs => (Array.isArray(xs) ? xs.filter(Boolean).join('\n') : xs);
export { resolve, lineify };
