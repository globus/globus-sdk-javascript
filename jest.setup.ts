import server from './src/__mocks__/server';

import { disable } from './src/core/info/private';

beforeAll(() => {
  // Establish API mocking before all tests.
  server.listen();
  /**
   * We disable the X-Globus-Client-Info header from being injected in the test suite
   * to avoid conflicts with snapshot results based on the `version` property in the
   * `package.json` file.
   *
   * The behavior is explicitly tested (enabled) in `src/core/__tests__/info.spec.ts` and
   * `src/services/__tests__/shared.spec.ts`.
   */
  disable();
});

afterEach(() => {
  // Reset any request handlers that we may add during the tests,
  // so they don't affect other tests.
  server.resetHandlers();
});

// Clean up after the tests are finished.
afterAll(() => server.close());
