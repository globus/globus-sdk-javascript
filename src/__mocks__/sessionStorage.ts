(function () {
  let store: Record<string, string> = {};
  Object.defineProperty(globalThis, 'sessionStorage', {
    value: {
      getItem: jest.fn().mockImplementation((key) => store[key]),
      setItem: jest.fn().mockImplementation((key, value) => {
        store[key] = value;
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
