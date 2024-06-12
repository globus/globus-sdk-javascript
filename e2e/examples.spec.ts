import { test, expect } from '@playwright/test';
import extract from '../scripts/extract-examples-to-tests';

test.beforeAll(() => {
  extract();
});

/**
 * Validates the creation of an AuthorizationManager, authentication
 * via Globus ID and a basic `ls`.
 * @see examples/basic/index.html
 */
test.describe('basic', () => {
  test('unauthenticated state', async ({ page }) => {
    await page.goto('examples/basic');
    await expect(page).toHaveTitle('@globus/sdk');
    await expect(page.getByRole('button')).toHaveText('Sign In');
    await page.getByRole('button').click();
    await expect(page, 'clicking the "Sign In" button redirects to Globus Auth').toHaveURL(
      /.*auth\..*\/p\/login\?/,
    );
  });

  test('supports authentication', async ({ page }) => {
    const USERNAME = process.env.PREVIEW_GLOBUS_ID_USERNAME;
    const PASSWORD = process.env.PREVIEW_GLOBUS_ID_PASSWORD;

    test.skip(
      !USERNAME || !USERNAME.length || !PASSWORD || !PASSWORD.length,
      'PREVIEW_GLOBUS_ID_USERNAME and PREVIEW_GLOBUS_ID_PASSWORD are required to run this test.',
    );

    await page.goto('examples/basic');
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
});
