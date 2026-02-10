import {
  HTTP_METHODS,
  serviceRequest,
  normalizeServiceMethodArgsWithSegments,
} from '../../shared.js';
import { ID, SCOPES } from '../config.js';

import type { JSONFetchResponse, SDKOptions, ServiceMethodOptions } from '../../types.js';
import type { OpenAPI } from '../index.js';
import type { ResultFormatVersion } from '../types.js';

type Content = NonNullable<OpenAPI.components['schemas']['ResultEntry']['content']>;
export type MatchedPrincipalSets =
  OpenAPI.components['schemas']['ResultEntry']['matched_principal_sets'];
/**
 * @see https://docs.globus.org/api/search/reference/post_query/#gmetaresult
 */
export type GMetaResult<C extends Content = Content> = Omit<
  OpenAPI.components['schemas']['GMetaResult'],
  'entries'
> & {
  entries: (Omit<OpenAPI.components['schemas']['ResultEntry'], 'content'> & { content: C })[];
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
export type GSearchResult<C extends Content = Content> = {
  gmeta: GMetaResult<C>[];
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
export const get = function <C extends Content = Content>(
  arg1: any,
  arg2?: any,
  arg3?: any,
): Promise<JSONFetchResponse<GSearchResult<C>>> {
  const { segments: index_id, request, options } = normalizeServiceMethodArgsWithSegments(
    'search.query.get',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.SEARCH,
      path: `/v1/index/${index_id}/search`,
    },
    request,
    options,
  );
};

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
export const post = function <C extends Content = Content>(
  arg1: any,
  arg2: any,
  arg3?: any,
): Promise<JSONFetchResponse<GSearchResult<C>>> {
  const { segments: index_id, request, options } = normalizeServiceMethodArgsWithSegments(
    'search.query.post',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.SEARCH,
      path: `/v1/index/${index_id}/search`,
      method: HTTP_METHODS.POST,
    },
    request,
    options,
  );
};

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
