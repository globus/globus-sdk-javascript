import { getStorage } from '../storage';
import { Token, CONFIG } from '../../services/auth';

import type { Service } from '../global.js';
import { AuthorizationManager } from './AuthorizationManager.js';

export class TokenLookup {
  #manager: AuthorizationManager;

  constructor(options: { manager: AuthorizationManager }) {
    this.#manager = options.manager;
  }

  #getTokenForService(service: Extract<Service, 'AUTH' | 'TRANSFER' | 'FLOWS'>) {
    const resourceServer = CONFIG.RESOURCE_SERVERS?.[service];
    const raw =
      getStorage().get(`${this.#manager.configuration.client_id}:${resourceServer}`) || 'null';
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
}
