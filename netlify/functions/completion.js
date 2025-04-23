import lambdaroll from '../lambdaroll.js';
import midcompletion from '../../middleware/completion.js';
export default lambdaroll(midcompletion, JSON.parse(process.env.CORS || 0));
