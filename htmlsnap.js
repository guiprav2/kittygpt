import BiMap from './bimap.js';
import filterclone from './filterclone.js';

function visible(x, llm) {
  if (llm && x.classList?.contains?.('ai-invisible')) return false;
  if (llm && x.classList?.contains?.('ai-only')) return true;
  if (x.tagName && /^script|style|iframe$/i.test(x.tagName)) return false;
  let style = x.nodeType === Node.ELEMENT_NODE && getComputedStyle(x);
  if (style?.display === 'none' || style?.visibility === 'hidden') return false;
  let rect = x.getBoundingClientRect?.();
  if (!rect) return true;
  return rect.width > 0 && rect.height > 0;
}

function htmlsnap(root, opt) {
  opt.collapseWhitespace ??= false;
  opt.idtrack ??= false;
  opt.llm ??= false;
  opt.attrs ??= opt.llm && [
    /^aria-/,
    'alt',
    'title',
    'href',
    'src',
    'type',
    'name',
    'placeholder',
    'value',
    'id',
    'role',
  ];
  opt.removeInvisible ??= opt.llm;
  let map = opt.map?.clone?.();
  let html = filterclone(root, (x, y) => {
    if (x.nodeType === Node.TEXT_NODE) {
      if (opt.collapseWhitespace || opt.llm) x.textContent = x.textContent.trim().replaceAll(/\s+/g, ' ');
      return x;
    }
    if (opt.removeInvisible && !visible(y, opt.llm)) return;
    if (opt.attrs) {
      for (let { name: z } of x.attributes) {
        let reattrs = opt.attrs.filter(x => x instanceof RegExp);
        if (!opt.attrs.includes(z) && !reattrs.find(w => w.test(z))) x.removeAttribute(z);
      }
    }
    if (opt.idtrack || (opt.llm && /^a|input|textarea|select|button$/i.test(x.tagName))) {
      let id = map.getKey(y) || crypto.randomUUID().split('-').at(-1);
      x.setAttribute('data-htmlsnap', id);
      map.set(id, y);
    }
    (x.value || x.value === '') && x.setAttribute('value', x.value);
    return x;
  })?.outerHTML || '';
  return opt.idtrack || opt.llm ? [html, map] : html;
}

export default htmlsnap;
