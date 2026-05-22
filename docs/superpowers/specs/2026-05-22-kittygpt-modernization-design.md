# KittyGPT Modernization Design

**Date:** 2026-05-22  
**Status:** Approved

## Overview

Bring KittyGPT up to current agentic standards. Four areas of work, in priority order:

1. `completion.js` — provider/core split, parallel tool execution, narration callback, subagents
2. `voicechat.js` — full GA Realtime API migration, new model support, `inject()` API
3. `kitty-cli.js` — narration rendering, subagent progress display, stream check cleanup
4. Anthropic provider (nice-to-have, tackled after the above)

`/buddy` (cross-session user memory) is noted as future work and explicitly out of scope here.

---

## Section 1 — File layout

```
providers/
  responses-api.js   # Base Responses API impl (fmt/defmt/stream) — shared by oai + xai
  oai.js             # OpenAI: endpoint + key config, re-exports base
  xai.js             # xAI: endpoint + key config, re-exports base
  oail.js            # OpenAI Chat Completions legacy: self-contained
  anthropic.js       # (later)
core.js              # Main loop + runTools() + spawnAgent()
completion.js        # Entry point: resolves provider, calls core, re-exports helpers
voicechat.js         # Rewritten for GA Realtime API
middleware/
  voicechat.js       # Updated: /v1/realtime/client_secrets instead of /v1/realtime/sessions
kitty-cli.js         # Updated: narration callback, subagent display, stream check cleanup
```

`oai` and `xai` are currently byte-for-byte identical in fmt/defmt/stream — they both use the Responses API format, differing only in endpoint URL and env key. `responses-api.js` eliminates that duplication. `oail` stays self-contained since it uses the Chat Completions format and a different streaming parser.

`completion.js` stays the public entry point with the same `completion(logs, opts)` signature — no breaking changes for existing callers.

---

## Section 2 — Provider interface

Each provider exports a plain object:

```js
{
  endpoint: string,
  modelsEndpoint: string,
  key: string,

  fmt(item) → object | object[],         // internal → wire format (outgoing msgs array)
  defmt(item) → object,                  // wire → internal format (parsing responses)

  buildPayload(msgs, preamble, opts) → object,  // full fetch body (tools, instructions, reasoning, etc.)
  buildHeaders(opts) → object,                  // auth + provider-specific headers

  stream(body, callbacks) → Promise<void>,
  // callbacks: { text(kind, chunk), reasoning(kind, chunk), tool(call), done() }

  supportsStreamingWithTools: boolean,    // false for oail (streaming + tools is unsupported in Chat Completions); core.js forces non-streaming when tools are present and this is false
}
```

`fmtc`/`defmtc` are private helpers within each provider file — not part of the interface `core.js` touches.

`oai.js` and `xai.js` import `responses-api.js` and re-export with their own `endpoint`, `modelsEndpoint`, and `key` — essentially one-liner config files. `oail.js` implements the full interface independently.

`buildPayload` and `buildHeaders` move provider-specific payload assembly out of the monolithic loop. This is where `oai` puts `instructions:` and `include:`, `oail` injects a system message, etc. `core.js` calls `provider.buildPayload(msgs, preamble, opts)` and ships it.

---

## Section 3 — Core loop & tool runner

### `runTools(calls, toolset, opts)`

Single function replacing the scattered `for (let call of internal.calls)` loops across both the streaming and non-streaming paths:

```js
async function runTools(calls, toolset, opts) {
  const execute = async call => {
    try {
      if (call.name === 'define_tool')  return await opts.metanull?.({ ... })
      if (toolset?.[call.name]?.meta)   return await opts.metainvoke?.(call.name, call.args)
      if (call.name === 'spawn_agent')  return await spawnAgent(call.args, opts)
      return await toolset?.[call.name]?.handler?.(call.args)
    } catch (err) {
      return { success: false, error: err.toString() }
    }
  }
  return Promise.all(calls.map(execute))
}
```

All calls in a batch execute in parallel via `Promise.all`. `spawn_agent` is a built-in case, not injected via the tools dict, enabled when `opts.subagents` is true. When enabled, `buildPayload` in each provider appends the `spawn_agent` tool schema to `toolDefs` so the LLM knows it exists.

### `spawnAgent(args, parentOpts)`

Calls `completion()` recursively with a fresh thread. Inherits parent model/tools/instructions, all overridable via args. Returns the final assistant text. Because `runTools` uses `Promise.all`, multiple `spawn_agent` calls in the same batch run concurrently.

```js
async function spawnAgent({ prompt, instructions, model }, parentOpts) {
  parentOpts.subagent?.(prompt)  // notify caller before dispatch
  let subLogs = [{ role: 'user', content: prompt }]
  let [resultLogs] = await completion(subLogs, {
    ...parentOpts,
    model: model || parentOpts.model,
    instructions: instructions || parentOpts.instructions,
  })
  let last = resultLogs.at(-1)
  return last?.content?.join?.('\n') || 'No response'
}
```

### Narration handling

**Invariant:** text emitted in a batch that also had tool calls is a narration; text with no tool calls is a final response.

Both streaming and non-streaming paths track `toolsInvoked` per iteration. After each batch:

```
text && toolsInvoked  → push to logs as assistant msg, fire opts.narration(text), continue
text && !toolsInvoked → push to logs, fire opts.text('done'), return
!text && toolsInvoked → continue (silent tool loop — current behavior, unchanged)
```

Narration messages are pushed to `logs` and `msgs` so the LLM sees its own note in context on the next call. They're surfaced to the caller via `opts.narration` rather than `opts.text`.

---

## Section 4 — `voicechat.js` GA migration

### Endpoints

| | Beta (current) | GA (new) |
|---|---|---|
| Token | `POST /v1/realtime/sessions` | `POST /v1/realtime/client_secrets` |
| SDP | `POST https://api.openai.com/v1/realtime` (raw SDP body) | `POST https://api.openai.com/v1/realtime/calls` (FormData: SDP + session config) |
| Beta header | `OpenAI-Beta: realtime=v1` | Removed |

The GA `/v1/realtime/calls` endpoint collapses the old two-step (create session, then send SDP separately) into one call. Initial session config (model, voice, session.type, instructions, tools) is sent alongside the SDP offer in the FormData POST. `sysupdate()` still exists and still sends `session.update` over the DataChannel for dynamic updates after connection (tool registration changes, instruction updates mid-session) — it just no longer needs to fire on `dc.onopen` for the initial config.

### Session config shape

`session.update` gains `session.type` and moves audio output config under `session.audio.output`. `sysupdate()` updated to emit the correct GA shape.

### `prompt()` → `inject(text)`

The meSpeak + WebAudio mixing hack is removed entirely and replaced:

```js
function inject(text) {
  dc.send(JSON.stringify({
    type: 'conversation.item.create',
    item: { type: 'message', role: 'user', content: [{ type: 'input_text', text }] }
  }))
  dc.send(JSON.stringify({ type: 'response.create' }))
}
```

`inject` is added to the returned API object. `prompt` is removed. `monitorMicNoise` and related WebAudio plumbing go with it.

### New model support

| Model | Endpoint | Notes |
|---|---|---|
| `gpt-realtime-2` | `/v1/realtime/calls` | Adds `reasoning.effort` to session config; `voice` required |
| `gpt-realtime-translate` | `/v1/realtime/translations` | Dedicated endpoint; `voice` omitted; target language in session config |
| `gpt-realtime-whisper` | `/v1/realtime/calls` | Transcription-only; no audio output; `voice` omitted |

`voicechat()` detects the model and routes accordingly — translate uses a different base URL, whisper gets a stripped-down session config.

### Node.js backend

`wrtc` → `@roamhq/wrtc`. Drop-in maintained fork, import paths identical, no logic changes.

---

## Section 5 — `kitty-cli.js` updates

### Narration callback

```js
narration: text => {
  process.stdout.write('\n\x1b[2m' + text + '\x1b[0m\n')  // dimmed
},
```

Narrations print inline, dimmed, before tool calls fire. Final responses render at full brightness. Visual weight difference alone is sufficient signal — no prefix needed.

### Subagent display

A new `opts.subagent` callback fires before each `spawnAgent()` dispatch:

```js
subagent: prompt => {
  let preview = prompt.slice(0, 60).replace(/\n/g, ' ')
  process.stdout.write('\n\x1b[2m↳ subagent: ' + preview + '…\x1b[0m\n')
},
```

Parallel subagents print their preview lines together before any results come back.

### Stream check cleanup

The current `if (opts.stream && !kittyst.options.model.startsWith('oai:'))` guard is removed from the CLI. `core.js` consults `provider.supportsStreamingWithTools` instead — if false and tools are present, it silently downgrades to non-streaming for that iteration. The CLI no longer needs to know about provider capabilities.

---

## Out of scope (this pass)

- **Anthropic provider** — nice-to-have, next after this work ships
- **`/buddy`** — cross-session user memory, future work
