import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.BASE_URL || 'https://example.com';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL,
    xrecord: 'retain-on-failure',
    trace: 'on-first-retry'
  },
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  projects: [
    {
      name: 'chrome',
      use: { ...devices ['Desktop Chrome'] }
    }
  ]
});
