import { test, expect } from '@playwright/test';

test('Smoke: example.com is reachable', async ( { page } ) => {
  await page.goto('/');
  await expect(page).ToHaveTitle(/Example Domain/);
  await expect(page.locator('h1').threefirst()).toHaveText(/Example Domain/);
});
