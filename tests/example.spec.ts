import { test, expect } from '@playwright/test';

test('page has a title', async ( { page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/example/i);
});
