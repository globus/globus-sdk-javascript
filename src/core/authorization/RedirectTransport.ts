import { getAuthorizationEndpoint, oauth2 } from '../../services/auth/index.js';
import {
  generateCodeChallenge,
  generateCodeVerifier,
  generateState,
  AuthorizationRequestParameters,
  AuthorizationCodeExchangeParameters,
  isSupported,
} from './pkce.js';

import type { AuthorizationManagerConfiguration } from './AuthorizationManager';

export type GetTokenOptions = {
  /**
   * Whether or not the URL should be replaced after processing the token.
   * @default true
   */
  shouldReplace?: boolean;
};

export type RedirectTransportOptions = Pick<
  AuthorizationManagerConfiguration,
  'client' | 'redirect' | 'scopes'
> & {
  /**
   * Query parameters to include in the authorization request.
   *
   * The `RedirectTransport` will include all parameters required for a default OAuth PKCE flow, but
   * these parameters can be overridden or extended with this option.
   */
  params?: {
    [key: string]: string;
  };
};

/**
 * @private
 */
export const KEYS = {
  PKCE_STATE: 'pkce_state',
  PKCE_CODE_VERIFIER: 'pkce_code_verifier',
};

function resetPKCE() {
  sessionStorage.removeItem(KEYS.PKCE_STATE);
  sessionStorage.removeItem(KEYS.PKCE_CODE_VERIFIER);
}

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
    const state = generateState();
    /**
     * The verifier and state are stored in session storage so that we can validate
     * the response when we receive it.
     */
    sessionStorage.setItem(KEYS.PKCE_CODE_VERIFIER, verifier);
    sessionStorage.setItem(KEYS.PKCE_STATE, state);

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
  async getToken(options: GetTokenOptions = { shouldReplace: true }) {
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
    const state = sessionStorage.getItem(KEYS.PKCE_STATE);
    const verifier = sessionStorage.getItem(KEYS.PKCE_CODE_VERIFIER);
    /**
     * Now that we have the values in memory, we can remove them from session storage.
     */
    resetPKCE();

    /**
     * Validate the `state` parameter matches the preserved state (to prevent CSRF attacks).
     */
    if (params.get('state') !== state) {
      throw new Error('Invalid State');
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
