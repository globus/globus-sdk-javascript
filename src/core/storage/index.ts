import { MemoryStorage } from './memory.js';
/**
 * Acts as a basic wrapper for storage layers to make their surface APIs consistent.
 */
let storage: Storage | undefined;

export type StorageOptions =
  | 'sessionStorage'
  | 'localStorage'
  | 'memory'
  | {
      new (): Storage;
    };

/**
 * Returns the active storage system or creates an instance for the running process.
 */
export function createStorage(storageType: StorageOptions = 'memory'): Storage {
  if (!storage) {
    if (storageType === 'localStorage') {
      storage = globalThis.localStorage;
    } else if (storageType === 'memory') {
      storage = new MemoryStorage();
    } else if (storageType === 'sessionStorage') {
      storage = globalThis.sessionStorage;
    } else {
      const Factory = storageType;
      storage = new Factory();
    }
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
