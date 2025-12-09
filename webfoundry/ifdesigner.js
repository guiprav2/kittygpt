import BiMap from './bimap.js';
import Boo from 'https://esm.sh/@camilaprav/boo@1.0.6';
import d from './dominant.js';
import htmlsnap from 'https://esm.sh/@camilaprav/htmlsnap@0.0.16';
import morphdom from 'https://esm.sh/morphdom';

window.state = { map: new BiMap(), cursors: {}, overlays: {} };
let wforigin = new URL(location.href).searchParams.get('isolate') || location.origin;
if (/^(\w+\.)?(webfoundry.app|webfoundry\d+\.netlify\.app|localhost)$/.test(wforigin)) throw new Error(`Bad isolation origin`);
let post = data => parent.postMessage({ path: null, ...data, path: location.pathname.slice(1).split('/').slice(3).join('/') }, wforigin);
let components = {};
addEventListener('message', async ev => {
  let { type, ...rest } = ev.data;
  if (type !== 'state' || ev.origin !== wforigin) return;
  if (state.collab?.uid && JSON.stringify(state.cursors[state.collab.uid]) !== JSON.stringify(rest.cursors[state.collab.uid])) {
    let scroll = () => {
      let first = state.map.get(rest.cursors[state.collab.uid]?.at?.(-1));
      let rect = first?.getBoundingClientRect?.();
      let visible = rect && rect.top >= 20 && rect.bottom <= innerHeight - 20;
      !visible && first?.scrollIntoView?.({ block: rect.height <= innerHeight ? 'center' : 'nearest', inline: rect.width <= innerWidth ? 'center' : 'nearest' });
    };
    state.collab.uid === 'master' ? scroll() : setTimeout(scroll, 500);
  }
  Object.assign(state, rest);
});
addEventListener('message', async ev => {
  if (ev.data.type !== 'update' || ev.origin !== wforigin) return;
  let doc = new DOMParser().parseFromString(ev.data.html, 'text/html')
  morphdom(document.head, doc.head);
  morphdom(document.body.firstElementChild, doc.body.firstElementChild);
});
addEventListener('message', async ev => {
  if (ev.data.type !== 'eval' || ev.origin !== wforigin) return;
  try {
    let AsyncFunction = (async () => {}).constructor;
    let fn = new AsyncFunction('state', 'args', ev.data.fn);
    post({ type: 'eval:res', rpcid: ev.data.rpcid, result: await fn(state, ev.data.args) });
  } catch (err) {
    console.error(err);
    post({ type: 'eval:res', rpcid: ev.data.rpcid, error: err.toString() });
  }
});
addEventListener('message', async ev => {
  if (ev.data.type !== 'templates' || ev.origin !== wforigin) return;
  components = {};
  for (let x of Object.values(ev.data.templates)) {
    let doc = new DOMParser().parseFromString(x, 'text/html');
    for (let y of doc.querySelectorAll('[id]')) {
      if (y.parentElement.closest('[id]')) continue;
      components[y.id] = y;
    }
  }
  expandComponents();
});
function expandComponents() {
  for (let x of document.querySelectorAll('[wf-component]')) {
    let k = x.getAttribute('wf-component');
    let c = components[k]?.cloneNode?.(true);
    if (!c) continue;
    c.setAttribute('wf-component', k);
    x.getAttribute('wf-props') && c.setAttribute('wf-props', x.getAttribute('wf-props'));
    if (x.outerHTML === c.outerHTML) continue;
    x.replaceWith(c);
    // FIXME: state.map.set(state.map.getKey(x), c);
  }
}
addEventListener('click', ev => ev.preventDefault());
addEventListener('mousedown', async ev => {
  if (ev.button !== 0) return;
  document.activeElement.blur();
  ev.preventDefault();
  let { target } = ev;
  let croot = target.closest('[wf-component]');
  if (croot) target = croot;
  if (!ev.shiftKey) post({ type: 'action', key: 'changeSelection', cur: state.collab.uid, s: [state.map.getKey(target)] });
  else post({ type: 'action', key: 'changeSelection', cur: state.collab.uid, s: [...new Set([...state.cursors[state.collab.uid] || [], state.map.getKey(target)])] });
});
addEventListener('keydown', ev => post({ type: 'keydown', key: ev.key, ctrlKey: ev.ctrlKey, shiftKey: ev.shiftKey }));
async function trackCursors() {
  requestAnimationFrame(async () => await trackCursors());
  if (!document.body) return; // document.open
  for (let [k, ids] of Object.entries(state.cursors)) {
    let ovs = (state.overlays[k] ??= []);
    while (ids.length > ovs.length) {
      let i = ovs.length;
      let p = state.collab.rtc?.presence?.find?.(x => x.user === k);
      let o = d.el('div', { class: ['wf-cursor hidden z-1000 pointer-events-none', () => !p ? 'border border-blue-400' : `border border-${p.color}`] });
      ovs.push(new Boo(o, () => state.map.get(state.cursors[k][i]), { transitionClass: 'transition-[left,right,top,bottom]' }));
    }
    while (ovs.length > ids.length) ovs.pop().disable();
    for (let x of ovs) !x.ov.parentElement && document.body.append(x.ov);
  }
}
await trackCursors();
let snap = () => {
  let [snap, map] = htmlsnap(document.documentElement, { idtrack: true, map: state.map });
  state.map = map;
  let doc = new DOMParser().parseFromString(snap, 'text/html');
  doc.querySelectorAll('.wf-cursor').forEach(x => x.remove());
  for (let x of doc.querySelectorAll('[wf-component]')) {
    let props = x.getAttribute('wf-props') || '';
    if (props) props = ` wf-props="${props.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}"`;
    x.outerHTML = `<${x.tagName.toLowerCase()} data-htmlsnap="${x.getAttribute('data-htmlsnap')}" wf-component="${x.getAttribute('wf-component')}"${props}></${x.tagName.toLowerCase()}>`;
  }
  if (doc.documentElement.outerHTML === state.snap) return;
  snap = state.snap = doc.documentElement.outerHTML;
  post({ type: 'htmlsnap', snap });
};
let mutobs = new MutationObserver(() => { expandComponents(); snap() });
mutobs.observe(document, { attributes: true, subtree: true, childList: true, characterData: true });
snap();
post({ type: 'ready', status: 200 });
