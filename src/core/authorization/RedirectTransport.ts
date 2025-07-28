import { getAuthorizationEndpoint, oauth2 } from '../../services/auth/index.js';
import {
  generateCodeChallenge,
  generateCodeVerifier,
  generateState,
  AuthorizationRequestParameters,
  AuthorizationCodeExchangeParameters,
  isSupported,
  store,
} from './pkce.js';

import type { AuthorizationManagerConfiguration } from './AuthorizationManager.js';

export type GetTokenOptions = {
  /**
   * Whether or not the URL should be replaced after processing the token.
   * This is used to remove the `?code=...&state=...` parameters from the URL after the token is retrieved.
   * If set to `false`, the URL will remain unchanged.
   * @default true
   */
  shouldReplace?: boolean;
  /**
   * When set to `true` in addition to the `scope` values originally requested, Globus Auth
   * will return tokens for **all** of the scopes that the user has consented to, for
   * the requesting client.
   * @default false
   * @private
   */
  includeConsentedScopes?: boolean;
};

export type TransportOptions = Pick<
  AuthorizationManagerConfiguration,
  'client' | 'redirect' | 'scopes'
> & {
  /**
   * Query parameters to include in the authorization request.
   *
   * The transport will include all parameters required for a default OAuth PKCE flow, but
   * these parameters can be overridden or extended with this option.
   */
  params?: {
    [key: string]: string;
  };
};

export type RedirectTransportOptions = TransportOptions;
export class RedirectTransport {
  #options: RedirectTransportOptions;

  constructor(options: RedirectTransportOptions) {
    this.#options = options;
    if (RedirectTransport.supported === false) {
      throw new Error('RedirectTransport is not supported in this environment.');
    }
  }

  static supported = isSupported();

  /**
   * For the redirect transport, sending the request will redirect the user to the authorization endpoint, initiating the OAuth flow.
   */
  async send() {
    /**
     * Since we'll be using PKCE, we need to generate a code verifier and challenge
     * for the OAuth handshake.
     */
    const verifier = generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);
    /**
     * If there is caller-provided `state`, use it; Otherwise, generate a state parameter.
     */
    const state = this.#options.params?.['state'] ?? generateState();
    /**
     * The verifier and state are stored in session storage so that we can validate
     * the response when we receive it.
     */
    store.set('code_verifier', verifier);
    store.set('state', state);

    const params: AuthorizationRequestParameters = {
      response_type: 'code',
      client_id: this.#options.client,
      scope: this.#options.scopes || '',
      redirect_uri: this.#options.redirect,
      state,
      code_challenge: challenge,
      code_challenge_method: 'S256',
      ...(this.#options.params || {}),
    };

    const url = new URL(getAuthorizationEndpoint());
    url.search = new URLSearchParams(params).toString();

    window.location.assign(url.toString());
  }

  /**
   * Parse the current URL for the authorization code (`?code=...`) and exchange it for an access token when available.
   * - When the URL is processed and exchanged for an access token, the page is redirected to the current URL without the `?code=...&state=...` parameters.
   */
  async getToken(
    options: GetTokenOptions = { shouldReplace: true, includeConsentedScopes: false },
  ) {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    /**
     * Check for an error in the OAuth flow.
     * @see https://www.oauth.com/oauth2-servers/pkce/authorization-request/
     */
    if (params.get('error')) {
      throw new Error(
        params.get('error_description') || 'An error occurred during the authorization process.',
      );
    }

    const code = params.get('code');

    /**
     * If we don't have a `code` parameter, we can't exchange it for an access token.
     */
    if (!code) return undefined;

    /**
     * Grab the PKCE information from session storage.
     */
    const state = store.get('state');
    const verifier = store.get('code_verifier');
    /**
     * Now that we have the values in memory, we can remove them from session storage.
     */
    store.reset();

    /**
     * Validate the `state` parameter matches the preserved state (to prevent CSRF attacks).
     */
    if (params.get('state') !== state) {
      throw new Error(
        'Invalid State. The received "state" parameter does not match the expected state.',
      );
    }
    /**
     * Ensure we have a valid code verifier.
     */
    if (!verifier) {
      throw new Error('Invalid Code Verifier');
    }

    /**
     * Prepare the payload for the PKCE token exchange.
     */
    const payload: AuthorizationCodeExchangeParameters = {
      code,
      client_id: this.#options.client,
      /**
       * Retrieve the code verifier from session storage.
       */
      code_verifier: verifier,
      redirect_uri: this.#options.redirect,
      grant_type: 'authorization_code',
    };

    const response = await (
      await oauth2.token.exchange({
        query: options.includeConsentedScopes
          ? {
              include_consented_scopes: true,
            }
          : undefined,
        payload,
      })
    ).json();

    if (options.shouldReplace) {
      /**
       * Remove the `code` and `state` parameters from the URL.
       */
      params.delete('code');
      params.delete('state');
      /**
       * Update the URL with the new query string.
       */
      url.search = params.toString();
      /**
       * Redirect the page to the new URL (without the `code` and `state` parameters)/
       */
      window.location.replace(url);
    }
    return response;
  }
}
