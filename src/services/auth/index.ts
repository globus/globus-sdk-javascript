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

export type * from './types.js';

/**
 * Query parameters that can be passed to the authorization endpoint.
 * @see https://docs.globus.org/api/auth/reference/#authorization_code_grant_preferred
 * @see https://docs.globus.org/api/auth/sessions/#client-initiated-authns
 */
export type AuthorizationQueryParameters = {
  prompt?: string;
  session_message?: string;
  session_required_identities?: string;
  session_required_single_domain?: string;
  session_required_mfa?: 'true' | 'false';
  session_required_policies?: string;
};

export function getAuthorizationEndpoint() {
  return build(AUTH.ID, '/v2/oauth2/authorize');
}

export function getTokenEndpoint() {
  return build(AUTH.ID, '/v2/oauth2/token');
}

export * as developers from './service/developers/index.js';
export * as identities from './service/identities/index.js';
export * as oauth2 from './service/oauth2/index.js';

export * from './tokens.js';

export * as utils from './utils.js';
