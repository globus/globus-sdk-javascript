/**
 * A class-based `Storage` implementation that keeps its items in a `Map`.
 *
 * Unlike `localStorage`, items are **not** exposed as own properties, so
 * `Object.keys(storage)` returns `[]`. This mirrors `MemoryStorage` and most
 * user-provided `Storage` implementations (e.g., a file-backed storage in Node.js).
 */
export class MapStorage implements Storage {
  #items = new Map<string, string>();

  get length() {
    return this.#items.size;
  }

  key(index: number) {
    return [...this.#items.keys()][index] ?? null;
  }

  getItem(key: string) {
    return this.#items.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.#items.set(key, `${value}`);
  }

  removeItem(key: string) {
    this.#items.delete(key);
  }

  clear() {
    this.#items.clear();
  }
}
