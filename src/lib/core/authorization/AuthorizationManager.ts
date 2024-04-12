import { jwtDecode } from 'jwt-decode';

import type IConfig from 'js-pkce/dist/IConfig';

import {
  getAuthorizationEndpoint,
  getTokenEndpoint,
  isGlobusAuthTokenResponse,
  isRefreshToken,
  oauth2,
} from '../../services/auth/index.js';

import { createStorage, getStorage } from '../storage/index.js';
import { log } from '../logger.js';

import { Event } from './Event.js';
import { GetTokenOptions, RedirectTransport } from './RedirectTransport.js';
import { TokenLookup } from './TokenLookup.js';

import {
  isConsentRequiredError,
  isAuthorizationRequirementsError,
  AuthorizationRequirementsError,
  ConsentRequiredError,
} from '../errors.js';

import type {
  JwtUserInfo,
  Token,
  TokenResponse,
  TokenWithRefresh,
} from '../../services/auth/types.js';

export type AuthorizationManagerConfiguration = {
  client: IConfig['client_id'];
  scopes: IConfig['requested_scopes'];
  redirect: IConfig['redirect_uri'];
  /**
   * @private
   * @default DEFAULT_CONFIGURATION.useRefreshTokens
   */
  useRefreshTokens?: boolean;
  /**
   * @private
   * @default DEFAULT_CONFIGURATION.defaultScopes
   */
  defaultScopes?: string | false;
};

const DEFAULT_CONFIGURATION = {
  useRefreshTokens: false,
  defaultScopes: 'openid profile email',
};

/**
 * @experimental
 */
export class AuthorizationManager {
  #transport!: RedirectTransport;

  configuration: AuthorizationManagerConfiguration;

  #authenticated = false;

  /**
   * The `AuthorizationManager` is considered `authenticated` if it has a valid Globus Auth token.
   * It does not necessarily mean that it has a valid token for a specific resource server.
   */
  get authenticated() {
    return this.#authenticated;
  }

  /**
   * Set the authenticated state and emit the `authenticated` event.
   */
  set authenticated(value: boolean) {
    this.#authenticated = value;
    this.#emitAuthenticatedState();
  }

  tokens: TokenLookup;

  events = {
    /**
     * Emitted when the authenticated state changes.
     * @event AuthorizationManager.events#authenticated
     * @type {object}
     * @property {boolean} isAuthenticated - Whether the `AuthorizationManager` is authenticated.
     * @property {TokenResponse} [token] - The token response if the `AuthorizationManager` is authenticated.
     */
    authenticated: new Event<
      'authenticated',
      {
        /**
         * Whether the `AuthorizationManager` is authenticated.
         * @see {@link AuthorizationManager.authenticated}
         */
        isAuthenticated: boolean;
        token?: TokenResponse;
      }
    >('authenticated'),
    /**
     * Emitted when the user revokes their authentication.
     * @event AuthorizationManager.events#revoke
     */
    revoke: new Event('revoke'),
  };

  constructor(configuration: AuthorizationManagerConfiguration) {
    /**
     * @todo Add support for passing in an alternative storage mechanism.
     */
    createStorage('localStorage');
    if (!configuration.client) {
      throw new Error('You must provide a `client` for your application.');
    }
    /**
     * Inject the `openid`, `profile`, `email`, and `offline_access` scopes by default unless
     * explicitly opted out of.
     */
    const scopes =
      configuration.defaultScopes === false
        ? ''
        : configuration.defaultScopes ?? DEFAULT_CONFIGURATION.defaultScopes;

    this.configuration = {
      ...configuration,
      scopes: `${configuration.scopes}${scopes ? ` ${scopes}` : ''}`,
    };

    this.tokens = new TokenLookup({
      manager: this,
    });
    this.#bootstrapFromStorageState();
    this.startSilentRefresh();
  }

  /**
   * The user information decoded from the `id_token` (JWT) of the current Globus Auth token.
   * This method can be used instead of `auth.oauth2.userinfo` to get the user information without an additional request.
   *
   * **IMPORTANT**: The `id_token` can only be processed if the `openid` scope is requested during the authorization process.
   *
   * Additionally, the `profile` and `email` scopes are required to get the full user information.
   *
   * @see {@link https://docs.globus.org/api/auth/reference/#oidc_userinfo_endpoint}
   */
  get user() {
    const token = this.getGlobusAuthToken();
    return token && token.id_token ? jwtDecode<JwtUserInfo>(token.id_token) : null;
  }

  /**
   * Start the silent refresh process for the instance.
   * @todo Add interval support for the silent refresh.
   */
  startSilentRefresh() {
    log(
      'debug',
      `AuthorizationManager.startSilentRefresh | useRefreshTokens=${this.configuration.useRefreshTokens}`,
    );
    /**
     * Silent refresh is only supported when using refresh tokens.
     */
    if (this.configuration.useRefreshTokens) {
      this.#silentRefreshTokens();
    }
  }

  #silentRefreshTokens() {
    log('debug', 'AuthorizationManager.#silentRefreshTokens');
    this.tokens.getAll().forEach((token) => {
      if (isRefreshToken(token)) {
        this.refreshToken(token);
      }
    });
  }

  /**
   * Use the `refresh_token` attribute of a token to obtain a new access token.
   * @param token The well-formed token with a `refresh_token` attribute.
   */
  async refreshToken(token: TokenWithRefresh) {
    log('debug', `AuthorizationManager.refreshToken | resource_server=${token.resource_server}`);
    try {
      const response = await (
        await oauth2.token.refresh({
          payload: {
            client_id: this.configuration.client,
            refresh_token: token.refresh_token,
            grant_type: 'refresh_token',
          },
        })
      ).json();
      if (isGlobusAuthTokenResponse(response)) {
        this.addTokenResponse(response);
      }
    } catch (error) {
      log('error', `AuthorizationManager.refreshToken | resource_server=${token.resource_server}`);
    }
  }

  hasGlobusAuthToken() {
    return this.getGlobusAuthToken() !== null;
  }

  getGlobusAuthToken() {
    const entry = getStorage().get(`${this.configuration.client}:auth.globus.org`);
    return entry ? JSON.parse(entry) : null;
  }

  #checkAuthorizationState() {
    log('debug', 'AuthorizationManager.#checkAuthorizationState');
    if (this.hasGlobusAuthToken()) {
      this.authenticated = true;
    }
  }

  async #bootstrapFromStorageState() {
    log('debug', 'AuthorizationManager.bootstrapFromStorageState');
    this.#checkAuthorizationState();
  }

  async #emitAuthenticatedState() {
    const isAuthenticated = this.authenticated;
    const token = this.getGlobusAuthToken() ?? undefined;
    await this.events.authenticated.dispatch({
      isAuthenticated,
      token,
    });
  }

  /**
   * Reset the authenticated state and clear all tokens from storage.
   * This method **does not** emit the `revoke` event. If you need to emit the `revoke` event, use the `AuthorizationManager.revoke` method.
   */
  reset() {
    /**
     * @todo This should be made specific to the keys generated by the `AuthorizationManager`.
     */
    getStorage().clear();
    this.authenticated = false;
  }

  /**
   * A private utility method to add the `offline_access` scope to a scope string if the `useRefreshTokens` configuration is set to `true`.
   * @param scopes The scope string to modify.
   */
  #withOfflineAccess(scopes: string) {
    return `${scopes}${this.configuration.useRefreshTokens ? ' offline_access' : ''}`;
  }

  #buildTransport(overrides?: Partial<ConstructorParameters<typeof RedirectTransport>[0]>) {
    const scopes = this.#withOfflineAccess(
      overrides?.requested_scopes ?? this.configuration.scopes,
    );

    return new RedirectTransport({
      client_id: this.configuration.client,
      authorization_endpoint: getAuthorizationEndpoint(),
      token_endpoint: getTokenEndpoint(),
      redirect_uri: this.configuration.redirect,
      requested_scopes: scopes,
      ...overrides,
      // @todo Decide if we want to include the `include_consented_scopes` parameter by default.
      // params: {
      //   include_consented_scopes: true,
      //   ...overrides?.params,
      // },
    });
  }

  /**
   * Initiate the login process by redirecting to the Globus Auth login page.
   */
  login() {
    log('debug', 'AuthorizationManager.login');
    this.reset();
    /**
     * In the future, it's possible that we may want to support different types of transports.
     */
    const transport = this.#buildTransport();
    transport.send();
  }

  async handleCodeRedirect(
    options: {
      shouldReplace: GetTokenOptions['shouldReplace'];
    } = { shouldReplace: true },
  ) {
    log('debug', 'AuthorizationManager.handleCodeRedirect');
    const response = await this.#buildTransport().getToken({
      shouldReplace: options?.shouldReplace,
    });
    if (isGlobusAuthTokenResponse(response)) {
      log(
        'debug',
        `AuthorizationManager.handleCodeRedirect | response=${JSON.stringify(response)}`,
      );
      this.addTokenResponse(response);
    }
  }

  /**
   * Handle an error response from a Globus service in the context of this `AuthorizationManager`.
   * This method will introspect the response and attempt to handle any errors that should result
   * in some additional Globus Auth interaction.
   * @param response - The error response from a Globus service.
   * @param execute - Whether to execute the handler immediately or return a function that can be executed later.
   */
  handleErrorResponse(response: Record<string, unknown>, execute?: true): void;
  handleErrorResponse(response: Record<string, unknown>, execute?: false): () => void;
  handleErrorResponse(response: Record<string, unknown>, execute = true) {
    log(
      'debug',
      `AuthorizationManager.handleErrorResponse | response=${JSON.stringify(response)} execute=${execute}`,
    );
    let handler = () => {};
    if (isAuthorizationRequirementsError(response)) {
      log(
        'debug',
        'AuthorizationManager.handleErrorResponse | error=AuthorizationRequirementsError',
      );
      handler = () => this.handleAuthorizationRequirementsError(response);
    }
    if (isConsentRequiredError(response)) {
      log('debug', 'AuthorizationManager.handleErrorResponse | error=ConsentRequiredError');
      handler = () => this.handleConsentRequiredError(response);
    }
    if ('code' in response && response['code'] === 'AuthenticationFailed') {
      log('debug', 'AuthorizationManager.handleErrorResponse | error=AuthenticationFailed');
      handler = () => this.revoke();
    }
    return execute === true ? handler() : handler;
  }

  /**
   * Process a well-formed Authorization Requirements error response from a Globus service
   * and redirect the user to the Globus Auth login page with the necessary parameters.
   */
  handleAuthorizationRequirementsError(response: AuthorizationRequirementsError) {
    this.#transport = this.#buildTransport({
      params: {
        session_message: response.authorization_parameters.session_message,
        session_required_identities:
          response.authorization_parameters.session_required_identities.join(','),
        session_required_mfa: response.authorization_parameters.session_required_mfa,
        session_required_single_domain:
          response.authorization_parameters.session_required_single_domain.join(','),
        prompt: 'login',
      },
    });
    this.#transport.send();
  }

  /**
   * Process a well-formed `ConsentRequired` error response from a Globus service
   * and redirect the user to the Globus Auth login page with the necessary parameters.
   */
  handleConsentRequiredError(response: ConsentRequiredError) {
    this.#transport = this.#buildTransport({
      requested_scopes: this.#withOfflineAccess(response.required_scopes.join(' ')),
    });
    this.#transport.send();
  }

  /**
   * Add a Globus Auth token response to storage, if `other_tokens` are present they are also added.
   * This method is mostly used internally by the `AuthorizationManager`, but can be used by downstream
   * consumers to add tokens to storage if necessary.
   */
  addTokenResponse = (token: Token | TokenResponse) => {
    getStorage().set(`${this.configuration.client}:${token.resource_server}`, token);
    if ('other_tokens' in token) {
      token.other_tokens?.forEach(this.addTokenResponse);
    }
    this.#checkAuthorizationState();
  };

  /**
   * Call `AuthroizationManager.reset`, revoke all of the available tokns, and emit the `revoke` event.
   * @emits AuthorizationManager.events#revoke
   * @see AuthorizationManager.reset
   */
  async revoke() {
    log('debug', 'AuthorizationManager.revoke');
    const revocation = Promise.all(this.tokens.getAll().map(this.#revokeToken.bind(this)));
    this.reset();
    await revocation;
    await this.events.revoke.dispatch();
  }

  /**
   * Revoke a token from a resource server.
   */
  #revokeToken(token: Token) {
    log('debug', `AuthorizationManager.revokeToken | resource_server=${token.resource_server}`);
    return oauth2.token.revoke({
      payload: {
        client_id: this.configuration.client,
        token: token.access_token,
      },
    });
  }
}
