let URL_BAR = new URL('https://vitest_url_bar');
Object.defineProperty(globalThis, 'window', {
  value: {
    location: {
      assign: vi.fn().mockImplementation((url) => {
        URL_BAR = new URL(url);
      }),
      replace: vi.fn().mockImplementation((url) => {
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
