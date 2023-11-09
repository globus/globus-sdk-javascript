/* eslint-disable no-underscore-dangle */
import { fetch } from './internals/fetch.js';
import { getTokenForScope } from './consent.js';

type GlobusScope = string;

/**
 * Properties that will be passed to underlying `fetch` calls to override behavior.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/fetch#parameters
 */
export type FetchOverrides =
  | (Omit<RequestInit, 'headers'> & {
      headers?: Record<string, string>;
      /**
       * Provide an implementation of `fetch` to be used.
       * This is currently **not** advertised since we do not dynamically import `cross-fetch` yet.
       * @private
       */
      __callable?: typeof fetch;
    })
  | undefined;

export function fetchWithScope(
  scope: GlobusScope,
  input: RequestInfo | URL,
  fetchOverrides: FetchOverrides = {},
) {
  const headers = fetchOverrides.headers || {};
  /**
   * If an `Authorization` override header was provided, we skip any
   * sort of lookup and use the provided value.
   */
  if (!headers?.['Authorization']) {
    const token = getTokenForScope(scope);
    if (token) {
      headers['Authorization'] = token;
    }
  }
  /**
   * If `Content-Type` header was not provided, and there is a body, we assume it is JSON.
   */
  if (!headers?.['Content-Type'] && fetchOverrides?.body) {
    headers['Content-Type'] = 'application/json';
  }

  /**
   * If a `__callable` override was provided, we use it instead of the default `fetch`.
   */
  if (fetchOverrides?.__callable) {
    return fetchOverrides.__callable(input, {
      ...fetchOverrides,
      headers,
    });
  }

  return fetch(input, {
    ...fetchOverrides,
    headers,
  });
}
