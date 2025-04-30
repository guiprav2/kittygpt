import BiMap from './bimap.js';
import htmlsnap from './htmlsnap.js';
import voicechat from './voicechat.js';

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

function createFns(map, opt = {}) {
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
      handler: ({ kittyid }) => map.get(kittyid).click(),
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
        await fillInput(map.get(kittyid), text),
      respond: !opt.silent,
    },
  };
  for (let [k, v] of map.forward.entries()) {
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
          let el = map.get(k);
          el.value = value;
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        },
        respond: !opt.silent,
      };
    }
  }
  return fns;
}

async function autoassist(opt) {
  let [snap, map] = htmlsnap(document.body, { map: new BiMap(), llm: true });
  let session = await voicechat(opt);
  session.sysupdate(
    { html: snap },
    createFns(map, { navdisable: opt.navdisable, silent: opt.silent }),
  );
  let mutobs = new MutationObserver(() => {
    let dirty = false;
    let [newSnap, newMap] = htmlsnap(document.body, { map, llm: true });
    if (snap !== newSnap) {
      dirty = true;
      snap = newSnap;
      map = newMap;
    }
    if (!dirty) return;
    session.sysupdate(
      { html: snap },
      createFns(map, { navdisable: opt.navdisable, silent: opt.silent }),
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
