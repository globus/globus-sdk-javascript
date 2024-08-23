let URL_BAR = new URL('https://jest_url_bar');
Object.defineProperty(globalThis, 'window', {
  value: {
    location: {
      assign: jest.fn().mockImplementation((url) => {
        URL_BAR = new URL(url);
      }),
      replace: jest.fn().mockImplementation((url) => {
        URL_BAR = new URL(url);
      }),
      set href(url) {
        URL_BAR = new URL(url);
      },
      get href() {
        return URL_BAR.toString();
      },
    },
  },
  writable: true,
});
