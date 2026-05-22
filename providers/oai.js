// providers/oai.js
import base from './responses-api.js';
export default {
  ...base,
  endpoint: 'https://api.openai.com/v1/responses',
  modelsEndpoint: 'https://api.openai.com/v1/models',
  get key() { return globalThis.process?.env?.OPENAI_API_KEY; },
};
