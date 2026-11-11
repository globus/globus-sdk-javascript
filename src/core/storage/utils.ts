/**
 * Return all of the keys currently held by a `Storage` implementation.
 *
 * Keys are enumerated using the `Storage` API (`length` and `key(index)`) rather than
 * `Object.keys(storage)`. `Object.keys` only works for implementations that expose their
 * items as own properties (e.g., `localStorage`); it does not work for `MemoryStorage` or
 * any class-based implementation of `Storage`.
 *
 * The keys are collected into a new array before being returned, so callers can safely
 * remove items from the storage while iterating over the result.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Storage
 */
export function getStorageKeys(storage: Storage): string[] {
  /**
   * Fall back to `Object.keys` for objects that were provided as `Storage`, but do not
   * implement `length` and `key()`, to preserve previous behavior.
   */
  if (typeof storage.length !== 'number' || typeof storage.key !== 'function') {
    return Object.keys(storage);
  }
  const keys: string[] = [];
  for (let i = 0; i < storage.length; i += 1) {
    const key = storage.key(i);
    if (key !== null && key !== undefined) {
      keys.push(key);
    }
  }
  return keys;
}
