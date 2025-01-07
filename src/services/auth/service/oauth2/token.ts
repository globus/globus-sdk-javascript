import { ID } from '../../config.js';
import { HTTP_METHODS, serviceRequest } from '../../../../services/shared.js';

import type { ServiceMethod, ServiceMethodOptions } from '../../../types.js';

type IntrospectPayload = {
  token: string;
  include?: string;
};

type RevokePayload = {
  token: string;
  /**
   * This is an undocumented property that is required for the request to be successful.
   */
  client_id: string;
};

type ValidatePayload = {
  token: string;
  client_id: string;
};

type RefreshPayload = {
  refresh_token: string;
  grant_type: 'refresh_token';
  /**
   * This is an undocumented property that is required for the request to be successful.
   */
  client_id: string;
};

type ExchangePayload = {
  grant_type: 'authorization_code';
  code: string;
  client_id: string;
  code_verifier: string;
  redirect_uri: string;
};

type SupportedPayloads =
  | IntrospectPayload
  | RevokePayload
  | ValidatePayload
  | RefreshPayload
  | ExchangePayload;

function serialize(payload?: SupportedPayloads) {
  return new URLSearchParams(payload);
}

/**
 * Format and inject properties that are specific to the `/token` resources.
 */
function injectServiceOptions(
  options: ServiceMethodOptions & {
    payload?: SupportedPayloads;
  },
): ServiceMethodOptions {
  return {
    ...options,
    /**
     * The `token` service methods always expect a form-encoded body. We still allow
     * end-consumers to pass a raw body, but if `payload` is provided it is serialized.
     */
    body: options.payload ? serialize(options.payload) : undefined,
    headers: {
      ...(options?.headers || {}),
      Accept: 'application/json',
      /**
       * Force the `Content-Type` header to be `application/x-www-form-urlencoded` and `charset=UTF-8`.
       */
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  };
}

/**
 * @see https://docs.globus.org/api/auth/reference/#dependent_token_grant_post_v2oauth2token
 */
export const token = function (options = {}, sdkOptions?) {
  return serviceRequest(
    {
      service: ID,
      scope: undefined,
      path: `/v2/oauth2/token`,
      method: HTTP_METHODS.POST,
      preventRetry: true,
    },
    injectServiceOptions(options),
    sdkOptions,
  );
} satisfies ServiceMethod<{
  payload?: ExchangePayload;
  query?: {
    /**
     * Include tokens for all scopes that the user has consented to, for the requesting client.
     * @private
     */
    include_consented_scopes?: boolean;
  };
}>;

/**
 * @see https://docs.globus.org/api/auth/developer-guide/#obtaining-authorization
 */
export const exchange = token;

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
      preventRetry: true,
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
      preventRetry: true,
    },
    injectServiceOptions(options),
    sdkOptions,
  );
} satisfies ServiceMethod<{
  payload: RevokePayload;
}>;

/**
 * Token Refresh
 * @see https://docs.globus.org/api/auth/reference/#refresh_token_grant
 */
export const refresh = function (options, sdkOptions?) {
  if (!options?.payload) {
    throw new Error(`'payload' is required for revoke`);
  }
  return serviceRequest(
    {
      service: ID,
      scope: undefined,
      path: `/v2/oauth2/token`,
      method: HTTP_METHODS.POST,
      preventRetry: true,
    },
    injectServiceOptions(options),
    sdkOptions,
  );
} satisfies ServiceMethod<{
  payload: RefreshPayload;
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
      preventRetry: true,
    },
    injectServiceOptions(options),
    sdkOptions,
  );
} satisfies ServiceMethod<{
  payload: ValidatePayload;
}>;
