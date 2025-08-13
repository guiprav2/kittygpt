// ==UserScript==
// @name         TamperAssist
// @namespace    tamperassist
// @version      0.0.1
// @description  Load htmlsnap, map elements, then send snapshots/actions to/from ws://localhost:8845/
// @match        *://*/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(async function () {
  'use strict';

  let BiMap = (await import('https://esm.sh/@camilaprav/kittygpt/bimap.js')).default;
  let htmlsnap = (await import('https://esm.sh/@camilaprav/htmlsnap')).default;

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

  async function tamperassist(opt) {
    let cid = crypto.randomUUID();
    let sock = new WebSocket('ws://localhost:8845/');
    let fns;
    await new Promise((pres, prej) => {
      sock.addEventListener("open", pres, { once: true });
      sock.addEventListener("error", prej, { once: true });
    });
    document.addEventListener("visibilitychange", () => {
      sock.send(JSON.stringify({ cid, type: 'visibilitychange', hidden: document.hidden }));
    });
    sock.addEventListener('message', async msg => {
      let data = JSON.parse(msg.data);
      if (data.type !== 'cmd') return;
      let { fn, args, iid } = data;
      try {
        let res = await fns[fn].handler(args);
        sock.send(JSON.stringify({ type: 'cmdres', iid, ...res }));
      } catch (err) {
        sock.send(JSON.stringify({ type: 'cmdres', iid, err: err.toString() }));
      }
    });
    let [snap, map] = htmlsnap((opt.scope || document.body), {
      iframes: true,
      idtrack: opt.idtrack,
      map: opt.map || new BiMap(),
      llm: true,
    });
    sock.send(JSON.stringify({ cid, type: 'snap', html: snap, fns: fns = createFns(map) }));
    console.log(fns);
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
      sock.send(JSON.stringify({ cid, type: 'snap', html: snap, fns: fns = createFns(map) }));
    };
    let mutobs = new MutationObserver(handleMutations);
    mutobs.observe(opt.scope || document.documentElement, {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
    });
    observeFrames();
  }

  await tamperassist({ idtrack: true });
})();
