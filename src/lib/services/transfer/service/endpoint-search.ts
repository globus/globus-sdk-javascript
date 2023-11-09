import { serviceRequest } from '../../shared.js';
import { ID } from '../config.js';

import type { BaseServiceMethodOptions, SDKOptions } from '../../../services/types.js';

/**
 * Get a list of endpoints matching the search filters in a given search scope.
 * @see https://docs.globus.org/api/transfer/endpoint_search/#endpoint_search
 */
export const endpointSearch = function (
  /**
   * @see https://docs.globus.org/api/transfer/endpoint_search/#query_parameters
   */
  options?: {
    /**
     * @todo This type needs to be converted to a record and this method updated
     * to `satisfies` `ServiceMethod`.
     */
    query?: Globus.Transfer.EndpointSearchQuery;
    headers?: BaseServiceMethodOptions['headers'];
  },
  sdkOptions?: SDKOptions,
) {
  const serviceRequestOptions = {
    ...options,
    /**
     * Since the exported type used here is an `interface`, we effectivley have to
     * "seal" the type, otherwise the compiler will complain about potentially mismatching index types.
     */
    query: options?.query as Readonly<Globus.Transfer.EndpointSearchQuery>,
  };
  return serviceRequest(
    {
      service: ID,
      scope: 'urn:globus:auth:scope:transfer.api.globus.org:all',
      path: `/v0.10/endpoint_search`,
    },
    serviceRequestOptions,
    sdkOptions,
  );
};

export default endpointSearch;
