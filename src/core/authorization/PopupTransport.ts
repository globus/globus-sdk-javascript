import { getAuthorizationEndpoint, oauth2 } from '../../services/auth/index.js';
import {
  generateCodeChallenge,
  generateCodeVerifier,
  generateState,
  AuthorizationRequestParameters,
  AuthorizationCodeExchangeParameters,
  isSupported,
  omitProtectedParameters,
  store,
} from './pkce.js';

import type { TransportOptions } from './RedirectTransport.js';

export type PopupTransportOptions = TransportOptions;

const MESSAGE_SOURCE = 'globus-sdk';

/**
 * How often to check whether the popup window was closed.
 */
const POLL_INTERVAL_MS = 500;

/**
 * The `PopupTransport` (`popup`) uses a popup window to initiate the OAuth 2.0 using PKCE.
 *
 * When using the `PopupTransport`, the `redirect` parameter should be to a location
 * that will transmit the URL back to the opener. This can be done using `AuthorizationManager.handleCodeRedirect()`, or
 * manually by calling `window.opener.postMessage()`.
 *
 * @experimental
 */
export class PopupTransport {
  #options: PopupTransportOptions;

  #window: Window | null = null;

  constructor(options: PopupTransportOptions) {
    this.#options = options;
    if (PopupTransport.supported === false) {
      throw new Error('PopupTransport is not supported in this environment.');
    }
  }

  /**
   * The `PopupTransport` is supported in environments where the `window` object is available.
   */
  static supported =
    isSupported() && 'window' in globalThis && typeof globalThis.window.open === 'function';

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
      /**
       * Caller-provided parameters can extend the request (and override `scope`, `redirect_uri`, and `state`),
       * but are not allowed to replace the parameters that secure the PKCE flow.
       */
      ...omitProtectedParameters(this.#options.params),
    };
    /**
     * The `redirect_uri` sent with the authorization request (which can be overridden with `params`) must be
     * sent with the token exchange, so it is stored with the PKCE state.
     */
    store.set('redirect_uri', params.redirect_uri);

    const url = new URL(getAuthorizationEndpoint());
    url.search = new URLSearchParams(params).toString();

    return new Promise((resolve, reject) => {
      let poll: ReturnType<typeof setInterval> | undefined;
      const cleanup = () => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        window.removeEventListener('message', onMessage, false);
        clearInterval(poll);
      };
      const onMessage = async (e: MessageEvent) => {
        const { data } = e;
        if (e.origin !== window.location.origin || data?.source !== MESSAGE_SOURCE) {
          return;
        }
        cleanup();
        this.#window?.close();
        try {
          resolve(await this.#getToken(data.url));
        } catch (error) {
          reject(error);
        }
      };
      window.addEventListener('message', onMessage, false);

      this.#window = window.open(url.toString(), '_blank', 'width=800,height=600');
      if (!this.#window) {
        cleanup();
        reject(new Error('Unable to open window for PopupTransport.'));
        return;
      }
      /**
       * Reject if the user closes the window before the flow completes.
       */
      poll = setInterval(() => {
        if (this.#window?.closed) {
          cleanup();
          reject(new Error('The authorization window was closed before the flow completed.'));
        }
      }, POLL_INTERVAL_MS);
      this.#window.focus();
    });
  }

  async #getToken(href: string) {
    const url = new URL(href);
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
    const redirectUri = store.get('redirect_uri') ?? this.#options.redirect;
    /**
     * Now that we have the values in memory, we can remove them from session storage.
     */
    store.reset();

    /**
     * Validate the `state` parameter matches the preserved state (to prevent CSRF attacks).
     */
    if (!state || params.get('state') !== state) {
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
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    };
    const response = await (
      await oauth2.token.exchange({
        payload,
      })
    ).json();
    return response;
  }

  // eslint-disable-next-line class-methods-use-this
  getToken() {
    if (!window.opener) {
      return;
    }

    window.opener.postMessage(
      {
        source: MESSAGE_SOURCE,
        url: window.location.href,
      },
      window.location.origin,
    );
  }
}
