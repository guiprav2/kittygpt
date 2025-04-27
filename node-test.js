import { spawn } from 'child_process';
import completion from './completion.js';
import voicechat from './voicechat.js';

async function serve() {
}

let [type = 'text', debug] = process.argv.slice(2);

let child = await new Promise((resolve, reject) => {
  const child = spawn('npx', ['@camilaprav/kittygpt-serve'], {
    stdio: ['inherit', 'pipe', 'inherit'],
    detached: true,
    shell: true,
  });
  child.stdout.setEncoding('utf8');
  child.stdout.on('data', x => x.includes('purring') && resolve(child));
  child.on('error', x => reject(x));
  child.on('exit', () => reject(new Error(`kittygpt-serve exited`)));
});

try {
  switch (type) {
    case 'text': {
      let joke = `Tell me a cat joke.`;
      console.log('>', joke, '\n');
      let logs = [{ role: 'user', content: joke }];
      let res = await completion(logs, {
        endpoint: 'http://localhost:3000/completion',
        stream: x => process.stdout.write(x),
      });
      console.log('\n');
      break;
    }

    case 'voice': {
      console.log(`🎧 WARNING: Use headphones to avoid ChatGPT hearing itself and entering a loop.`);
      let session = await voicechat({ endpoint: 'http://localhost:3000/voicechat', debug: debug === 'debug' });
      session.sysupdate({ main: `You're ChatGPT, a helpful voice chat assistant.` });
      session.sysupdate(null, {
        printAsciiArt: {
          parameters: {
            type: 'object',
            properties: {
              ascii: { type: 'string', description: `An ASCII-art string` },
            },
            required: ['ascii'],
          },
          handler: ({ ascii }) => { console.log(`ASCII art:`); console.log(ascii); }
        },
      });
      break;
    }
  }
} finally {
  process.kill(-child.pid);
}
