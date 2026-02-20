import { HTTP_METHODS, serviceRequest } from '../../../services/shared.js';
import { createGCSServiceMethodFactory } from '../../factory.js';

import type { OpenAPI, GCSServiceMethod, GCSServiceMethodDynamicSegments } from '../index.js';

import type { JSONFetchResponse } from '../../types.js';
/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Storage_Gateways/#listStorageGateways
 */
export const getAll = function (
  configuration,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['listStorageGateways']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/storage_gateways`,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethod<{
  query?: OpenAPI.operations['listStorageGateways']['parameters']['query'];
}>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Storage_Gateways/#getStorageGateway
 */
export const get = function (
  configuration,
  storage_gateway_id,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['getStorageGateway']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/storage_gateways/${storage_gateway_id}`,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  OpenAPI.operations['getStorageGateway']['parameters']['path']['storage_gateway_id'],
  {
    query?: OpenAPI.operations['getStorageGateway']['parameters']['query'];
  }
>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Storage_Gateways/#deleteStorageGateway
 */
export const remove = function (
  configuration,
  storage_gateway_id,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['deleteStorageGateway']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/storage_gateways/${storage_gateway_id}`,
      method: HTTP_METHODS.DELETE,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  OpenAPI.operations['deleteStorageGateway']['parameters']['path']['storage_gateway_id'],
  {
    query?: never;
    payload?: never;
  }
>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Storage_Gateways/#postStorageGateway
 */
export const create = function (
  configuration,
  options,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['postStorageGateway']['responses']['201']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/storage_gateways`,
      method: HTTP_METHODS.POST,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethod<{
  payload: OpenAPI.operations['postStorageGateway']['requestBody']['content']['application/json'];
}>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Storage_Gateways/#putStorageGateway
 */
export const update = function (
  configuration,
  storage_gateway_id,
  options,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['putStorageGateway']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/storage_gateways/${storage_gateway_id}`,
      method: HTTP_METHODS.PUT,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  OpenAPI.operations['putStorageGateway']['parameters']['path']['storage_gateway_id'],
  {
    payload: OpenAPI.operations['putStorageGateway']['requestBody']['content']['application/json'];
  }
>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Storage_Gateways/#patchStorageGateway
 */
export const patch = function (
  configuration,
  storage_gateway_id,
  options,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['patchStorageGateway']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/storage_gateways/${storage_gateway_id}`,
      method: HTTP_METHODS.PATCH,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  OpenAPI.operations['patchStorageGateway']['parameters']['path']['storage_gateway_id'],
  {
    payload: Partial<
      OpenAPI.operations['patchStorageGateway']['requestBody']['content']['application/json']
    >;
  }
>;

/**
 * @private
 */
export const next = {
  getAll: createGCSServiceMethodFactory({
    path: `/api/storage_gateways`,
  }).generate<
    {
      request?: {
        query?: OpenAPI.operations['listStorageGateways']['parameters']['query'];
        data?: never;
      };
    },
    JSONFetchResponse<
      OpenAPI.operations['listStorageGateways']['responses']['200']['content']['application/json']
    >
  >(),

  get: createGCSServiceMethodFactory({
    path: `/api/storage_gateways/{storage_gateway_id}`,
  }).generate<
    {
      request?: {
        query?: OpenAPI.operations['getStorageGateway']['parameters']['query'];
        data?: never;
      };
    },
    JSONFetchResponse<
      OpenAPI.operations['getStorageGateway']['responses']['200']['content']['application/json']
    >
  >(),

  create: createGCSServiceMethodFactory({
    path: `/api/storage_gateways`,
    method: HTTP_METHODS.POST,
  }).generate<
    {
      request: {
        data: OpenAPI.operations['postStorageGateway']['requestBody']['content']['application/json'];
      };
    },
    JSONFetchResponse<
      OpenAPI.operations['postStorageGateway']['responses']['201']['content']['application/json']
    >
  >(),

  update: createGCSServiceMethodFactory({
    path: `/api/storage_gateways/{storage_gateway_id}`,
    method: HTTP_METHODS.PUT,
  }).generate<
    {
      request: {
        data: OpenAPI.operations['putStorageGateway']['requestBody']['content']['application/json'];
      };
    },
    JSONFetchResponse<
      OpenAPI.operations['putStorageGateway']['responses']['200']['content']['application/json']
    >
  >(),

  patch: createGCSServiceMethodFactory({
    path: `/api/storage_gateways/{storage_gateway_id}`,
    method: HTTP_METHODS.PATCH,
  }).generate<
    {
      request: {
        data: Partial<
          OpenAPI.operations['patchStorageGateway']['requestBody']['content']['application/json']
        >;
      };
    },
    JSONFetchResponse<
      OpenAPI.operations['patchStorageGateway']['responses']['200']['content']['application/json']
    >
  >(),

  remove: createGCSServiceMethodFactory({
    path: `/api/storage_gateways/{storage_gateway_id}`,
    method: HTTP_METHODS.DELETE,
  }).generate<
    {
      request?: {
        query?: never;
        data?: never;
      };
    },
    JSONFetchResponse<
      OpenAPI.operations['deleteStorageGateway']['responses']['200']['content']['application/json']
    >
  >(),
};
