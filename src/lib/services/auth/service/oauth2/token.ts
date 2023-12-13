import { ID } from '../../config.js';
import { HTTP_METHODS, serviceRequest } from '../../../../services/shared.js';

import type { ServiceMethod, ServiceMethodOptions } from '../../../types.js';

/**
 * Format and inject properties that are specific to the `/token` resources.
 */
function injectServiceOptions(options: ServiceMethodOptions): ServiceMethodOptions {
  return {
    ...options,
    body: new URLSearchParams(options?.payload as Record<string, string>).toString(),
    headers: {
      ...(options?.headers || {}),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
}

/**
 * Token Introspection
 * @see https://docs.globus.org/api/auth/reference/#token-introspect
 */
export const introspect = function (options, sdkOptions?) {
  return serviceRequest(
    {
      service: ID,
      scope: undefined,
      path: `/v2/oauth/token/introspect`,
      method: HTTP_METHODS.POST,
    },
    injectServiceOptions(options),
    sdkOptions,
  );
} satisfies ServiceMethod<{
  payload: {
    token: string;
    include?: string;
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
      scope: undefined,
      path: `/v2/oauth/token/revoke`,
      method: HTTP_METHODS.POST,
    },
    injectServiceOptions(options),
    sdkOptions,
  );
} satisfies ServiceMethod<{
  payload: {
    token: string;
    token_type_hint?: 'access_token';
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
      scope: undefined,
      path: `/v2/oauth/token/validate`,
      method: HTTP_METHODS.POST,
    },
    injectServiceOptions(options),
    sdkOptions,
  );
} satisfies ServiceMethod<{
  payload: {
    token: string;
    client_id: string;
  };
}>;
