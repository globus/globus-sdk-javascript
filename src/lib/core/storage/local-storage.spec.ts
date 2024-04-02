import '../../../__mocks__/localStorage';
import { LocalStorage } from './local-storage';

describe('LocalStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should set and get a string value', () => {
    const storage = new LocalStorage();
    storage.set('key', 'value');
    expect(storage.get('key')).toBe('value');
  });

  it('should set and get an object value', () => {
    const OBJ = {
      access_token: 'example',
    };
    const storage = new LocalStorage();
    storage.set('key', OBJ);
    expect(storage.get('key')).toBe(JSON.stringify(OBJ));
  });

  it('remove', () => {
    const storage = new LocalStorage();
    storage.set('key', 'value');
    expect(storage.get('key')).toBe('value');
    storage.remove('key');
    expect(storage.get('key')).toBeNull();
  });

  it('clear', () => {
    const storage = new LocalStorage();
    storage.set('key', 'value');
    storage.set('one', 1);
    expect(storage.get('key')).toBe('value');
    expect(storage.get('one')).toBe('1');
    storage.clear();
    expect(storage.get('key')).toBeNull();
    expect(storage.get('one')).toBeNull();
  });
});
