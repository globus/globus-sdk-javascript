import { StorageSystem } from './index.js';

export class LocalStorage implements StorageSystem {
  #storage = globalThis.localStorage;

  get(key: string) {
    return this.#storage.getItem(key);
  }

  set(key: string, value: unknown) {
    this.#storage.setItem(key, typeof value !== 'string' ? JSON.stringify(value) : value);
  }

  keys() {
    return Object.keys(this.#storage);
  }

  remove(key: string) {
    this.#storage.removeItem(key);
  }

  clear() {
    this.#storage.clear();
  }
}
