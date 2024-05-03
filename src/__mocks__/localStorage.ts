class LocalStorageMock {
  [key: string]: unknown;

  constructor() {
    Object.defineProperty(this, 'getItem', {
      enumerable: false,
      value: jest.fn((key) => (this[key] !== undefined ? this[key] : null)),
    });

    Object.defineProperty(this, 'setItem', {
      enumerable: false,
      value: jest.fn((key, value) => {
        this[key] = `${value}`;
      }),
    });

    Object.defineProperty(this, 'removeItem', {
      enumerable: false,
      value: jest.fn((key) => {
        delete this[key];
      }),
    });

    Object.defineProperty(this, 'clear', {
      enumerable: false,
      value: jest.fn(() => {
        Object.keys(this).map((key) => delete this[key]);
      }),
    });
  }

  get length() {
    return Object.keys(this).length;
  }
}

Object.defineProperty(globalThis, 'localStorage', {
  value: new LocalStorageMock(),
  writable: true,
});
/**
 * Provide an object to set in (the mocked) `localStorage`
 */
export function setup(state: Record<string, string> = {}) {
  Object.keys(state).forEach((key) => {
    globalThis.localStorage.setItem(key, state[key]);
  });
}
