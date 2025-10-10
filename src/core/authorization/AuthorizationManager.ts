import { jwtDecode } from 'jwt-decode';

import { isGlobusAuthTokenResponse, isRefreshToken, oauth2 } from '../../services/auth/index.js';
import { RESOURCE_SERVERS } from '../../services/auth/config.js';

import { log } from '../logger.js';

import { Event } from './Event.js';
import { GetTokenOptions, RedirectTransport, TransportOptions } from './RedirectTransport.js';
import { TokenManager } from './TokenManager.js';

import {
  isConsentRequiredError,
  isAuthorizationRequirementsError,
  AuthorizationRequirementsError,
  ConsentRequiredError,
  toAuthorizationQueryParams,
} from '../errors.js';

import type {
  JwtUserInfo,
  Token,
  TokenResponse,
  TokenWithRefresh,
} from '../../services/auth/types.js';
import { MemoryStorage } from '../storage/memory.js';
import { PopupTransport } from './PopupTransport.js';

const TRANSPORTS = {
  redirect: RedirectTransport,
  popup: PopupTransport,
};

export type AuthorizationManagerConfiguration = {
  client: string;
  scopes?: string;
  redirect: string;
  /**
   * The storage system used by the `AuthorizationManager`.
   *
   * By default, the `AuthorizationManager` uses an in-memory storage, this option is secure by default.
   *
   * If you want to persist the state of the `AuthorizationManager`, you can use `localStorage`, or provide your own storage system.
   * **It is important to note that using the `localStorage`, or any persistant storage option will preserve authorization and refresh tokens of users.**
   * Best practices for ensuring the security of your application should be followed to protect this data (e.g., ensuring XSS protection).
   *
   * @default MemoryStorage
   */
  storage?: Storage;
  /**
   * The transport method to use for the authorization flow.
   * @default 'redirect'
   */
  transport?: keyof typeof TRANSPORTS;
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
  /**
   * Provide an object with event listeners to attach to the instance.
   * This is useful if you need to listen to events that might dispatch immediately
   * after the creation of the instance (constructor), e.g., the `authenticated`.
   */
  events?: Partial<{
    [Event in keyof AuthorizationManager['events']]: Parameters<
      AuthorizationManager['events'][Event]['addListener']
    >[0];
  }>;
};

const DEFAULT_CONFIGURATION = {
  useRefreshTokens: false,
  defaultScopes: 'openid profile email',
  transport: 'redirect' as const,
};

const DEFAULT_HANDLE_ERROR_OPTIONS = {
  execute: true,
  additionalParams: undefined,
};

/**
 * Provides management of Globus authorization context for your application.
 * - Handles the OAuth protcol flow (via PKCE)
 * - Token lifecycle management
 * - Common errors (e.g., `ConsentRequired`, `authorization_requirements`)
 *
 * Once you configure your instance, you can determine the authenticated state using `manager.authenticated`.
 *
 * To prompt a user to authenticate, call `manager.login()` on user interaction – this will initiate the OAuth protocol flow with your configured client and scopes, resulting in an initial redirect to Globus Auth.
 *
 * Once the user authenticates with Globus Auth, they will be redirected to your application using the configured `redirect` URL. On this URL, you will need to call `manager.handleCodeRedirect` (using a manager instance configured in the same manner that initiated the `manager.login()` call) to complete the PKCE flow, exchanging the provided code for a valid token, or tokens.
 *
 * All tokens managed by the `AuthorizationManager` instance can be found on `manager.token`.
 *
 * ### Registering your Globus Application
 *
 * The `AuthorizationManager` expects your Globus Application to be registered as an OAuth public client.
 * In this Globus Web Application, this option is referenced as "_Register a thick client or script that will be installed and run by users on their devices_".
 *
 * @example Creating an AuthorizationManager instance.
 * ```ts
 * import { authorization } from "globus/sdk";
 *
 * const manager = authorization.create({
 *  // Your registered Globus Application client ID.
 *  client: '...',
 *  // The redirect URL for your application; Where you will call `manager.handleCodeRedirect()`
 *  redirect: 'https://example.com/callback',
 *  // Known scopes required by your application.
 *  scopes: 'urn:globus:auth:scope:transfer.api.globus.org:all',
 * });
 * ```
 *
 * ### Usage with Service Methods
 *
 * Once you have an instance of an `AuthorizationManager`, it can be passed to any service method as `ServiceMethodOptions.manager` or `SDKOptions.manager` option.
 * The service method will determine if a token is required to make the request and will use the `AuthorizationManager` to retrieve the token.
 *
 * @example Using the AuthorizationManager with a service method.
 *```ts
 * import { transfer } from "globus/sdk";
 * const manager = authorization.create({ ... });
 * const result = await (
 *  await globus.transfer.endpointSearch({
 *    query: { filter_fulltext: "Globus"},
 *    manager
 *  })
 * ).json();
 *```
 */
export class AuthorizationManager {
  #transport!: RedirectTransport | PopupTransport;

  configuration: AuthorizationManagerConfiguration;

  /**
   * The storage system used by the `AuthorizationManager`.
   * @implements Storage
   */
  storage: Storage;

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
    /**
     * Avoid emitting the event if the value hasn't changed.
     */
    if (value === this.#authenticated) {
      return;
    }
    this.#authenticated = value;
    this.#emitAuthenticatedState();
  }

  tokens: TokenManager;

  events = {
    /**
     * Emitted when the authenticated state changes.
     * @event AuthorizationManager.events#authenticated
     * @type {object}
     * @property {boolean} isAuthenticated - Whether the `AuthorizationManager` is authenticated.
     */
    authenticated: new Event<
      'authenticated',
      {
        /**
         * Whether the `AuthorizationManager` is authenticated.
         * @see {@link AuthorizationManager.authenticated}
         */
        isAuthenticated: boolean;
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
     * Configure the storage system for the instance, defaulting to an in-memory storage system.
     */

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
        : (configuration.defaultScopes ?? DEFAULT_CONFIGURATION.defaultScopes);

    this.configuration = {
      ...DEFAULT_CONFIGURATION,
      ...configuration,
      scopes: [configuration.scopes ? configuration.scopes : '', scopes]
        .filter((s) => s.length)
        .join(' '),
    };

    this.storage = configuration.storage || new MemoryStorage();

    /**
     * If an `events` object is provided, add the listeners to the instance before
     * any event might be dispatched.
     */
    if (this.configuration.events) {
      Object.entries(this.configuration.events).forEach(([name, callback]) => {
        if (name in this.events) {
          this.events[name as keyof AuthorizationManager['events']].addListener(callback);
        }
      });
    }

    this.tokens = new TokenManager({
      manager: this,
    });
    this.#checkAuthorizationState();
  }

  get storageKeyPrefix() {
    return `${this.configuration.client}:`;
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
    const token = this.tokens
      .getAll()
      .find((t) => t.resource_server === RESOURCE_SERVERS.AUTH && t.scope.includes('openid'));
    return token && 'id_token' in token && token.id_token
      ? jwtDecode<JwtUserInfo>(token.id_token)
      : null;
  }

  /**
   * Attempt to refresh all of the tokens managed by the instance.
   * This method will only attempt to refresh tokens that have a `refresh_token` attribute.
   */
  async refreshTokens() {
    log('debug', 'AuthorizationManager.refreshTokens');
    const tokens = await Promise.allSettled(
      this.tokens.getAll().map((token) => {
        if (isRefreshToken(token)) {
          return this.refreshToken(token);
        }
        return Promise.resolve(null);
      }),
    );
    this.#checkAuthorizationState();
    return tokens;
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
        return response;
      }
    } catch (error) {
      log('error', `AuthorizationManager.refreshToken | resource_server=${token.resource_server}`);
    }
    return null;
  }

  /**
   * Whether or not the instance has a reference to a Globus Auth token.
   * @deprecated Use `AuthorizationManager.tokens.auth` instead.
   */
  hasGlobusAuthToken() {
    return Boolean(this.tokens.auth);
  }

  /**
   * Retrieve the Globus Auth token managed by the instance.
   * @deprecated Use `AuthorizationManager.tokens.auth` instead.
   */
  getGlobusAuthToken() {
    return this.tokens.auth;
  }

  #checkAuthorizationState() {
    log('debug', 'AuthorizationManager.#checkAuthorizationState');
    this.authenticated = Boolean(this.tokens.auth);
  }

  async #emitAuthenticatedState() {
    await this.events.authenticated.dispatch({
      isAuthenticated: this.authenticated,
    });
  }

  /**
   * Reset the authenticated state and clear all tokens from storage.
   * This method **does not** emit the `revoke` event. If you need to emit the `revoke` event, use the `AuthorizationManager.revoke` method.
   */
  reset() {
    Object.keys(this.storage).forEach((key) => {
      if (key.startsWith(this.storageKeyPrefix)) {
        this.storage.removeItem(key);
      }
    });
    this.authenticated = false;
  }

  /**
   * A private utility method to add the `offline_access` scope to a scope string if the `useRefreshTokens` configuration is set to `true`.
   * @param scopes The scope string to modify.
   */
  #withOfflineAccess(scopes: string) {
    return `${scopes}${this.configuration.useRefreshTokens ? ' offline_access' : ''}`;
  }

  #buildTransport(options?: Partial<TransportOptions>) {
    const { scopes, ...overrides } = options ?? {};
    const TransportFactory = TRANSPORTS[this.configuration.transport || 'redirect'];

    let scopesToRequest = this.#withOfflineAccess(scopes ?? (this.configuration.scopes || ''));

    if (this.storage instanceof MemoryStorage) {
      /**
       * If the in-memory storage is used, we have to make sure when requesting additional
       * consent the original configured scopes are included in the request.
       *
       * This will ensure we recieve a token for all of resource servers that were originally requested,
       * in addition to any new scopes that are requested.
       */
      scopesToRequest = [
        // Use a Set to deduplicate the scopes.
        ...new Set(
          scopesToRequest.split(' ').concat((this.configuration?.scopes || '').split(' ')),
        ),
      ].join(' ');
    }

    return new TransportFactory({
      client: this.configuration.client,
      redirect: this.configuration.redirect,
      scopes: scopesToRequest,
      ...overrides,
      params: {
        ...overrides?.params,
      },
    });
  }

  /**
   * Initiate the login process by redirecting to the Globus Auth login page.
   *
   * **IMPORTANT**: This method will **reset the instance state before initiating the login process,
   * including clearing all tokens from storage**. If you need to maintain the current state,
   * use the `AuthorizationManager.prompt()` method.
   *
   * @example Passing parameters to the transport.
   * const result = await manager.login({
   *   additionalParams: {
   *     redirect_uri: '/oauth/redirect-uri-runtime-override',
   *   },
   * });
   */
  async login(options = { additionalParams: {} }) {
    log('debug', 'AuthorizationManager.login');
    this.reset();
    /**
     * In the future, it's possible that we may want to support different types of transports.
     */
    const transport = this.#buildTransport({ params: options?.additionalParams });
    const result = await transport.send();
    if (isGlobusAuthTokenResponse(result)) {
      this.addTokenResponse(result);
    }
    return result;
  }

  /**
   * Prompt the user to authenticate with Globus Auth.
   *
   * @example Passing parameters to the transport.
   * const result = await manager.prompt({
   *   additionalParams: {
   *     redirect_uri: '/oauth/redirect-uri-runtime-override',
   *   },
   * });
   */
  async prompt(options?: Partial<TransportOptions>) {
    log('debug', 'AuthorizationManager.prompt');
    const transport = this.#buildTransport(options);
    const result = await transport.send();
    if (isGlobusAuthTokenResponse(result)) {
      this.addTokenResponse(result);
    }
    return result;
  }

  /**
   * This method will attempt to complete the PKCE protocol flow.
   */
  async handleCodeRedirect(
    options: {
      shouldReplace?: GetTokenOptions['shouldReplace'];
      includeConsentedScopes?: GetTokenOptions['includeConsentedScopes'];
      additionalParams?: TransportOptions['params'];
    } = { shouldReplace: true, additionalParams: {} },
  ) {
    log('debug', 'AuthorizationManager.handleCodeRedirect');
    const response = await this.#buildTransport({ params: options?.additionalParams }).getToken({
      shouldReplace: options?.shouldReplace,
      includeConsentedScopes: options?.includeConsentedScopes,
    });
    if (isGlobusAuthTokenResponse(response)) {
      log(
        'debug',
        `AuthorizationManager.handleCodeRedirect | response=${JSON.stringify(response)}`,
      );
      this.addTokenResponse(response);
    }
    return response;
  }

  /**
   * Handle an error response from a Globus service in the context of this `AuthorizationManager`.
   * This method will introspect the response and attempt to handle any errors that should result
   * in some additional Globus Auth interaction.
   * @param response The error response from a Globus service.
   * @param {object|boolean} options Options for handling the error response. If a boolean is provided, this will be treated as the `options.execute` value.
   * @param options.execute Whether to execute the handler immediately.
   * @param options.additionalParams Additional query parameters to be included with the transport generated URL.
   */
  async handleErrorResponse(
    response: Record<string, unknown>,
    options?: { execute?: true; additionalParams?: TransportOptions['params'] } | true,
  ): Promise<void>;
  async handleErrorResponse(
    response: Record<string, unknown>,
    options?: { execute?: false; additionalParams?: TransportOptions['params'] } | false,
  ): Promise<() => Promise<void>>;
  async handleErrorResponse(
    response: Record<string, unknown>,
    options?: { execute?: boolean; additionalParams?: TransportOptions['params'] } | boolean,
  ) {
    const opts =
      typeof options === 'boolean'
        ? {
            ...DEFAULT_HANDLE_ERROR_OPTIONS,
            execute: options,
          }
        : {
            ...DEFAULT_HANDLE_ERROR_OPTIONS,
            ...options,
          };
    log(
      'debug',
      `AuthorizationManager.handleErrorResponse | response=${JSON.stringify(response)} execute=${opts.execute}`,
    );
    let handler = async () => {};
    if (isAuthorizationRequirementsError(response)) {
      log(
        'debug',
        'AuthorizationManager.handleErrorResponse | error=AuthorizationRequirementsError',
      );
      handler = async () => {
        await this.handleAuthorizationRequirementsError(response, {
          additionalParams: opts.additionalParams,
        });
      };
    }
    if (isConsentRequiredError(response)) {
      log('debug', 'AuthorizationManager.handleErrorResponse | error=ConsentRequiredError');
      handler = async () => {
        await this.handleConsentRequiredError(response, {
          additionalParams: opts.additionalParams,
        });
      };
    }
    if ('code' in response && response['code'] === 'AuthenticationFailed') {
      log('debug', 'AuthorizationManager.handleErrorResponse | error=AuthenticationFailed');
      handler = async () => {
        await this.revoke();
      };
    }

    const returnValue = opts.execute === true ? await handler() : handler;
    return returnValue;
  }

  /**
   * Process a well-formed Authorization Requirements error response from a Globus service
   * and redirect the user to the Globus Auth login page with the necessary parameters.
   */
  async handleAuthorizationRequirementsError(
    response: AuthorizationRequirementsError,
    options?: { additionalParams?: TransportOptions['params'] },
  ) {
    this.#transport = this.#buildTransport({
      params: {
        prompt: 'login',
        ...toAuthorizationQueryParams(response),
        ...options?.additionalParams,
      },
    });
    await this.#transport.send();
  }

  /**
   * Process a well-formed `ConsentRequired` error response from a Globus service
   * and redirect the user to the Globus Auth login page with the necessary parameters.
   */
  async handleConsentRequiredError(
    response: ConsentRequiredError,
    options?: { additionalParams?: TransportOptions['params'] },
  ) {
    this.#transport = this.#buildTransport({
      scopes: this.#withOfflineAccess(response.required_scopes.join(' ')),
      params: {
        ...options?.additionalParams,
      },
    });
    await this.#transport.send();
  }

  /**
   * Add a Globus Auth token response to storage, if `other_tokens` are present they are also added.
   * This method is mostly used internally by the `AuthorizationManager`, but can be used by downstream
   * consumers to add tokens to storage if necessary.
   */
  addTokenResponse = (token: Token | TokenResponse) => {
    this.tokens.add(token);
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
