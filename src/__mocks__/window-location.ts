(function () {
  let URL_BAR = new URL('https://JEST_URL_BAR');
  Object.defineProperty(globalThis, 'window', {
    value: {
      location: {
        replace: jest.fn().mockImplementation((url) => {
          URL_BAR = new URL(url);
        }),
        set href(url) {
          URL_BAR = new URL(url);
        },
        get href() {
          return URL_BAR;
        },
      },
    },
    writable: true,
  });
})();
