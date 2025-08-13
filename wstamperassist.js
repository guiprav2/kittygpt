import cors from 'cors';
import express from 'express';
import http from 'http';
import voicechat from './voicechat.js';
import { WebSocketServer } from 'ws';

// ------------------------- Config -------------------------
const WS_PORT = 8845;                      // must match TamperMonkey
const HTTP_PORT = process.env.PORT || 8846;
const VOICE_ENDPOINT =
  process.env.VOICE_ENDPOINT ||
  'https://kittygpt.netlify.app/.netlify/functions/voicechat'; // same style as your example

// ------------------------- HTTP (optional helpers) -------------------------
const app = express();
app.use(cors());
const server = http.createServer(app);

// Health & debug endpoints
app.get('/healthz', (_req, res) => res.json({
  ok: true,
  clients: Array.from(clients.keys()),
  activeCid,
}));
app.get('/active/snapshot', (_req, res) => {
  const a = getActive();
  if (!a) return res.status(404).send('No active client');
  res.type('text/html').send(a.html || '');
});

// ------------------------- Voice session -------------------------
const session = await voicechat({
  endpoint: VOICE_ENDPOINT,
  debug: true,
});

// baseline system instruction
await session.sysupdate({
  main:
    `You're KittyGPT TamperAssist, a TamperMonkey-based voice assistant.
     Speak naturally. When you need to act on the page, call the available tools.
     Use the provided htmlsnap ids to target elements precisely.
     If you need to navigate, prefer the navigation tools.`,
});

// ------------------------- WS <-> TamperMonkey state -------------------------
/** Map<cid, { ws, html, fndefs, hidden, lastSeen }> */
const clients = new Map();
let activeCid = null;

const getActive = () => (activeCid ? clients.get(activeCid) : null);

function pickMostRecentVisibleCid() {
  let best = null, ts = -1;
  for (const [cid, entry] of clients.entries()) {
    if (entry.hidden === false && entry.lastSeen > ts) {
      best = cid; ts = entry.lastSeen;
    }
  }
  return best;
}

// Normalize the client-sent function descriptors (handlers are stripped by JSON)
function normalizeFns(raw = {}) {
  const out = {};
  for (const [name, def] of Object.entries(raw)) {
    if (!def) continue;
    if (typeof def === 'object') {
      out[name] = {
        parameters: def.parameters || { type: 'object', properties: {} },
        respond: def.respond !== false,
        description: def.description,
      };
    }
  }
  return out;
}

// Build fns object for session.sysupdate(..., fns)
// Each handler forwards to the *current* active page via WS.
function buildFnsProxyFor(cid) {
  const entry = clients.get(cid);
  if (!entry) return {};
  if (!entry.pending) entry.pending = new Map(); // Map<iid, {resolve,reject,timeoutId}>

  const fndefs = entry.fndefs || {};
  const proxy = {};
  for (const [name, def] of Object.entries(fndefs)) {
    proxy[name] = {
      description: def.description,
      parameters: def.parameters,
      respond: def.respond,
      handler: async (args) => {
        // request/response with iid
        const c = clients.get(cid);
        try {
          if (!c) throw new Error('Client disconnected');
          if (c.ws.readyState !== c.ws.OPEN) throw new Error('Socket not open');

          const iid = randomUUID();

          const resultP = new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
              c.pending.delete(iid);
              reject(new Error(`Timeout waiting for cmdres (iid=${iid})`));
            }, 10_000);
            c.pending.set(iid, { resolve, reject, timeoutId });
          });

          c.ws.send(JSON.stringify({ type: 'cmd', fn: name, args, iid }));

          // Wait for tab's cmdres and pass it back to the model/tool call:
          const payload = await resultP; // { err?, ...res }
          if (payload && payload.err) {
            return { success: false, error: String(payload.err) };
          }
          // spread any additional fields returned by the page tool
          return { success: true, ...(payload || {}) };
        } catch (err) {
          return { success: false, error: err?.message || String(err) };
        }
      },
    };
  }
  return proxy;
}

// Push currently active page snapshot + tools to the voice session.
async function pushActiveToSession() {
  const active = getActive();
  if (!active) {
    // remove page-specific instructions & tools
    await session.sysupdate({ page: null }, {}); // clears "page"
    return;
  }
  const fns = buildFnsProxyFor(activeCid);
  const snap = active.html || '';
  const truncated = snap.length > 40000 ? snap.slice(0, 40000) + '\n<!--(truncated)-->': snap;

  await session.sysupdate({
    // A dedicated "page" instruction keeps the model aware of the current DOM snapshot
    page:
`You are controlling the ACTIVE BROWSER TAB (cid=${activeCid}).
Below is a compact HTML snapshot (htmlsnap ids included) of the *current* page:

${truncated}

Guidance:
- When the user asks to click/tap something, call the 'click' tool with the element's htmlsnap id.
- For typing, call 'fillText' with { htmlsnap, text } (never partial char-by-char).
- For selects, use the specific "select_*" tool with { value }.
- For browser history, use 'navback' or 'navforward'.
- If you can't find an element, ask a clarifying question.`,
  }, fns);
}

// ------------------------- WebSocket server -------------------------
const wss = new WebSocketServer({ port: WS_PORT });
wss.on('connection', (ws) => {
  ws.on('message', (buf) => {
    let data;
    try { data = JSON.parse(buf.toString('utf8')); } catch { return; }
    const { cid, type } = data || {};
    if (!cid) return;

    if (!clients.has(cid)) {
      clients.set(cid, { ws, html: '', fndefs: {}, hidden: true, lastSeen: Date.now() });
      activeCid = cid;
      console.log('[active] ->', activeCid ?? 'none');
    }
    const entry = clients.get(cid);
    entry.ws = ws; // refresh socket
    entry.lastSeen = Date.now();

    if (type === 'snap') {
      entry.html = data.html || '';
      entry.fndefs = normalizeFns(data.fns || {});
      if (cid === activeCid) pushActiveToSession();
    }

    if (type === 'visibilitychange') {
      entry.hidden = !!data.hidden;
      if (entry.hidden === false) {
        activeCid = cid;                   // this tab is now the active control target
        pushActiveToSession();
        console.log('[active] ->', activeCid);
      } else if (cid === activeCid) {
        activeCid = pickMostRecentVisibleCid();
        pushActiveToSession();
        console.log('[active] ->', activeCid ?? 'none');
      }
    }
  });

  ws.on('close', () => {
    for (const [cid, entry] of clients.entries()) {
      if (entry.ws === ws) {
        clients.delete(cid);
        if (activeCid === cid) {
          activeCid = pickMostRecentVisibleCid();
          pushActiveToSession();
          console.log('[active] ->', activeCid ?? 'none (after close)');
        }
      }
    }
  });
});

// ------------------------- Boot -------------------------
server.listen(HTTP_PORT, () =>
  console.log(`HTTP up on http://localhost:${HTTP_PORT}`)
);
console.log(`WS up on ws://localhost:${WS_PORT}/`);
