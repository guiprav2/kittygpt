let isBrowser = typeof window !== 'undefined' && typeof navigator !== 'undefined';

async function createBackend(debug) {
  return isBrowser ? createBrowserBackend(debug) : createNodeBackend(debug);
}

async function createBrowserBackend() {
  let EventEmitter = (await import('https://esm.sh/event-emitter')).default;
  let pc = new RTCPeerConnection();
  let audio = new Audio();
  audio.autoplay = true;
  let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  stream.getAudioTracks().forEach(track => pc.addTrack(track, stream));
  let attachSpeaker = track => {
    if (!audio.srcObject) audio.srcObject = new MediaStream([track]);
  };
  return {
    EventEmitter, pc, attachSpeaker,
    stop: () => {
      stream.getTracks().forEach(t => t.stop());
      pc.getSenders().forEach(s => pc.removeTrack(s));
      pc.close();
      audio.srcObject = null;
    },
  };
}

async function createNodeBackend(debug = false) {
  let EventEmitter = (await import('events')).default;
  let { RTCPeerConnection, nonstandard } = (await import('@roamhq/wrtc')).default;
  let { RTCAudioSource, RTCAudioSink } = nonstandard;
  let Speaker = (await import('speaker')).default;
  let mic = (await import('mic')).default;

  let pc = new RTCPeerConnection();
  let source = new RTCAudioSource();
  let track = source.createTrack();
  pc.addTrack(track);

  let micInstance = mic({ rate: '16000', channels: '1', debug: false, device: 'default' });
  let micStream = micInstance.getAudioStream();
  micInstance.start();
  let micBuffer = Buffer.alloc(0);

  micStream.on('data', chunk => {
    micBuffer = Buffer.concat([micBuffer, chunk]);
    while (micBuffer.length >= 320) {
      let frame = micBuffer.slice(0, 320);
      micBuffer = micBuffer.slice(320);
      let buf = Buffer.alloc(320);
      frame.copy(buf);
      source.onData({ samples: buf, sampleRate: 16000, bitsPerSample: 16, channelCount: 1, numberOfFrames: 160 });
    }
  });

  let sink = null;
  let speaker = null;
  let knownRates = [48000, 44100, 32000, 24000, 16000];

  let attachSpeaker = t => {
    sink = new RTCAudioSink(t);
    sink.ondata = ({ samples }) => {
      if (samples.length < 480) return;
      if (!speaker) {
        let match = knownRates.find(rate => [0.01, 0.02, 0.03, 0.04].some(d => Math.round(rate * d) === samples.length));
        if (!match) throw new Error(`Unable to determine sample rate from samples.length = ${samples.length}`);
        debug && console.log('📐 Speaker initialized. Detected sampleRate:', match);
        speaker = new Speaker({ channels: 1, bitDepth: 16, sampleRate: match, signed: true });
      }
      speaker.write(Buffer.from(samples.buffer));
    };
  };

  let stop = () => {
    try { sink?.stop?.(); sink?.removeAllListeners?.(); } catch {}
    try { micStream?.removeAllListeners?.('data'); } catch {}
    try { speaker?.end?.(); } catch {}
    try { pc.getSenders().forEach(s => pc.removeTrack(s)); pc.close(); } catch {}
    return micInstance.stop();
  };

  return { EventEmitter, pc, attachSpeaker, stop };
}

function buildSessionConfig(model, voice, opts = {}) {
  let isTranslate = model.includes('translate');
  let isWhisper = model.includes('whisper');

  let session = {
    type: isTranslate ? 'translation' : isWhisper ? 'transcription' : 'realtime',
  };

  if (!isWhisper && !isTranslate && voice) session.voice = voice;
  if (opts.reasoning) session.reasoning = opts.reasoning;
  if (opts.targetLanguage) session.target_language = opts.targetLanguage;

  return session;
}

export async function voicechat({
  endpoint,
  model,
  voice,
  transcript,
  debug = false,
  reasoning,
  targetLanguage,
} = {}) {
  let resolvedModel = model || voicechat.defaultModel;
  let resolvedVoice = voice || voicechat.defaultVoice;
  let isTranslate = resolvedModel.includes('translate');

  let url = `${endpoint || voicechat.defaultEndpoint}?model=${resolvedModel}` +
    (!resolvedModel.includes('whisper') && !isTranslate ? `&voice=${resolvedVoice}` : '');
  let session = await (await fetch(url)).json();
  let token = session.client_secret?.value || session.client_secret;
  if (!token) throw new Error('Invalid session token');

  let { EventEmitter, pc, attachSpeaker, stop } = await createBackend(debug);
  let events = new EventEmitter();
  let smap = {};
  let fns = {};

  let offer = await pc.createOffer();
  await pc.setLocalDescription(offer);

  let sessionConfig = buildSessionConfig(resolvedModel, resolvedVoice, { reasoning, targetLanguage });
  let sdpEndpoint = isTranslate
    ? 'https://api.openai.com/v1/realtime/translations'
    : 'https://api.openai.com/v1/realtime/calls';

  let formData = new FormData();
  formData.append('sdp', new Blob([offer.sdp], { type: 'application/sdp' }));
  formData.append('session', new Blob([JSON.stringify(sessionConfig)], { type: 'application/json' }));

  let sdpRes = await fetch(sdpEndpoint, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token },
    body: formData,
  });

  let answer = { type: 'answer', sdp: await sdpRes.text() };
  await pc.setRemoteDescription(answer);

  let dc = pc.createDataChannel('oai-events');

  let sysupdate = (kvs, newFns, merge = true) => {
    kvs ??= {};
    for (let [k, v] of Object.entries(kvs)) {
      if (v === null) delete smap[k];
      else smap[k] = v;
    }
    if (newFns) fns = merge ? { ...fns, ...newFns } : newFns;
    for (let [k, v] of Object.entries(fns)) { if (!v) delete fns[k]; }

    if (dc.readyState === 'open') {
      let tools = Object.keys(fns).map(name => ({
        name, type: 'function',
        description: fns[name].description || 'No description',
        parameters: fns[name].parameters || {},
      }));
      dc.send(JSON.stringify({
        type: 'session.update',
        session: {
          instructions: Object.entries(smap).map(([k, v]) => `${k}: ${v}`).join('\n'),
          audio: { output: {} },
          tools,
          tool_choice: 'auto',
        },
      }));
    }
  };

  function inject(text) {
    dc.send(JSON.stringify({
      type: 'conversation.item.create',
      item: { type: 'message', role: 'user', content: [{ type: 'input_text', text }] },
    }));
    dc.send(JSON.stringify({ type: 'response.create' }));
  }

  pc.ontrack = e => {
    let [track] = e.streams[0].getAudioTracks();
    debug && console.log('🎧 Got track:', track.id);
    attachSpeaker?.(track);
  };

  dc.onopen = () => debug && console.log('📱 DataChannel open');

  dc.onmessage = async event => {
    try {
      let msg = JSON.parse(event.data);
      events.emit(msg.type, msg);

      if (msg.type === 'response.audio_transcript.delta') transcript?.(msg.delta);

      if (msg.type === 'response.function_call_arguments.done' && msg.name in fns) {
        let { call_id, arguments: argsJSON } = msg;
        try {
          let args = JSON.parse(argsJSON);
          let result = await Promise.resolve(fns[msg.name].handler(args));
          let respond = (result?.respond === undefined ? fns[msg.name].respond : result.respond) ?? true;
          if (result) delete result.respond;
          dc.send(JSON.stringify({
            type: 'conversation.item.create',
            item: { type: 'function_call_output', call_id, output: JSON.stringify(result ?? { success: true }) },
          }));
          respond && dc.send(JSON.stringify({ type: 'response.create' }));
        } catch (e) {
          dc.send(JSON.stringify({
            type: 'conversation.item.create',
            item: { type: 'function_call_output', call_id, output: JSON.stringify({ success: false, error: e.message }) },
          }));
          dc.send(JSON.stringify({ type: 'response.create' }));
          console.error(e);
        }
      }
    } catch (err) {
      console.error(err);
      console.error('Payload:', event.data);
    }
  };

  debug && console.log('✅ Voice session started');

  let micTrack = null;
  let pauseListening = () => {
    try {
      micTrack ??= pc.getSenders().find(s => s.track?.kind === 'audio')?.track;
      if (micTrack) micTrack.enabled = false;
    } catch {}
  };
  let resumeListening = () => {
    try {
      micTrack ??= pc.getSenders().find(s => s.track?.kind === 'audio')?.track;
      if (micTrack) micTrack.enabled = true;
    } catch {}
  };

  return { events, stop, sysupdate, inject, pauseListening, resumeListening };
}

voicechat.defaultEndpoint = '/voicechat';
voicechat.defaultModel = 'gpt-realtime-2';
voicechat.defaultVoice = 'cedar';

export default voicechat;
