import type { StorageSystem } from './index.js';

export class MemoryStorage implements StorageSystem {
  #cache: Record<string, unknown> = {};

  get(key: string) {
    return this.#cache[key];
  }

  set(key: string, value: unknown) {
    this.#cache[key] = value;
  }

  remove(key: string) {
    delete this.#cache[key];
  }

  clear() {
    this.#cache = {};
  }
}
