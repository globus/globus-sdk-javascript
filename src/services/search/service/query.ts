import { HTTP_METHODS, serviceRequest } from '../../shared.js';

import type { JSONFetchResponse, ServiceMethodDynamicSegments } from '../../types.js';

import { ID, SCOPES } from '../config.js';
import { ResultFormatVersion } from '../types.js';

export type MatchedPrincipalSets = string[];

/**
 * @see https://docs.globus.org/api/search/reference/post_query/#gmetaresult
 */
export type GMetaResult = {
  subject: string;
  entries: {
    entry_id: string;
    content: Record<string, unknown>;
    matched_principal_sets: MatchedPrincipalSets;
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
  value: string | GFilter;
  count: number;
};

/**
 * @see https://docs.globus.org/api/search/reference/post_query/#gsearchresult
 */
export type GSearchResult = {
  gmeta: GMetaResult[];
  facet_results?: GFacetResult[];
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
 * @see https://docs.globus.org/api/search/reference/post_query/#gsearchrequest
 */
export type GSearchRequest = {
  q: string;
  offset?: number;
  limit?: number;
  advanced?: boolean;
  bypass_visible_to?: boolean;
  result_format_version?: ResultFormatVersion;
  filter_principal_sets?: string[];
  filters?: GFilter[];
  facets?: GFacet[];
  boosts?: GBoost[];
  sort?: GSort[];
};

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
    payload: GSearchRequest;
  }
>;

/**
 * @see https://docs.globus.org/api/search/reference/post_query/#gfilter
 */
export type GFilter = GFilterMatch | GFilterRange | GFilterExists | GFilterNot;

type GFilterTypeMatch = 'match_any' | 'match_all';
type GFilterTypeRange = 'range';

type GFilterMatch = {
  type: GFilterTypeMatch;
  field_name: string;
  values: Array<string>;
};
type GFilterRange = {
  type: GFilterTypeRange;
  field_name: string;
  values: Array<{ from: string; to: string }>;
};
type GFilterExists = {
  type: 'exists';
  field_name: string;
};
type GFilterNot = {
  type: 'not';
  filter: GFilter;
};

type HistogramRange = { low: number | string; high: number | string };

/**
 * @see https://docs.globus.org/api/search/reference/post_query/#gfacet
 */
export type GFacet = {
  name?: string;
  field_name: string;
} & (
  | {
      type: 'terms';
      size?: number;
    }
  | {
      type: 'sum' | 'avg';
      missing?: number;
    }
  | {
      type: 'date_histogram';
      date_interval: DateInterval;
      histogram_range?: HistogramRange;
    }
  | {
      type: 'numeric_histogram';
      size: string;
      histogram_range: HistogramRange;
    }
);

type DateInterval = 'year' | 'quarter' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second';

/**
 * @see https://docs.globus.org/api/search/reference/post_query/#gboost
 */
export type GBoost = {
  field_name: string;
  factor: number;
};

/**
 * @see https://docs.globus.org/api/search/reference/post_query/#gsort
 */
export type GSort = {
  field_name: string;
  order: 'asc' | 'desc';
};
