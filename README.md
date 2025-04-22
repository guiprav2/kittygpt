# 🐈‍⬛ kittygpt

A friendly, minimalist, fully-featured ChatGPT completion library.

- Tiny, isomorphic, no dependencies.
- Streaming, function calling, retries, system message handling.
- No classes. No setup. Just clean calls and smooth purrs.

Built because the official SDK fell short.  
Published under GPL because software should be free.

---

## ✨ Features

- `completion(logs, opt = {})` — one function to rule them all.
- `opt.stream` support (token-by-token callbacks).
- `opt.call` function call support (including force-mode retries).
- Optional logging (`opt.logger`).
- Sensible defaults, clean override options.
- Utilities for preparing logs and parsing streamed responses.
- Role remapping for nonstandard message logs (`opt.rolemap`)

---

## 🚀 Quick Example

```html
<body>
  <script type="module">
    import completion from 'https://esm.sh/@camilaprav/kittygpt';

    let p = document.createElement('p');
    document.body.append(p);

    await completion([{ role: 'user', content: 'Tell me a joke about cats.' }], {
      key: 'sk-🤫🤫🤫',
      stream: x => p.textContent += x,
    });
  </script>
</body>
```

---

## 💠 API: `completion(logs, opt = {})`

```js
completion(logs, {
  api,            // 🌍 Custom endpoint (default: OpenAI)
  key,            // 🔐 API key (required for OpenAI at least)
  model,          // 🧠 Model name (default: gpt-4o)
  sysmsg,         // 📜 System message to prepend to `logs` copy sent to the API (string | array | function returning either)
  rolemap,        // 📃 Maps custom roles to "system", "user", "assistant"; non-standard, unmapped roles cause log items to be automatically dropped
  stream,         // 💧 Callback for streamed content (chunk => ...)
  format,         // 📦 { type: 'json_schema', schema: { ... } }
  fns,            // 🧰 Function definitions
  call,           // 🔧 "auto", "force", or function name
  maxRetries      // 🔁 Max forced function call retries (default: 3)
  logger,         // 🩵 true (default logger) or custom function (takes `logs` array as single argument)
});
```

---

## 🧼 `purrify(logs, rolemap)`

Cleans and prepares a chat history for the completions API.

Called automatically but also exported in case it's useful elsewhere.

### Why?

Because GPT **only accepts strict message formats**. Raw logs often include extra roles, metadata, or structure that will confuse or be silently dropped by the model. `purrify()` solves that.

### What it does:

1. **🚫 Removes messages with roles not supported by GPT**  
   GPT only supports `"system"`, `"user"`, and `"assistant"`. Messages with other roles are dropped unless a rolemap entry is provided.

2. **📃 Supports `rolemap` to explicitly remap unknown roles**  
   For example:
   ```js
   rolemap: {
     warning: 'assistant',
     annotation: 'user'
   }
   ```
   This gives you fine-grained control over custom log roles without guessing or assuming.

3. **💻 Merges consecutive messages from the same role**  
   Some models ignore all but the first or last same-role message. Merging prevents silent loss.

4. **🧹 Strips all keys except `role` and `content`**  
   Keeps logs rich in-app, but sends only what GPT needs and accepts.

5. **🪄 Normalizes content arrays**  
   Converts `["Line 1", false, "Line 2", null]` into `"Line 1\nLine 2"`

### Example:

```js
purrify([
  { role: 'annotation', content: 'User clicked here.' },
  { role: 'user', content: 'What does this do?' },
  { role: 'assistant', content: 'It activates the laser.' },
  { role: 'debug', content: 'firing laser()' }
], {
  annotation: 'user',
  debug: 'assistant'
});
```

Yields:

```js
[
  { role: 'user', content: 'User clicked here.\n\nWhat does this do?' },
  { role: 'assistant', content: 'It activates the laser.\nfiring laser()' },
]
```

🧠 *Cleaned. Mapped. Merged. GPT-safe.*

---

## 💧 `bodystream(body, callback)`

Handles streaming response bodies from the OpenAI API.

- Uses `ReadableStream.getReader()`
- Decodes chunks with `TextDecoder`
- Parses Server-Sent Events line-by-line
- Calls `callback(content)` as each token arrives
- Returns the full assembled message string
- Automatically ignores partial JSON strings ChatGPT sometimes spits out for some reason.

---

## 📓 Logging

You can pass `logger: true` to use the built-in logger:

```js
completion.defaultLogger(logs);
```

Or supply your own function to hook into completions.  
The default logger uses `console.groupCollapsed()` and includes a preview of the assistant’s reply.

---

## 📦 CDN Usage (browser-friendly)

```bash
import { completion } from 'https://esm.sh/@camilaprav/kittygpt';
```

---

## 📦 Install (for Node, etc.)

```bash
npm install @camilaprav/kittygpt
```

---

## 🧵 License

**GPL-v3.0 or later**  

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

You should have received [COPYING](a copy) of the GNU General Public License
along with this program. If not, see https://www.gnu.org/licenses/.

---

## 🐾 Philosophy

> The official SDK is bloated, brittle, and too complicated.
> `kittygpt` is clean, modular, hackable, and sharp.
> It works the way you *wish* OpenAI’s SDK did.
> And it doesn’t meow around.

— Camila (and maybe you <3)
