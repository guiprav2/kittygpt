import { test, expect } from '@playwright/test';
import completion from '../completion.js';

test.describe('Completion API', () => {
  let endpoint = 'http://localhost:3000/completion';

  test('should return a simple text response', async () => {
    const res = await completion(
      [{ role: 'user', content: 'Say meow!' }],
      { endpoint }
    );
    expect(res.content.toLowerCase()).toContain('meow');
  });

  test('should return a streaming text response', async () => {
    let buf = '';
    const res = await completion(
      [{ role: 'user', content: 'Say meow!' }],
      { endpoint, stream: x => buf += x }
    );
    expect(buf.toLowerCase()).toContain('meow');
  });

  test('should invoke a function call automatically', async () => {
    let calledArgs = null;
    const res = await completion(
      [{ role: 'user', content: 'Select the blue button' }],
      {
        endpoint,
        fns: {
          selectButton: {
            parameters: {
              type: 'object',
              properties: {
                color: { type: 'string' },
              },
              required: ['color'],
            },
            handler: async ({ color }) => {
              calledArgs = color;
              return { success: true };
            },
          },
        },
      }
    );
    expect(calledArgs).toBeDefined();
    expect(typeof calledArgs).toBe('string');
  });

  test('should handle structured outputs', async () => {
    const res = await completion(
      [{ role: 'user', content: 'Purr for me like a cat. Keep it short.' }],
      {
        endpoint: 'http://localhost:3000/completion',
        format: {
          type: 'json_schema',
          schema: {
            "name": "answer",
            "strict": true,
            "schema": {
              "type": "object",
              "properties": {
                "answer": { "type": "string" }
              },
              "required": ["answer"],
              "additionalProperties": false
            }
          },
        },
      }
    );
    expect(JSON.parse(res.content).answer).toMatch(/pu?rr/i);
  });

  test('should respect a system prompt', async () => {
    const res = await completion(
      [{ role: 'user', content: 'What are you?' }],
      {
        endpoint: 'http://localhost:3000/completion',
        sysmsg: `You are a cat assistant. Pretend you're a cat in your responses. E.g. say "meow".`,
      }
    );
    expect(res.content.toLowerCase()).toContain('meow');
  });

  test('should remap custom roles correctly', async () => {
    const res = await completion(
      [
        { role: 'cat_user', content: 'Translate this to French: Hello' },
        { role: 'cat_assistant', content: 'Bonjour' },
        { role: 'cat_user', content: 'Now purr for me. Keep it short.' },
      ],
      {
        endpoint: 'http://localhost:3000/completion',
        rolemap: { cat_user: 'user', cat_assistant: 'assistant' },
      }
    );
    expect(res.content.toLowerCase()).toContain('purr');
  });

  test('should retry sending completion until function_call is returned', async () => {
    let callCount = 0;
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (url, options) => {
      callCount++;
      if (callCount < 3) {
        return {
          ok: true,
          headers: { get: () => 'application/json' },
          json: async () => ({
            choices: [{ message: { role: 'assistant', content: `Hmm, I'm not sure.` } }],
          }),
        };
      } else {
        return {
          ok: true,
          headers: { get: () => 'application/json' },
          json: async () => ({
            choices: [{
              message: {
                role: 'assistant',
                function_call: {
                  name: 'sampleFunction',
                  arguments: '{}',
                },
              },
            }],
          }),
        };
      }
    };
    let wasCalled = false;
    const result = await completion(
      [{ role: 'user', content: 'Do the thing!' }],
      {
        call: 'force',
        fns: {
          sampleFunction: {
            handler: async () => {
              wasCalled = true;
              return { success: true };
            },
          },
        },
      }
    );
    globalThis.fetch = originalFetch;
    expect(wasCalled).toBe(true);
    expect(callCount).toBe(3); // 2 failures + 1 success
  });

  test('should use a custom logger function', async () => {
    let logged = false;

    const res = await completion(
      [{ role: 'user', content: 'Tell me a secret.' }],
      {
        endpoint: 'http://localhost:3000/completion',
        logger: logs => {
          logged = true;
          expect(Array.isArray(logs)).toBe(true);
        },
      }
    );
    expect(logged).toBe(true);
  });

  test('should fail gracefully on invalid key', async () => {
    let errorCaught = null;
    try {
      await completion(
        [{ role: 'user', content: 'Are you there?' }],
        {
          endpoint: 'http://localhost:3000/completion',
          key: 'shortkey',
        }
      );
    } catch (e) {
      errorCaught = e;
    }
    expect(errorCaught).toBeTruthy();
    expect(errorCaught.message).toContain('Invalid key');
  });
});
