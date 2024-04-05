import { getStorage } from '../storage/index.js';
import { Token, CONFIG } from '../../services/auth/index.js';

import type { Service } from '../global.js';
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
    return JSON.parse(raw);
  }

  get auth(): Token | null {
    return this.#getTokenForService('AUTH');
  }

  get transfer(): Token | null {
    return this.#getTokenForService('TRANSFER');
  }

  get flows(): Token | null {
    return this.#getTokenForService('FLOWS');
  }

  get groups(): Token | null {
    return this.#getTokenForService('GROUPS');
  }

  get search(): Token | null {
    return this.#getTokenForService('SEARCH');
  }

  get timer(): Token | null {
    return this.#getTokenForService('TIMER');
  }

  get compute(): Token | null {
    return this.#getTokenForService('COMPUTE');
  }

  getAll() {
    return [
      this.auth,
      this.transfer,
      this.flows,
      this.groups,
      this.search,
      this.timer,
      this.compute,
    ].filter((token) => token !== null);
  }
}
