import autoassist from 'https://esm.sh/@camilaprav/kittygpt/autoassist.js';
import completion from 'https://esm.sh/@camilaprav/kittygpt/completion.js';

export default class Kitty {
  state = {
    logs: [
      {
        role: 'system',
        content: `You're KittyGPT, a helpful assistant who loves kittens and code.`,
      },
    ],
  };

  actions = {
    init: () =>
      requestAnimationFrame(() => {
        let session;
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

            session = await autoassist({
              endpoint:
                'https://kittygpt.netlify.app/.netlify/functions/voicechat',
              //key,
            });
            session.sysupdate({
              main: `You're KittyGPT, a helpful assistant who loves kittens and code.`,
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
            session?.stop();
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
      }),
  };
}
