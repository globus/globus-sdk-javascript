/**
 * @description A wrapper around the Globus Auth service.
 * @group Service
 * @see [Globus Auth API Documentation](https://docs.globus.org/api/auth/)
 * @module
 */
import type ITokenResponse from 'js-pkce/dist/ITokenResponse';
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

export type Token = ITokenResponse & {
  resource_server: string;
  id_token?: string;
};
/**
 * @see https://docs.globus.org/api/auth/reference/#authorization_code_grant_preferred
 */
export type TokenResponse = Token & {
  state: string;
  other_tokens: Token[];
};
