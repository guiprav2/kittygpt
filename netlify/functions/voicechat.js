import lambdaroll from '../lambdaroll.js';
import midvoicechat from '../../middleware/voicechat.js';
export default lambdaroll(midvoicechat, JSON.parse(process.env.CORS || 0));
