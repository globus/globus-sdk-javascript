import { StorageSystem } from './index.js';

export class MemoryStorage implements StorageSystem {
  #storage: Record<string, string | null> = {};

  get(key: string) {
    return this.#storage[key] !== undefined ? this.#storage[key] : null;
  }

  set(key: string, value: unknown) {
    this.#storage[key] = typeof value !== 'string' ? JSON.stringify(value) : value;
  }

  remove(key: string) {
    delete this.#storage[key];
  }

  keys() {
    return Object.keys(this.#storage);
  }

  clear() {
    this.#storage = {};
  }
}
