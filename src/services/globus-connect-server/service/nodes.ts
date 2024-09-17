import type { operations } from '@globus/types/gcs-manager/api';
import { getRequiredScopes } from '../index.js';

import { HTTP_METHODS, serviceRequest } from '../../../services/shared.js';

import type { GCSServiceMethod, GCSServiceMethodDynamicSegments } from '../index';

import type { JSONFetchResponse } from '../../types';

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Nodes/#listNodes
 */
export const getAll = function (
  configuration,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<operations['listNodes']['responses']['200']['content']['application/json']>
> {
  return serviceRequest(
    {
      service: configuration,
      scope: getRequiredScopes(configuration),
      path: `/api/nodes`,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethod<{
  query?: operations['listNodes']['parameters']['query'];
}>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Nodes/#getNode
 */
export const get = function (
  configuration,
  node_id,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<operations['getNode']['responses']['200']['content']['application/json']>
> {
  return serviceRequest(
    {
      service: configuration,
      scope: getRequiredScopes(configuration),
      path: `/api/nodes/${node_id}`,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  operations['getNode']['parameters']['path']['node_id'],
  {
    query?: never;
    payload?: never;
  }
>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Nodes/#deleteNode
 */
export const remove = function (
  configuration,
  node_id,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<operations['deleteNode']['responses']['200']['content']['application/json']>
> {
  return serviceRequest(
    {
      service: configuration,
      scope: getRequiredScopes(configuration),
      path: `/api/nodes/${node_id}`,
      method: HTTP_METHODS.DELETE,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  operations['deleteNode']['parameters']['path']['node_id'],
  {
    query?: never;
    payload?: never;
  }
>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Nodes/#postNodes
 */
export const create = function (
  configuration,
  options,
  sdkOptions?,
): Promise<
  JSONFetchResponse<operations['postNode']['responses']['200']['content']['application/json']>
> {
  return serviceRequest(
    {
      service: configuration,
      scope: getRequiredScopes(configuration),
      path: `/api/nodes`,
      method: HTTP_METHODS.POST,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethod<{
  payload: operations['postNode']['requestBody']['content']['application/json'];
}>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Nodes/#putNode
 */
export const update = function (
  configuration,
  node_id,
  options,
  sdkOptions?,
): Promise<
  JSONFetchResponse<operations['putNode']['responses']['200']['content']['application/json']>
> {
  return serviceRequest(
    {
      service: configuration,
      scope: getRequiredScopes(configuration),
      path: `/api/nodes/${node_id}`,
      method: HTTP_METHODS.PUT,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  operations['putNode']['parameters']['path']['node_id'],
  {
    payload: operations['putNode']['requestBody']['content']['application/json'];
  }
>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Nodes/#patchNode
 */
export const patch = function (
  configuration,
  node_id,
  options,
  sdkOptions?,
): Promise<
  JSONFetchResponse<operations['patchNode']['responses']['200']['content']['application/json']>
> {
  return serviceRequest(
    {
      service: configuration,
      scope: getRequiredScopes(configuration),
      path: `/api/nodes/${node_id}`,
      method: HTTP_METHODS.PATCH,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  operations['patchNode']['parameters']['path']['node_id'],
  {
    payload: Partial<operations['patchNode']['requestBody']['content']['application/json']>;
  }
>;
