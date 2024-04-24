(function () {
  let store: Record<string, string> = {};
  Object.defineProperty(globalThis, 'localStorage', {
    value: {
      getItem: jest
        .fn()
        .mockImplementation((key) => (store[key] !== undefined ? store[key] : null)),
      setItem: jest.fn().mockImplementation((key, value) => {
        store[key] = `${value}`;
      }),
      removeItem: jest.fn().mockImplementation((key) => {
        delete store[key];
      }),
      clear: jest.fn().mockImplementation(() => {
        store = {};
      }),
    },
    writable: true,
  });
})();

/**
 * Provide an object to set in (the mocked) `localStorage`
 */
export function setup(state: Record<string, string> = {}) {
  Object.keys(state).forEach((key) => {
    globalThis.localStorage.setItem(key, state[key]);
  });
}
