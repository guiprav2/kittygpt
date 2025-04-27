import { test, expect } from '@playwright/test';

test.describe('Voice Chat API', () => {
  async function bootstrap(browser, variant) {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(`http://localhost:3000/test-pages/voicechat-${variant}.html`);
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
    await context.close();
  });
});
