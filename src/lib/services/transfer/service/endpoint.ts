import { serviceRequest } from "../../shared";

import { ID } from "../config";

import type {
  ServiceMethodDynamicSegments,
  JSONFetchResponse,
} from "../../../services/types";

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
