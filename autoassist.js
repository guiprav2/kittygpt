import BiMap from './bimap.js';
import htmlsnap from 'https://esm.sh/@camilaprav/htmlsnap@0.0.9';
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
          htmlsnap: {
            type: 'string',
            description: 'The data-htmlsnap value of the target element',
          },
        },
        required: ['htmlsnap'],
      },
      handler: ({ htmlsnap }) => map.get(htmlsnap).click(),
      respond: !opt.silent,
    },
    fillText: {
      parameters: {
        type: 'object',
        properties: {
          htmlsnap: {
            type: 'string',
            description:
              'The data-htmlsnap value of the target element (select elements prohibited)',
          },
          text: { type: 'string', description: `The full text input` },
        },
        required: ['htmlsnap', 'text'],
      },
      handler: async ({ htmlsnap, text }) =>
        await fillInput(map.get(htmlsnap), text),
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

export default async function autoassist(opt) {
  let [snap, map] = htmlsnap((opt.scope || document.body), {
    iframes: true,
    idtrack: opt.idtrack,
    map: opt.map || new BiMap(),
    llm: true,
  });
  let session = await voicechat(opt);
  session.sysupdate(
    { html: snap },
    createFns(map, { navdisable: opt.navdisable, silent: opt.silent }),
  );
  let frameObservers = new Map();
  let observedRoots = new Set();
  let observeFrames = () => {
    if (!opt.iframes) return;
    let scope = opt.scope || document;
    let frames = [...scope.querySelectorAll('iframe')];
    if (scope.tagName === 'IFRAME') frames.unshift(scope);
    for (let frame of frames) {
      let frameRoot = frame.contentDocument.documentElement;
      if (observedRoots.has(frameRoot)) continue;
      let mutobs = new MutationObserver(handleMutations);
      let observe = () => {
        mutobs.observe(frameRoot, {
          attributes: true,
          characterData: true,
          childList: true,
          subtree: true,
        });
      };
      frame.addEventListener('load', observe);
      observe();
      observedRoots.add(frameRoot);
      frameObservers.get(frame)?.disconnect?.();
      frameObservers.set(frame, mutobs);
    }
  };
  let handleMutations = () => {
    observeFrames();
    let dirty = false;
    let [newSnap, newMap] = htmlsnap(opt.scope || document.body, {
      iframes: opt.iframes,
      idtrack: opt.idtrack,
      map,
      llm: true,
    });
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
  };
  let mutobs = new MutationObserver(handleMutations);
  mutobs.observe(opt.scope || document.documentElement, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  });
  observeFrames();
  let ostop = session.stop;
  return {
    ...session,
    get map() {
      return map;
    },
    stop: () => {
      for (let mutobs of frameObservers.values()) mutobs.disconnect();
      mutobs.disconnect();
      return ostop.call(session);
    },
  };
}
