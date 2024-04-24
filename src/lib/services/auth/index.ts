/**
 * @description A wrapper around the Globus Auth service.
 * @group Service
 * @see [Globus Auth API Documentation](https://docs.globus.org/api/auth/)
 * @module
 */
import { build } from '../../core/url.js';

import * as AUTH from './config.js';

import type { Token, TokenWithRefresh, TokenResponse } from './types.js';

/**
 * @private
 * @internal
 */
export const CONFIG = AUTH;

export function getAuthorizationEndpoint() {
  return build(AUTH.ID, '/v2/oauth2/authorize');
}

export function getTokenEndpoint() {
  return build(AUTH.ID, '/v2/oauth2/token');
}

export * as identities from './service/identities.js';
export * as oauth2 from './service/oauth2/index.js';

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
