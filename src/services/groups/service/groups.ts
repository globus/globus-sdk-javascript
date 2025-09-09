import { ID } from '../config.js';
import { RESOURCE_SERVERS } from '../../auth/config.js';
import { HTTP_METHODS, serviceRequest } from '../../shared.js';

import type { OpenAPI } from '../index.js';

import type {
  JSONFetchResponse,
  ServiceMethod,
  ServiceMethodDynamicSegments,
} from '../../types.js';

/**
 * @see https://groups.api.globus.org/redoc#tag/groups/operation/get_my_groups_and_memberships_v2_groups_my_groups_get
 */
export const getMyGroups = function (
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['get_my_groups_and_memberships_v2_groups_my_groups_get']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: ID,
      resource_server: RESOURCE_SERVERS.GROUPS,
      path: `/v2/groups/my_groups`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  query?: {
    /**
     * @todo This should probably be replaced with a more specific type for the method's accepted query parameters once available.
     */
    statuses?: OpenAPI.components['schemas']['StatusEnum'][];
  };
}>;

/**
 * @see https://groups.api.globus.org/redoc#tag/groups/operation/get_group_v2_groups__group_id__get
 */
export const get = function (
  group_id,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['get_group_v2_groups__group_id__get']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: ID,
      resource_server: RESOURCE_SERVERS.GROUPS,
      path: `/v2/groups/${group_id}`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  OpenAPI.operations['get_group_v2_groups__group_id__get']['parameters']['path']['group_id'],
  {
    query?: OpenAPI.operations['get_group_v2_groups__group_id__get']['parameters']['query'];
  }
>;

/**
 * Create a new group.
 * @see https://groups.api.globus.org/redoc#tag/groups/operation/create_group_v2_groups_post
 */
export const create = function (
  options,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['create_group_v2_groups_post']['responses']['201']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: ID,
      resource_server: RESOURCE_SERVERS.GROUPS,
      path: '/v2/groups',
      method: HTTP_METHODS.POST,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  query?: never;
  payload: OpenAPI.operations['create_group_v2_groups_post']['requestBody']['content']['application/json'];
}>;

/**
 * Delete a group.
 * @see https://groups.api.globus.org/redoc#tag/groups/operation/delete_group_v2_groups__group_id__delete
 */
export const remove = function (
  group_id,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['delete_group_v2_groups__group_id__delete']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: ID,
      resource_server: RESOURCE_SERVERS.GROUPS,
      path: `/v2/groups/${group_id}`,
      method: HTTP_METHODS.DELETE,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  OpenAPI.operations['delete_group_v2_groups__group_id__delete']['parameters']['path']['group_id'],
  { query?: never; payload?: never }
>;

/**
 * Update a group's information.
 * @see https://groups.api.globus.org/redoc#tag/groups/operation/update_group_v2_groups__group_id__put
 * */
export const update = function (
  group_id,
  options,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['update_group_v2_groups__group_id__put']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: ID,
      resource_server: RESOURCE_SERVERS.GROUPS,
      path: `/v2/groups/${group_id}`,
      method: HTTP_METHODS.PUT,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  OpenAPI.operations['update_group_v2_groups__group_id__put']['parameters']['path']['group_id'],
  {
    query?: never;
    payload: OpenAPI.operations['update_group_v2_groups__group_id__put']['requestBody']['content']['application/json'];
  }
>;

/**
 * Get the status counts of memberships for each group you are an admin or manager of.
 * @see https://groups.api.globus.org/redoc#tag/groups/operation/get_statuses_v2_groups_statuses_get
 */
export const getStatuses = function (
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['get_statuses_v2_groups_statuses_get']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: ID,
      resource_server: RESOURCE_SERVERS.GROUPS,
      path: `/v2/groups/statuses`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  query?: never;
  payload?: never;
}>;
