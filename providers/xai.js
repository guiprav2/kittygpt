// providers/xai.js
import base from './responses-api.js';
export default {
  ...base,
  endpoint: 'https://api.x.ai/v1/responses',
  modelsEndpoint: 'https://api.x.ai/v1/models',
  get key() { return globalThis.process?.env?.XAI_KEY; },
};
