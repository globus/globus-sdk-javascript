import { createStorageMock } from '../../__mocks__/storage';
import { MapStorage } from '../../__mocks__/map-storage';
import { MemoryStorage } from './memory';
import { getStorageKeys } from './utils';

describe('getStorageKeys', () => {
  it.each([
    ['MemoryStorage', () => new MemoryStorage()],
    ['a class implementing Storage', () => new MapStorage()],
    ['a localStorage-like Storage (own properties)', () => createStorageMock()],
  ])('enumerates keys of %s', (_, factory) => {
    const storage = factory();
    expect(getStorageKeys(storage)).toEqual([]);
    storage.setItem('a', '1');
    storage.setItem('b', '2');
    expect(getStorageKeys(storage).sort()).toEqual(['a', 'b']);
  });

  it('returns a snapshot that is safe to remove items while iterating', () => {
    const storage = new MemoryStorage();
    ['a', 'b', 'c', 'd'].forEach((k) => storage.setItem(k, k));
    getStorageKeys(storage).forEach((k) => storage.removeItem(k));
    expect(storage.length).toBe(0);
  });

  it('falls back to Object.keys when "length" and "key" are not implemented', () => {
    const storage = { a: '1', b: '2' } as unknown as Storage;
    expect(getStorageKeys(storage)).toEqual(['a', 'b']);
  });
});
