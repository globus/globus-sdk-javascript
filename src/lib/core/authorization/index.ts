/**
 * @description Session and authorization management.
 * @group Core
 * @module
 * @experimental
 */
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
import { Service } from '../global.js';
import { RESOURCE_SERVERS } from '../../services/auth/config.js';
import { RedirectTransport } from './RedirectTransport.js';

type Configuration = {
  client_id?: IConfig['client_id'];
  requested_scopes: IConfig['requested_scopes'];
  redirect_uri: IConfig['redirect_uri'];
};

function isValidToken(check: unknown): check is Token {
  const maybe = check as Token;
  return Boolean(maybe.token_type && maybe.access_token);
}

/**
 * Obtain the token string for the given scope.
 * @param scope The scope string that will be used to look up the token.
 * @returns The token string for the given scope or null if no token is found.
 */
export function getTokenForScope(scope: string) {
  const token = getStorage().get(scope);
  if (!token || !isValidToken(token)) {
    return null;
  }
  return `${token.token_type} ${token.access_token}`;
}

/**
 * @experimental
 */
export class AuthorizationManager {
  #transport!: RedirectTransport;

  #logger: Logger;

  #configuration: IConfig;

  authenticated = false;

  getTokenForService(service: Extract<Service, 'AUTH' | 'TRANSFER' | 'FLOWS'>) {
    const resourceServer = RESOURCE_SERVERS?.[service];
    if (!resourceServer) {
      throw new Error(`No resource server found for service: ${service}`);
    }
    const raw = getStorage().get(`${this.#configuration.client_id}:${resourceServer}`) || '{}';
    return JSON.parse(raw).access_token;
  }

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

  constructor(configuration: Configuration) {
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
  }

  startSilentRenew() {
    this.#logger.log('debug', 'startSilentRenew');
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
    await this.events.authenticated.dispatch({
      isAuthenticated,
      token,
    });
  }

  reset() {
    this.authenticated = false;
    getStorage().clear();
  }

  #buildTransport() {
    return new RedirectTransport({
      client_id: this.#configuration.client_id,
      authorization_endpoint: getAuthorizationEndpoint(),
      token_endpoint: getTokenEndpoint(),
      redirect_uri: this.#configuration.redirect_uri,
      requested_scopes: this.#configuration.requested_scopes,
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
    this.#transport = new RedirectTransport({
      client_id: this.#configuration.client_id,
      authorization_endpoint: getAuthorizationEndpoint(),
      token_endpoint: getTokenEndpoint(),
      redirect_uri: this.#configuration.redirect_uri,
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

/**
 * @experimental
 */
export function create(configuration: Configuration) {
  return new AuthorizationManager(configuration);
}
