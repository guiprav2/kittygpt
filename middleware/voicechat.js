async function midvoicechat(req, res) {
  try {
    let ckey = req.get('Authorization');
    let skey = process.env.OPENAI_API_KEY;
    let bearer = ckey || (skey ? `Bearer ${skey}` : null);
    if (!bearer) return res.status(401).json({ error: 'No API key provided' });
    let { model, voice } = req.query;
    if (!model) return res.status(400).send(`Missing model query`); // FIXME: Consolidate both
    if (!voice) return res.status(400).send(`Missing voice query`);
    let sr = await fetch(process.env.OPENAI_API_VOICECHAT_ENDPOINT, {
      method: 'POST',
      headers: { 'Authorization': bearer, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, voice })
    })
    let json = await sr.json();
    if (!sr.ok) {
      console.error("OpenAI error:", json);
      return res.status(sr.status).json(json);
    }
    res.json(json);
  } catch (err) {
    console.error('midvoicechat error:', err);
    res.status(500).json({ error: 'Failed to get voicechat token' });
  }
}

export default midvoicechat;
