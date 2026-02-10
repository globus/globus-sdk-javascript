import { ID } from '../config.js';
import { RESOURCE_SERVERS } from '../../auth/config.js';
import {
  HTTP_METHODS,
  serviceRequest,
  normalizeServiceMethodArgs,
  normalizeServiceMethodArgsWithSegments,
} from '../../shared.js';

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
  arg1?: any,
  arg2?: any,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['get_my_groups_and_memberships_v2_groups_my_groups_get']['responses']['200']['content']['application/json']
  >
> {
  const { request, options } = normalizeServiceMethodArgs('groups.getMyGroups', arg1, arg2);
  return serviceRequest(
    {
      service: ID,
      resource_server: RESOURCE_SERVERS.GROUPS,
      path: `/v2/groups/my_groups`,
    },
    request,
    options,
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
  arg1: any,
  arg2?: any,
  arg3?: any,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['get_group_v2_groups__group_id__get']['responses']['200']['content']['application/json']
  >
> {
  const { segments: group_id, request, options } = normalizeServiceMethodArgsWithSegments(
    'groups.get',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      resource_server: RESOURCE_SERVERS.GROUPS,
      path: `/v2/groups/${group_id}`,
    },
    request,
    options,
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
  arg1?: any,
  arg2?: any,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['create_group_v2_groups_post']['responses']['201']['content']['application/json']
  >
> {
  const { request, options } = normalizeServiceMethodArgs('groups.create', arg1, arg2);
  return serviceRequest(
    {
      service: ID,
      resource_server: RESOURCE_SERVERS.GROUPS,
      path: '/v2/groups',
      method: HTTP_METHODS.POST,
    },
    request,
    options,
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
  arg1: any,
  arg2?: any,
  arg3?: any,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['delete_group_v2_groups__group_id__delete']['responses']['200']['content']['application/json']
  >
> {
  const { segments: group_id, request, options } = normalizeServiceMethodArgsWithSegments(
    'groups.remove',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      resource_server: RESOURCE_SERVERS.GROUPS,
      path: `/v2/groups/${group_id}`,
      method: HTTP_METHODS.DELETE,
    },
    request,
    options,
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
  arg1: any,
  arg2?: any,
  arg3?: any,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['update_group_v2_groups__group_id__put']['responses']['200']['content']['application/json']
  >
> {
  const { segments: group_id, request, options } = normalizeServiceMethodArgsWithSegments(
    'groups.update',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      resource_server: RESOURCE_SERVERS.GROUPS,
      path: `/v2/groups/${group_id}`,
      method: HTTP_METHODS.PUT,
    },
    request,
    options,
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
  arg1?: any,
  arg2?: any,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['get_statuses_v2_groups_statuses_get']['responses']['200']['content']['application/json']
  >
> {
  const { request, options } = normalizeServiceMethodArgs('groups.getStatuses', arg1, arg2);
  return serviceRequest(
    {
      service: ID,
      resource_server: RESOURCE_SERVERS.GROUPS,
      path: `/v2/groups/statuses`,
    },
    request,
    options,
  );
} satisfies ServiceMethod<{
  query?: never;
  payload?: never;
}>;
