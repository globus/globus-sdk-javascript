import type { Token, TokenWithRefresh, TokenResponse } from './types.js';

export function isToken(check: unknown): check is Token {
  return typeof check === 'object' && check !== null && 'access_token' in check;
}

export function isRefreshToken(check: unknown): check is TokenWithRefresh {
  return isToken(check) && check !== null && 'refresh_token' in check;
}

export function isGlobusAuthTokenResponse(check: unknown): check is TokenResponse {
  /**
   * @todo This could be made more robust by checking whether the `resource_server` is a well-known value.
   */
  return isToken(check) && check !== null && 'resource_server' in check;
}
