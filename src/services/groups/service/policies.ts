import { ID } from '../config.js';
import {
  HTTP_METHODS,
  serviceRequest,
  normalizeServiceMethodArgsWithSegments,
} from '../../shared.js';
import { RESOURCE_SERVERS } from '../../auth/config.js';

import type { OpenAPI } from '../index.js';
import type { JSONFetchResponse, ServiceMethodDynamicSegments } from '../../types.js';

/**
 * Get the policies for the group.
 * @see https://groups.api.globus.org/redoc#tag/groups/operation/get_policies_v2_groups__group_id__policies_get
 */
export const get = function (
  arg1: any,
  arg2?: any,
  arg3?: any,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['get_policies_v2_groups__group_id__policies_get']['responses']['200']['content']['application/json']
  >
> {
  const { segments: group_id, request, options } = normalizeServiceMethodArgsWithSegments(
    'groups.policies.get',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      resource_server: RESOURCE_SERVERS.GROUPS,
      path: `/v2/groups/${group_id}/policies`,
    },
    request,
    options,
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
  arg1: any,
  arg2: any,
  arg3?: any,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['update_policies_v2_groups__group_id__policies_put']['responses']['200']['content']['application/json']
  >
> {
  const { segments: group_id, request, options } = normalizeServiceMethodArgsWithSegments(
    'groups.policies.update',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      resource_server: RESOURCE_SERVERS.GROUPS,
      path: `/v2/groups/${group_id}/policies`,
      method: HTTP_METHODS.PUT,
    },
    request,
    options,
  );
} satisfies ServiceMethodDynamicSegments<
  OpenAPI.operations['update_policies_v2_groups__group_id__policies_put']['parameters']['path']['group_id'],
  {
    query?: never;
    payload: OpenAPI.operations['update_policies_v2_groups__group_id__policies_put']['requestBody']['content']['application/json'];
  }
>;
