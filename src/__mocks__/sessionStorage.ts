import { createStorageMock } from './storage';

(function () {
  Object.defineProperty(globalThis, 'sessionStorage', {
    value: createStorageMock(),
    writable: true,
  });
})();
