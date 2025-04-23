import { Readable } from 'stream';

async function midcompletion(req, res) {
  try {
    if (req.method !== 'POST') return res.status(405).end();
    let ckey = req.get('Authorization');
    let skey = process.env.OPENAI_API_KEY;
    let bearer = ckey || (skey ? `Bearer ${skey}` : null);
    if (!bearer) return res.status(401).json({ error: 'No API key provided' });
    let cr = await fetch(process.env.OPENAI_API_COMPLETIONS_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: bearer,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body),
    });
    if (cr.headers.get('content-type')?.includes?.('text/event-stream')) {
      res.status(cr.status);
      for (let [k, v] of cr.headers) k.toLowerCase() !== 'content-length' && res.setHeader(k, v);
      Readable.fromWeb(cr.body).pipe(res);
    } else {
      cr.json().then(json => res.status(cr.status).json(json));
    }
  } catch (err) {
    console.error('midcompletion error:', err);
    res.status(500).json({ error: 'Internal proxy error' });
  }
}

export default midcompletion;
