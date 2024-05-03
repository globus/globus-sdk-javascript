import { MemoryStorage } from './memory.js';
import { LocalStorage } from './local-storage.js';
/**
 * Acts as a basic wrapper for storage layers to make their surface APIs consistent.
 */
export interface StorageSystem {
  get(key: string): string | null;
  set(key: string, value: unknown): void;
  remove(key: string): void;
  keys(): string[];
  clear(): void;
}

let storage: StorageSystem | undefined;
type StorageOptions =
  | 'localStorage'
  | 'memory'
  | {
      new (): StorageSystem;
    };

/**
 * Returns the active storage system or creates an instance for the running process.
 */
export function createStorage(storageType: StorageOptions = 'memory'): StorageSystem {
  if (!storage) {
    let Factory: new () => StorageSystem;
    if (storageType === 'localStorage') {
      Factory = LocalStorage;
    } else if (storageType === 'memory') {
      Factory = MemoryStorage;
    } else {
      Factory = storageType;
    }
    storage = new Factory();
  }
  return storage;
}

export default createStorage;

/**
 * Returns the active storage system.
 */
export const getStorage = createStorage;

/**
 * A private method for resetting the storage system. This is primarily used to reset
 * the storage system during testing.
 * @private
 */
// eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
export function __reset() {
  storage = undefined;
}
