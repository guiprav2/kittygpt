class BiMap {
  constructor() {
    this.forward = new Map();
    this.reverse = new Map();
  }

  set(key, value) {
    if (this.forward.has(key)) {
      const oldValue = this.forward.get(key);
      this.reverse.delete(oldValue);
    }
    if (this.reverse.has(value)) {
      const oldKey = this.reverse.get(value);
      this.forward.delete(oldKey);
    }
    this.forward.set(key, value);
    this.reverse.set(value, key);
  }

  get(key) {
    return this.forward.get(key);
  }

  getKey(value) {
    return this.reverse.get(value);
  }

  delete(key) {
    const value = this.forward.get(key);
    this.forward.delete(key);
    this.reverse.delete(value);
  }

  has(key) {
    return this.forward.has(key);
  }

  hasValue(value) {
    return this.reverse.has(value);
  }

  clone() {
    const clone = new BiMap();
    for (const [key, value] of this.forward.entries()) {
      clone.set(key, value);
    }
    return clone;
  }
}

function filterclone(root, filter, iframes) {
  let croot = filter(root.cloneNode(false), root);
  if (!croot) return null;

  let stack = [{ original: root, clone: croot }];

  while (stack.length > 0) {
    let { original, clone } = stack.pop();

    for (let child = original.firstChild; child; child = child.nextSibling) {
      let cchild;

      if (
        iframes &&
        child.nodeType === Node.ELEMENT_NODE &&
        child.tagName === 'IFRAME' &&
        child.src &&
        child.src.startsWith(location.origin) &&
        child.contentDocument &&
        child.contentDocument.documentElement
      ) {
        try {
          let div = document.createElement('div');
          div.setAttribute('data-originaltag', 'iframe');
          cchild = filter(div, child);
          if (cchild) {
            clone.appendChild(cchild);
            let iframeBody = child.contentDocument.body;
            let clonedBody = filterclone(iframeBody, filter, true);
            if (clonedBody) {
              for (let iframeChild of clonedBody.childNodes) {
                cchild.appendChild(iframeChild.cloneNode(true));
              }
            }
          }
          continue;
        } catch (e) {
          console.warn('Could not access iframe content:', e);
          cchild = filter(child.cloneNode(false), child);
        }
      } else {
        if (child.nodeType === Node.ELEMENT_NODE) {
          cchild = child.cloneNode(false);
        } else {
          cchild = child.cloneNode(true);
        }
        cchild = filter(cchild, child);
      }

      if (cchild) {
        clone.appendChild(cchild);
        if (child.nodeType === Node.ELEMENT_NODE) {
          stack.push({ original: child, clone: cchild });
        }
      }
    }
  }

  return croot;
}

function visible(x, llm) {
  if (llm && x.classList?.contains?.('ai-invisible')) return false;
  if (llm && x.classList?.contains?.('ai-only')) return true;
  if (x.tagName && /^script|style$/i.test(x.tagName)) return false;
  if (x.tagName === 'IFRAME' && !x.src.startsWith(location.origin)) return false;
  let style = x.nodeType === Node.ELEMENT_NODE && getComputedStyle(x);
  if (style?.display === 'none' || style?.visibility === 'hidden') return false;
  let rect = x.getBoundingClientRect();
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
    try {
      if (x.nodeType === Node.COMMENT_NODE) return x;
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
    } catch (err) {
      console.error('Element error:', y, err);
    }
  }, opt.iframes)?.outerHTML || '';
  return opt.idtrack || opt.llm ? [html, map] : html;
}

let isBrowser =
  typeof window !== 'undefined' && typeof navigator !== 'undefined';
async function createBackend(debug) {
  return isBrowser
    ? await createBrowserBackend()
    : await createNodeBackend(debug);
}

async function createBrowserBackend() {
  let EventEmitter = (await import('https://esm.sh/event-emitter')).default;
  let RTCPeerConnection = window.RTCPeerConnection;
  let pc = new RTCPeerConnection();
  let audio = new Audio();
  audio.autoplay = true;
  let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  stream.getAudioTracks().forEach(track => pc.addTrack(track, stream));
  let attachSpeaker = track => {
    if (!audio.srcObject) {
      let remoteStream = new MediaStream([track]);
      audio.srcObject = remoteStream;
    }
  };
  return {
    EventEmitter,
    pc,
    attachSpeaker,
    stop: () => {
      stream.getTracks().forEach(track => track.stop());
      pc.getSenders().forEach(sender => pc.removeTrack(sender));
      pc.close();
      audio.srcObject = null;
    },
  };
}

async function createNodeBackend(debug = false) {
  let EventEmitter = (await import('events')).default;
  const wrtc = (await import('wrtc')).default;
  const { RTCPeerConnection, nonstandard } = wrtc;
  const { RTCAudioSource, RTCAudioSink } = nonstandard;
  const Speaker = (await import('speaker')).default;
  const mic = (await import('mic')).default;

  const pc = new RTCPeerConnection();
  const source = new RTCAudioSource();
  const track = source.createTrack();
  pc.addTrack(track);

  const micInstance = mic({
    rate: '16000',
    channels: '1',
    debug: false,
    device: 'default',
  });
  const micStream = micInstance.getAudioStream();
  micInstance.start();
  let micBuffer = Buffer.alloc(0);

  micStream.on('data', chunk => {
    micBuffer = Buffer.concat([micBuffer, chunk]);
    while (micBuffer.length >= 320) {
      const frame = micBuffer.slice(0, 320);
      micBuffer = micBuffer.slice(320);
      const realBuffer = Buffer.alloc(320);
      frame.copy(realBuffer);
      source.onData({
        samples: realBuffer,
        sampleRate: 16000,
        bitsPerSample: 16,
        channelCount: 1,
        numberOfFrames: 160,
      });
    }
  });

  let sink = null;
  let speaker = null;

  const attachSpeaker = track => {
    sink = new RTCAudioSink(track);
    const knownRates = [48000, 44100, 32000, 24000, 16000];

    sink.ondata = ({ samples }) => {
      if (samples.length < 480) return;
      if (!speaker) {
        const match = knownRates.find(rate =>
          [0.01, 0.02, 0.03, 0.04].some(
            d => Math.round(rate * d) === samples.length,
          ),
        );
        if (!match) {
          throw new Error(
            `Unable to determine sample rate from samples.length = ${samples.length}`,
          );
        }
        debug &&
          console.log('📐 Speaker initialized. Detected sampleRate:', match);
        speaker = new Speaker({
          channels: 1,
          bitDepth: 16,
          sampleRate: match,
          signed: true,
        });
      }
      const buffer = Buffer.from(samples.buffer);
      speaker.write(buffer);
    };

    return sink;
  };

  const stop = () => {
    try {
      sink?.stop?.();
      sink?.removeAllListeners?.();
    } catch (e) {
      console.warn('Failed to stop sink cleanly:', e);
    }

    try {
      micStream?.removeAllListeners?.('data');
    } catch (e) {}

    try {
      speaker?.end?.();
    } catch (e) {}

    try {
      pc.getSenders().forEach(s => pc.removeTrack(s));
      pc.close();
    } catch (e) {}

    return micInstance.stop(); // trusted behavior
  };

  return { EventEmitter, pc, attachSpeaker, stop };
}

async function voicechat({
  endpoint,
  model,
  voice,
  transcript,
  debug = false,
} = {}) {
  let url = `${endpoint || voicechat.defaultEndpoint}?model=${model || voicechat.defaultModel}&voice=${voice || voicechat.defaultVoice}`;
  let session = await (await fetch(url)).json();
  let token = session.client_secret?.value || session.client_secret;
  if (!token) throw new Error('Invalid session token');

  let { EventEmitter, pc, attachSpeaker, stop } = await createBackend(debug);
  let events = new EventEmitter();
  let smap = {};
  let fns = {};
  let dc = pc.createDataChannel('oai-events');

  let sysupdate = (kvs, newFns, merge = true) => {
    kvs ??= {};
    for (let [k, v] of Object.entries(kvs)) {
      if (v === null) delete smap[k];
      else smap[k] = v;
    }
    if (newFns) fns = merge ? { ...fns, ...newFns } : newFns;
    for (let [k, v] of Object.entries(fns)) {
      if (!v) delete fns[k];
    }
    if (dc.readyState === 'open') {
      let tools = Object.keys(fns).map(name => ({
        name,
        type: 'function',
        description: fns[name].description || 'No description',
        parameters: fns[name].parameters || {},
      }));
      dc.send(
        JSON.stringify({
          type: 'session.update',
          session: {
            instructions: Object.entries(smap)
              .map(([k, v]) => `${k}: ${v}`)
              .join('\n'),
            tools,
            tool_choice: 'auto',
          },
        }),
      );
    }
  };

  async function prompt(text, polite) {
    if (!globalThis.meSpeak) throw new Error(`meSpeak dependency not loaded`);

    const context = new AudioContext();

    // 1. Get fresh mic stream
    const micStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    const micSource = context.createMediaStreamSource(micStream);

    // 2. Generate meSpeak WAV and decode it
    const p = Promise.withResolvers();
    meSpeak.speak(text, {
      speed: 200,
      rawdata: 'buffer',
      callback: (success, id, wav) => {
        if (!success) return p.reject(new Error(`meSpeak failure`));
        p.resolve(wav);
      },
    });
    const wav = await p.promise;
    const audioBuffer = await context.decodeAudioData(wav);

    // 3. Create fresh synthSource
    const synthSource = context.createBufferSource();
    synthSource.buffer = audioBuffer;

    // 4. Mix mic + synth into a shared destination
    const dest = context.createMediaStreamDestination();
    micSource.connect(dest);
    synthSource.connect(dest);

    // 5. Inject mixed track into outgoing peer connection
    const mixedTrack = dest.stream.getAudioTracks()[0];
    const sender = pc.getSenders().find(s => s.track?.kind === 'audio');
    if (!sender) {
      console.warn('No audio sender found.');
      return;
    }
    await sender.replaceTrack(mixedTrack);

    let monitorStop = null;
    let synthStoppedManually = false;

    // 6. Start synthSource exactly once
    synthSource.start();

    // 7. Mic noise monitoring
    if (polite) {
      monitorStop = monitorMicNoise(context, micStream, async () => {
        debug && console.log('🤫 Mic noise detected during TTS, stopping early.');
        if (!synthStoppedManually) {
          synthStoppedManually = true;
          synthSource.stop(); // triggers onended
        }
      });
    }

    // 8. When TTS ends
    synthSource.onended = async () => {
      if (monitorStop) monitorStop();
      const freshStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const micTrack = freshStream.getAudioTracks()[0];
      if (micTrack && sender) {
        await sender.replaceTrack(micTrack);
      }
      context.close(); // Always clean up your audio context
    };
  }

  // Monitor mic noise with fresh micSource
  function monitorMicNoise(
    audioContext,
    micStream,
    onNoiseDetected,
    threshold = 0.4,
  ) {
    const micSource = audioContext.createMediaStreamSource(micStream);
    const analyser = audioContext.createAnalyser();
    micSource.connect(analyser);
    analyser.fftSize = 512;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    let stopped = false;

    function check() {
      if (stopped) return;
      analyser.getByteFrequencyData(dataArray);
      const average =
        dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
      const normalized = average / 255;
      if (normalized > threshold) {
        stopped = true;
        onNoiseDetected();
      } else {
        requestAnimationFrame(check);
      }
    }

    check();

    return () => {
      stopped = true;
      micSource.disconnect(analyser);
      analyser.disconnect();
      micStream.getTracks().forEach(t => t.stop());
    };
  }

  pc.ontrack = e => {
    let [track] = e.streams[0].getAudioTracks();
    debug && console.log('🎧 Got track:', track.id);
    attachSpeaker?.(track);
  };

  dc.onopen = () => {
    debug && console.log('📱 DataChannel open');
    sysupdate();
  };

  dc.onmessage = async event => {
    let msg = JSON.parse(event.data);
    events.emit(msg.type, msg);
    if (msg.type === 'response.audio_transcript.delta') transcript?.(msg.delta);
    if (
      msg.type === 'response.function_call_arguments.done' &&
      msg.name in fns
    ) {
      let { call_id, arguments: argsJSON } = msg;
      try {
        let args = JSON.parse(argsJSON);
        let handler = fns[msg.name].handler;
        let result = await Promise.resolve(handler(args));
        let respond = result?.respond === undefined ? fns[msg.name].respond : result.respond;
        if (result) delete result.respond;
        dc.send(
          JSON.stringify({
            type: 'conversation.item.create',
            item: {
              type: 'function_call_output',
              call_id,
              output: JSON.stringify(result ?? { success: true }),
            },
          }),
        );
        respond && dc.send(JSON.stringify({ type: 'response.create' }));
      } catch (e) {
        dc.send(
          JSON.stringify({
            type: 'conversation.item.create',
            item: {
              type: 'function_call_output',
              call_id,
              output: JSON.stringify({ success: false, error: e.message }),
            },
          }),
        );
        dc.send(JSON.stringify({ type: 'response.create' }));
        console.error(e);
      }
    }
  };

  let offer = await pc.createOffer();
  await pc.setLocalDescription(offer);

  let sdpRes = await fetch('https://api.openai.com/v1/realtime', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/sdp',
    },
    body: offer.sdp,
  });

  let answer = { type: 'answer', sdp: await sdpRes.text() };
  await pc.setRemoteDescription(answer);

  debug && console.log('✅ Voice session started');

  return { events, stop, sysupdate, prompt };
}

voicechat.defaultEndpoint = '/voicechat';
voicechat.defaultModel = 'gpt-4o-realtime-preview';
voicechat.defaultVoice = 'alloy';

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
    let [newSnap, newMap] = htmlsnap(opt.scope || document.body, { iframes: opt.iframes, idtrack: opt.idtrack, map, llm: true });
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
  mutobs.observe(opt.scope || document.documentElement, {
    attributes: true,
    childList: true,
    subtree: true,
  });
  let ostop = session.stop;
  return {
    ...session,
    get map() { return map },
    stop: () => {
      mutobs.disconnect();
      return ostop.call(session);
    },
  };
}

export { autoassist as default };
