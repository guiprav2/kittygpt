import { Readable } from 'stream';

async function midcompletion(req, res) {
  try {
    if (req.method !== 'GET') return res.status(405).end();
    let file = req.url.split('/').at(-1);
    let wr = await fetch(`${process.env.GITHUB_PROJECT_WIKI_ENDPOINT}/${file}`);
    Readable.fromWeb(wr.body).pipe(res);
  } catch (err) {
    console.error('midwiki error:', err);
    res.status(500).json({ error: 'Internal proxy error' });
  }
}

export default midcompletion;
