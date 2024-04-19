import { HTTP_METHODS, serviceRequest } from '../../shared.js';
import { ID, SCOPES } from '../config.js';

import type {
  ServiceMethodDynamicSegments,
  JSONFetchResponse,
  ServiceMethod,
} from '../../types.js';

/**
 * @see https://docs.globus.org/api/transfer/collection_bookmarks/#get_list_of_bookmarks
 */
export const getAll = function (
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<Globus.Transfer.BookmarkListDocument>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/bookmark_list`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  query?: never;
  payload?: never;
}>;

/**
 * @see https://docs.globus.org/api/transfer/collection_bookmarks/#create_bookmark
 */
export const create = function (
  options,
  sdkOptions?,
): Promise<JSONFetchResponse<Globus.Transfer.BookmarkDocument>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/bookmark`,
      method: HTTP_METHODS.POST,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  payload: Partial<Globus.Transfer.BookmarkDocument>;
}>;

/**
 * @see https://docs.globus.org/api/transfer/collection_bookmarks/#get_bookmark_by_id
 */
export const get = function (
  bookmark_id,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<Globus.Transfer.BookmarkDocument>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/bookmark/${bookmark_id}`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: never;
    payload?: never;
  }
>;

/**
 * @see https://docs.globus.org/api/transfer/collection_bookmarks/#update_bookmark
 */
export const update = function (
  bookmark_id,
  options,
  sdkOptions?,
): Promise<JSONFetchResponse<Globus.Transfer.BookmarkDocument>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/bookmark/${bookmark_id}`,
      method: HTTP_METHODS.PUT,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: never;
    payload: Partial<Globus.Transfer.BookmarkDocument> & { name: string };
  }
>;

/**
 * @see https://docs.globus.org/api/transfer/collection_bookmarks/#delete_bookmark_by_id
 */
export const remove = function (
  bookmark_id,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<{
    DATA_TYPE: 'result';
    code: 'Deleted';
    message: string;
    resource: `/bookmark/${string}`;
    request_id: string;
  }>
> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/bookmark/${bookmark_id}`,
      method: HTTP_METHODS.DELETE,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: never;
    payload?: never;
  }
>;
