import { getStorage } from '../storage/index.js';
import { Token, CONFIG, isToken } from '../../services/auth/index.js';

import { SERVICES, type Service } from '../global.js';
import { AuthorizationManager } from './AuthorizationManager.js';

export class TokenLookup {
  #manager: AuthorizationManager;

  constructor(options: { manager: AuthorizationManager }) {
    this.#manager = options.manager;
  }

  #getTokenForService(service: Service) {
    const resourceServer = CONFIG.RESOURCE_SERVERS?.[service];
    const raw =
      getStorage().get(`${this.#manager.configuration.client}:${resourceServer}`) || 'null';
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

  getAll(): Token[] {
    const tokens = [
      this.auth,
      this.transfer,
      this.flows,
      this.groups,
      this.search,
      this.timer,
      this.compute,
    ];
    return tokens.filter(isToken);
  }
}
