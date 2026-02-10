import {
  HTTP_METHODS,
  serviceRequest,
  normalizeServiceMethodArgs,
  normalizeServiceMethodArgsWithSegments,
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
export const getAll = function (
  arg1?: any,
  arg2?: any,
): Promise<JSONFetchResponse<BookmarkListDocument>> {
  const { request, options } = normalizeServiceMethodArgs('transfer.collection-bookmarks.getAll', arg1, arg2);
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/bookmark_list`,
    },
    request,
    options,
  );
} satisfies ServiceMethod<{
  query?: never;
  payload?: never;
}>;

/**
 * @see https://docs.globus.org/api/transfer/collection_bookmarks/#create_bookmark
 */
export const create = function (
  arg1: any,
  arg2?: any,
): Promise<JSONFetchResponse<BookmarkDocument>> {
  const { request, options } = normalizeServiceMethodArgs('transfer.collection-bookmarks.create', arg1, arg2);
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/bookmark`,
      method: HTTP_METHODS.POST,
    },
    request,
    options,
  );
} satisfies ServiceMethod<{
  payload: Partial<BookmarkDocument>;
}>;

/**
 * @see https://docs.globus.org/api/transfer/collection_bookmarks/#get_bookmark_by_id
 */
export const get = function (
  arg1: any,
  arg2?: any,
  arg3?: any,
): Promise<JSONFetchResponse<BookmarkDocument>> {
  const { segments: bookmark_id, request, options } = normalizeServiceMethodArgsWithSegments(
    'transfer.collection-bookmarks.get',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/bookmark/${bookmark_id}`,
    },
    request,
    options,
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
  arg1: any,
  arg2: any,
  arg3?: any,
): Promise<JSONFetchResponse<BookmarkDocument>> {
  const { segments: bookmark_id, request, options } = normalizeServiceMethodArgsWithSegments(
    'transfer.collection-bookmarks.update',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/bookmark/${bookmark_id}`,
      method: HTTP_METHODS.PUT,
    },
    request,
    options,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: never;
    payload: Partial<BookmarkDocument> & { name: string };
  }
>;

/**
 * @see https://docs.globus.org/api/transfer/collection_bookmarks/#delete_bookmark_by_id
 */
export const remove = function (
  arg1: any,
  arg2?: any,
  arg3?: any,
): Promise<
  JSONFetchResponse<{
    DATA_TYPE: 'result';
    code: 'Deleted';
    message: string;
    resource: `/bookmark/${string}`;
    request_id: string;
  }>
> {
  const { segments: bookmark_id, request, options } = normalizeServiceMethodArgsWithSegments(
    'transfer.collection-bookmarks.remove',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/bookmark/${bookmark_id}`,
      method: HTTP_METHODS.DELETE,
    },
    request,
    options,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: never;
    payload?: never;
  }
>;
