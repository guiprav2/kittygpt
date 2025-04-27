import { test, expect } from '@playwright/test';

test.describe('Voice Chat API', () => {
  async function bootstrap(browser, variant, hash) {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(`http://localhost:3000/test-pages/voicechat-${variant}.html${hash ? `#${hash}` : ''}`);
    await page.waitForFunction(() => meSpeak.ready, { timeout: 10000 });
    await page.click('#start');
    return [context, page];
  }

  test('should support events, transcript, and prompt', async ({ browser }) => {
    let [context, page] = await bootstrap(browser, 'transcript');
    await page.waitForFunction(() => done, { timeout: 10000 });
    expect(await page.evaluate(() => transcript.toLowerCase())).toContain('hello');
    await context.close();
  });

  test('should support events and instructions', async ({ browser }) => {
    let [context, page] = await bootstrap(browser, 'instructions');
    await page.waitForFunction(() => done, { timeout: 10000 });
    expect(await page.evaluate(() => transcript.toLowerCase())).toContain('camila');
    await context.close();
  });

  test('should support function calling', async ({ browser }) => {
    let [context, page] = await bootstrap(browser, 'fns');
    await page.waitForFunction(() => fncalled, { timeout: 10000 });
    await page.waitForFunction(() => transcript.length >= 5, { timeout: 10000 });
    await context.close();
  });

  test('should support respond: false', async ({ browser }) => {
    let [context, page] = await bootstrap(browser, 'fns', 'respond=false');
    await page.waitForFunction(() => fncalled, { timeout: 10000 });
    await new Promise(pres => setTimeout(pres, 1000));
    expect(await page.evaluate(() => transcript)).toEqual('');
    await context.close();
    [context, page] = await bootstrap(browser, 'fns', 'respond=fnfalse');
    await page.waitForFunction(() => fncalled, { timeout: 10000 });
    await new Promise(pres => setTimeout(pres, 1000));
    expect(await page.evaluate(() => transcript)).toEqual('');
    await context.close();
  });
});
