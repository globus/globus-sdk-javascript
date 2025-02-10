import { HTTP_METHODS, serviceRequest } from '../../shared.js';
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
  index_id,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<IndexRoleListResponse>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v1/index/${index_id}/role_list`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<string, {}>;

export type SearchIndexRoleCreate = Pick<IndexRole, 'role_name' | 'principal'>;

/**
 * Create a new role for a search index as owner or admin only
 *
 * @see https://docs.globus.org/api/search/reference/role_create/
 */
export const create = function (
  index_id,
  options,
  sdkOptions?,
): Promise<JSONFetchResponse<IndexRole>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v1/index/${index_id}/role`,
      method: HTTP_METHODS.POST,
    },
    options,
    sdkOptions,
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
  { index_id, role_id },
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<SearchIndexRoleDeleted>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v1/index/${index_id}/role/${role_id}`,
      method: HTTP_METHODS.DELETE,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  { index_id: string; role_id: string },
  {
    query?: never;
    payload?: never;
  }
>;
