/**
 * A minimal `window` for testing the `PopupTransport`: `location`, `open()`, and `message` event listeners.
 *
 * Import this module **before** `PopupTransport` (support is detected when the module is loaded).
 */
type Listener = (e: { origin: string; data: unknown }) => unknown;

const listeners = new Set<Listener>();

export const popup = {
  closed: false,
  close: jest.fn(() => {
    popup.closed = true;
  }),
  focus: jest.fn(),
};

export const ORIGIN = 'https://app.example';

let href = `${ORIGIN}/`;

Object.defineProperty(globalThis, 'window', {
  value: {
    location: {
      origin: ORIGIN,
      get href() {
        return href;
      },
      set href(value: string) {
        href = value;
      },
      assign: jest.fn(),
      replace: jest.fn(),
    },
    open: jest.fn(() => popup),
    addEventListener: jest.fn((type: string, listener: Listener) => {
      if (type === 'message') listeners.add(listener);
    }),
    removeEventListener: jest.fn((type: string, listener: Listener) => {
      if (type === 'message') listeners.delete(listener);
    }),
  },
  writable: true,
});

/**
 * Dispatch a `message` event to all registered listeners.
 */
export function postMessage(data: unknown, origin = ORIGIN) {
  return Promise.all([...listeners].map((listener) => listener({ origin, data })));
}

export function listenerCount() {
  return listeners.size;
}

export function resetPopup() {
  popup.closed = false;
  listeners.clear();
  jest.clearAllMocks();
}
