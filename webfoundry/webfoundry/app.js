import anime from 'https://cdn.skypack.dev/animejs@3.2.2';
import d from './dominant.js';
import { camelCase } from 'https://cdn.skypack.dev/case-anything';
import { marked } from 'https://esm.sh/marked@13.0.1';

window.anime = anime;
window.d = d;
window.tap = x => (console.log(x), x);

let [scripts, templates] = await Promise.all([
  (async () => {
    let res = await fetch(
      import.meta.url.split('/').slice(0, -1).join('/') + '/scripts.json',
    );
    if (!res.ok) {
      throw new Error('Failed to load webfoundry/scripts.json');
    }
    return await res.json();
  })(),
  (async () => {
    let res = await fetch(
      import.meta.url.split('/').slice(0, -1).join('/') + '/templates.json',
    );
    if (!res.ok) {
      throw new Error('Failed to load webfoundry/templates.json');
    }
    return await res.json();
  })(),
]);

window.rawctrls = Object.fromEntries(
  await Promise.all(
    scripts
      .filter(x => x.startsWith('controllers/'))
      .map(async x => [
        camelCase(x.slice('controllers/'.length).replace(/\.js$/, '')),
        new (await import('../' + x)).default(),
      ]),
  ),
);

let components = Object.fromEntries(
  (
    await Promise.all(
      Object.entries(templates).map(async ([k, v]) =>
        k.startsWith('components/')
          ? [
              [
                k.replace('.html', '.js'),
                scripts.includes(k.replace('.html', '.js'))
                  ? (await import('../' + k.replace('.html', '.js'))).default
                  : class GenericComponent {
                      constructor(props) {
                        this.props = props;
                      }
                    },
              ],
            ]
          : [],
      ),
    )
  ).flat(),
);

window.renderTemplate = x => {
  let templ = templates[x];
  let templDoc = new DOMParser().parseFromString(templ, 'text/html');
  let templRoot = document.createElement('div');
  templRoot.innerHTML = templDoc.body.innerHTML;
  return compile(templRoot.firstElementChild);
};

window.renderComponent = (x, props = {}) => {
  x = `components/${x}.html`;
  let Component = components[x.replace('.html', '.js')];
  Component.prototype.render = function () {
    this.root = renderTemplate(x);
    this.root.ctx ??= {};
    this.root.ctx.this = this;
    return this.root;
  };
  let n = d.el(Component, props);
  for (let [k, v] of Object.entries(props)) {
    if (typeof v !== 'string' || !v.startsWith('{{') || !v.endsWith('}}')) {
      continue;
    }
    console.log('patching:', k);
    //props[k] = d.binding({ get: () => wfeval(n, v)), set: y => wfeval(n, v.slice(2, -2).trim() + ' = _1') });
  }
  return n;
};

function wfevalLoop(n, x) {
  while (true) {
    if (typeof x !== 'string' || !x.startsWith('{{') || !x.endsWith('}}')) {
      break;
    }
    x = wfeval(n, x.slice(2, -2).trim());
  }
  return x;
}

window.arrayify = x => (Array.isArray(x) ? x : x == null ? [] : [x]);

window.showModal = async (x, props) => {
  let dialog = renderComponent(x, props);
  dialog.open = false;
  let { promise: p, resolve: res } = Promise.withResolvers();
  document.body.append(dialog);
  dialog.returnValue = '';
  dialog.addEventListener('click', ev => {
    if (ev.target !== dialog) {
      return;
    }
    let rect = dialog.getBoundingClientRect();
    if (
      ev.clientX >= rect.left &&
      ev.clientX <= rect.right &&
      ev.clientY >= rect.top &&
      ev.clientY <= rect.bottom
    ) {
      return;
    }
    dialog.close();
  });
  dialog.addEventListener('close', () => {
    dialog.remove();
    res([dialog.returnValue, ...(arrayify(dialog.returnDetail) || [])]);
  });
  dialog.showModal();
  p = await p;
  dialog.remove();
  return p;
};

window.selectFile = accept => {
  let { promise: p, resolve: res } = Promise.withResolvers();
  let input = d.el('input', { type: 'file', accept, class: 'hidden' });
  input.addEventListener('change', ev => res(input.files[0]));
  document.body.append(input);
  input.click();
  input.remove();
  return p;
};

window.state = {};
for (let [k, v] of Object.entries(rawctrls)) {
  state[k] = v.state = v.state ?? {};
}

window.post = async function (action, ...args) {
  let [section, name] = action.split('.');
  let ctrl = rawctrls[section];
  if (!ctrl)
    throw new Error(`Unknown controller: ${section}`);
  let act = ctrl.actions[name];
  if (!act)
    throw new Error(`Unknown controller action: ${section}.${name}`);
  let { bus } = state.event || {};
  try {
    await bus?.emitAsync?.(`wf:${section}:${name}:begin`, { args });
    d.update();
    let result = act(...args);
    d.update();
    if (result?.then) {
      result = await result;
      d.update();
    }
    await bus?.emitAsync?.(`wf:${section}:${name}:ready`, { args, result });
    d.update();
    return result;
  } catch (err) {
    await bus?.emitAsync?.(`wf:${section}:${name}:error`, { args, error: err });
    throw err;
  }
};

class App {
  constructor() {
    this.interceptorSetup();
    this.pushPopStateSetup();
    this.update();

    window.triggerRouterError = code => {
      let templ = templates[`pages/${code}.html`];
      if (!templ) {
        throw new Error(`No error page found for code ${code}`);
      }
      let templDoc = new DOMParser().parseFromString(templ, 'text/html');
      let templRoot = document.createElement('div');
      for (let x of templDoc.body.attributes) {
        templRoot.setAttribute(x.name, x.value);
      }
      templRoot.innerHTML = templDoc.body.innerHTML;
      this.content = compile(templRoot);
      for (let x of document.querySelectorAll('dialog')) {
        x.remove();
      }
      d.update();
    };
  }

  interceptorSetup() {
    addEventListener('click', ev => {
      let link = ev.target.closest('a');
      if (link?.download) {
        return;
      }
      let href = link?.getAttribute?.('href');
      if (!href) {
        return;
      }
      if (/^[a-zA-Z]+:/.test(href)) {
        return;
      }
      if (href.startsWith('#') && href.length > 1) {
        return;
      }
      ev.preventDefault();
      if (href === '#') return;
      let currentPath = location.pathname.split('/').slice(0, -1).join('/');
      history.pushState(null, '', `${currentPath}/${href}`);
    });
  }

  pushPopStateSetup() {
    let self = this;
    let origPushState = history.pushState;
    history.pushState = function (...args) {
      origPushState.call(this, ...args);
      self.update();
    };
    addEventListener('popstate', () => self.update());
  }

  update() {
    let url = new URL(location.href);
    if (!this.electronRoot) {
      this.electronRoot = url.searchParams.get('electronRoot');
    }
    let parts = !this.electronRoot
      ? url.pathname.slice(1).split('/')
      : url.pathname.slice(this.electronRoot.length + 1).split('/');
    if (parts[0] === 'preview') {
      parts.splice(0, 3);
    }
    if (parts.length === 1 && !parts[0]) {
      parts[0] = 'index.html';
    }
    let path = 'pages/' + parts.join('/');
    let templ = templates[path];
    if (!templ) {
      templ = templates['pages/404.html'];
    }
    if (!templ) {
      alert(404);
      this.content = null;
      d.update();
      return;
    }
    let templDoc = new DOMParser().parseFromString(templ, 'text/html');
    let templRoot = document.createElement('div');
    for (let x of templDoc.body.attributes) {
      templRoot.setAttribute(x.name, x.value);
    }
    templRoot.innerHTML = templDoc.body.innerHTML;
    this.content = compile(templRoot);
    let title = templDoc.querySelector('head > title');
    if (title) {
      document.querySelector('head > title').textContent = title.textContent;
    }
    for (let x of document.querySelectorAll('dialog')) {
      x.remove();
    }
    scrollTo(0, 0);
    d.update();
  }

  render = () => d.portal(() => this.content);
}

function mapChildNodes(n, fn) {
  for (let x of n.childNodes) {
    let x2 = arrayify(fn(x));
    if (x2 && x2.length == 1 && x2[0] === x) {
      continue;
    }
    for (let x3 of x2) {
      n.insertBefore(x3, x);
    }
    x.remove();
  }
}

function wfeval(n, expr, ...args) {
  let ctx = {};
  while (n) {
    for (let [k, v] of Object.entries(n.ctx || {})) {
      ctx[k] = v;
    }
    n = n.parentElement;
  }
  let self = ctx.this;
  delete ctx.this;
  let argNames = args.map((x, i) => `_${i + 1}`);
  let r = self
    ? new Function(...Object.keys(ctx), ...argNames, `return (${expr})`).apply(
        self,
        [...Object.values(ctx), ...args],
      )
    : new Function(...Object.keys(ctx), ...argNames, `return (${expr})`)(
        ...Object.values(ctx),
        ...args,
      );
  return r;
}

window.wfeval = wfeval;

function compile(root) {
  root.style.display = '';
  for (let x of [root, ...root.querySelectorAll('*')]) {
    let ifExpr = x.getAttribute('wf-if');
    let mapExpr = x.getAttribute('wf-map');

    if (ifExpr && mapExpr) {
      throw new Error(`wf-if and wf-map can't be mixed in a single element`);
    }

    if (ifExpr) {
      x.removeAttribute('wf-if');
      x.hidden = false;
      let cond = d.if(() => wfeval(cond, ifExpr), compile(x.cloneNode(true)));
      x.replaceWith(cond);
    }

    if (mapExpr) {
      x.removeAttribute('wf-map');
      x.hidden = false;
      let [varname, iterExpr] = mapExpr.split(' of ');
      let clone = x.cloneNode(true);
      let parent = x.parentElement;
      x.replaceWith(
        d.map(
          () => wfeval(parent, iterExpr),
          y => {
            let n = compile(clone.cloneNode(true));
            n.removeAttribute('id');
            n.ctx = { [varname]: y };
            return n;
          },
        ),
      );
    }
  }

  for (let x of [root, ...root.querySelectorAll('*')]) {
    let component = x.getAttribute('wf-component');
    if (component) {
      let root;
      let props = JSON.parse(x.getAttribute('wf-props') || '{}');
      x.replaceWith((root = renderComponent(component, props)));
      continue;
    }

    let onAttachExpr = x.getAttribute('wf-onattach');
    if (onAttachExpr) {
      x.removeAttribute('wf-onattach');
      d.el(x, { onAttach: y => wfeval(x, onAttachExpr, y) });
    }

    let onDetachExpr = x.getAttribute('wf-ondetach');
    if (onDetachExpr) {
      x.removeAttribute('wf-ondetach');
      d.el(x, { onDetach: y => wfeval(x, onDetachExpr, y) });
    }

    let removedAttrs = [];
    for (let { name, value } of x.attributes) {
      if (
        name === 'wf-onattach' ||
        name === 'wf-ondetach' ||
        !name.startsWith('wf-on')
      ) {
        continue;
      }
      removedAttrs.push(name);
      d.el(x, { [name.slice(3)]: () => wfeval(x, value) });
    }

    for (let y of removedAttrs) {
      x.removeAttribute(y);
    }

    let re = /(?<=[^\\]|^)({{[\s\S]*?}})/g;
    let re2 = /\\({{[\s\S]*?}})/g;
    let re3 = /({{[\s\S]*?}})/g;
    let wfClassNames = x.getAttribute('wf-class') || '';
    if (wfClassNames && re3.test(wfClassNames)) {
      x.removeAttribute('wf-class');
      let replacedClassNames = new Set();
      d.el(x, {
        class: wfClassNames
          .split(re3)
          .filter(y => y.trim())
          .map(y => {
            y = y.slice(2, -2);
            if (y.startsWith('replaces ')) {
              let [, replaces, expr] = /^replaces (.+?): (.+)$/.exec(y);
              replacedClassNames.add(...replaces.split(/\s+/g));
              return () => wfeval(x, expr);
            }
            return () => wfeval(x, y);
          }),
      });
      for (let y of replacedClassNames) {
        x.classList.remove(y);
      }
    }

    if (/^{{.*?}}$/.test(x.getAttribute('value'))) {
      let expr = x.value.slice(2, -2).trim();
      x.value = '';
      x.removeAttribute('value');
      d.el(x, {
        value: d.binding({
          get: () => wfeval(x, expr || 'null'),
          set: y => wfeval(x, expr ? `${expr} = ${JSON.stringify(y)}` : 'null'),
        }),
      });
    }

    if (x.getAttribute('wf-value')) {
      let expr = x.getAttribute('wf-value');
      x.removeAttribute('wf-value');
      x.removeAttribute('value');
      d.el(x, {
        value: d.binding({
          get: () => wfeval(x, expr || 'null'),
          set: y => wfeval(x, expr ? `${expr} = ${JSON.stringify(y)}` : 'null'),
        }),
      });
    }

    if (x.getAttribute('wf-checked')) {
      let expr = x.getAttribute('wf-checked');
      x.removeAttribute('wf-checked');
      x.removeAttribute('checked');
      d.el(x, {
        checked: d.binding({
          get: () => wfeval(x, expr || 'null'),
          set: y => wfeval(x, expr ? `${expr} = ${JSON.stringify(y)}` : 'null'),
        }),
      });
    }

    if (x.tagName === 'TEXTAREA' && /^{{.*?}}$/.test(x.textContent.trim())) {
      let expr = x.textContent.trim().slice(2, -2).trim();
      x.textContent = '';
      d.el(x, {
        value: d.binding({
          get: () => wfeval(x, expr),
          set: y => wfeval(x, `${expr} = ${JSON.stringify(y)}`),
        }),
      });
    }

    if (x.getAttribute('wf-src')) {
      let expr = x.getAttribute('wf-src');
      x.removeAttribute('wf-src');
      x.removeAttribute('src');
      d.el(x, { src: () => wfeval(x, expr) });
    }

    if (x.getAttribute?.('src')?.startsWith?.('../')) {
      x.src = x.getAttribute('src').slice(3);
    }

    if (x.style.backgroundImage?.startsWith?.('url(')) {
      let url = JSON.parse(x.style.backgroundImage.slice(4, -1));
      if (!url.startsWith('../')) {
        continue;
      }
      x.style.backgroundImage = `url("${url.slice(3)}")`;
    }

    if (/^{{.+?}}$/.test(x.getAttribute('href') || '')) {
      let expr = x.getAttribute('href').slice(2, -2);
      x.removeAttribute('href');
      d.el(x, { href: () => wfeval(x, expr) });
    }

    if (x.getAttribute('wf-disabled')) {
      let expr = x.getAttribute('wf-disabled');
      x.removeAttribute('wf-disabled');
      x.removeAttribute('disabled');
      d.el(x, { disabled: () => wfeval(x, expr) });
    }

    if (x.getAttribute('wf-placeholder')) {
      let expr = x.getAttribute('wf-placeholder');
      x.removeAttribute('wf-placeholder');
      d.el(x, { placeholder: () => wfeval(x, expr) });
    }

    if (x.getAttribute('wf-innerhtml')) {
      let expr = x.getAttribute('wf-innerhtml');
      x.removeAttribute('wf-innerhtml');
      d.el(x, { innerHTML: () => wfeval(x, expr) });
    }

    mapChildNodes(x, n => {
      if (n.nodeType === Node.TEXT_NODE && re2.test(n.textContent)) {
        n.textContent = n.textContent.replaceAll(/\\{{/g, '{{');
        return n;
      }
      if (
        n.nodeType !== Node.TEXT_NODE ||
        n.parentElement.tagName === 'TEXTAREA' ||
        !re.test(n.textContent)
      ) {
        return n;
      }
      let np = n.parentElement;
      return n.textContent.split(re3).map(x => {
        if (!re3.test(x)) {
          return document.createTextNode(x);
        }
        x = x.slice(2, -2).trim();
        if (x.startsWith('markdown:')) {
          return d.el('div', {
            class: 'prose',
            innerHTML: () =>
              marked(wfeval(np, x.slice('markdown:'.length).trim())),
          });
        }
        return d.text(() => wfeval(np, x));
      });
    });
  }

  return root;
}

let observer = new MutationObserver(muts => {
  let gfonts = [];
  for (let mut of muts) {
    if (mut.type === 'childList') {
      for (let x of mut.addedNodes) {
        if (x.nodeType !== 1) {
          continue;
        }
        for (let y of [x, ...x.querySelectorAll('*')]) {
          gfonts.push(
            ...[...y.classList]
              .filter(x => x.match(/^gfont-\[.+?\]$/))
              .map(x => x.slice('gfont-['.length, -1)),
          );
        }
      }
    } else if (mut.type === 'attributes') {
      gfonts.push(
        ...[...mut.target.classList]
          .filter(x => x.match(/^gfont-\[.+?\]$/))
          .map(x => x.slice('gfont-['.length, -1)),
      );
    }
  }

  for (let x of gfonts) {
    let id = `gfont-[${x}]`;
    let existing = document.getElementById(id);
    if (existing) {
      continue;
    }
    document.head.append(
      d.el(
        'style',
        { id },
        `
      @import url('https://fonts.googleapis.com/css2?family=${x.replace(/_/g, '+')}:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
      .gfont-\\[${x}\\] { font-family: "${x.replace(/_/g, ' ')}" }
    `,
      ),
    );
  }
});

observer.observe(document.body, {
  attributes: true,
  childList: true,
  subtree: true,
});

export default App;
