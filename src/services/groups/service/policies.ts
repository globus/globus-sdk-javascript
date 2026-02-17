import { ID } from '../config.js';
import { RESOURCE_SERVERS } from '../../auth/config.js';
import { HTTP_METHODS, serviceRequest } from '../../shared.js';
import { createServiceMethodFactory } from '../../factory.js';

import type { OpenAPI } from '../index.js';
import type { JSONFetchResponse, ServiceMethodDynamicSegments } from '../../types.js';

/**
 * Get the policies for the group.
 * @see https://groups.api.globus.org/redoc#tag/groups/operation/get_policies_v2_groups__group_id__policies_get
 */
export const get = function (
  group_id,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['get_policies_v2_groups__group_id__policies_get']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: ID,
      resource_server: RESOURCE_SERVERS.GROUPS,
      path: `/v2/groups/${group_id}/policies`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  OpenAPI.operations['get_policies_v2_groups__group_id__policies_get']['parameters']['path']['group_id'],
  {
    query?: never;
    payload?: never;
  }
>;

/**
 * Update the policies for the group.
 * @see https://groups.api.globus.org/redoc#tag/groups/operation/update_policies_v2_groups__group_id__policies_put
 */
export const update = function (
  group_id,
  options,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['update_policies_v2_groups__group_id__policies_put']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: ID,
      resource_server: RESOURCE_SERVERS.GROUPS,
      path: `/v2/groups/${group_id}/policies`,
      method: HTTP_METHODS.PUT,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  OpenAPI.operations['update_policies_v2_groups__group_id__policies_put']['parameters']['path']['group_id'],
  {
    query?: never;
    payload: OpenAPI.operations['update_policies_v2_groups__group_id__policies_put']['requestBody']['content']['application/json'];
  }
>;

/**
 * @private
 */
export const next = {
  get: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS.GROUPS,
    path: `/v2/groups/{group_id}/policies`,
  }).generate<
    {
      request?: {
        query?: never;
        data?: never;
      };
    },
    JSONFetchResponse<
      OpenAPI.operations['get_policies_v2_groups__group_id__policies_get']['responses']['200']['content']['application/json']
    >
  >(),
  update: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS.GROUPS,
    path: `/v2/groups/{group_id}/policies`,
    method: HTTP_METHODS.PUT,
  }).generate<
    {
      request?: {
        data: OpenAPI.operations['update_policies_v2_groups__group_id__policies_put']['requestBody']['content']['application/json'];
      };
    },
    JSONFetchResponse<
      OpenAPI.operations['update_policies_v2_groups__group_id__policies_put']['responses']['200']['content']['application/json']
    >
  >(),
};
