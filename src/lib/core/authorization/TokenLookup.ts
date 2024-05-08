import { getStorage } from '../storage/index.js';
import { CONFIG, isToken } from '../../services/auth/index.js';

import { SERVICES, type Service } from '../global.js';
import { AuthorizationManager } from './AuthorizationManager.js';

import type { Token } from '../../services/auth/types.js';

function getTokenFromStorage(key: string) {
  const raw = getStorage().get(key) || 'null';
  let token: Token | null = null;
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

export class TokenLookup {
  #manager: AuthorizationManager;

  constructor(options: { manager: AuthorizationManager }) {
    this.#manager = options.manager;
  }

  #getClientStorageEntry(identifier: string) {
    return getTokenFromStorage(`${this.#manager.configuration.client}:${identifier}`);
  }

  #getTokenForService(service: Service) {
    const resourceServer = CONFIG.RESOURCE_SERVERS?.[service];
    return this.#getClientStorageEntry(resourceServer);
  }

  get auth(): Token | null {
    return this.#getTokenForService(SERVICES.AUTH);
  }

  get transfer(): Token | null {
    return this.#getTokenForService(SERVICES.TRANSFER);
  }

  get flows(): Token | null {
    return this.#getTokenForService(SERVICES.FLOWS);
  }

  get groups(): Token | null {
    return this.#getTokenForService(SERVICES.GROUPS);
  }

  get search(): Token | null {
    return this.#getTokenForService(SERVICES.SEARCH);
  }

  get timer(): Token | null {
    return this.#getTokenForService(SERVICES.TIMER);
  }

  get compute(): Token | null {
    return this.#getTokenForService(SERVICES.COMPUTE);
  }

  gcs(endpoint: string): Token | null {
    return this.#getClientStorageEntry(endpoint);
  }

  getAll(): Token[] {
    const entries = getStorage()
      .keys()
      .reduce((acc: (Token | null)[], key) => {
        if (key.startsWith(`${this.#manager.configuration.client}:`)) {
          acc.push(getTokenFromStorage(key));
        }
        return acc;
      }, []);
    return entries.filter(isToken);
  }
}
