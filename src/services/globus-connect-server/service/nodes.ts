import { HTTP_METHODS, serviceRequest } from '../../../services/shared.js';
import { createGCSServiceMethodFactory } from '../../factory.js';

import type { OpenAPI, GCSServiceMethod, GCSServiceMethodDynamicSegments } from '../index.js';

import type { JSONFetchResponse } from '../../types.js';

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Nodes/#listNodes
 */
export const getAll = function (
  configuration,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['listNodes']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/nodes`,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethod<{
  query?: OpenAPI.operations['listNodes']['parameters']['query'];
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
  JSONFetchResponse<
    OpenAPI.operations['getNode']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/nodes/${node_id}`,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  OpenAPI.operations['getNode']['parameters']['path']['node_id'],
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
  JSONFetchResponse<
    OpenAPI.operations['deleteNode']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/nodes/${node_id}`,
      method: HTTP_METHODS.DELETE,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  OpenAPI.operations['deleteNode']['parameters']['path']['node_id'],
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
  JSONFetchResponse<
    OpenAPI.operations['postNode']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/nodes`,
      method: HTTP_METHODS.POST,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethod<{
  payload: OpenAPI.operations['postNode']['requestBody']['content']['application/json'];
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
  JSONFetchResponse<
    OpenAPI.operations['putNode']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/nodes/${node_id}`,
      method: HTTP_METHODS.PUT,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  OpenAPI.operations['putNode']['parameters']['path']['node_id'],
  {
    payload: OpenAPI.operations['putNode']['requestBody']['content']['application/json'];
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
  JSONFetchResponse<
    OpenAPI.operations['patchNode']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/nodes/${node_id}`,
      method: HTTP_METHODS.PATCH,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  OpenAPI.operations['patchNode']['parameters']['path']['node_id'],
  {
    payload: Partial<OpenAPI.operations['patchNode']['requestBody']['content']['application/json']>;
  }
>;

/**
 * @private
 */
export const next = {
  getAll: createGCSServiceMethodFactory({
    path: `/api/nodes`,
  }).generate<
    {
      request?: {
        query?: OpenAPI.operations['listNodes']['parameters']['query'];
        data?: never;
      };
    },
    JSONFetchResponse<
      OpenAPI.operations['listNodes']['responses']['200']['content']['application/json']
    >
  >(),

  get: createGCSServiceMethodFactory({
    path: `/api/nodes/{node_id}`,
  }).generate<
    {
      request?: {
        query?: never;
        data?: never;
      };
    },
    JSONFetchResponse<
      OpenAPI.operations['getNode']['responses']['200']['content']['application/json']
    >
  >(),

  create: createGCSServiceMethodFactory({
    path: `/api/nodes`,
    method: HTTP_METHODS.POST,
  }).generate<
    {
      request: {
        data: OpenAPI.operations['postNode']['requestBody']['content']['application/json'];
      };
    },
    JSONFetchResponse<
      OpenAPI.operations['postNode']['responses']['200']['content']['application/json']
    >
  >(),

  update: createGCSServiceMethodFactory({
    path: `/api/nodes/{node_id}`,
    method: HTTP_METHODS.PUT,
  }).generate<
    {
      request: {
        data: OpenAPI.operations['putNode']['requestBody']['content']['application/json'];
      };
    },
    JSONFetchResponse<
      OpenAPI.operations['putNode']['responses']['200']['content']['application/json']
    >
  >(),

  patch: createGCSServiceMethodFactory({
    path: `/api/nodes/{node_id}`,
    method: HTTP_METHODS.PATCH,
  }).generate<
    {
      request: {
        data: Partial<
          OpenAPI.operations['patchNode']['requestBody']['content']['application/json']
        >;
      };
    },
    JSONFetchResponse<
      OpenAPI.operations['patchNode']['responses']['200']['content']['application/json']
    >
  >(),

  remove: createGCSServiceMethodFactory({
    path: `/api/nodes/{node_id}`,
    method: HTTP_METHODS.DELETE,
  }).generate<
    {
      request?: {
        query?: never;
        data?: never;
      };
    },
    JSONFetchResponse<
      OpenAPI.operations['deleteNode']['responses']['200']['content']['application/json']
    >
  >(),
};
