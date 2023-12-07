import type { operations } from '@globus/types/gcs-manager/api';
import { getRequiredScopes } from '../index.js';
import { HTTP_METHODS, serviceRequest } from '../../../services/shared.js';

import type { GCSServiceMethod, GCSServiceMethodDynamicSegments } from '../index';

import type { JSONFetchResponse } from '../../types';

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Storage_Gateways/#listStorageGateways
 */
export const getAll = function (
  configuration,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    operations['listStorageGateways']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      scope: getRequiredScopes(configuration),
      path: `/api/storage_gateways`,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethod<{
  query?: operations['listStorageGateways']['parameters']['query'];
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
    operations['getStorageGateway']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      scope: getRequiredScopes(configuration),
      path: `/api/storage_gateways/${storage_gateway_id}`,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  operations['getStorageGateway']['parameters']['path']['storage_gateway_id'],
  {
    query?: operations['getStorageGateway']['parameters']['query'];
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
    operations['deleteStorageGateway']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      scope: getRequiredScopes(configuration),
      path: `/api/storage_gateways/${storage_gateway_id}`,
      method: HTTP_METHODS.DELETE,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  operations['deleteStorageGateway']['parameters']['path']['storage_gateway_id'],
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
    operations['postStorageGateway']['responses']['201']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      scope: getRequiredScopes(configuration),
      path: `/api/storage_gateways`,
      method: HTTP_METHODS.POST,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethod<{
  payload: operations['postStorageGateway']['requestBody']['content']['application/json'];
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
    operations['putStorageGateway']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      scope: getRequiredScopes(configuration),
      path: `/api/storage_gateways/${storage_gateway_id}`,
      method: HTTP_METHODS.PUT,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  operations['putStorageGateway']['parameters']['path']['storage_gateway_id'],
  {
    payload: operations['putStorageGateway']['requestBody']['content']['application/json'];
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
    operations['patchStorageGateway']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      scope: getRequiredScopes(configuration),
      path: `/api/storage_gateways/${storage_gateway_id}`,
      method: HTTP_METHODS.PATCH,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  operations['patchStorageGateway']['parameters']['path']['storage_gateway_id'],
  {
    payload: Partial<
      operations['patchStorageGateway']['requestBody']['content']['application/json']
    >;
  }
>;
