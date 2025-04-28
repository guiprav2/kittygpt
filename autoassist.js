import filterclone from '@camilaprav/filterclone';
import voicechat from './voicechat.js';

function visible(x) {
  if (x.classList?.contains?.('ai-invisible')) return false;
  if (x.classList?.contains?.('ai-only')) return true;
  let rect = x.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
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

async function fillInput(inputElement, text, delay = 50) {
  if (inputElement.type === 'date') {
    inputElement.value = text;
    inputElement.dispatchEvent(new Event('change', { bubbles: true }));
    return;
  }

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

function createFns(meta, opt = {}) {
  let fns = {
    navback: !opt.navdisable && {
      handler: async () => {
        history.back();
        await new Promise(pres => setTimeout(pres, 1000));
      },
      respond: !opt.silent,
    },
    navforward: !opt.navdisable && {
      handler: async () => {
        history.forward();
        await new Promise(pres => setTimeout(pres, 1000));
      },
      respond: !opt.silent,
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
      handler: ({ kittyid }) => meta[kittyid].click(),
      respond: !opt.silent,
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
      handler: async ({ kittyid, text }) =>
        await fillInput(meta[kittyid], text),
      respond: !opt.silent,
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
        respond: !opt.silent,
      };
    }
  }
  return fns;
}

async function autoassist(opt) {
  let [snap, meta] = htmlsnap();
  let session = await voicechat(opt);
  session.sysupdate(
    { html: snap },
    createFns(meta, { navdisable: opt.navdisable, silent: opt.silent }),
  );
  let mutobs = new MutationObserver(() => {
    let dirty = false;
    let [newSnap, newMeta] = htmlsnap(meta);
    if (snap !== newSnap) {
      dirty = true;
      snap = newSnap;
      meta = newMeta;
    }
    if (!dirty) return;
    session.sysupdate(
      { html: snap },
      createFns(meta, { navdisable: opt.navdisable, silent: opt.silent }),
    );
  });
  mutobs.observe(document.documentElement, {
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
