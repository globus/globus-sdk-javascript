import {
  HTTP_METHODS,
  serviceRequest,
  normalizeServiceMethodArgsWithSegments,
} from '../../shared.js';

import { ID, SCOPES } from '../config.js';

import type { ServiceMethodDynamicSegments, JSONFetchResponse } from '../../../services/types.js';

import type { EndpointRole } from './endpoint';

/**
 * @see https://docs.globus.org/api/transfer/endpoint_roles/#role_document_fields
 */
export type RoleDocument = {
  DATA_TYPE: 'role';
  id: string;
  principal_type: 'identity' | 'group';
  principal: string;
  role: EndpointRole;
};

/**
 * @see https://docs.globus.org/api/transfer/endpoint_roles/#role_list
 */
export type RoleListDocument = {
  DATA_TYPE: 'role_list';
  DATA: RoleDocument[];
};

/**
 * Get a list of role assignments for an endpoint.
 * @see https://docs.globus.org/api/transfer/roles/#role_list
 */
export const getAll = function (
  arg1: any,
  arg2?: any,
  arg3?: any,
): Promise<JSONFetchResponse<RoleListDocument>> {
  const { segments: endpoint_id, request, options } = normalizeServiceMethodArgsWithSegments(
    'transfer.roles.getAll',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint/${endpoint_id}/role_list`,
    },
    request,
    options,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: never;
    payload?: never;
  }
>;

/**
 * Fetch a role by its UUID.
 * @see https://docs.globus.org/api/transfer/roles/#get_role_by_id
 */
export const get = function (
  arg1: any,
  arg2?: any,
  arg3?: any,
): Promise<JSONFetchResponse<RoleDocument>> {
  const { segments: { endpoint_id, role_id }, request, options } = normalizeServiceMethodArgsWithSegments(
    'transfer.roles.get',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint/${endpoint_id}/role/${role_id}`,
    },
    request,
    options,
  );
} satisfies ServiceMethodDynamicSegments<
  { endpoint_id: string; role_id: string },
  {
    query?: never;
    payload?: never;
  }
>;

/**
 * Assign a role to an identity or group for a Globus Connect Personal collection.
 * @see https://docs.globus.org/api/transfer/roles/#create_role
 */
export const create = function (
  arg1: any,
  arg2: any,
  arg3?: any,
): Promise<JSONFetchResponse<RoleDocument>> {
  const { segments: collection_id, request, options } = normalizeServiceMethodArgsWithSegments(
    'transfer.roles.create',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint/${collection_id}/role`,
      method: HTTP_METHODS.POST,
    },
    request,
    options,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    payload: Partial<RoleDocument>;
  }
>;

/**
 * Delete a single Globus Connect Personal collection role assignment by id.
 * @see https://docs.globus.org/api/transfer/roles/#delete_globus_connect_personal_collection_role_by_id
 */
export const remove = function (
  arg1: any,
  arg2?: any,
  arg3?: any,
): Promise<
  JSONFetchResponse<{
    DATA_TYPE: 'result';
    code: 'Deleted';
    message: string;
    request_id: string;
    resource: `/endpoint/${string}/role/${string}`;
  }>
> {
  const { segments: { collection_id, role_id }, request, options } = normalizeServiceMethodArgsWithSegments(
    'transfer.roles.remove',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint/${collection_id}/role/${role_id}`,
      method: HTTP_METHODS.DELETE,
    },
    request,
    options,
  );
} satisfies ServiceMethodDynamicSegments<
  { collection_id: string; role_id: string },
  {
    query?: never;
    payload?: never;
  }
>;
