import {
  HTTP_METHODS,
  serviceRequest,
  normalizeServiceMethodArgsWithSegments,
} from '../../shared.js';
import { ID, SCOPES } from '../config.js';
import { QueryParameters } from '../types.js';

import type { ServiceMethodDynamicSegments, JSONFetchResponse } from '../../../services/types.js';

/**
 * @see https://docs.globus.org/api/transfer/permissions/#permission_document
 */
export type AccessDocument = {
  DATA_TYPE: 'access';
  id: null | string;
  role_id: null | string;
  role_type: null | 'administrator' | 'access_manager';
  principal_type: 'identity' | 'group' | 'all_authenticated_users' | 'anonymous';
  principal: '' | string;
  path: string;
  permissions: 'r' | 'rw';
  create_time: null | string;
  expiration_date: null | string;
  notify_email?: null | string;
  notify_message?: null | string;
};

export type AccessListDocument = {
  DATA_TYPE: 'access_list';
  DATA: AccessDocument[];
  length: number;
  endpoint: string;
};

/**
 * @see https://docs.globus.org/api/transfer/permissions/#get_permission_list
 */
export const getAll = function (
  arg1: any,
  arg2?: any,
  arg3?: any,
): Promise<JSONFetchResponse<AccessListDocument>> {
  const { segments: endpoint_xid, request, options } = normalizeServiceMethodArgsWithSegments(
    'transfer.access.getAll',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint/${endpoint_xid}/access_list`,
    },
    request,
    options,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: QueryParameters<'Offset'>;
    payload?: never;
  }
>;

/**
 * @see https://docs.globus.org/api/transfer/permissions/#create_permission
 */
export const create = function (
  arg1: any,
  arg2: any,
  arg3?: any,
): Promise<JSONFetchResponse<AccessDocument>> {
  const { segments: endpoint_xid, request, options } = normalizeServiceMethodArgsWithSegments(
    'transfer.access.create',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint/${endpoint_xid}/access`,
      method: HTTP_METHODS.POST,
    },
    request,
    options,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    payload: Partial<AccessDocument>;
  }
>;

/**
 * @see https://docs.globus.org/api/transfer/permissions/#get_permission_by_id
 */
export const get = function (
  arg1: any,
  arg2?: any,
  arg3?: any,
): Promise<JSONFetchResponse<AccessDocument>> {
  const { segments: { endpoint_xid, id }, request, options } = normalizeServiceMethodArgsWithSegments(
    'transfer.access.get',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint/${endpoint_xid}/access/${id}`,
    },
    request,
    options,
  );
} satisfies ServiceMethodDynamicSegments<
  { endpoint_xid: string; id: string },
  {
    query?: never;
    payload?: never;
  }
>;

/**
 * @see https://docs.globus.org/api/transfer/permissions/#update_permission
 */
export const update = function (
  arg1: any,
  arg2: any,
  arg3?: any,
): Promise<
  JSONFetchResponse<{
    DATA_TYPE: 'result';
    code: 'Updated';
    message: string;
    request_id: string;
    resource: `/endpoint/${string}/access/${string}`;
  }>
> {
  const { segments: { endpoint_xid, id }, request, options } = normalizeServiceMethodArgsWithSegments(
    'transfer.access.update',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint/${endpoint_xid}/access/${id}`,
      method: HTTP_METHODS.PUT,
    },
    request,
    options,
  );
} satisfies ServiceMethodDynamicSegments<
  { endpoint_xid: string; id: string },
  {
    query?: never;
    payload: Partial<AccessDocument>;
  }
>;

/**
 * @see https://docs.globus.org/api/transfer/permissions/#delete_permissoin
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
    resource: `/endpoint/${string}/access/${string}`;
  }>
> {
  const { segments: { endpoint_xid, id }, request, options } = normalizeServiceMethodArgsWithSegments(
    'transfer.access.remove',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint/${endpoint_xid}/access/${id}`,
      method: HTTP_METHODS.DELETE,
    },
    request,
    options,
  );
} satisfies ServiceMethodDynamicSegments<
  { endpoint_xid: string; id: string },
  {
    query?: never;
    payload?: never;
  }
>;
