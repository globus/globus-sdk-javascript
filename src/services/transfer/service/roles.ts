import {
  HTTP_METHODS,
  serviceRequest,
  wrapServiceMethodWithSegments,
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
export const getAll = wrapServiceMethodWithSegments(
  'transfer.roles.getAll',
  function (
    endpoint_id: string,
    options?: {
      query?: never;
      payload?: never;
    },
    sdkOptions?,
  ): Promise<JSONFetchResponse<RoleListDocument>> {
    return serviceRequest(
      {
        service: ID,
        scope: SCOPES.ALL,
        path: `/v0.10/endpoint/${endpoint_id}/role_list`,
      },
      options,
      sdkOptions,
    );
  },
) satisfies ServiceMethodDynamicSegments<
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
export const get = wrapServiceMethodWithSegments(
  'transfer.roles.get',
  function (
    { endpoint_id, role_id }: { endpoint_id: string; role_id: string },
    options?: {
      query?: never;
      payload?: never;
    },
    sdkOptions?,
  ): Promise<JSONFetchResponse<RoleDocument>> {
    return serviceRequest(
      {
        service: ID,
        scope: SCOPES.ALL,
        path: `/v0.10/endpoint/${endpoint_id}/role/${role_id}`,
      },
      options,
      sdkOptions,
    );
  },
) satisfies ServiceMethodDynamicSegments<
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
export const create = wrapServiceMethodWithSegments(
  'transfer.roles.create',
  function (
    collection_id: string,
    options?: {
      payload: Partial<RoleDocument>;
    },
    sdkOptions?,
  ): Promise<JSONFetchResponse<RoleDocument>> {
    return serviceRequest(
      {
        service: ID,
        scope: SCOPES.ALL,
        path: `/v0.10/endpoint/${collection_id}/role`,
        method: HTTP_METHODS.POST,
      },
      options,
      sdkOptions,
    );
  },
) satisfies ServiceMethodDynamicSegments<
  string,
  {
    payload: Partial<RoleDocument>;
  }
>;

/**
 * Delete a single Globus Connect Personal collection role assignment by id.
 * @see https://docs.globus.org/api/transfer/roles/#delete_globus_connect_personal_collection_role_by_id
 */
export const remove = wrapServiceMethodWithSegments(
  'transfer.roles.remove',
  function (
    { collection_id, role_id }: { collection_id: string; role_id: string },
    options?: {
      query?: never;
      payload?: never;
    },
    sdkOptions?,
  ): Promise<
    JSONFetchResponse<{
      DATA_TYPE: 'result';
      code: 'Deleted';
      message: string;
      request_id: string;
      resource: `/endpoint/${string}/role/${string}`;
    }>
  > {
    return serviceRequest(
      {
        service: ID,
        scope: SCOPES.ALL,
        path: `/v0.10/endpoint/${collection_id}/role/${role_id}`,
        method: HTTP_METHODS.DELETE,
      },
      options,
      sdkOptions,
    );
  },
) satisfies ServiceMethodDynamicSegments<
  { collection_id: string; role_id: string },
  {
    query?: never;
    payload?: never;
  }
>;
