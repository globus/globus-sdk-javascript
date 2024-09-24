import { getStorage } from '../storage/index.js';
import { CONFIG, isToken } from '../../services/auth/index.js';

import { SERVICES, type Service } from '../global.js';
import { AuthorizationManager } from './AuthorizationManager.js';

import type { Token, TokenResponse } from '../../services/auth/types.js';

export type StoredToken = Token & {
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

function getTokenFromStorage(key: string) {
  const raw = getStorage().get(key) || 'null';
  let token: StoredToken | null = null;
  try {
    const parsed = JSON.parse(raw);
    if (isToken(parsed)) {
      token = parsed;
    }
  } catch (e) {
    // no-op
  }
  return token;
}

/**
 * @todo In the next major version, we should consider renaming this class to `TokenManager`,
 * since it's usage has expanded beyond just looking up tokens.
 */
export class TokenLookup {
  #manager: AuthorizationManager;

  constructor(options: { manager: AuthorizationManager }) {
    this.#manager = options.manager;
  }

  #getClientStorageEntry(identifier: string) {
    return getTokenFromStorage(`${this.#manager.storageKeyPrefix}${identifier}`);
  }

  #getTokenForService(service: Service) {
    const resourceServer = CONFIG.RESOURCE_SERVERS?.[service];
    return this.#getClientStorageEntry(resourceServer);
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
    return this.#getTokenForService(SERVICES.TIMER);
  }

  get compute(): StoredToken | null {
    return this.#getTokenForService(SERVICES.COMPUTE);
  }

  gcs(endpoint: string): StoredToken | null {
    return this.getByResourceServer(endpoint);
  }

  getByResourceServer(resourceServer: string): StoredToken | null {
    return this.#getClientStorageEntry(resourceServer);
  }

  getAll(): StoredToken[] {
    const entries = getStorage()
      .keys()
      .reduce((acc: (StoredToken | null)[], key) => {
        if (key.startsWith(this.#manager.storageKeyPrefix)) {
          acc.push(getTokenFromStorage(key));
        }
        return acc;
      }, []);
    return entries.filter(isToken);
  }

  /**
   * Add a token to the storage.
   */
  add(token: Token | TokenResponse) {
    const created = Date.now();
    const expires = created + token.expires_in * 1000;
    getStorage().set(`${this.#manager.storageKeyPrefix}${token.resource_server}`, {
      ...token,
      /**
       * Add metadata to the token to track when it was created and when it expires.
       */
      __metadata: {
        created,
        expires,
      },
    });
    if ('other_tokens' in token) {
      token.other_tokens?.forEach((t) => {
        this.add(t);
      });
    }
  }

  /**
   * Determines whether or not a stored token is expired.
   * @param token The token to check.
   * @param augment An optional number of milliseconds to add to the current time when checking the expiration.
   * @returns `true` if the token is expired, `false` if it is not expired, and `undefined` if the expiration status cannot be determined
   * based on the token's metadata. This can happen if the token is missing the `__metadata` field or the `expires` field.
   */
  static isTokenExpired(token: StoredToken | null, augment: number = 0): boolean | undefined {
    /* eslint-disable no-underscore-dangle */
    if (!token || !token.__metadata || typeof token.__metadata.expires !== 'number') {
      return undefined;
    }
    return Date.now() + augment >= token.__metadata.expires;
    /* eslint-enable no-underscore-dangle */
  }
}
