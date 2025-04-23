import lambdaroll from '../lambdaroll.js';
import midcompletion from '../../middleware/completion.js';
export default lambdaroll(midcompletion, true);
