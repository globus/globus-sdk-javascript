import { HTTP_METHODS, serviceRequest } from '../../shared.js';
import { ID, SCOPES } from '../config.js';
import { RESOURCE_SERVERS } from '../../auth/config.js';
import { createServiceMethodFactory } from '../../factory.js';

import type { JSONFetchResponse, SDKOptions, ServiceMethodOptions } from '../../types.js';
import type { OpenAPI } from '../index.js';
import type { ResultFormatVersion } from '../types.js';

type Schemas = OpenAPI.components['schemas'];

type Content = NonNullable<Schemas['ResultEntry']['content']>;
export type MatchedPrincipalSets = Schemas['ResultEntry']['matched_principal_sets'];
/**
 * @see https://docs.globus.org/api/search/reference/post_query/#gmetaresult
 */
export type GMetaResult<C extends Content = Content> = Omit<Schemas['GMetaResult'], 'entries'> & {
  entries: (Omit<Schemas['ResultEntry'], 'content'> & { content: C })[];
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
  value:
    | string
    | number
    | {
        to: string;
        from: string;
      };
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
  index_id: string,
  options?: ServiceMethodOptions & {
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
  },
  sdkOptions?: SDKOptions,
): Promise<JSONFetchResponse<GSearchResult<C>>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.SEARCH,
      path: `/v1/index/${index_id}/search`,
    },
    options,
    sdkOptions,
  );
};

/**
 * The internal type we use to represent all of the available fields in a `GSearchRequest`.
 * The actual returned type (`GSearchRequest`) uses this type to define a type that matches the service expectations.
 */
type InternalGSearchRequest = {
  q?: string;
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
 * You must provide either `q` or `filters`.
 * @see https://docs.globus.org/api/search/reference/post_query/#gsearchrequest
 */
export type GSearchRequest =
  | (Omit<InternalGSearchRequest, 'q'> & {
      q: InternalGSearchRequest['q'];
    })
  | (Omit<InternalGSearchRequest, 'filters'> & {
      filters: [GFilter, ...GFilter[]];
    });

/**
 * @param index_id The UUID of the index to query.
 *
 * @see https://docs.globus.org/api/search/reference/post_query/
 */
export const post = function <C extends Content = Content>(
  index_id: string,
  options: ServiceMethodOptions & {
    payload: GSearchRequest;
  },
  sdkOptions?: SDKOptions,
): Promise<JSONFetchResponse<GSearchResult<C>>> {
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
};

type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Utility type to make specific keys in a union of objects optional.
 * This is used to account for `defaultNonNullable: true` when generating types.
 * @see file://./../../../../scripts/open-api/generate-types.mjs#L54-L55
 */
type OptionalKeysInUnion<T, K extends string> = T extends object ? OptionalKeys<T, K & keyof T> : T;

/**
 * @see https://docs.globus.org/api/search/reference/post_query/#gfilter
 *
 * @privateRemarks
 * The `GFilter` type includes `@version` and `post_filter` with `"default"` values.
 */
export type GFilter = OptionalKeysInUnion<Schemas['GFilter'], '@version' | 'post_filter'>;

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
      /**
       * `date_histogram` faceting requires that the field was detected as a date type.
       * @see https://docs.globus.org/api/search/mapped_data_types/#date-formats
       */
      type: 'date_histogram';
      date_interval: Schemas['DateHistogramFacet']['date_interval'];
      /**
       * `histogram_range` is optional for `date_histogram`, but when provided,
       * the `low` and `high` values must be one of the supported date formats.
       * @see https://docs.globus.org/api/search/mapped_data_types/#date-formats
       */
      histogram_range?: {
        low: string;
        high: string;
      };
    }
  | {
      type: 'numeric_histogram';
      size: number;
      histogram_range: {
        low: number;
        high: number;
      };
    }
);

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

const postMethod = createServiceMethodFactory({
  service: ID,
  resource_server: RESOURCE_SERVERS[ID],
  path: `/v1/index/{index_id}/search`,
  method: HTTP_METHODS.POST,
}).generate<
  {
    request: {
      data: GSearchRequest;
    };
  },
  JSONFetchResponse<GSearchResult>
>();

const getMethod = createServiceMethodFactory({
  service: ID,
  resource_server: RESOURCE_SERVERS[ID],
  path: `/v1/index/{index_id}/search`,
}).generate<
  {
    request: {
      query: {
        q: string;
        offset?: `${number}` | number;
        limit?: `${number}` | number;
        advanced?: 'true' | 'false';
        bypass_visible_to?: 'true' | 'false';
        result_format_version?: string;
        filter_principal_sets?: string;
      };
    };
  },
  JSONFetchResponse<GSearchResult>
>();

/**
 * `get` and `post` are generated using `createServiceMethodFactory` to ensure type safety, but we want to export them as more generic functions that allow the caller to specify the expected content type of the results. These wrapper functions achieve that while preserving type safety.
 * @private
 */
export const next = {
  get: <C extends Content = Content>(
    payload: Parameters<typeof getMethod>[0],
  ): Promise<JSONFetchResponse<GSearchResult<C>>> =>
    getMethod(payload) as Promise<JSONFetchResponse<GSearchResult<C>>>,
  post: <C extends Content = Content>(
    payload: Parameters<typeof postMethod>[0],
  ): Promise<JSONFetchResponse<GSearchResult<C>>> =>
    postMethod(payload) as Promise<JSONFetchResponse<GSearchResult<C>>>,
};
