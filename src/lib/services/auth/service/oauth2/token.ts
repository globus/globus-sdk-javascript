import { ID } from '../../config.js';
import { HTTP_METHODS, serviceRequest } from '../../../../services/shared.js';

import type { ServiceMethod } from '../../../types.js';

/**
 * Token Introspection
 * @see https://docs.globus.org/api/auth/reference/#token-introspect
 */
export const introspect = function (options, sdkOptions?) {
  return serviceRequest(
    {
      service: ID,
      scope: 'openid',
      path: `/v2/oauth/token/introspect`,
      method: HTTP_METHODS.POST,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  query: {
    token: string;
    include?: ('session_info' | 'identity_set' | 'identity_set_detail' | 'identities_set')[];
  };
}>;

/**
 * Token Revocation
 * @see https://docs.globus.org/api/auth/reference/#token-revoke
 */
export const revoke = function (options, sdkOptions?) {
  return serviceRequest(
    {
      service: ID,
      scope: 'openid',
      path: `/v2/oauth/token/revoke`,
      method: HTTP_METHODS.POST,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  query: {
    token: string;
  };
}>;

/**
 * @private
 * @deprecated Rather than using `validate` to check if a token is valid, it is recommended to make a request to the resource server with the token and handle the error response.
 */
export const validate = function (options, sdkOptions?) {
  return serviceRequest(
    {
      service: ID,
      scope: 'openid',
      path: `/v2/oauth/token/validate`,
      method: HTTP_METHODS.POST,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  query: {
    token: string;
    client_id: string;
    token_type_hint: 'access_token';
  };
}>;
