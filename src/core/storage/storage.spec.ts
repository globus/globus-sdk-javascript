import storage, { __reset } from './index.js';
import { MemoryStorage } from './memory.js';

/* eslint-disable @typescript-eslint/no-unused-vars, class-methods-use-this */
class CustomStorage implements Storage {
  getItem(key: string) {
    return null;
  }

  setItem(key: string, value: any): void {}

  removeItem(key: string): void {}

  key(index: number) {
    return '';
  }

  keys() {
    return [];
  }

  get length() {
    return 0;
  }

  clear(): void {}
}

describe('storage', () => {
  afterEach(() => {
    __reset();
  });

  it('default storage interface (memory)', () => {
    expect(storage()).toBeInstanceOf(MemoryStorage);
  });

  it('can be configured to localStorage', () => {
    expect(storage('localStorage')).toBe(globalThis.localStorage);
  });

  it('can be configured to sessionStorage', () => {
    expect(storage('sessionStorage')).toBe(globalThis.sessionStorage);
  });

  it('can be provided a custom storage interface', () => {
    expect(storage(CustomStorage)).toBeInstanceOf(CustomStorage);
  });
});
