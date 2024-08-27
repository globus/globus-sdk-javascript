import { HTTP_METHODS, serviceRequest } from '../../shared.js';

import type { JSONFetchResponse, ServiceMethodDynamicSegments } from '../../types.js';

import { ID, SCOPES } from '../config.js';
import { ResultFormatVersion } from '../types.js';

type GMetaResult = {
  subject: string;
  entries: {
    entry_id: string;
    content: Record<string, unknown>;
    matched_principal_sets: string[];
  }[];
};

/**
 * @see https://docs.globus.org/api/search/reference/post_query/#gfacetresult
 */
export type GFacetResult = {
  name: string;
  value?: string;
  buckets?: GBucket[];
};

/**
 * @see https://docs.globus.org/api/search/reference/post_query/#gbucket
 */
export type GBucket = {
  value: string | Globus.Search.GFilter;
  count: number;
};

/**
 * @see https://docs.globus.org/api/search/reference/post_query/#gsearchresult
 */
export type GSearchResult = {
  gmeta: GMetaResult;
  facet_result?: GFacetResult[];
  offset: number;
  count: number;
  total: number;
  has_next_page: boolean;
};

/**
 * @param index_id The UUID of the index to query.
 *
 * @see https://docs.globus.org/api/search/reference/get_query/
 */
export const get = function (
  index_id,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<GSearchResult>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.SEARCH,
      path: `/v1/index/${index_id}/search`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    /**
     * @see https://docs.globus.org/api/search/reference/get_query/#parameters
     */
    query?: {
      q: string;
      offset?: `${number}` | number;
      limit?: `${number}` | number;
      advanced?: 'true' | 'false';
      bypass_visible_to?: 'true' | 'false';
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
  sdkOptions?,
): Promise<JSONFetchResponse<GSearchResult>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.SEARCH,
      path: `/v1/index/${index_id}/search`,
      method: HTTP_METHODS.POST,
    },
    options,
    sdkOptions,
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
      result_format_version?: ResultFormatVersion;
      filter_principal_sets?: string[];
      filters?: Globus.Search.GFilter[];
      facets?: Globus.Search.GFacet[];
      boosts?: Globus.Search.GBoost[];
      sort?: Globus.Search.GSort[];
    };
  }
>;
