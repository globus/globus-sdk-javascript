import type { StorageSystem } from './index.js';

import storage, { __reset } from './index.js';
import { MemoryStorage } from './memory.js';
import { LocalStorage } from './local-storage.js';

/* eslint-disable @typescript-eslint/no-unused-vars, class-methods-use-this */
class CustomStorage implements StorageSystem {
  get(key: string) {
    return null;
  }

  set(key: string, value: any): void {}

  remove(key: string): void {}

  clear(): void {}
}

describe('storage', () => {
  afterEach(() => {
    __reset();
  });

  it('default storage interface (memory)', () => {
    expect(storage()).toBeInstanceOf(MemoryStorage);
  });

  it('can be configured using known interface', () => {
    expect(storage('localStorage')).toBeInstanceOf(LocalStorage);
  });

  it('can be provided a custom storage interface', () => {
    expect(storage(CustomStorage)).toBeInstanceOf(CustomStorage);
  });
});
