import { HTTP_METHODS, serviceRequest } from '../../shared.js';
import { createGCSServiceMethodFactory } from '../../factory.js';

import type { OpenAPI, GCSServiceMethod, GCSServiceMethodDynamicSegments } from '../index.js';

import type { JSONFetchResponse } from '../../types.js';

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Collections/#listCollections
 */
export const getAll = function (
  configuration,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['listCollections']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/collections`,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethod<{
  query?: OpenAPI.operations['listCollections']['parameters']['query'];
}>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Collections/#getCollection
 */
export const get = function (
  configuration,
  collection_id,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['getCollection']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/collections/${collection_id}`,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  OpenAPI.operations['getCollection']['parameters']['path']['collection_id'],
  {
    query?: OpenAPI.operations['getCollection']['parameters']['query'];
  }
>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Collections/#deleteCollection
 */
export const remove = function (
  configuration,
  collection_id,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['deleteCollection']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/collections/${collection_id}`,
      method: HTTP_METHODS.DELETE,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  OpenAPI.operations['deleteCollection']['parameters']['path']['collection_id'],
  {
    query?: never;
    payload?: never;
  }
>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Collections/#postCollection
 */
export const create = function (
  configuration,
  options,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['postCollection']['responses']['201']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/collections`,
      method: HTTP_METHODS.POST,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethod<{
  payload: OpenAPI.operations['postCollection']['requestBody']['content']['application/json'];
}>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Collections/#putCollection
 */
export const update = function (
  configuration,
  collection_id,
  options,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['putCollection']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/collections/${collection_id}`,
      method: HTTP_METHODS.PUT,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  OpenAPI.operations['putCollection']['parameters']['path']['collection_id'],
  {
    payload: OpenAPI.operations['putCollection']['requestBody']['content']['application/json'];
  }
>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Collections/#patchCollection
 */
export const patch = function (
  configuration,
  collection_id,
  options,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['patchCollection']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/collections/${collection_id}`,
      method: HTTP_METHODS.PATCH,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  OpenAPI.operations['patchCollection']['parameters']['path']['collection_id'],
  {
    payload: Partial<
      OpenAPI.operations['patchCollection']['requestBody']['content']['application/json']
    >;
  }
>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Collections/#putCollectionOwnerString
 */
export const updateOwnerString = function (
  configuration,
  collection_id,
  options,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['putCollectionOwnerString']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/collections/${collection_id}/owner_string`,
      method: HTTP_METHODS.PUT,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  OpenAPI.operations['putCollectionOwnerString']['parameters']['path']['collection_id'],
  {
    payload: Partial<
      OpenAPI.operations['putCollectionOwnerString']['requestBody']['content']['application/json']
    >;
  }
>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Collections/#deleteCollectionOwnerString
 */
export const resetOwnerString = function (
  configuration,
  collection_id,
  options,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['deleteCollectionOwnerString']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/collections/${collection_id}/owner_string`,
      method: HTTP_METHODS.DELETE,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  OpenAPI.operations['deleteCollectionOwnerString']['parameters']['path']['collection_id'],
  {}
>;

/**
 * @private
 */
export const next = {
  getAll: createGCSServiceMethodFactory({
    path: `/api/collections`,
  }).generate<
    {
      request?: {
        query?: OpenAPI.operations['listCollections']['parameters']['query'];
        data?: never;
      };
    },
    JSONFetchResponse<
      OpenAPI.operations['listCollections']['responses']['200']['content']['application/json']
    >
  >(),

  get: createGCSServiceMethodFactory({
    path: `/api/collections/{collection_id}`,
  }).generate<
    {
      request?: {
        query?: OpenAPI.operations['getCollection']['parameters']['query'];
        data?: never;
      };
    },
    JSONFetchResponse<
      OpenAPI.operations['getCollection']['responses']['200']['content']['application/json']
    >
  >(),

  create: createGCSServiceMethodFactory({
    path: `/api/collections`,
    method: HTTP_METHODS.POST,
  }).generate<
    {
      request: {
        data: OpenAPI.operations['postCollection']['requestBody']['content']['application/json'];
      };
    },
    JSONFetchResponse<
      OpenAPI.operations['postCollection']['responses']['201']['content']['application/json']
    >
  >(),

  update: createGCSServiceMethodFactory({
    path: `/api/collections/{collection_id}`,
    method: HTTP_METHODS.PUT,
  }).generate<
    {
      request: {
        data: OpenAPI.operations['putCollection']['requestBody']['content']['application/json'];
      };
    },
    JSONFetchResponse<
      OpenAPI.operations['putCollection']['responses']['200']['content']['application/json']
    >
  >(),

  patch: createGCSServiceMethodFactory({
    path: `/api/collections/{collection_id}`,
    method: HTTP_METHODS.PATCH,
  }).generate<
    {
      request: {
        data: Partial<
          OpenAPI.operations['patchCollection']['requestBody']['content']['application/json']
        >;
      };
    },
    JSONFetchResponse<
      OpenAPI.operations['patchCollection']['responses']['200']['content']['application/json']
    >
  >(),

  remove: createGCSServiceMethodFactory({
    path: `/api/collections/{collection_id}`,
    method: HTTP_METHODS.DELETE,
  }).generate<
    {
      request?: {
        query?: never;
        data?: never;
      };
    },
    JSONFetchResponse<
      OpenAPI.operations['deleteCollection']['responses']['200']['content']['application/json']
    >
  >(),

  updateOwnerString: createGCSServiceMethodFactory({
    path: `/api/collections/{collection_id}/owner_string`,
    method: HTTP_METHODS.PUT,
  }).generate<
    {
      request: {
        data: Partial<
          OpenAPI.operations['putCollectionOwnerString']['requestBody']['content']['application/json']
        >;
      };
    },
    JSONFetchResponse<
      OpenAPI.operations['putCollectionOwnerString']['responses']['200']['content']['application/json']
    >
  >(),

  resetOwnerString: createGCSServiceMethodFactory({
    path: `/api/collections/{collection_id}/owner_string`,
    method: HTTP_METHODS.DELETE,
  }).generate<
    {
      request?: {
        query?: never;
        data?: never;
      };
    },
    JSONFetchResponse<
      OpenAPI.operations['deleteCollectionOwnerString']['responses']['200']['content']['application/json']
    >
  >(),
};
