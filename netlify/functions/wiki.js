import lambdaroll from '../lambdaroll.js';
import midwiki from '../../middleware/wiki.js';
export default lambdaroll(midwiki, JSON.parse(process.env.CORS || 0));
