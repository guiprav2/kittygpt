import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import midcompletion from './middleware/completion.js';
import midvoicechat from './middleware/voicechat.js';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
dotenv.config();
let app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(dirname(fileURLToPath(import.meta.url)), 'public')));
app.post('/completion', midcompletion);
app.get('/voicechat', midvoicechat);
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`KittyGPT server running at http://localhost:${port}`);
});
