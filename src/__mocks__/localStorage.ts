import { createStorageMock } from './storage';

(function () {
  Object.defineProperty(globalThis, 'localStorage', {
    value: createStorageMock(),
    writable: true,
  });
})();

/**
 * Clear the mocked `localStorage` and set a new state for the test context.
 */
export function setup(state: Record<string, string> = {}) {
  /**
   * Clear the localStorage before setting the new state...
   */
  globalThis.localStorage.clear();
  Object.keys(state).forEach((key) => {
    globalThis.localStorage.setItem(key, state[key]);
  });
}
