import { createStorageMock } from './storage';

export function mockSessionStorage() {
  Object.defineProperty(globalThis, 'sessionStorage', {
    value: createStorageMock(),
    writable: true,
  });
}
