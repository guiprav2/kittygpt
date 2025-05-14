import autoassist from 'https://esm.sh/@camilaprav/kittygpt/autoassist.js';
import completion from 'https://esm.sh/@camilaprav/kittygpt/completion.js';

let loadingPrompt = `The full documentation is loading, if asked about it or details about KittyGPT as a library, say so.`;

export default class Kitty {
  state = {
    logs: [
      {
        role: 'system',
        content: [
          `You're KittyGPT, a helpful assistant who loves kittens and code.`,
          `You are in chat mode, so keep your replies always very short and chat-like.`,
          `If an answer to a question would be too long to answer, refer to the appropriate wiki page links below (not above).`,
          `Do not use Markdown.`,
          loadingPrompt,
        ],
      },
    ],
  };

  actions = {
    init: async () => {
      requestAnimationFrame(() => {
        let logs = this.state.logs;

        const startBtn = document.getElementById('start');
        const stopBtn = document.getElementById('stop');
        const keyInput = document.getElementById('user-key');

        startBtn.addEventListener('click', async ev => {
          ev.target.disabled = true;
          try {
            const key = keyInput.value.trim();
            /*if (!key)
              return await showModal('Error', {
                msg: 'Please enter your OpenAI API key before starting voice mode.',
              });*/

            this.state.session = await autoassist({
              endpoint:
                'https://kittygpt.netlify.app/.netlify/functions/voicechat',
              //key,
            });
            let docs = Object.fromEntries(this.state.wiki || []);
            if (!Object.keys(docs).length) docs.loading = loadingPrompt;
            this.state.session.sysupdate({
              main: `You're KittyGPT, a helpful assistant who loves kittens and code.`,
              ...docs,
            });
            stopBtn.classList.remove('hidden');
            startBtn.classList.add('hidden');
          } catch (err) {
            await showModal('Error', { msg: err.message });
          } finally {
            ev.target.disabled = false;
          }
        });

        stopBtn.addEventListener('click', () => {
          try {
            this.state.session?.stop();
            stopBtn.classList.add('hidden');
            startBtn.classList.remove('hidden');
          } catch (err) {
            showModal('Error', { msg: err.message });
          }
        });

        document
          .getElementById('submit-playground')
          .addEventListener('click', async () => {
            const input = document
              .getElementById('playground-input')
              .value.trim();
            const chatLog = document.getElementById('chat-log');
            const key = keyInput.value.trim();

            if (!input) return;
            /*if (!key)
              return await showModal('Error', {
                msg: 'Please enter your OpenAI API key to use the chat.',
              });*/

            logs.push({ role: 'user', content: input });

            const userMsg = document.createElement('p');
            userMsg.className = 'text-right text-blue-600';
            userMsg.textContent = '🧍‍♀️ ' + input;
            chatLog.appendChild(userMsg);
            document.getElementById('playground-input').value = '';

            try {
              const res = await completion(logs, {
                endpoint:
                  'https://kittygpt.netlify.app/.netlify/functions/completion',
                //key,
              });
              logs.push({ role: 'assistant', content: res.content });

              const botMsg = document.createElement('p');
              botMsg.className = 'text-left text-pink-600';
              botMsg.textContent = '🐱 ' + res.content;
              chatLog.appendChild(botMsg);

              chatLog.scrollTop = chatLog.scrollHeight;
            } catch (err) {
              await showModal('Error', { msg: err.message });
            }
          });
      });

      this.state.wiki = await Promise.all(['Completion-API', 'Voice-Chat-API', 'Autoassist-API'].map(async x => {
        let res = await fetch(`https://kittygpt.netlify.app/.netlify/functions/wiki/${x}.md`);
        return [x, await res.text()];
      }));

      let { content } = this.state.logs[0];
      content[content.length - 1] = this.state.wiki.map(([k, md]) => `# ${k.replaceAll('-', ' ')}\n\n${md}`).join('\n\n');
      this.state.session?.sysupdate?.({
        loading: `The documentation is loaded and ready.`,
        ...Object.fromEntries(this.state.wiki),
      });
    },
  };
}
