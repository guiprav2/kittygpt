import completion from './completion.js';
import voicechat from './voicechat.js';

let [type = 'text', debug] = process.argv.slice(2);

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
        handler: ({ ascii }) => { console.log(`ASCII art:`); console.log(ascii) }
      },
    });
    break;
  }
}
