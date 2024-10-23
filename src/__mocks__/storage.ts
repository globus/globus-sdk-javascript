/**
 * Creates an in-memory Storage mock.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Storage
 */
export class MockStorage implements Storage {
  store: {
    [key: string]: string;
  } = {};

  getItem = jest.fn().mockImplementation((k) => this.store[k]);

  setItem = jest.fn().mockImplementation((key, value) => {
    this.store[key] = `${value}`;
  });

  removeItem = jest.fn().mockImplementation((key) => {
    delete this.store[key];
  });

  clear = jest.fn().mockImplementation(() => {
    this.store = {};
  });

  get length() {
    return Object.keys(this.store).length;
  }

  key(n: number) {
    return Object.keys(this.store)[n];
  }
}

export function createStorageMock() {
  let mock = new MockStorage();
  /**
   * Ensure `Object.keys` calls behave similiar to real `Storage`.
   */
  mock = new Proxy(mock, {
    ownKeys: (target) => Object.keys(target.store),
    getOwnPropertyDescriptor: () => ({
      enumerable: true,
      configurable: true,
    }),
  });
  return mock;
}
