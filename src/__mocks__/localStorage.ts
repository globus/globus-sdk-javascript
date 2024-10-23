import { createStorageMock } from './storage';

export function setInitialLocalStorageState(initialState: Record<string, string>) {
  Object.keys(initialState).forEach((key) => {
    globalThis.localStorage.setItem(key, initialState[key]);
  });
}

export function mockLocalStorage(initialState: Record<string, string> = {}) {
  const mock = createStorageMock();
  Object.defineProperty(globalThis, 'localStorage', {
    value: mock,
    writable: true,
  });
  if (initialState) {
    setInitialLocalStorageState(initialState);
  }
}
