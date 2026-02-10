import {
  HTTP_METHODS,
  serviceRequest,
  wrapServiceMethod,
  wrapServiceMethodWithSegments,
} from '../../shared.js';
import { ID, SCOPES } from '../config.js';

import type {
  ServiceMethodDynamicSegments,
  JSONFetchResponse,
  ServiceMethod,
} from '../../types.js';

/**
 * @see https://docs.globus.org/api/transfer/collection_bookmarks/#bookmark_document
 */
export type BookmarkDocument = {
  DATA_TYPE: 'bookmark';
  id: string;
  name: string;
  endpoint_id: string;
  path: string;
};

export type BookmarkListDocument = {
  DATA_TYPE: 'bookmark_list';
  DATA: BookmarkDocument[];
};

/**
 * @see https://docs.globus.org/api/transfer/collection_bookmarks/#get_list_of_bookmarks
 */
export const getAll = wrapServiceMethod(
  'transfer.collection-bookmarks.getAll',
  function (
    options?: {
      query?: never;
      payload?: never;
    },
    sdkOptions?,
  ): Promise<JSONFetchResponse<BookmarkListDocument>> {
    return serviceRequest(
      {
        service: ID,
        scope: SCOPES.ALL,
        path: `/v0.10/bookmark_list`,
      },
      options,
      sdkOptions,
    );
  },
) satisfies ServiceMethod<{
  query?: never;
  payload?: never;
}>;

/**
 * @see https://docs.globus.org/api/transfer/collection_bookmarks/#create_bookmark
 */
export const create = wrapServiceMethod(
  'transfer.collection-bookmarks.create',
  function (
    options?: {
      payload: Partial<BookmarkDocument>;
    },
    sdkOptions?,
  ): Promise<JSONFetchResponse<BookmarkDocument>> {
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
  },
) satisfies ServiceMethod<{
  payload: Partial<BookmarkDocument>;
}>;

/**
 * @see https://docs.globus.org/api/transfer/collection_bookmarks/#get_bookmark_by_id
 */
export const get = wrapServiceMethodWithSegments(
  'transfer.collection-bookmarks.get',
  function (
    bookmark_id: string,
    options?: {
      query?: never;
      payload?: never;
    },
    sdkOptions?,
  ): Promise<JSONFetchResponse<BookmarkDocument>> {
    return serviceRequest(
      {
        service: ID,
        scope: SCOPES.ALL,
        path: `/v0.10/bookmark/${bookmark_id}`,
      },
      options,
      sdkOptions,
    );
  },
) satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: never;
    payload?: never;
  }
>;

/**
 * @see https://docs.globus.org/api/transfer/collection_bookmarks/#update_bookmark
 */
export const update = wrapServiceMethodWithSegments(
  'transfer.collection-bookmarks.update',
  function (
    bookmark_id: string,
    options?: {
      query?: never;
      payload: Partial<BookmarkDocument> & { name: string };
    },
    sdkOptions?,
  ): Promise<JSONFetchResponse<BookmarkDocument>> {
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
  },
) satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: never;
    payload: Partial<BookmarkDocument> & { name: string };
  }
>;

/**
 * @see https://docs.globus.org/api/transfer/collection_bookmarks/#delete_bookmark_by_id
 */
export const remove = wrapServiceMethodWithSegments(
  'transfer.collection-bookmarks.remove',
  function (
    bookmark_id: string,
    options?: {
      query?: never;
      payload?: never;
    },
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
  },
) satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: never;
    payload?: never;
  }
>;
