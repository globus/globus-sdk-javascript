/**
 * @description A wrapper around the Globus Auth service.
 * @group Service
 * @see [Globus Auth API Documentation](https://docs.globus.org/api/auth/)
 * @module
 */
import { build } from '../../core/url.js';

import * as AUTH from './config.js';

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

export type Token = {
  access_token: string;
  scope: string;
  expires_in: number;
  token_type: string;
  resource_server: string;
  refresh_token?: string;
};
/**
 * @see https://docs.globus.org/api/auth/reference/#authorization_code_grant_preferred
 */
export type TokenResponse = Token & {
  state: string;
  id_token?: string;
  other_tokens: Token[];
};

export function isGlobusAuthTokenResponse(check: unknown): check is TokenResponse {
  return (
    typeof check === 'object' && check !== null && 'resource_server' in check && 'state' in check
  );
}
