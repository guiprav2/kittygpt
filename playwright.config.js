import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './spec',
  workers: 4,
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    trace: 'on-first-retry',
    launchOptions: {
      args: [
        '--use-fake-ui-for-media-stream',
        '--use-fake-device-for-media-stream',
        '--autoplay-policy=no-user-gesture-required',
      ],
    },
  },
  webServer: {
    command: 'npx @camilaprav/kittygpt-serve',
    port: 3000,
  },
});
