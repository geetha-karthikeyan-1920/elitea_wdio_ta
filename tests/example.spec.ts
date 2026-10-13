import { test, expect } from '@playwright/test';

test('api can get a stable response', async ({ request }) => {
  const response = await request.get('https://httpbin.org/get');
  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body).toHaveProperty('url', 'https://httpbin.org/get');
});
