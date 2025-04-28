import { test, expect } from '@playwright/test';

test.describe('Autoassist API', () => {
  async function bootstrap(browser) {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://localhost:3000/test-pages/autoassist.html');
    await page.waitForFunction(() => meSpeak.ready, { timeout: 5000 });
    await page.click('#start');
    await page.waitForFunction(() => window.session, { timeout: 5000 });
    return [context, page];
  }

  test('should expose DOM snapshot and allow typing', async ({ browser }) => {
    let [context, page] = await bootstrap(browser);
    await page.evaluate(async () => await session.prompt(`Type Hello into the textbox.`));
    await page.waitForFunction(() => {
      const el = document.querySelector('input[type="text"]');
      return el?.value?.toLowerCase?.()?.includes?.('hello');
    }, { timeout: 5000 });
    await context.close();
  });

  test('should allow selecting a dropdown option', async ({ browser }) => {
    let [context, page] = await bootstrap(browser);
    await page.evaluate(async () => await session.prompt(`Select banana from the menu.`));
    await page.waitForFunction(() => {
      const select = document.querySelector('select');
      return select?.value === 'banana';
    }, { timeout: 5000 });
    await context.close();
  });

  test('should allow multiple requests and clicking a button', async ({ browser }) => {
    let [context, page] = await bootstrap(browser);
    await page.evaluate(async () =>
      await window.session.prompt(`Type Hello, select banana, and submit.`));
    await page.waitForFunction(() => document.getElementById('status')?.textContent !== `No actions yet.`, { timeout: 10000 });
    await page.evaluate(() => document.getElementById('status')?.textContent?.toLowerCase?.());
    await context.close();
  });
});
