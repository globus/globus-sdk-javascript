import {
  serviceRequest,
  normalizeServiceMethodArgs,
  normalizeServiceMethodArgsWithSegments,
} from '../../../shared.js';
import { ID, SCOPES } from '../../config.js';

import type {
  ServiceMethodDynamicSegments,
  JSONFetchResponse,
  ServiceMethod,
} from '../../../../services/types.js';
import type { PaginatedResponse, QueryParameters } from '../../types.js';
import type { AccessListDocument } from '../access.js';
import { EndpointDocument, EndpointListDocument } from '../endpoint.js';

/**
 * Fetch an endpoint by its UUID as an administrator.
 * @see https://docs.globus.org/api/transfer/advanced_endpoint_management/#mc_get_endpoint
 */
export const get = function (
  arg1: any,
  arg2?: any,
  arg3?: any,
): Promise<JSONFetchResponse<EndpointDocument>> {
  const { segments: endpoint_xid, request, options } = normalizeServiceMethodArgsWithSegments(
    'transfer.endpoint-manager.endpoint.get',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint_manager/endpoint/${endpoint_xid}`,
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
 * @see https://docs.globus.org/api/transfer/advanced_endpoint_management/#get_hosted_endpoint_list
 */
export const getHostedEndpoints = function (
  arg1: any,
  arg2?: any,
  arg3?: any,
): Promise<JSONFetchResponse<PaginatedResponse<'Offset', EndpointListDocument>>> {
  const { segments: endpoint_xid, request, options } = normalizeServiceMethodArgsWithSegments(
    'transfer.endpoint-manager.endpoint.getHostedEndpoints',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint_manager/endpoint/${endpoint_xid}/hosted_endpoint_list`,
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
 * @see https://docs.globus.org/api/transfer/advanced_endpoint_management/#get_task_events
 */
export const getAccessList = function (
  arg1: any,
  arg2?: any,
  arg3?: any,
): Promise<JSONFetchResponse<AccessListDocument>> {
  const { segments: endpoint_xid, request, options } = normalizeServiceMethodArgsWithSegments(
    'transfer.endpoint-manager.endpoint.getAccessList',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint_manager/endpoint/${endpoint_xid}/access_list`,
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
 * @see https://docs.globus.org/api/transfer/advanced_endpoint_management/#get_monitored_endpoints
 */
export const getMonitoredEndpoints = function (
  arg1?: any,
  arg2?: any,
): Promise<
  JSONFetchResponse<
    PaginatedResponse<
      'Offset',
      Omit<EndpointListDocument, 'DATA_TYPE'> & {
        DATA_TYPE: 'monitored_endpoints';
      }
    >
  >
> {
  const { request, options } = normalizeServiceMethodArgs(
    'transfer.endpoint-manager.endpoint.getMonitoredEndpoints',
    arg1,
    arg2,
  );
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint_manager/monitored_endpoints`,
    },
    request,
    options,
  );
} satisfies ServiceMethod<{
  query?: QueryParameters<'Offset'>;
  payload?: never;
}>;
