import { test, expect } from '@playwright/test';

test('smoke: can navigate to baseURL (optional)', async ({ page }) => {
  // If BASE_URL is not set, Playwright will use a relative URL against about:blank
  // which would fail. To keep this repo bareminimum-setup friendly,
  // we skip the navigation case when baseURL isn't provided.
  const baseURL = process.env.BASE_URL;

  if (!baseURL) {
    test.skip();
  }

  await page.goto('/');
  await expect(page).toHaveURL(/^.+/);
});
