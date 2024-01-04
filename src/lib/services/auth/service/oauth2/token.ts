import { ID } from '../../config.js';
import { HTTP_METHODS, serviceRequest } from '../../../../services/shared.js';

import type { ServiceMethod, ServiceMethodOptions } from '../../../types.js';

type IntrospectPayload = {
  token: string;
  include?: string;
};

type RevokePayload = {
  token: string;
  token_type_hint?: 'access_token';
};

type ValidatePayload = {
  token: string;
  client_id: string;
};

type SupportedPayloads = IntrospectPayload | RevokePayload | ValidatePayload;

function serialize(payload?: SupportedPayloads) {
  return new URLSearchParams(payload);
}

/**
 * Format and inject properties that are specific to the `/token` resources.
 */
function injectServiceOptions(
  options: ServiceMethodOptions & {
    payload: SupportedPayloads;
  },
): ServiceMethodOptions {
  return {
    ...options,
    /**
     * The `token` service methods always expect a form-encoded body. We still allow
     * end-consumers to pass a raw body, but if `payload` is provided it is serialized.
     */
    body: serialize(options.payload),
    headers: {
      ...(options?.headers || {}),
      /**
       * Force the `Content-Type` header to be `application/x-www-form-urlencoded` and `charset=UTF-8`.
       */
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  };
}

/**
 * Token Introspection
 * @see https://docs.globus.org/api/auth/reference/#token-introspect
 */
export const introspect = function (options, sdkOptions?) {
  if (!options?.payload) {
    throw new Error(`'payload' is required for introspect`);
  }
  return serviceRequest(
    {
      service: ID,
      scope: undefined,
      path: `/v2/oauth2/token/introspect`,
      method: HTTP_METHODS.POST,
    },
    injectServiceOptions(options),
    sdkOptions,
  );
} satisfies ServiceMethod<{
  payload: IntrospectPayload;
}>;

/**
 * Token Revocation
 * @see https://docs.globus.org/api/auth/reference/#token-revoke
 */
export const revoke = function (options, sdkOptions?) {
  if (!options?.payload) {
    throw new Error(`'payload' is required for revoke`);
  }
  return serviceRequest(
    {
      service: ID,
      scope: undefined,
      path: `/v2/oauth2/token/revoke`,
      method: HTTP_METHODS.POST,
    },
    injectServiceOptions(options),
    sdkOptions,
  );
} satisfies ServiceMethod<{
  payload: RevokePayload;
}>;

/**
 * @private
 * @deprecated Rather than using `validate` to check if a token is valid, it is recommended to make a request to the resource server with the token and handle the error response.
 */
export const validate = function (options, sdkOptions?) {
  if (!options?.payload) {
    throw new Error(`'payload' is required for validate`);
  }
  return serviceRequest(
    {
      service: ID,
      scope: undefined,
      path: `/v2/oauth2/token/validate`,
      method: HTTP_METHODS.POST,
    },
    injectServiceOptions(options),
    sdkOptions,
  );
} satisfies ServiceMethod<{
  payload: ValidatePayload;
}>;
