import { HTTP_METHODS, serviceRequest } from '../../shared.js';

import { ID, SCOPES } from '../config.js';

import type { ServiceMethodDynamicSegments, JSONFetchResponse } from '../../../services/types.js';
import { Transfer } from '../types.js';

/**
 * @see https://docs.globus.org/api/transfer/acl/#rest_access_get_list
 */
export const getAll = function (endpoint_xid, options?, sdkOptions?) {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint/${endpoint_xid}/access_list`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: Transfer['Paging']['Offset']['Query'];
    payload?: never;
  },
  JSONFetchResponse<{
    DATA_TYPE: 'access_list';
    DATA: Globus.Transfer.AccessDocument[];
  }>
>;

/**
 * @see https://docs.globus.org/api/transfer/acl/#rest_access_create
 */
export const create = function (endpoint_xid, options, sdkOptions?) {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint/${endpoint_xid}/access`,
      method: HTTP_METHODS.POST,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    payload: Partial<Globus.Transfer.AccessDocument>;
  },
  JSONFetchResponse<Globus.Transfer.AccessDocument>
>;

/**
 * @see https://docs.globus.org/api/transfer/acl/#get_access_rule_by_id
 */
export const get = function ({ endpoint_xid, id }, options?, sdkOptions?) {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint/${endpoint_xid}/access/${id}`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  { endpoint_xid: string; id: string },
  {
    query?: never;
    payload?: never;
  },
  JSONFetchResponse<Globus.Transfer.AccessDocument>
>;

/**
 * @see https://docs.globus.org/api/transfer/acl/#update_access_rule
 */
export const update = function ({ endpoint_xid, id }, options, sdkOptions?) {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint/${endpoint_xid}/access/${id}`,
      method: HTTP_METHODS.PUT,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  { endpoint_xid: string; id: string },
  {
    query?: never;
    payload: Partial<Globus.Transfer.AccessDocument>;
  },
  JSONFetchResponse<{
    DATA_TYPE: 'result';
    code: 'Updated';
    message: string;
    request_id: string;
    resource: `/endpoint/${string}/access/${string}`;
  }>
>;

/**
 * @see https://docs.globus.org/api/transfer/acl/#delete_access_rule
 */
export const remove = function ({ endpoint_xid, id }, options?, sdkOptions?) {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint/${endpoint_xid}/access/${id}`,
      method: HTTP_METHODS.DELETE,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  { endpoint_xid: string; id: string },
  {
    query?: never;
    payload?: never;
  },
  JSONFetchResponse<{
    DATA_TYPE: 'result';
    code: 'Deleted';
    message: string;
    request_id: string;
    resource: `/endpoint/${string}/access${string}`;
  }>
>;
