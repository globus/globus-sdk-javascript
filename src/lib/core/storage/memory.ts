import { StorageSystem } from './index.js';

export class MemoryStorage implements StorageSystem {
  #storage: Record<string, string | null> = {};

  get(key: string) {
    return this.#storage[key];
  }

  set(key: string, value: string) {
    this.#storage[key] = value;
  }

  remove(key: string) {
    delete this.#storage[key];
  }

  clear() {
    this.#storage = {};
  }
}
