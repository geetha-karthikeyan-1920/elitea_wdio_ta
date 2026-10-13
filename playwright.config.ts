import { defineConfig, devices } from '@playwright/test';

/**
 * Base URL is intentionally sourced from env to avoid checking
 * in any proprietary values.
 */
export const baseURL = process.env.BASE_URL ?? undefine;

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5 * 1000,
  },
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
  use: {
    baseURL: baseURL,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    actionTimeout: 0,
    navigationTimeout: 30 * 1000,
  },
  outputDir: 'test-results',
  projects: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
