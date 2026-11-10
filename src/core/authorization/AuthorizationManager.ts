import { jwtDecode } from 'jwt-decode';

import {
  getAuthorizationEndpoint,
  getNativeAppRedirectURI,
  isGlobusAuthTokenResponse,
  isRefreshToken,
  oauth2,
} from '../../services/auth/index.js';
import { RESOURCE_SERVERS } from '../../services/auth/config.js';

import { log } from '../logger.js';

import { Event } from './Event.js';
import { GetTokenOptions, RedirectTransport, TransportOptions } from './RedirectTransport.js';
import { TokenManager } from './TokenManager.js';
import { isTokenExpired, type StoredToken } from './StoredToken.js';
import {
  generateCodeChallenge,
  generateCodeVerifier,
  generateState,
  type AuthorizationRequestParameters,
} from './pkce.js';

import {
  isConsentRequiredError,
  isAuthorizationRequirementsError,
  AuthorizationRequirementsError,
  ConsentRequiredError,
  toAuthorizationQueryParams,
} from '../errors.js';
import { OAuthTokenError } from './OAuthTokenError.js';

import type {
  JwtUserInfo,
  Token,
  TokenResponse,
  TokenWithRefresh,
} from '../../services/auth/types.js';
import { MemoryStorage } from '../storage/memory.js';
import { getStorageKeys } from '../storage/utils.js';
import { PopupTransport } from './PopupTransport.js';

const TRANSPORTS = {
  redirect: RedirectTransport,
  popup: PopupTransport,
};

export type AuthorizationManagerConfiguration = {
  client: string;
  scopes?: string;
  /**
   * The redirect URL used by the browser transports (`redirect`, `popup`); This is where you will call `manager.handleCodeRedirect()`.
   *
   * **Required** when using `login()`, `prompt()`, `handleCodeRedirect()`, or `handleErrorResponse()`
   * (an error is thrown if it is missing). It is not required for applications that only manage existing tokens,
   * or that use `startAuthorization()` and `completeAuthorization()` (e.g., native applications in Node.js).
   */
  redirect?: string;
  /**
   * The prefix used for keys of items stored by the instance.
   *
   * Use this option to isolate tokens when a single storage is shared by multiple instances that use the same `client`,
   * e.g., a file in a user's home directory shared between the `sandbox` and `production` Globus environments.
   *
   * **IMPORTANT**: A prefix should not be the start of another instance's prefix (e.g., `client:` and `client:sandbox:`)
   * when they share a storage, otherwise the instance with the shorter prefix will also enumerate (and `reset()`) the
   * other instance's tokens. Prefer prefixes that differ at the start, e.g., `sandbox:client:` and `production:client:`.
   *
   * Changing this value for an existing application will "log out" existing users; tokens stored with the previous
   * prefix will not be found.
   *
   * @default `${client}:`
   */
  storageKeyPrefix?: string;
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

/**
 * A token revocation request that did not succeed during `AuthorizationManager.revoke()`.
 */
export type TokenRevocationFailure = {
  /**
   * The resource server of the token that could not be revoked.
   */
  resource_server: string;
  /**
   * Which value of the token could not be revoked.
   */
  token: 'access_token' | 'refresh_token';
  /**
   * The response from Globus Auth, when it responded with a non-2xx status.
   */
  response?: Response;
  /**
   * The error thrown while making the request (e.g., a network error).
   */
  error?: unknown;
};

export type TokenRevocationResult = {
  /**
   * Revocation requests that did not succeed. Tokens are removed from storage regardless.
   */
  failures: TokenRevocationFailure[];
};

export type StartAuthorizationOptions = {
  /**
   * The redirect URL for the authorization flow, e.g., a loopback address (`http://127.0.0.1:<port>/...`).
   * @default The configured `redirect`, or the Globus Auth "auth code" page (see `auth.getNativeAppRedirectURI()`).
   */
  redirect?: string;
  /**
   * Scopes to request instead of the configured `scopes`.
   */
  scopes?: string;
  /**
   * Additional (or overriding) query parameters for the authorization request,
   * e.g., `{ prompt: 'login' }` or `{ state: '...' }`.
   */
  params?: Record<string, string>;
};

/**
 * An authorization request created by `AuthorizationManager.startAuthorization()`.
 *
 * **IMPORTANT**: `code_verifier` is a secret; keep it in memory, or wherever your application keeps tokens, until the flow is completed.
 */
export type AuthorizationRequest = {
  /**
   * The Globus Auth authorization URL the user should be directed to.
   */
  url: string;
  state: string;
  code_verifier: string;
  redirect_uri: string;
  scope: string;
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
     * @type {object}
     * @property {TokenRevocationFailure[]} failures - Revocation requests that did not succeed (tokens are removed from storage regardless).
     */
    revoke: new Event<'revoke', TokenRevocationResult>('revoke'),
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
    return this.configuration.storageKeyPrefix ?? `${this.configuration.client}:`;
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
   * In-flight refresh requests, keyed by resource server.
   */
  #refreshes = new Map<string, Promise<TokenResponse>>();

  /**
   * Use the `refresh_token` attribute of a token to obtain a new access token.
   *
   * Only one refresh request is made at a time for a resource server; concurrent calls
   * for the same resource server will receive the result of the in-flight request.
   *
   * If the response omits a `refresh_token`, the existing refresh token is preserved.
   *
   * @param token The well-formed token with a `refresh_token` attribute.
   * @param options.throwOnError When `true`, an `OAuthTokenError` is thrown when the token cannot be refreshed,
   * instead of resolving `null`. Use this to distinguish a refused refresh (`error.requiresReauthentication`)
   * from an outage (`error.status >= 500`) or a network error (`error.status === undefined`).
   * @returns The token response, or `null` if the token could not be refreshed (unless `throwOnError` is set).
   */
  async refreshToken(
    token: TokenWithRefresh,
    options: { throwOnError: true },
  ): Promise<TokenResponse>;
  async refreshToken(
    token: TokenWithRefresh,
    options?: { throwOnError?: boolean },
  ): Promise<TokenResponse | null>;
  async refreshToken(token: TokenWithRefresh, options?: { throwOnError?: boolean }) {
    log('debug', `AuthorizationManager.refreshToken | resource_server=${token.resource_server}`);
    const { resource_server: resourceServer } = token;
    let refresh = this.#refreshes.get(resourceServer);
    if (!refresh) {
      refresh = this.#refresh(token).finally(() => {
        this.#refreshes.delete(resourceServer);
      });
      this.#refreshes.set(resourceServer, refresh);
    }
    try {
      return await refresh;
    } catch (error) {
      if (options?.throwOnError) {
        throw error;
      }
      log('error', `AuthorizationManager.refreshToken | resource_server=${token.resource_server}`);
      return null;
    }
  }

  /**
   * Perform a refresh request and store the result.
   * @throws {OAuthTokenError}
   */
  async #refresh(token: TokenWithRefresh): Promise<TokenResponse> {
    const details = {
      grant_type: 'refresh_token' as const,
      resource_server: token.resource_server,
    };
    let response: Response;
    try {
      response = await oauth2.token.refresh({
        payload: {
          client_id: this.configuration.client,
          refresh_token: token.refresh_token,
          grant_type: 'refresh_token',
        },
      });
    } catch (cause) {
      throw new OAuthTokenError('Unable to refresh token: the request failed.', details, { cause });
    }
    let body: unknown = null;
    try {
      body = await response.json();
    } catch (_e) {
      // The response body is not JSON; handled below.
    }
    if (!response.ok || !isGlobusAuthTokenResponse(body)) {
      throw new OAuthTokenError(
        `Unable to refresh token: Globus Auth responded with status ${response.status}.`,
        { ...details, status: response.status, body },
      );
    }
    /**
     * A refresh response is allowed to omit `refresh_token`, in which case the client
     * should continue to use the existing refresh token.
     * @see https://datatracker.ietf.org/doc/html/rfc6749#section-6
     */
    const refreshed =
      !body.refresh_token && body.resource_server === token.resource_server
        ? { ...body, refresh_token: token.refresh_token }
        : body;
    this.addTokenResponse(refreshed);
    return refreshed;
  }

  /**
   * Get a token for a resource server that is valid for at least `minValidityMs`, refreshing it if necessary (and possible).
   *
   * - When the stored token is valid for at least `minValidityMs`, it is returned as-is.
   * - Otherwise, when the token has a `refresh_token`, it is refreshed (see `refreshToken` – one refresh at a time per resource server)
   *   and the new token is returned.
   * - When the token can't be refreshed (no `refresh_token`, or the refresh fails), the stored token is returned if it
   *   is not yet expired, otherwise `null`.
   * - Tokens without expiration metadata (stored before `4.3.0`) are returned as-is.
   *
   * An expired token is never returned.
   *
   * @example
   * ```ts
   * const token = await manager.getToken('transfer.api.globus.org', { minValidityMs: 30_000 });
   * if (!token) {
   *   // The user needs to authenticate.
   * }
   * ```
   * @param resourceServer The resource server of the token, e.g., `transfer.api.globus.org`.
   * @param options.minValidityMs The minimum number of milliseconds the token should be valid for. @default 0
   * @param options.throwOnError When `true`, a failed refresh throws an `OAuthTokenError` instead of falling back
   * to the stored token or `null`. `null` is still returned when there is no stored token.
   */
  async getToken(
    resourceServer: string,
    options?: { minValidityMs?: number; throwOnError?: boolean },
  ): Promise<StoredToken | null> {
    const token = this.tokens.getByResourceServer(resourceServer);
    if (!token || isTokenExpired(token, options?.minValidityMs ?? 0) !== true) {
      return token;
    }
    const usable = isTokenExpired(token) ? null : token;
    if (!isRefreshToken(token)) {
      return usable;
    }
    try {
      await this.refreshToken(token, { throwOnError: true });
    } catch (error) {
      if (options?.throwOnError) {
        throw error;
      }
      log(
        'warn',
        `AuthorizationManager.getToken | refresh failed | resource_server=${resourceServer}`,
      );
      return usable;
    }
    return this.tokens.getByResourceServer(resourceServer);
  }

  /**
   * Whether or not the instance has a reference to a Globus Auth token.
   */
  hasGlobusAuthToken() {
    return this.getGlobusAuthToken() !== null;
  }

  /**
   * Retrieve the Globus Auth token managed by the instance.
   */
  getGlobusAuthToken() {
    const entry = this.storage.getItem(`${this.storageKeyPrefix}${RESOURCE_SERVERS.AUTH}`);
    return entry ? JSON.parse(entry) : null;
  }

  #checkAuthorizationState() {
    log('debug', 'AuthorizationManager.#checkAuthorizationState');
    if (this.hasGlobusAuthToken()) {
      this.authenticated = true;
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

  /**
   * Reset the authenticated state and clear all tokens from storage.
   * This method **does not** emit the `revoke` event. If you need to emit the `revoke` event, use the `AuthorizationManager.revoke` method.
   */
  reset() {
    /**
     * Keys are collected before any items are removed; removing items while iterating
     * with `Storage.key(index)` would shift the indexes.
     */
    getStorageKeys(this.storage).forEach((key) => {
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

  /**
   * Determine the scopes to request for an authorization flow.
   * @param scopes Scopes to request instead of the configured scopes.
   */
  #resolveScopes(scopes?: string) {
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
      ]
        .filter((scope) => scope.length)
        .join(' ');
    }
    return scopesToRequest;
  }

  #buildTransport(options?: Partial<TransportOptions>) {
    const { scopes, ...overrides } = options ?? {};
    const TransportFactory = TRANSPORTS[this.configuration.transport || 'redirect'];

    const redirect = overrides.redirect ?? this.configuration.redirect;
    if (!redirect) {
      throw new Error(
        'A `redirect` must be configured to use the browser-based transports (`redirect`, `popup`). To authorize without a browser transport, use `startAuthorization()` and `completeAuthorization()`.',
      );
    }

    return new TransportFactory({
      client: this.configuration.client,
      scopes: this.#resolveScopes(scopes),
      ...overrides,
      redirect,
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
   * Start an authorization code flow (with PKCE) **without** using a browser transport, e.g., in a CLI,
   * a local MCP server, or a desktop application.
   *
   * This method only builds the authorization request; it does not navigate, open a browser, or modify the instance state.
   * Direct the user to the returned `url`, then pass the returned request, along with the `code` (and `state`) received
   * on the redirect, to `completeAuthorization()`.
   *
   * Unlike `login()`, the instance is **not** reset; tokens obtained with `completeAuthorization()` are added
   * to the existing tokens, so this can be used to request additional consents.
   *
   * @example Using the Globus Auth "auth code" page (the user copies the code into your application).
   * ```ts
   * const request = await manager.startAuthorization();
   * console.log(`Please log in: ${request.url}`);
   * const code = await readCodeFromStdin();
   * await manager.completeAuthorization(request, { code });
   * ```
   * @example Using a loopback redirect (your application listens on `http://127.0.0.1:<port>`).
   * ```ts
   * const request = await manager.startAuthorization({ redirect: 'http://127.0.0.1:8080/callback' });
   * openBrowser(request.url);
   * // ...in the HTTP handler for `/callback`:
   * await manager.completeAuthorization(request, new URL(req.url, 'http://127.0.0.1:8080'));
   * ```
   */
  async startAuthorization(options?: StartAuthorizationOptions): Promise<AuthorizationRequest> {
    log('debug', 'AuthorizationManager.startAuthorization');
    const codeVerifier = generateCodeVerifier();
    const state = options?.params?.['state'] ?? generateState();
    const redirect = options?.redirect ?? this.configuration.redirect ?? getNativeAppRedirectURI();
    const params: AuthorizationRequestParameters = {
      response_type: 'code',
      client_id: this.configuration.client,
      scope: this.#resolveScopes(options?.scopes),
      redirect_uri: redirect,
      state,
      code_challenge: await generateCodeChallenge(codeVerifier),
      code_challenge_method: 'S256',
      ...options?.params,
    };
    const url = new URL(getAuthorizationEndpoint());
    url.search = new URLSearchParams(params).toString();
    return {
      url: url.toString(),
      state: params.state,
      code_verifier: codeVerifier,
      redirect_uri: params.redirect_uri,
      scope: params.scope,
    };
  }

  /**
   * Complete an authorization code flow started with `startAuthorization()`: validate the `state`,
   * exchange the `code` for tokens, and add them to the instance (without resetting existing tokens).
   *
   * @param request The value returned by `startAuthorization()`.
   * @param callback The `code` (and `state`) received on the redirect. A `URL` or `URLSearchParams` of the redirect
   * can be provided directly. `state` is validated whenever it is provided; it can be omitted when the user copies
   * the `code` from the Globus Auth "auth code" page.
   * @param options.includeConsentedScopes Return tokens for all scopes the user has consented to for the client.
   * @throws An `Error` if the redirect contains an `error` or the `state` does not match, or an `OAuthTokenError`
   * if the code could not be exchanged.
   */
  async completeAuthorization(
    request: Pick<AuthorizationRequest, 'state' | 'code_verifier' | 'redirect_uri'>,
    callback: { code: string; state?: string | null } | URL | URLSearchParams,
    options?: { includeConsentedScopes?: boolean },
  ): Promise<TokenResponse> {
    log('debug', 'AuthorizationManager.completeAuthorization');
    let code: string | null;
    let state: string | null | undefined;
    if (callback instanceof URL || callback instanceof URLSearchParams) {
      const params = callback instanceof URL ? callback.searchParams : callback;
      if (params.get('error')) {
        throw new Error(
          params.get('error_description') || 'An error occurred during the authorization process.',
        );
      }
      code = params.get('code');
      state = params.get('state');
    } else {
      ({ code, state } = callback);
    }
    if (!code) {
      throw new Error('Missing authorization code.');
    }
    if (state !== undefined && state !== null && state !== request.state) {
      throw new Error(
        'Invalid State. The received "state" parameter does not match the expected state.',
      );
    }
    const details = { grant_type: 'authorization_code' as const };
    let response: Response;
    try {
      response = await oauth2.token.exchange({
        query: options?.includeConsentedScopes ? { include_consented_scopes: true } : undefined,
        payload: {
          grant_type: 'authorization_code',
          code,
          client_id: this.configuration.client,
          code_verifier: request.code_verifier,
          redirect_uri: request.redirect_uri,
        },
      });
    } catch (cause) {
      throw new OAuthTokenError(
        'Unable to exchange authorization code: the request failed.',
        details,
        {
          cause,
        },
      );
    }
    let body: unknown = null;
    try {
      body = await response.json();
    } catch (_e) {
      // The response body is not JSON; handled below.
    }
    if (!response.ok || !isGlobusAuthTokenResponse(body)) {
      throw new OAuthTokenError(
        `Unable to exchange authorization code: Globus Auth responded with status ${response.status}.`,
        { ...details, status: response.status, body },
      );
    }
    this.addTokenResponse(body);
    return body;
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
   * Revoke all of the available tokens (access tokens **and** refresh tokens), call `AuthorizationManager.reset`,
   * and emit the `revoke` event.
   *
   * The instance is always reset (all tokens are removed from storage), and the `revoke` event is always
   * emitted, even when one or more revocation requests fail. Failed revocations are reported in the
   * resolved value (and the `revoke` event payload) so they can be logged or retried.
   *
   * @emits AuthorizationManager.events#revoke
   * @see AuthorizationManager.reset
   */
  async revoke(): Promise<TokenRevocationResult> {
    log('debug', 'AuthorizationManager.revoke');
    /**
     * Requests are dispatched before the reset, using the tokens that are in storage now.
     */
    const revocation = Promise.all(this.tokens.getAll().flatMap((t) => this.#revokeToken(t)));
    this.reset();
    const failures = (await revocation).filter((f): f is TokenRevocationFailure => f !== null);
    failures.forEach((f) => {
      log(
        'warn',
        `AuthorizationManager.revoke | Unable to revoke token | resource_server=${f.resource_server} token=${f.token}`,
      );
    });
    const result = { failures };
    await this.events.revoke.dispatch(result);
    return result;
  }

  /**
   * Revoke a token's `access_token` (and `refresh_token`, when present) with Globus Auth.
   * @returns One promise per revocation request; each resolves to a `TokenRevocationFailure`, or `null` on success. The promises never reject.
   */
  #revokeToken(token: Token): Promise<TokenRevocationFailure | null>[] {
    log('debug', `AuthorizationManager.revokeToken | resource_server=${token.resource_server}`);
    const values: [TokenRevocationFailure['token'], string][] = [
      ['access_token', token.access_token],
    ];
    if (token.refresh_token) {
      values.push(['refresh_token', token.refresh_token]);
    }
    return values.map(async ([type, value]) => {
      const failure = { resource_server: token.resource_server, token: type };
      try {
        const response = await oauth2.token.revoke({
          payload: {
            client_id: this.configuration.client,
            token: value,
          },
        });
        return response && response.ok === false ? { ...failure, response } : null;
      } catch (error) {
        return { ...failure, error };
      }
    });
  }
}
