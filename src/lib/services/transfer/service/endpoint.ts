import { serviceRequest } from '../../shared.js';

import { ID, SCOPES } from '../config.js';

import type { ServiceMethodDynamicSegments, JSONFetchResponse } from '../../../services/types.js';

/**
 * Fetch an endpoint by its UUID.
 */
export const get = function (endpoint_xid, options?, sdkOptions?) {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint/${endpoint_xid}`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: never;
    payload?: never;
  },
  JSONFetchResponse<Globus.Transfer.EndpointDocument>
>;
