import { MemoryStorage } from './memory';

describe('MemoryStorage', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should setItem and get a string value', () => {
    const storage = new MemoryStorage();
    storage.setItem('key', 'value');
    expect(storage.getItem('key')).toBe('value');
  });

  it('remove', () => {
    const storage = new MemoryStorage();
    storage.setItem('key', 'value');
    expect(storage.getItem('key')).toBe('value');
    storage.removeItem('key');
    expect(storage.getItem('key')).toBeNull();
  });

  it('key', () => {
    const storage = new MemoryStorage();
    storage.setItem('key-1', 'value-1');
    storage.setItem('key-2', 'value-2');
    expect(storage.key(1)).toBe('key-2');
  });

  it('length', () => {
    const storage = new MemoryStorage();
    storage.setItem('key-1', 'value-1');
    storage.setItem('key-2', 'value-2');
    expect(storage.length).toBe(2);
  });

  it('clear', () => {
    const storage = new MemoryStorage();
    storage.setItem('key', 'value');
    storage.setItem('one', '1');
    expect(storage.getItem('key')).toBe('value');
    expect(storage.getItem('one')).toBe('1');
    storage.clear();
    expect(storage.getItem('key')).toBeNull();
    expect(storage.getItem('one')).toBeNull();
  });
});
