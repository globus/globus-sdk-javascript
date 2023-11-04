import { serviceRequest } from "../../shared.js";

import { ID } from "../config.js";

import type {
  ServiceMethodDynamicSegments,
  JSONFetchResponse,
} from "../../../services/types.js";

/**
 * Fetch an endpoint by its UUID.
 */
export const get = function (endpoint_xid, options?, sdkOptions?) {
  return serviceRequest(
    {
      service: ID,
      scope: "urn:globus:auth:scope:transfer.api.globus.org:all",
      path: `/v0.10/endpoint/${endpoint_xid}`,
    },
    options,
    sdkOptions
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: never;
    payload?: never;
  },
  JSONFetchResponse<Globus.Transfer.EndpointDocument>
>;
