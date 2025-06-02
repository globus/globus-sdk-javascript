import { AuthorizationRequirementsError } from '../../core/errors.js';

/**
 * @see https://docs.globus.org/api/transfer/overview/#errors
 */
export type ErrorDocument = {
  code: string;
  message: string;
  request_id: string;
  resource: string;
  /**
   * If a Globus Auth policy failure was encountered, and caused the error, this property will be present.
   */
  authorization_parameters?: AuthorizationRequirementsError['authorization_parameters'];
};

/**
 * @see https://docs.globus.org/api/transfer/overview/#common_query_parameters
 */
export type CommonQueryParameters = {
  orderby?: string;
  fields?: string;
  filter?: string;
};

/**
 * Used to define query parameter types for the Transfer service.
 * @private **Intended for internal service method definition only.**
 *
 * @param Parameters The allowed query parameters for the request, `PaginationType` (if no custom parameters are supported), or `undefined` if only the common query parameters are supported.
 * @param PaginationType The type of pagination the request uses, if any.
 *                       If not specified, no pagination query parameters will be included.
 * @param IncludeCommon Whether to include Transfer common query parameters as allowed query parameters.
 *                      Defaults to `true`, which includes common query parameters.
 *                      Set to `false` to exclude common query parameters.
 *
 * @example `QueryParameters<'Marker'>` Supports marker pagination query parameters and common query parameters.
 * @example `QueryParameters<{ endpoint_id: string }, 'Offset'>` Supports a custom query parameter `endpoint_id`, offset pagination, and common query parameters.
 */
export type QueryParameters<
  Parameters extends Record<string, unknown> | keyof Pagination | undefined = Record<
    string,
    unknown
  >,
  PaginationType extends keyof Pagination | undefined = undefined,
  IncludeCommon extends boolean = true,
> = (Parameters extends keyof Pagination
  ? Pagination[Parameters] extends { Query: infer Q }
    ? Q
    : {}
  : Parameters extends Record<string, unknown>
    ? Parameters
    : {}) &
  (PaginationType extends keyof Pagination ? Pagination[PaginationType]['Query'] : {}) &
  (IncludeCommon extends true ? CommonQueryParameters : {});

/**
 * Add pagination response members to an object; Use for creating paginated responses in the Transfer service.
 * @private **Intended for internal service method definition only.**
 * @param PaginationType The type of pagination the response uses.
 * @param Response The response to extend with the pagination response.
 * @example `PaginatedResponse<'Offset', { DATA_TYPE: 'task_list'; tasks: TaskDocument[] }>`
 */
export type PaginatedResponse<Type, Response> = Response &
  (Type extends keyof Pagination ? Pagination[Type]['Response'] : {});

/**
 * Pagination used by the Transfer service.
 *
 * Each pagination definition contains a `Query` and `Response` type.
 * - The `Query` type is used to define the query parameters used by the pagination method.
 * - The `Response` type is used to define the response properties returned by the pagination method (usually as
 * top-level keys in the response body).
 *
 * Service methods **SHOULD** include the supported pagination members in their query parameters and response types, these
 * are just made available as a convenience.
 *
 * @see https://docs.globus.org/api/transfer/overview/#paging
 */
export type Pagination = {
  /**
   * @see https://docs.globus.org/api/transfer/overview/#offset_paging
   */
  Offset: {
    Query: {
      limit?: `${number}` | number;
      offset?: `${number}` | number;
    };
    Response: {
      limit: number;
      offset: number;
      has_next_page: `${boolean}` | boolean;
    };
  };
  /**
   * @see https://docs.globus.org/api/transfer/overview/#marker_paging
   */
  Marker: {
    Query: {
      marker?: `${number}` | number;
    };
    Response: {
      next_marker: number | null;
    };
  };
  /**
   * @see https://docs.globus.org/api/transfer/overview/#last_key_paging
   */
  LastKey: {
    Query: {
      limit?: `${number}` | number;
      last_key: string;
    };
    Response: {
      has_next_page: `${boolean}` | boolean;
      last_key: string | null;
      limit: number;
    };
  };
  /**
   * @see https://docs.globus.org/api/transfer/overview/#next_token_paging
   */
  NextToken: {
    Query: {
      next_token?: string;
      max_results?: `${number}` | number;
    };
    Response: {
      next_token: string | null;
    };
  };
};
