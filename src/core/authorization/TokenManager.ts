/* eslint-disable no-underscore-dangle */
import { CONFIG, isToken } from '../../services/auth/index.js';

import { SERVICES, type Service } from '../global.js';
import { log } from '../logger.js';
import { AuthorizationManager } from './AuthorizationManager.js';

import type { Token, TokenResponse } from '../../services/auth/types.js';

/**
 * The current version of the token storage format the `TokenManager` will
 * process.
 */
const TOKEN_STORAGE_VERSION = 0;

type TokenStorage = {
  /**
   * The version of the token storage format.
   */
  version: typeof TOKEN_STORAGE_VERSION;
  /**
   * State held in the storage.
   */
  state: Record<string, unknown>;
};

type TokenStorageV0 = TokenStorage & {
  version: 0;
  state: {
    tokens: Record<StoredToken['access_token'], StoredToken>;
  };
};

type ByScopeCache = Record<string, StoredToken['access_token']>;

export type StoredToken = (Token | TokenResponse) & {
  /**
   * Tokens stored before the introduction of the `__metadata` field will be missing this property.
   * @since 4.3.0
   */
  __metadata?: {
    /**
     * The timestamp when the token was added to the storage as a number of milliseconds since the Unix epoch.
     *
     * **IMPORTANT**: This value might **not** represent the time when the token was created by the authorization server.
     */
    created: number;
    /**
     * The timestamp when the token will expire as a number of milliseconds since the Unix epoch, based
     * on the `expires_in` value from the token response and the time when the token was stored.
     */
    expires: number | null;
  };
};

export class TokenManager {
  /**
   * The AuthorizationManager instance that the TokenManager is associated with.
   */
  #manager: AuthorizationManager;

  /**
   * The key used to store the TokenStorage in the AuthorizationManager's storage provider.
   */
  #storageKey: string;

  /**
   * A cache of tokens by scope to allow for quick retrieval.
   */
  #byScopeCache: ByScopeCache = {};

  constructor(options: { manager: AuthorizationManager }) {
    this.#manager = options.manager;
    this.#storageKey = `${this.#manager.storageKeyPrefix}TokenManager`;
    /**
     * When the TokenManager is created, we need to check if there is a storage entry and migrate it if necessary.
     * This will ensure `this.#storage` is always the latest version.
     */
    this.#migrate();
  }

  /**
   * Determines whether or not the TokenManager has a storage entry.
   */
  get #hasStorage() {
    return this.#manager.storage.getItem(this.#storageKey) !== null;
  }

  /**
   * Retrieve the TokenStorage from the AuthorizationManager's storage provider.
   */
  get #storage(): TokenStorageV0 {
    const raw = this.#manager.storage.getItem(this.#storageKey);
    if (!raw) {
      throw new Error('@globus/sdk | Unable to retrieve TokenStorage.');
    }
    return JSON.parse(raw);
  }

  /**
   * Store the TokenStorage in the AuthorizationManager's storage provider.
   */
  set #storage(value: TokenStorageV0) {
    this.#manager.storage.setItem(this.#storageKey, JSON.stringify(value));
    /**
     * When the storage is update, we need to rebuild the cache of tokens by scope.
     */
    this.#byScopeCache = Object.values(value.state.tokens).reduce((acc: ByScopeCache, token) => {
      token.scope.split(' ').forEach((scope) => {
        /**
         * If there isn't an existing token for the scope, add it to the cache.
         */
        if (!acc[scope]) {
          acc[scope] = token.access_token;
          return;
        }
        /**
         * If there is an existing token for the scope, compare the expiration times and keep the token that expires later.
         */
        const existing = value.state.tokens[acc[scope]];
        /**
         * If the existing token or the new token is missing the expiration metadata, skip the comparison.
         */
        if (!existing.__metadata?.expires || !token.__metadata?.expires) {
          return;
        }
        if (existing.__metadata.expires < token.__metadata.expires) {
          acc[scope] = token.access_token;
        }
      });
      return acc;
    }, {});
  }

  /**
   * Migrates the token storage to the latest version (if necessary).
   */
  #migrate() {
    if (this.#hasStorage && this.#storage.version === TOKEN_STORAGE_VERSION) {
      /**
       * Storage entry exists and matches the current version.
       */
      return;
    }
    /**
     * Migrate legacy token storage to the new format.
     *
     * Tokens were previously stored as individual items in the storage with keys that
     * included the resource server, e.g. `{client_id}:auth.globus.org`
     */
    const tokens: TokenStorageV0['state']['tokens'] = {};
    Object.keys(this.#manager.storage).forEach((key) => {
      if (key.startsWith(this.#manager.storageKeyPrefix)) {
        const maybeToken = this.#manager.storage.getItem(key);
        if (isToken(maybeToken)) {
          tokens[maybeToken.access_token] = maybeToken;
        }
      }
    }, {});
    this.#storage = {
      version: TOKEN_STORAGE_VERSION,
      state: {
        tokens,
      },
    };
  }

  #getTokenForService(service: Service): StoredToken | null {
    const resourceServer = CONFIG.RESOURCE_SERVERS?.[service];
    return this.getByResourceServer(resourceServer);
  }

  /**
   * Retrieve a token by the `resource_server` and optional `scope`. If a `scope` is provided, the token will be retrieved by the scope.
   * This is useful when your application needs to manage multiple tokens for the same `resource_server`, but with different scopes.
   *
   * **IMPORTANT**: If multiple tokens are found for the same `resource_server` (and no `scope` is provided), the first identified token will be returned.
   * If your application requires multiple tokens for the same `resource_server` this might lead to unexpected behavior (e.g. using the wrong token for requests).
   * In this case, you can use the `scope` parameter to retrieve the token you need, or use the `getAllByResourceServer` method to retrieve all tokens for a `resource_server`
   * and manage them as needed.
   */
  getByResourceServer(resourceServer: string, scope?: string) {
    if (scope) {
      return this.getByScope(scope);
    }
    const tokens = this.getAllByResourceServer(resourceServer);
    if (tokens.length > 1) {
      log(
        'warn',
        `TokenManager.getByResource | Multiple tokens found for resource server, narrow your token selection by providing a "scope" parameter. | resource_server=${resourceServer}`,
      );
    }
    return tokens.length ? tokens[0] : null;
  }

  getAllByResourceServer(resourceServer: string): StoredToken[] {
    return this.getAll().filter((token) => token.resource_server === resourceServer);
  }

  getByScope(scope: string): StoredToken | null {
    return this.#storage.state.tokens[this.#byScopeCache[scope]] || null;
  }

  get auth(): StoredToken | null {
    return this.#getTokenForService(SERVICES.AUTH);
  }

  get transfer(): StoredToken | null {
    return this.#getTokenForService(SERVICES.TRANSFER);
  }

  get flows(): StoredToken | null {
    return this.#getTokenForService(SERVICES.FLOWS);
  }

  get groups(): StoredToken | null {
    return this.#getTokenForService(SERVICES.GROUPS);
  }

  get search(): StoredToken | null {
    return this.#getTokenForService(SERVICES.SEARCH);
  }

  get timer(): StoredToken | null {
    return this.#getTokenForService(SERVICES.TIMERS);
  }

  get compute(): StoredToken | null {
    return this.#getTokenForService(SERVICES.COMPUTE);
  }

  gcs(endpoint: string): StoredToken | null {
    return this.getByResourceServer(endpoint);
  }

  /**
   * Retrieve all tokens from the storage.
   */
  getAll(): StoredToken[] {
    return Object.values(this.#storage?.state.tokens);
  }

  /**
   * Add a token to the storage.
   */
  add(token: Token | TokenResponse) {
    if (!isToken(token)) {
      throw new Error('@globus/sdk | Invalid token provided to TokenManager.add');
    }
    const created = Date.now();
    const expires = created + token.expires_in * 1000;
    const storage = this.#storage;
    /**
     * When adding a token, we **replace** any existing tokens with the same `resource_server` and `scope`
     * by filtering them out of the storage before adding the new token.
     */
    const tokens = Object.entries(storage.state.tokens).reduce((acc, [key, value]) => {
      if (value.resource_server === token.resource_server && value.scope === token.scope) {
        return acc;
      }
      return {
        ...acc,
        [key]: value,
      };
    }, {});
    this.#storage = {
      ...storage,
      state: {
        tokens: {
          ...tokens,
          [token.access_token]: {
            ...token,
            /**
             * Add metadata to the token to track when it was created and when it expires.
             */
            __metadata: {
              created,
              expires,
            },
          },
        },
      },
    };
    if ('other_tokens' in token) {
      token.other_tokens?.forEach((t) => {
        this.add(t);
      });
    }
  }

  remove(token: Token) {
    const storage = this.#storage;
    if (!storage) {
      return;
    }
    delete storage.state.tokens[token.access_token];
    this.#storage = {
      ...storage,
      state: {
        tokens: storage.state.tokens,
      },
    };
  }

  clear() {
    this.#storage = {
      version: TOKEN_STORAGE_VERSION,
      state: {
        tokens: {},
      },
    };
  }

  /**
   * Determines whether or not a stored token is expired.
   * @param token The token to check.
   * @param augment An optional number of milliseconds to add to the current time when checking the expiration.
   * @returns `true` if the token is expired, `false` if it is not expired, and `undefined` if the expiration status cannot be determined
   * based on the token's metadata. This can happen if the token is missing the `__metadata` field or the `expires` field.
   */
  static isTokenExpired(token: StoredToken | null, augment: number = 0): boolean | undefined {
    if (!token || !token.__metadata || typeof token.__metadata.expires !== 'number') {
      return undefined;
    }
    return Date.now() + augment >= token.__metadata.expires;
  }
}
