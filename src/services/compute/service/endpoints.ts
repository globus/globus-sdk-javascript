import { HTTP_METHODS, serviceRequest } from '../../shared.js';
import { ID, SCOPES } from '../config.js';

import type {
  ServiceMethod,
  ServiceMethodDynamicSegments,
  JSONFetchResponse,
} from '../../types.js';

import type { OpenAPI } from '../index.js';

/**
 * @see https://compute.api.globus.org/redoc#tag/Endpoints/operation/get_endpoints_v2_endpoints_get
 */
export const getAll = function (
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['get_endpoints_v2_endpoints_get']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: '/v2/endpoints',
      method: HTTP_METHODS.GET,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  query: OpenAPI.operations['get_endpoints_v2_endpoints_get']['parameters']['query'];
}>;

/**
 * @see https://compute.api.globus.org/redoc#tag/Endpoints/operation/get_endpoint_v2_endpoints__endpoint_uuid__get
 */
export const get = function (
  endpoint_uuid,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['get_endpoint_v2_endpoints__endpoint_uuid__get']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v2/endpoints/${endpoint_uuid}`,
      method: HTTP_METHODS.GET,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  OpenAPI.operations['get_endpoint_v2_endpoints__endpoint_uuid__get']['parameters']['path']['endpoint_uuid'],
  {
    query?: never;
    payload?: never;
  }
>;

/**
 * @see https://compute.api.globus.org/redoc#tag/Endpoints/operation/get_endpoint_status_v2_endpoints__endpoint_uuid__status_get
 */
export const getStatus = function (
  endpoint_uuid,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['get_endpoint_status_v2_endpoints__endpoint_uuid__status_get']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v2/endpoints/${endpoint_uuid}/status`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  OpenAPI.operations['get_endpoint_status_v2_endpoints__endpoint_uuid__status_get']['parameters']['path']['endpoint_uuid'],
  {
    query?: never;
    payload?: never;
  }
>;

/**
 * @see https://compute.api.globus.org/redoc#tag/Endpoints/operation/update_endpoint_v3_endpoints__endpoint_uuid__put
 */
export const update = function (
  endpoint_uuid,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['update_endpoint_v3_endpoints__endpoint_uuid__put']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v3/endpoints/${endpoint_uuid}`,
      method: HTTP_METHODS.PUT,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  OpenAPI.operations['update_endpoint_v3_endpoints__endpoint_uuid__put']['parameters']['path']['endpoint_uuid'],
  {
    query?: never;
    payload: Partial<
      OpenAPI.operations['update_endpoint_v3_endpoints__endpoint_uuid__put']['requestBody']['content']['application/json']
    >;
  }
>;

/**
 * @see https://compute.api.globus.org/redoc#tag/Endpoints/operation/delete_endpoint_v2_endpoints__endpoint_uuid__delete
 */
export const remove = function (
  endpoint_uuid,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['delete_endpoint_v2_endpoints__endpoint_uuid__delete']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v2/endpoints/${endpoint_uuid}`,
      method: HTTP_METHODS.DELETE,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  OpenAPI.operations['delete_endpoint_v2_endpoints__endpoint_uuid__delete']['parameters']['path']['endpoint_uuid'],
  {
    query?: never;
    payload?: never;
  }
>;
