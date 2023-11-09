import type { operations } from '@globus/types/gcs-manager/api';
import { getRequiredScopes } from '../index.js';
import { serviceRequest } from '../../../services/shared.js';

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
