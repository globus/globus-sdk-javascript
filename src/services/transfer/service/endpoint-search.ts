import { serviceRequest } from '../../shared.js';
import { ID, SCOPES } from '../config.js';

import type { ServiceMethod } from '../../../services/types.js';
import type { EntityType, CommonQueryParameters } from '../types.js';

/**
 * @see https://docs.globus.org/api/transfer/endpoint_search/#search_scope
 */
export type EndpointSearchScope =
  | 'all'
  | 'my-endpoints'
  | 'my-gcp-endpoints'
  | 'recently-used'
  | 'in-use'
  | 'shared-by-me'
  | 'shared-with-me'
  | 'hide-no-permissions'
  | 'administered-by-me';

/**
 * @see https://docs.globus.org/api/transfer/endpoint_search/#endpoint_search
 */
export type EndpointSearchQuery = CommonQueryParameters & {
  limit: number;
  filter_scope?: EndpointSearchScope;
  filter_entity_type?: EntityType;
  filter_fulltext?: string;
  filter_owner_id?: string;
  filter_host_endpoint?: string;
  filter_non_functional?: 0 | 1 | null;
  offset?: number;
};

/**
 * Get a list of endpoints matching the search filters in a given search scope.
 * @see https://docs.globus.org/api/transfer/endpoint_search/#endpoint_search
 */
export const endpointSearch = function (options?, sdkOptions?) {
  const serviceRequestOptions = {
    ...options,
    query: options?.query,
  };
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint_search`,
    },
    serviceRequestOptions,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  query?: EndpointSearchQuery;
}>;

export default endpointSearch;
