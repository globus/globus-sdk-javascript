export class MemoryStorage implements Storage {
  #storage: Record<string, string | null> = {};

  getItem(key: string) {
    return this.#storage[key] !== undefined ? this.#storage[key] : null;
  }

  setItem(key: string, value: string) {
    this.#storage[key] = value;
  }

  removeItem(key: string) {
    delete this.#storage[key];
  }

  key(index: number) {
    return Object.keys(this.#storage)[index];
  }

  clear() {
    this.#storage = {};
  }

  get length() {
    return Object.keys(this.#storage).length;
  }
}
