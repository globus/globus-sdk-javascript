/**
 * @description Session and authorization management via PKCE.
 * @group Core
 * @module
 * @experimental
 */
import PKCE from 'js-pkce';

import type IConfig from 'js-pkce/dist/IConfig';
import {
  Token,
  TokenResponse,
  getAuthorizationEndpoint,
  getTokenEndpoint,
  isGlobusAuthTokenResponse,
} from '../../services/auth/index.js';

import { Event } from './Event.js';

import { createStorage, getStorage } from '../storage/index.js';
import { Logger } from './Logger.js';

type PKCEConfiguration = {
  client_id?: IConfig['client_id'];
  requested_scopes: IConfig['requested_scopes'];
  redirect_uri: IConfig['redirect_uri'];
};

/**
 * @experimental
 */
export class GlobusAuthorizationManager {
  #pkce: PKCE;

  #logger: Logger;

  #configuration: IConfig;

  authenticated = false;

  events = {
    authenticated: new Event<
      'authenticated',
      {
        isAuthenticated: boolean;
        token?: TokenResponse;
      }
    >('authenticated'),
    revoke: new Event('revoke'),
  };

  constructor(configuration: PKCEConfiguration) {
    this.#logger = new Logger();

    createStorage('localStorage');
    if (!configuration.client_id) {
      throw new Error('You must provide a `client_id` for your application.');
    }
    this.#configuration = {
      client_id: configuration.client_id,
      authorization_endpoint: getAuthorizationEndpoint(),
      token_endpoint: getTokenEndpoint(),
      ...configuration,
    };

    this.startSilentRenew();

    this.#pkce = new PKCE(this.#configuration);
  }

  startSilentRenew() {
    this.#logger.log('debug', 'startSilentRenew');
    // @todo
    this.#bootstrapFromStorageState();
  }

  hasGlobusAuthToken() {
    return this.getGlobusAuthToken() !== null;
  }

  getGlobusAuthToken() {
    const entry = getStorage().get(`${this.#configuration.client_id}:auth.globus.org`);
    return entry ? JSON.parse(entry) : null;
  }

  async #bootstrapFromStorageState() {
    this.#logger.log('debug', 'bootstrapFromStorageState');
    if (this.hasGlobusAuthToken()) {
      this.#logger.log('debug', 'bootstrapFromStorageState: hasGlobusAuthToken');
      this.authenticated = true;
      await this.#emitAuthenticatedState();
    }
  }

  async #emitAuthenticatedState() {
    const isAuthenticated = this.authenticated;
    const token = this.getGlobusAuthToken() ?? undefined;
    console.log('emitting authenticated state', { isAuthenticated, token });
    await this.events.authenticated.dispatch({
      isAuthenticated,
      token,
    });
  }

  reset() {
    this.authenticated = false;
    /**
     * Resets js-pkce state
     * @see https://github.com/bpedroza/js-pkce/blob/master/src/PKCE.ts
     */
    sessionStorage.removeItem('pkce_state');
    sessionStorage.removeItem('pkce_code_verifier');
    getStorage().clear();
  }

  redirect() {
    this.reset();
    window.location.replace(this.#pkce.authorizeUrl());
  }

  async handleCodeRedirect(options = { removeStateAndReplaceLocation: true }) {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    if (!params.get('code')) return;
    const response = await this.#pkce.exchangeForAccessToken(url.toString());
    if (isGlobusAuthTokenResponse(response)) {
      this.addTokenResponse(response);
      this.authenticated = true;
      await this.#emitAuthenticatedState();
    }
    // Remove PKCE-state from the URL since we have a token.
    if (options.removeStateAndReplaceLocation) {
      params.delete('code');
      params.delete('state');
      url.search = params.toString();
      window.location.replace(url);
    }
  }

  addTokenResponse = (token: Token | TokenResponse) => {
    getStorage().set(`${this.#configuration.client_id}:${token.resource_server}`, token);
    if ('other_tokens' in token) {
      token.other_tokens.forEach(this.addTokenResponse);
    }
  };

  async revoke() {
    this.reset();
    await this.events.revoke.dispatch();
  }
}

/**
 * @experimental
 */
export function pkce(configuration: PKCEConfiguration) {
  return new GlobusAuthorizationManager(configuration);
}
