import {
  HTTP_METHODS,
  serviceRequest,
  normalizeServiceMethodArgsWithSegments,
} from '../../shared.js';
import { ID, SCOPES } from '../config.js';

import type { JSONFetchResponse, ServiceMethodDynamicSegments } from '../../types.js';

/**
 * Search Index Role document
 *
 * @see https://docs.globus.org/api/search/reference/role_list/#role
 */
export type IndexRole = {
  id: string;
  creation_date: string;
  role_name: string;
  index_id: string;
  principal: string;
  principal_type: string;
};

/**
 * Search Index Role List document
 *
 * @see https://docs.globus.org/api/search/reference/role_list/#rolelist
 */
export type IndexRoleListResponse = {
  role_list: IndexRole[];
};

/**
 * Get role list for a search index as owner or admin only
 *
 * @see https://docs.globus.org/api/search/reference/role_list/
 */
export const getAll = function (
  arg1: any,
  arg2?: any,
  arg3?: any,
): Promise<JSONFetchResponse<IndexRoleListResponse>> {
  const { segments: index_id, request, options } = normalizeServiceMethodArgsWithSegments(
    'search.roles.getAll',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v1/index/${index_id}/role_list`,
    },
    request,
    options,
  );
} satisfies ServiceMethodDynamicSegments<string, {}>;

export type SearchIndexRoleCreate = Pick<IndexRole, 'role_name' | 'principal'>;

/**
 * Create a new role for a search index as owner or admin only
 *
 * @see https://docs.globus.org/api/search/reference/role_create/
 */
export const create = function (
  arg1: any,
  arg2: any,
  arg3?: any,
): Promise<JSONFetchResponse<IndexRole>> {
  const { segments: index_id, request, options } = normalizeServiceMethodArgsWithSegments(
    'search.roles.create',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v1/index/${index_id}/role`,
      method: HTTP_METHODS.POST,
    },
    request,
    options,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    payload: SearchIndexRoleCreate;
  },
  JSONFetchResponse<IndexRole>
>;

export type SearchIndexRoleDeleted = {
  success: true;
  deleted: IndexRole;
};

/**
 * Delete a role for a search index as owner or admin only
 *
 * @see https://docs.globus.org/api/search/reference/role_delete/
 */
export const remove = function (
  arg1: any,
  arg2?: any,
  arg3?: any,
): Promise<JSONFetchResponse<SearchIndexRoleDeleted>> {
  const { segments: { index_id, role_id }, request, options } = normalizeServiceMethodArgsWithSegments(
    'search.roles.remove',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v1/index/${index_id}/role/${role_id}`,
      method: HTTP_METHODS.DELETE,
    },
    request,
    options,
  );
} satisfies ServiceMethodDynamicSegments<
  { index_id: string; role_id: string },
  {
    query?: never;
    payload?: never;
  }
>;
