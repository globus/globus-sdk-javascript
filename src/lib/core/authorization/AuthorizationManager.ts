import type IConfig from 'js-pkce/dist/IConfig';

import {
  Token,
  TokenResponse,
  getAuthorizationEndpoint,
  getTokenEndpoint,
  isGlobusAuthTokenResponse,
  CONFIG,
} from '../../services/auth/index.js';

import { createStorage, getStorage } from '../storage/index.js';
import { log } from '../logger.js';
import { Service } from '../global.js';

import { Event } from './Event.js';
import { RedirectTransport } from './RedirectTransport.js';

export type AuthorizationManagerConfiguration = {
  client_id: IConfig['client_id'];
  requested_scopes: IConfig['requested_scopes'];
  redirect_uri: IConfig['redirect_uri'];
};

/**
 * @experimental
 */
export class AuthorizationManager {
  #transport!: RedirectTransport;

  #configuration: AuthorizationManagerConfiguration;

  authenticated = false;

  getTokenForService(service: Extract<Service, 'AUTH' | 'TRANSFER' | 'FLOWS'>) {
    const resourceServer = CONFIG.RESOURCE_SERVERS?.[service];
    if (!resourceServer) {
      throw new Error(`No resource server found for service: ${service}`);
    }
    const raw = getStorage().get(`${this.#configuration.client_id}:${resourceServer}`) || '{}';
    return JSON.parse(raw).access_token;
  }

  events = {
    /**
     * Emitted when the authenticated state changes.
     */
    authenticated: new Event<
      'authenticated',
      {
        isAuthenticated: boolean;
        token?: TokenResponse;
      }
    >('authenticated'),
    /**
     * Emitted when the user revokes their authentication.
     */
    revoke: new Event('revoke'),
  };

  constructor(configuration: AuthorizationManagerConfiguration) {
    /**
     * @todo Add support for passing in an alternative storage mechanism.
     */
    createStorage('localStorage');
    if (!configuration.client_id) {
      throw new Error('You must provide a `client_id` for your application.');
    }
    this.#configuration = {
      ...configuration,
    };
    this.startSilentRenew();
  }

  startSilentRenew() {
    log('debug', 'AuthorizationManager.startSilentRenew');
    this.#bootstrapFromStorageState();
    // @todo Iterate through all tokens and refresh them.
  }

  hasGlobusAuthToken() {
    return this.getGlobusAuthToken() !== null;
  }

  getGlobusAuthToken() {
    const entry = getStorage().get(`${this.#configuration.client_id}:auth.globus.org`);
    return entry ? JSON.parse(entry) : null;
  }

  async #bootstrapFromStorageState() {
    log('debug', 'AuthorizationManager.bootstrapFromStorageState');
    if (this.hasGlobusAuthToken()) {
      log('debug', 'AuthorizationManager.bootstrapFromStorageState: hasGlobusAuthToken');
      this.authenticated = true;
      await this.#emitAuthenticatedState();
    }
  }

  async #emitAuthenticatedState() {
    const isAuthenticated = this.authenticated;
    const token = this.getGlobusAuthToken() ?? undefined;
    await this.events.authenticated.dispatch({
      isAuthenticated,
      token,
    });
  }

  reset() {
    this.authenticated = false;
    getStorage().clear();
  }

  #buildTransport(overrides?: Partial<IConfig>) {
    return new RedirectTransport({
      client_id: this.#configuration.client_id,
      authorization_endpoint: getAuthorizationEndpoint(),
      token_endpoint: getTokenEndpoint(),
      redirect_uri: this.#configuration.redirect_uri,
      requested_scopes: this.#configuration.requested_scopes,
      ...overrides,
    });
  }

  redirect() {
    this.reset();
    const transport = this.#buildTransport();
    transport.send();
  }

  async handleCodeRedirect() {
    const response = await this.#buildTransport().getToken();
    if (isGlobusAuthTokenResponse(response)) {
      this.addTokenResponse(response);
      this.authenticated = true;
      await this.#emitAuthenticatedState();
    }
  }

  handleConsentRequiredError(response: { code: 'ConsentRequired'; required_scopes: string[] }) {
    this.#transport = this.#buildTransport({
      requested_scopes: response.required_scopes.join(' '),
    });
    this.#transport.send();
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
