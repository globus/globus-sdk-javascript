/* eslint-disable no-underscore-dangle */
import { CONFIG, isToken } from '../../services/auth/index.js';

import { SERVICES } from '../global.js';
import { log } from '../logger.js';
import { AuthorizationManager } from './AuthorizationManager.js';
import { getStorageKeys } from '../storage/utils.js';

import type { Token, TokenResponse } from '../../services/auth/types.js';

/**
 * The current version of the token storage format the `TokenManager` will
 * process.
 */
export const TOKEN_STORAGE_VERSION = 0;

type BaseTokenStorage = {
  /**
   * The version of the token storage format.
   */
  version: typeof TOKEN_STORAGE_VERSION;
  /**
   * State held in the storage.
   */
  state: Record<string, unknown>;
};

type TokenStorageV0 = BaseTokenStorage & {
  version: 0;
  state: {
    tokens: Record<StoredToken['access_token'], StoredToken>;
  };
};

/**
 * The `TokenStorage` type represents the currently supported token storage format.
 */
export type TokenStorage = TokenStorageV0;

function createEmptyStorage(): TokenStorage {
  return {
    version: TOKEN_STORAGE_VERSION,
    state: {
      tokens: {},
    },
  };
}

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

/**
 * Split a scope string into individual scopes.
 *
 * Scopes are separated by spaces, but dependent scopes (`scope[dependent another]`) can
 * contain spaces inside brackets, so only spaces outside of brackets separate scopes.
 */
export function parseScopes(scopes: string = ''): string[] {
  const parsed: string[] = [];
  let depth = 0;
  let current = '';
  [...scopes].forEach((char) => {
    if (char === '[') depth += 1;
    if (char === ']') depth = Math.max(0, depth - 1);
    if (char === ' ' && depth === 0) {
      if (current) parsed.push(current);
      current = '';
      return;
    }
    current += char;
  });
  if (current) parsed.push(current);
  return parsed;
}

/**
 * Whether two scope strings contain the same scopes (regardless of order).
 */
function isSameScope(a: string = '', b: string = '') {
  const left = new Set(parseScopes(a));
  const right = new Set(parseScopes(b));
  return left.size === right.size && [...right].every((s) => left.has(s));
}

/**
 * Sort tokens so the most recently stored token is first; tokens without metadata are last.
 */
function byMostRecent(a: StoredToken, b: StoredToken) {
  return (b.__metadata?.created ?? -Infinity) - (a.__metadata?.created ?? -Infinity);
}

export class TokenManager {
  /**
   * The AuthorizationManager instance that the TokenManager is associated with.
   */
  #manager: AuthorizationManager;

  /**
   * The key used to store the TokenStorage in the AuthorizationManager's storage provider.
   */
  storageKey: string;

  constructor(options: { manager: AuthorizationManager }) {
    this.#manager = options.manager;
    this.storageKey = `${this.#manager.storageKeyPrefix}TokenManager`;
    /**
     * When the TokenManager is created, check for tokens stored in the legacy format and migrate them.
     */
    this.#migrate();
  }

  /**
   * Read the TokenStorage from the AuthorizationManager's storage provider.
   *
   * The storage is read (and parsed) on every access, rather than cached on the instance, so
   * changes made by other instances, browser tabs, or processes sharing the storage are observed.
   */
  #read(): TokenStorage {
    const raw = this.#manager.storage.getItem(this.storageKey);
    if (!raw) {
      return createEmptyStorage();
    }
    try {
      const parsed = JSON.parse(raw);
      if (
        parsed?.version === TOKEN_STORAGE_VERSION &&
        typeof parsed.state?.tokens === 'object' &&
        parsed.state.tokens !== null
      ) {
        return parsed;
      }
    } catch (_e) {
      // Handled below.
    }
    log('warn', `TokenManager | Unable to process stored tokens | key=${this.storageKey}`);
    return createEmptyStorage();
  }

  /**
   * Write the TokenStorage to the AuthorizationManager's storage provider.
   */
  #write(value: TokenStorage) {
    this.#manager.storage.setItem(this.storageKey, JSON.stringify(value));
  }

  /**
   * Migrates legacy token storage to the latest version (if necessary).
   *
   * Tokens were previously stored as individual items in the storage with keys that
   * included the resource server, e.g. `{client_id}:auth.globus.org`. Migrated items are
   * removed from the storage, so tokens (and refresh tokens) are not persisted twice.
   *
   * @since v7
   */
  #migrate() {
    const { storage, storageKeyPrefix } = this.#manager;
    const tokens: TokenStorage['state']['tokens'] = {};
    const migrated: string[] = [];
    getStorageKeys(storage)
      .filter((key) => key.startsWith(storageKeyPrefix) && key !== this.storageKey)
      .forEach((key) => {
        let parsed: unknown;
        try {
          parsed = JSON.parse(storage.getItem(key) || 'null');
        } catch {
          return;
        }
        if (isToken(parsed)) {
          tokens[parsed.access_token] = parsed;
          migrated.push(key);
        }
      });
    if (!migrated.length) {
      return;
    }
    log('debug', `TokenManager | Migrating legacy token storage | count=${migrated.length}`);
    const current = this.#read();
    this.#write({
      ...current,
      state: {
        tokens: {
          ...tokens,
          /**
           * Tokens already stored in the current format take precedence over legacy tokens.
           */
          ...current.state.tokens,
        },
      },
    });
    migrated.forEach((key) => storage.removeItem(key));
  }

  #getTokenForService(service: keyof typeof CONFIG.RESOURCE_SERVERS): StoredToken | null {
    const resourceServer = CONFIG.RESOURCE_SERVERS?.[service];
    return this.getByResourceServer(resourceServer);
  }

  /**
   * Retrieve a token by the `resource_server` and optional `scope`.
   * This is useful when your application needs to manage multiple tokens for the same `resource_server`, but with different scopes.
   *
   * - When a `scope` is provided, the most recently stored token for the `resource_server` that includes the scope is returned.
   *   If no token includes the scope, the most recently stored token for the `resource_server` is returned.
   * - Otherwise, the most recently stored token for the `resource_server` is returned.
   *
   * Use `getByScope` to only match a specific scope, or `getAllByResourceServer` to retrieve all tokens for a `resource_server`.
   */
  getByResourceServer(resourceServer: string, scope?: string): StoredToken | null {
    const tokens = this.getAllByResourceServer(resourceServer);
    if (tokens.length > 1) {
      log(
        'debug',
        `TokenManager.getByResourceServer | Multiple tokens found for resource server | resource_server=${resourceServer} scope=${scope}`,
      );
    }
    const match = scope ? tokens.find((t) => parseScopes(t.scope).includes(scope)) : undefined;
    return match ?? tokens[0] ?? null;
  }

  /**
   * Retrieve all tokens for a `resource_server`, the most recently stored token first.
   */
  getAllByResourceServer(resourceServer: string): StoredToken[] {
    return this.getAll()
      .filter((token) => token.resource_server === resourceServer)
      .sort(byMostRecent);
  }

  /**
   * Retrieve the most recently stored token that includes the provided `scope`.
   */
  getByScope(scope: string): StoredToken | null {
    return (
      this.getAll()
        .filter((token) => parseScopes(token.scope).includes(scope))
        .sort(byMostRecent)[0] ?? null
    );
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
    return Object.values(this.#read().state.tokens).filter(isToken);
  }

  /**
   * Add a token to the storage.
   *
   * Any existing tokens with the same `resource_server` and `scope` (regardless of scope order) are **replaced**.
   */
  add(token: Token | TokenResponse) {
    if (!isToken(token)) {
      throw new Error('@globus/sdk | Invalid token provided to TokenManager.add');
    }
    const created = Date.now();
    const expires = created + token.expires_in * 1000;
    const storage = this.#read();
    const tokens = Object.fromEntries(
      Object.entries(storage.state.tokens).filter(
        ([, value]) =>
          !(
            value.resource_server === token.resource_server && isSameScope(value.scope, token.scope)
          ),
      ),
    );
    this.#write({
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
    });
    if ('other_tokens' in token) {
      token.other_tokens?.forEach((t) => {
        this.add(t);
      });
    }
  }

  /**
   * Remove a token (by `access_token`) from the storage.
   */
  remove(token: Token) {
    const storage = this.#read();
    if (!(token.access_token in storage.state.tokens)) {
      return;
    }
    const tokens = { ...storage.state.tokens };
    delete tokens[token.access_token];
    this.#write({
      ...storage,
      state: {
        tokens,
      },
    });
  }

  /**
   * Remove all tokens from the storage.
   */
  clear() {
    this.#write(createEmptyStorage());
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
