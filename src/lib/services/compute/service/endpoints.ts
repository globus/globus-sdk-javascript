import type { operations } from '@globus/types/compute';
import { HTTP_METHODS, serviceRequest } from '../../shared.js';
import { ID, SCOPES } from '../config.js';

import type {
  ServiceMethod,
  ServiceMethodDynamicSegments,
  JSONFetchResponse,
} from '../../types.js';

export const getAll = function (
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    operations['get_endpoints_v2_endpoints_get']['responses']['200']['content']['application/json']
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
  query: operations['get_endpoints_v2_endpoints_get']['parameters']['query'];
}>;

export const get = function (
  endpoint_uuid,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    operations['get_endpoint_v2_endpoints__endpoint_uuid__get']['responses']['200']['content']['application/json']
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
  operations['get_endpoint_v2_endpoints__endpoint_uuid__get']['parameters']['path']['endpoint_uuid'],
  {
    query?: never;
    payload?: never;
  }
>;

export const getStatus = function (
  endpoint_uuid,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    operations['get_endpoint_status_v2_endpoints__endpoint_uuid__status_get']['responses']['200']['content']['application/json']
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
  operations['get_endpoint_status_v2_endpoints__endpoint_uuid__status_get']['parameters']['path']['endpoint_uuid'],
  {
    query?: never;
    payload?: never;
  }
>;
