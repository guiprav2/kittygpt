import { Writable } from 'stream';

function lambdaroll(middleware, cors = false) {
  return async function handler(req) {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const url = new URL(req.url);
    const method = req.method;
    const headers = Object.fromEntries(req.headers.entries());
    const rawBody = method === 'POST' ? await req.arrayBuffer() : null;

    const mockReq = {
      method,
      url: url.pathname,
      headers,
      get: (key) => headers[key.toLowerCase()],
      body: rawBody ? JSON.parse(decoder.decode(rawBody)) : null,
      query: Object.fromEntries(url.searchParams.entries())
    };

    let status = 200;
    let headersToSend = {};
    let chunks = [];
    let endPromise = Promise.withResolvers();

    if (cors) {
      Object.assign(headersToSend, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      });
    }

    class MockRes extends Writable {
      _write(chunk, _encoding, callback) {
        if (typeof chunk === 'string') {
          chunks.push(encoder.encode(chunk));
        } else if (chunk instanceof Uint8Array) {
          chunks.push(chunk);
        } else {
          chunks.push(encoder.encode(String(chunk)));
        }
        callback();
      }
      status(code) {
        status = code;
        return this;
      }
      setHeader(key, value) {
        headersToSend[key] = value;
      }
      getHeader(key) {
        return headersToSend[key];
      }
      removeHeader(key) {
        delete headersToSend[key];
      }
      json(obj) {
        chunks.push(encoder.encode(JSON.stringify(obj)));
        endPromise.resolve();
        return this;
      }
      send(data) {
        if (typeof data === 'object' && !(data instanceof Uint8Array)) {
          chunks.push(encoder.encode(JSON.stringify(data)));
        } else if (typeof data === 'string') {
          chunks.push(encoder.encode(data));
        } else {
          chunks.push(data);
        }
        endPromise.resolve();
        return this;
      }
      end(data) {
        if (data) this.write(data, () => {});
        endPromise.resolve();
        return this;
      }
    }

    const mockRes = new MockRes();
    await middleware(mockReq, mockRes);
    await endPromise.promise;

    const totalLength = chunks.reduce((acc, c) => acc + c.length, 0);
    const resultBuffer = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      resultBuffer.set(chunk, offset);
      offset += chunk.length;
    }

    return new Response(resultBuffer, { status, headers: headersToSend });
  };
}

export default lambdaroll;
