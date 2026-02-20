import { HTTP_METHODS, serviceRequest } from '../../shared.js';
import { createGCSServiceMethodFactory } from '../../factory.js';

import type { OpenAPI, GCSServiceMethod } from '../index.js';
import type { JSONFetchResponse } from '../../types.js';

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Endpoint/#getEndpoint
 */
export const get = function (
  configuration,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['getEndpoint']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/endpoint`,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethod<{
  query?: never;
  payload?: never;
}>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Endpoint/#putEndpoint
 */
export const update = function (
  configuration,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['putEndpoint']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/endpoint`,
      method: HTTP_METHODS.PUT,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethod<{
  payload: Partial<OpenAPI.operations['putEndpoint']['requestBody']['content']['application/json']>;
}>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Endpoint/#patchEndpoint
 */
export const patch = function (
  configuration,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['patchEndpoint']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/endpoint`,
      method: HTTP_METHODS.PATCH,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethod<{
  /**
   * @todo The generated PATCH type is resolving to the Endpoint document, which
   * has some properties that are required (i.e. `display_name`). For now, we're
   * just allowing unknown properties to be passed in, but we should fix this
   * when the auotgenerated types are corrected.
   */
  payload:
    | OpenAPI.operations['patchEndpoint']['requestBody']['content']['application/json']
    | Record<string, unknown>;
}>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Endpoint/#putEndpointSubscriptionId
 */
export const updateSubscriptionId = function (
  configuration,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['putEndpointSubscriptionId']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/endpoint/subscription_id`,
      method: HTTP_METHODS.PUT,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethod<{
  payload: OpenAPI.operations['putEndpointSubscriptionId']['requestBody']['content']['application/json'];
}>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Endpoint/#putEndpointOwner
 */
export const updateOwner = function (
  configuration,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['putEndpointOwner']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/endpoint/owner`,
      method: HTTP_METHODS.PUT,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethod<{
  payload: OpenAPI.operations['putEndpointOwner']['requestBody']['content']['application/json'];
}>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Endpoint/#putEndpointOwnerString
 */
export const updateOwnerString = function (
  configuration,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['putEndpointOwnerString']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/endpoint/owner_string`,
      method: HTTP_METHODS.PUT,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethod<{
  payload: OpenAPI.operations['putEndpointOwnerString']['requestBody']['content']['application/json'];
}>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Endpoint/#deleteEndpointOwnerString
 */
export const resetOwnerString = function (
  configuration,
  options,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['deleteEndpointOwnerString']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/endpoint/owner_string`,
      method: HTTP_METHODS.DELETE,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethod<{}>;

/**
 * @private
 */
export const next = {
  get: createGCSServiceMethodFactory({
    path: `/api/endpoint`,
  }).generate<
    {
      request?: {
        query?: never;
        data?: never;
      };
    },
    JSONFetchResponse<
      OpenAPI.operations['getEndpoint']['responses']['200']['content']['application/json']
    >
  >(),

  update: createGCSServiceMethodFactory({
    path: `/api/endpoint`,
    method: HTTP_METHODS.PUT,
  }).generate<
    {
      request: {
        data: Partial<
          OpenAPI.operations['putEndpoint']['requestBody']['content']['application/json']
        >;
      };
    },
    JSONFetchResponse<
      OpenAPI.operations['putEndpoint']['responses']['200']['content']['application/json']
    >
  >(),

  patch: createGCSServiceMethodFactory({
    path: `/api/endpoint`,
    method: HTTP_METHODS.PATCH,
  }).generate<
    {
      request: {
        data:
          | OpenAPI.operations['patchEndpoint']['requestBody']['content']['application/json']
          | Record<string, unknown>;
      };
    },
    JSONFetchResponse<
      OpenAPI.operations['patchEndpoint']['responses']['200']['content']['application/json']
    >
  >(),

  updateSubscriptionId: createGCSServiceMethodFactory({
    path: `/api/endpoint/subscription_id`,
    method: HTTP_METHODS.PUT,
  }).generate<
    {
      request: {
        data: OpenAPI.operations['putEndpointSubscriptionId']['requestBody']['content']['application/json'];
      };
    },
    JSONFetchResponse<
      OpenAPI.operations['putEndpointSubscriptionId']['responses']['200']['content']['application/json']
    >
  >(),

  updateOwner: createGCSServiceMethodFactory({
    path: `/api/endpoint/owner`,
    method: HTTP_METHODS.PUT,
  }).generate<
    {
      request: {
        data: OpenAPI.operations['putEndpointOwner']['requestBody']['content']['application/json'];
      };
    },
    JSONFetchResponse<
      OpenAPI.operations['putEndpointOwner']['responses']['200']['content']['application/json']
    >
  >(),

  updateOwnerString: createGCSServiceMethodFactory({
    path: `/api/endpoint/owner_string`,
    method: HTTP_METHODS.PUT,
  }).generate<
    {
      request: {
        data: OpenAPI.operations['putEndpointOwnerString']['requestBody']['content']['application/json'];
      };
    },
    JSONFetchResponse<
      OpenAPI.operations['putEndpointOwnerString']['responses']['200']['content']['application/json']
    >
  >(),

  resetOwnerString: createGCSServiceMethodFactory({
    path: `/api/endpoint/owner_string`,
    method: HTTP_METHODS.DELETE,
  }).generate<
    {
      request?: {
        query?: never;
        data?: never;
      };
    },
    JSONFetchResponse<
      OpenAPI.operations['deleteEndpointOwnerString']['responses']['200']['content']['application/json']
    >
  >(),
};
