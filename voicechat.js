let tap = x => (console.log(x), x);
let isBrowser = typeof window !== 'undefined' && typeof navigator !== 'undefined';
async function createBackend(debug) { return isBrowser ? await createBrowserBackend(debug) : await createNodeBackend(debug) }

async function createBrowserBackend() {
  let RTCPeerConnection = window.RTCPeerConnection;
  let pc = new RTCPeerConnection();
  let audio = new Audio();
  audio.autoplay = true;
  let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  stream.getAudioTracks().forEach(track => pc.addTrack(track, stream));
  let attachSpeaker = (track) => {
    if (!audio.srcObject) {
      let remoteStream = new MediaStream([track]);
      audio.srcObject = remoteStream;
    }
  };
  return { pc, attachSpeaker, stop: () => stream.getTracks().forEach(track => track.stop()) };
}

async function createNodeBackend(debug = false) {
  const wrtc = (await import('wrtc')).default;
  const { RTCPeerConnection, nonstandard } = wrtc;
  const { RTCAudioSource, RTCAudioSink } = nonstandard;
  const Speaker = (await import('speaker')).default;
  const mic = (await import('mic')).default;

  const pc = new RTCPeerConnection();
  const source = new RTCAudioSource();
  const track = source.createTrack();
  pc.addTrack(track);

  const micInstance = mic({ rate: '16000', channels: '1', debug: false, device: 'default' });
  const micStream = micInstance.getAudioStream();
  micInstance.start();
  let micBuffer = Buffer.alloc(0);

  micStream.on('data', (chunk) => {
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
        numberOfFrames: 160
      });
    }
  });

  let sink = null;
  let speaker = null;

  const attachSpeaker = (track) => {
    sink = new RTCAudioSink(track);
    const knownRates = [48000, 44100, 32000, 24000, 16000];

    sink.ondata = ({ samples }) => {
      if (samples.length < 480) return;
      if (!speaker) {
        const match = knownRates.find(rate =>
          [0.01, 0.02, 0.03, 0.04].some(d => Math.round(rate * d) === samples.length)
        );
        if (!match) {
          throw new Error(`Unable to determine sample rate from samples.length = ${samples.length}`);
        }
        debug && console.log("📐 Speaker initialized. Detected sampleRate:", match);
        speaker = new Speaker({
          channels: 1,
          bitDepth: 16,
          sampleRate: match,
          signed: true
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
      console.warn("Failed to stop sink cleanly:", e);
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

  return { pc, attachSpeaker, stop };
}

export async function voicechat({ endpoint, model, voice, transcript, fns = {}, debug = false } = {}) {
  let url = `${endpoint || voicechat.defaultEndpoint}?model=${model || voicechat.defaultModel}&voice=${voice || voicechat.defaultVoice}`;
  let session = await (await fetch(url)).json();
  let token = session.client_secret?.value || session.client_secret;
  if (!token) throw new Error("Invalid session token");

  let smap = {};
  let { pc, attachSpeaker, stop } = await createBackend(debug);
  let dc = pc.createDataChannel("oai-events");

  let sysupdate = (kvs = {}) => {
    for (let [k, v] of Object.entries(kvs)) {
      if (v === null) delete smap[k];
      else smap[k] = v;
    }
    if (dc.readyState === "open") {
      let tools = Object.keys(fns).map(name => ({
        name,
        type: "function",
        description: fns[name].description || "No description",
        parameters: fns[name].parameters || {}
      }));
      dc.send(JSON.stringify({
        type: "session.update",
        session: {
          instructions: Object.entries(smap).map(([k, v]) => `${k}: ${v}`).join("\n"),
          tools,
          tool_choice: "auto"
        }
      }));
    }
  };

  let setfns = (newFns) => {
    fns = newFns;
    sysupdate();
  };

  async function prompt(text) {
    const context = new AudioContext();

    // 1. Get mic and create a source
    const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
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

    // 3. Create meSpeak audio source
    const synthSource = context.createBufferSource();
    synthSource.buffer = audioBuffer;

    // 4. Mix mic + synth into a shared destination
    const dest = context.createMediaStreamDestination();
    micSource.connect(dest);
    synthSource.connect(dest);

    // 5. Start the synth source
    synthSource.start();

    // 6. Inject the mixed track into the outgoing peer connection
    const mixedTrack = dest.stream.getAudioTracks()[0];
    const sender = pc.getSenders().find(s => s.track?.kind === 'audio');
    if (sender) {
      await sender.replaceTrack(mixedTrack);
    } else {
      console.warn("No audio sender found.");
    }

    // 7. After synth finishes, revert to clean mic
    synthSource.onended = async () => {
      const freshStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const micTrack = freshStream.getAudioTracks()[0];
      if (micTrack && sender) {
        await sender.replaceTrack(micTrack);
      }
    };
  }

  pc.ontrack = (e) => {
    let [track] = e.streams[0].getAudioTracks();
    debug && console.log("🎧 Got track:", track.id);
    attachSpeaker?.(track);
  };

  dc.onopen = () => {
    debug && console.log("📱 DataChannel open");
    sysupdate();
  };

  dc.onmessage = async (event) => {
    let msg = JSON.parse(event.data);
    if (msg.type === "response.audio_transcript.delta") transcript?.(msg.delta);
    if (msg.type === "response.function_call_arguments.done" && msg.name in fns) {
      let { call_id, arguments: argsJSON } = msg;
      try {
        let args = JSON.parse(argsJSON);
        let handler = fns[msg.name].handler;
        let result = await Promise.resolve(handler(args));
        dc.send(JSON.stringify({
          type: "conversation.item.create",
          item: {
            type: "function_call_output",
            call_id,
            output: JSON.stringify(result ?? { success: true })
          }
        }));
        dc.send(JSON.stringify({ type: "response.create" }));
      } catch (e) {
        dc.send(JSON.stringify({
          type: "conversation.item.create",
          item: {
            type: "function_call_output",
            call_id,
            output: JSON.stringify({ success: false, error: e.message }),
          }
        }));
        dc.send(JSON.stringify({ type: "response.create" }));
        console.error(e);
      }
    }
  };

  let offer = await pc.createOffer();
  await pc.setLocalDescription(offer);

  let sdpRes = await fetch("https://api.openai.com/v1/realtime", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/sdp"
    },
    body: offer.sdp
  });

  let answer = { type: "answer", sdp: await sdpRes.text() };
  await pc.setRemoteDescription(answer);

  debug && console.log("✅ Voice session started");

  return { stop, sysupdate, setfns, prompt };
}

voicechat.defaultEndpoint = '/voicechat';
voicechat.defaultModel = 'gpt-4o-realtime-preview';
voicechat.defaultVoice = 'alloy';

export default voicechat;
