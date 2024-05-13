import { test, expect } from '@playwright/test';

test('exports as "globus"', async ({ page }) => {
  await page.goto('umd');
  await expect(page).toHaveTitle('@globus/sdk');

  expect(await page.evaluate(() => window.globus.logger)).toBeDefined();
  expect(await page.evaluate(() => window.globus.authorization)).toBeDefined();

  expect(await page.evaluate(() => window.globus)).toBeDefined();
  expect(await page.evaluate(() => window.globus.auth)).toBeDefined();
  expect(await page.evaluate(() => window.globus.transfer)).toBeDefined();
  expect(await page.evaluate(() => window.globus.search)).toBeDefined();
  expect(await page.evaluate(() => window.globus.flows)).toBeDefined();
  expect(await page.evaluate(() => window.globus.gcs)).toBeDefined();
  expect(await page.evaluate(() => window.globus.timer)).toBeDefined();
  expect(await page.evaluate(() => window.globus.compute)).toBeDefined();

  expect(await page.evaluate(() => window.globus.webapp)).toBeDefined();
});

/**
 * Basic E2E test to validate the creation of a AuthorizationManager and
 * its ability to initiate the OAuth flow.
 */
test('authorization', async ({ page }) => {
  await page.goto('umd-authorization');
  await expect(page).toHaveTitle('@globus/sdk');
  await expect(page.getByRole('button')).toHaveText('Sign In');
  await page.getByRole('button').click();

  await page.waitForURL(/https:\/\/auth.globus.org\/p\/login\?.*/);

  const url = await page.url();

  expect(url).toContain('response_type=code');
  expect(url).toContain('client_id=938f3dce-6782-40e7-872d-2ef94c7b24e7');
  expect(url).toContain('scope=openid+profile+email+offline_access');
  expect(url).toContain('%26redirect_uri%3Dexample%253A%252F%252Fredirect%26');
});

/**
 * Validates the creation of an AuthorizationManager, authentication
 * via Globus ID and a basic `ls`.
 */
test('ls', async ({ page }) => {
  const USERNAME = process.env.PREVIEW_GLOBUS_ID_USERNAME;
  const PASSWORD = process.env.PREVIEW_GLOBUS_ID_PASSWORD;

  expect(
    USERNAME,
    `process.env.PREVIEW_GLOBUS_ID_USERNAME is required to run this test.`,
  ).toBeDefined();
  expect(
    PASSWORD,
    `process.env.PREVIEW_GLOBUS_ID_PASSWORD is required to run this test.`,
  ).toBeDefined();

  await page.goto('umd-transfer-ls');
  await expect(page).toHaveTitle('@globus/sdk');
  await expect(page.getByRole('button')).toHaveText('Sign In');

  await page.getByRole('button').click();

  /**
   * Globus Auth – Log In (Account Select)
   */
  await page.getByText('Globus ID to sign in').click();
  /**
   * Globus ID – Log In
   */
  await page.getByRole('textbox', { name: 'username' }).fill(USERNAME);
  await page.getByRole('textbox', { name: 'password' }).fill(PASSWORD);
  await page.getByRole('button', { name: 'Log In' }).click();
  /**
   * AuthenticationManager bootstrapped to the authenticated state.
   */
  await expect(page.getByRole('button')).toHaveText('Sign Out', {
    timeout: 10000,
  });
  /**
   * User information was loaded from the token.
   */
  await expect(page.locator('#user-information')).not.toBeEmpty();
  /**
   * The `ls` returned a response.
   */
  await expect(page.locator('#ls-response')).not.toBeEmpty();
});
