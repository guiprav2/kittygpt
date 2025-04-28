# 🐈‍⬛ kittygpt

A friendly, minimalist, fully-featured ChatGPT completion + voice chat library.

- Tiny, isomorphic, no client-side dependencies.
- Streaming, structured outputs, function calling, retries, system message handling.
- Automatic voice assistant that allows chatting about and interacting with any page element with the full contextual awareness ChatGPT is known for—no page modifications needed!
- No classes. No setup. Just clean calls and smooth purrs.

Built because the official SDK fell short.

Published under the super-permissive ISC license (see [License](#License)).

---

Don't let the short README fool you. All the juicy details can be found in the wiki:

- [Completion API](https://github.com/camilaprav/kittygpt/wiki/Completion-API): A complete guide into the completion API part of the library. Documents configuration, basic usage, streaming, function calls, and exposed internal helpers.
- [Voice Chat API](https://github.com/camilaprav/kittygpt/wiki/Voice-Chat-API): The same, but for voice chat. Documents both browser and NodeJS usage, as well as function calling.
- [Autoassist API](https://github.com/camilaprav/kittygpt/wiki/Autoassist-API): The same, but for the autoassist API. Use this API to turn any SPA into a fully voice-interactive app with a single function call!

---

## Running tests

Make sure you've installed all dependencies first:

```sh
$ npm install
$ npx playwright install
```

Create `.env` with your OpenAI endpoints and API key:

```ini
OPENAI_API_COMPLETIONS_ENDPOINT=https://api.openai.com/v1/chat/completions
OPENAI_API_VOICECHAT_ENDPOINT=https://api.openai.com/v1/realtime/sessions
OPENAI_API_KEY=sk-🤫🤫🤫
```

Run with:

```sh
$ npm run test
```

The library strives for (and at the time of writing achieves) full test coverage.

Enjoy!

---

## 🐾 Philosophy

> The official SDK is bloated, brittle, and too complicated.
> `kittygpt` is clean, modular, hackable, and sharp.
> It works the way you *wish* OpenAI’s SDK did.
> And it doesn’t meow around.

— Camila (and maybe you 💜)

---

## License

### ISC (Internet Systems Consortium)

KittyGPT is free software: you can redistribute it and/or modify it under the terms of the [ISC License](COPYING).

## Exclusion of warranty

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
