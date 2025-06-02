import { serviceRequest } from '../../../shared.js';
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
  endpoint_xid,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<EndpointDocument>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint_manager/endpoint/${endpoint_xid}`,
    },
    options,
    sdkOptions,
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
  endpoint_xid,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<PaginatedResponse<EndpointListDocument, 'Offset'>>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint_manager/endpoint/${endpoint_xid}/hosted_endpoint_list`,
    },
    options,
    sdkOptions,
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
  endpoint_xid,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<AccessListDocument>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint_manager/endpoint/${endpoint_xid}/access_list`,
    },
    options,
    sdkOptions,
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
  options = {},
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    PaginatedResponse<
      Omit<EndpointListDocument, 'DATA_TYPE'> & {
        DATA_TYPE: 'monitored_endpoints';
      },
      'Offset'
    >
  >
> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint_manager/monitored_endpoints`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  query?: QueryParameters<'Offset'>;
  payload?: never;
}>;
