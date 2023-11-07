import { ID, SCOPES } from "../config.js";
import { serviceRequest } from "../../../services/shared.js";

import type {
  ServiceMethod,
  ServiceMethodDynamicSegments,
} from "../../types.js";

/**
 * Fetch a single Identity by ID.
 * @see https://docs.globus.org/api/auth/reference/#get_identities
 */
export const get = function (identity_id, options = {}, sdkOptions?) {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.VIEW_IDENTITIES,
      path: `/identities/${identity_id}`,
    },
    options,
    sdkOptions
  );
} satisfies ServiceMethodDynamicSegments<string, Record<string, any>>;

/**
 * Return a list of identities that match provided query parameters.
 * @see https://docs.globus.org/api/auth/reference/#get_identities
 */
export const getAll = function (options = {}, sdkOptions?) {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.VIEW_IDENTITIES,
      path: `/identities`,
    },
    options,
    sdkOptions
  );
} satisfies ServiceMethod<{
  query?: {
    ids?: string | string[];
    usernames?: string | string[];
  };
  headers?: Record<string, string>;
  payload?: never;
}>;
