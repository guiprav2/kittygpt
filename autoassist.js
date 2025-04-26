import voicechat from './voicechat.js';

function visible(x) {
  let rect = x.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

function filterclone(root, filter) {
  let croot = filter(root.cloneNode(false), root);
  if (!croot) return null;
  let stack = [{ original: root, clone: croot }];
  while (stack.length > 0) {
    let { original, clone } = stack.pop();
    for (let child = original.firstChild; child; child = child.nextSibling) {
      let cchild;
      if (child.nodeType === Node.ELEMENT_NODE) cchild = child.cloneNode(false);
      else if (child.nodeType === Node.TEXT_NODE)
        cchild = child.cloneNode(true);
      else continue;
      cchild = filter(cchild, child);
      cchild && clone.appendChild(cchild);
      if (cchild && child.nodeType === Node.ELEMENT_NODE) {
        stack.push({ original: child, clone: cchild });
      }
    }
  }
  return croot;
}

function htmlsnap(meta = {}) {
  let metarev = new Map([...Object.entries(meta)].map(([k, v]) => [v, k]));
  let newMeta = {};
  return [
    filterclone(document.body, (x, y) => {
      if (x.nodeType === Node.TEXT_NODE) {
        x.textContent = x.textContent.trim().replaceAll(/\s+/g, ' ');
        return x;
      }
      if (
        x.tagName === 'SCRIPT' ||
        x.tagName === 'STYLE' ||
        x.tagName === 'IFRAME' ||
        !visible(y)
      ) {
        return null;
      }
      let gattrs = [
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
      for (let { name: z } of x.attributes) {
        if (!z.startsWith('aria-') && !gattrs.includes(z)) x.removeAttribute(z);
      }
      if (/^a|input|textarea|select|button$/i.test(x.tagName)) {
        let id = metarev.get(y) || crypto.randomUUID().split('-').at(-1);
        x.setAttribute('data-kittyid', id);
        newMeta[id] = y;
      }
      return x;
    }).outerHTML,
    newMeta,
  ];
}

function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

async function fillInput(inputElement, text, delay = 50) {
  // Step 1: Clear input and fire 'change'
  inputElement.value = '';
  inputElement.dispatchEvent(new Event('change', { bubbles: true }));

  // Step 2: Use proper Unicode-aware iteration
  const graphemes = Array.from(text); // handles emojis, accents, etc.

  for (const char of graphemes) {
    await new Promise(resolve => setTimeout(resolve, delay));

    // Fire keydown
    const keyDownEvent = new KeyboardEvent('keydown', {
      key: char,
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    inputElement.dispatchEvent(keyDownEvent);

    if (keyDownEvent.defaultPrevented) continue;
    inputElement.value += char;

    // Fire input
    const inputEvent = new Event('input', { bubbles: true });
    inputElement.dispatchEvent(inputEvent);

    // Fire keyup
    const keyUpEvent = new KeyboardEvent('keyup', {
      key: char,
      bubbles: true,
      composed: true,
    });
    inputElement.dispatchEvent(keyUpEvent);
  }
}

function createFns(meta) {
  let fns = {
    navback: {
      handler: async () => {
        history.back();
        await new Promise(pres => setTimeout(pres, 1000));
      },
    },
    navforward: {
      handler: async () => {
        history.forward();
        await new Promise(pres => setTimeout(pres, 1000));
      },
    },
    click: {
      parameters: {
        type: 'object',
        properties: {
          kittyid: {
            type: 'string',
            description: 'The data-kittyid value of the target element',
          },
        },
        required: ['kittyid'],
      },
      handler: ({ kittyid }) => {
        console.log('click:', kittyid);
        meta[kittyid].click();
      },
    },
    fillText: {
      parameters: {
        type: 'object',
        properties: {
          kittyid: {
            type: 'string',
            description:
              'The data-kittyid value of the target element (select elements prohibited)',
          },
          text: { type: 'string', description: `The full text input` },
        },
        required: ['kittyid', 'text'],
      },
      handler: async ({ kittyid, text }) => {
        console.log('fill:', kittyid, '=>', text);
        await fillInput(meta[kittyid], text);
      },
    },
  };
  for (let [k, v] of Object.entries(meta)) {
    if (v.tagName === 'SELECT') {
      fns[`select_${k}`] = {
        parameters: {
          type: 'object',
          properties: {
            value: {
              type: 'string',
              enum: [...v.querySelectorAll('option')].map(x => x.value),
            },
          },
          required: ['value'],
        },
        handler: ({ value }) => {
          meta[k].value = value;
          meta[k].dispatchEvent(new Event('input', { bubbles: true }));
          meta[k].dispatchEvent(new Event('change', { bubbles: true }));
        },
      };
    }
  }
  console.log(fns, meta);
  return fns;
}

async function autoassist(opt) {
  let [snap, meta] = htmlsnap();
  let session = await voicechat(opt);
  session.sysupdate({ html: snap }, createFns(meta));
  let mutobs = new MutationObserver(
    debounce(() => {
      let dirty = false;
      let [newSnap, newMeta] = htmlsnap(meta);
      if (snap !== newSnap) {
        dirty = true;
        snap = newSnap;
        meta = newMeta;
      }
      if (!dirty) return;
      session.sysupdate({ html: snap }, createFns(meta));
      console.log('UPDATE', Math.random());
    }, 500),
  );
  mutobs.observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true,
  });
  let ostop = session.stop;
  return {
    ...session,
    stop: () => {
      mutobs.disconnect();
      return ostop.call(session);
    },
  };
}

export default autoassist;
