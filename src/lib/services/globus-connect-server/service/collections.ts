import type { operations } from '@globus/types/gcs-manager/api';
import { getRequiredScopes } from '../index.js';
import { HTTP_METHODS, serviceRequest } from '../../shared.js';

import type { GCSServiceMethod, GCSServiceMethodDynamicSegments } from '../index';

import type { JSONFetchResponse } from '../../types';

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Collections/#listCollections
 */
export const getAll = function (
  configuration,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    operations['listCollections']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      scope: getRequiredScopes(configuration),
      path: `/api/collections`,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethod<{
  query?: operations['listCollections']['parameters']['query'];
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
  JSONFetchResponse<operations['getCollection']['responses']['200']['content']['application/json']>
> {
  return serviceRequest(
    {
      service: configuration,
      scope: getRequiredScopes(configuration),
      path: `/api/collections/${collection_id}`,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  operations['getCollection']['parameters']['path']['collection_id'],
  {
    query?: operations['getCollection']['parameters']['query'];
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
    operations['deleteCollection']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      scope: getRequiredScopes(configuration),
      path: `/api/collections/${collection_id}`,
      method: HTTP_METHODS.DELETE,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  operations['deleteCollection']['parameters']['path']['collection_id'],
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
  JSONFetchResponse<operations['postCollection']['responses']['201']['content']['application/json']>
> {
  return serviceRequest(
    {
      service: configuration,
      scope: getRequiredScopes(configuration),
      path: `/api/collections`,
      method: HTTP_METHODS.POST,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethod<{
  payload: operations['postCollection']['requestBody']['content']['application/json'];
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
  JSONFetchResponse<operations['putCollection']['responses']['200']['content']['application/json']>
> {
  return serviceRequest(
    {
      service: configuration,
      scope: getRequiredScopes(configuration),
      path: `/api/collections/${collection_id}`,
      method: HTTP_METHODS.PUT,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  operations['putCollection']['parameters']['path']['collection_id'],
  {
    payload: operations['putCollection']['requestBody']['content']['application/json'];
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
    operations['patchCollection']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      scope: getRequiredScopes(configuration),
      path: `/api/collections/${collection_id}`,
      method: HTTP_METHODS.PATCH,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  operations['patchCollection']['parameters']['path']['collection_id'],
  {
    payload: Partial<operations['patchCollection']['requestBody']['content']['application/json']>;
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
    operations['putCollectionOwnerString']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      scope: getRequiredScopes(configuration),
      path: `/api/collections/${collection_id}/owner_string`,
      method: HTTP_METHODS.PUT,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  operations['putCollectionOwnerString']['parameters']['path']['collection_id'],
  {
    payload: Partial<
      operations['putCollectionOwnerString']['requestBody']['content']['application/json']
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
    operations['deleteCollectionOwnerString']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      scope: getRequiredScopes(configuration),
      path: `/api/collections/${collection_id}/owner_string`,
      method: HTTP_METHODS.DELETE,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  operations['deleteCollectionOwnerString']['parameters']['path']['collection_id'],
  {}
>;
