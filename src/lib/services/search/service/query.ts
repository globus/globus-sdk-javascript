import { HTTP_METHODS, serviceRequest } from "../../shared";

import type {
  JSONFetchResponse,
  ServiceMethodDynamicSegments,
} from "../../types";

import { ID, SCOPES } from "../config";

/**
 * @param index_id The UUID of the index to query.
 *
 * @see https://docs.globus.org/api/search/reference/get_query/
 */
export const get = function (index_id, options?, sdkOptions?) {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.SEARCH,
      path: `/v1/index/${index_id}/search`,
    },
    options,
    sdkOptions
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    /**
     * @see https://docs.globus.org/api/search/reference/get_query/#parameters
     */
    query?: {
      q: string;
      offset?: `${number}`;
      limit?: `${number}`;
      advanced?: "true" | "false";
      bypass_visible_to?: "true" | "false";
      result_format_version?: string;
      filter_principal_sets?: string;
    };
  }
>;

/**
 * @param index_id The UUID of the index to query.
 *
 * @see https://docs.globus.org/api/search/reference/post_query/
 */
export const post = function (
  index_id,
  options,
  sdkOptions?
): Promise<
  JSONFetchResponse<Globus.Search.GSearchResult>
> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.SEARCH,
      path: `/v1/index/${index_id}/search`,
      method: HTTP_METHODS.POST,
    },
    options,
    sdkOptions
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    /**
     * @see https://docs.globus.org/api/search/reference/post_query/#gsearchrequest
     */
    payload: {
      q: string;
      offset?: number;
      limit?: number;
      advanced?: boolean;
      bypass_visible_to?: boolean;
      result_format_version?: Globus.Search.ResultFormatVersion;
      filter_principal_sets?: Array<string>;
      filters?: Array<Globus.Search.GFilter>;
      facets?: Array<Globus.Search.GFacet>;
      boosts?: Array<Globus.Search.GBoost>;
      sort?: Array<Globus.Search.GSort>;
    }
  }
>;
