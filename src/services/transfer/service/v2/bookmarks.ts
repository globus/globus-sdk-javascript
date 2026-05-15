import { ID } from '../../config.js';
import { RESOURCE_SERVERS } from '../../../auth/config.js';
import { createServiceMethodFactory } from '../../../factory.js';
import { HTTP_METHODS } from '../../../shared.js';

import type { JSONFetchResponse } from '../../../types.js';
import type { operations } from '../../../../open-api/types/transfer.js';

type GetAllOperation = operations['bookmarks_list_bookmarks_get'];
type GetAllResponse = GetAllOperation['responses']['200']['content']['application/json'];

export const getAll = createServiceMethodFactory({
  service: ID,
  resource_server: RESOURCE_SERVERS.TRANSFER,
  path: `/v2/bookmarks`,
}).generate<
  {
    request?: {
      query?: GetAllOperation['parameters']['query'];
      payload?: GetAllOperation['requestBody'];
    };
  },
  JSONFetchResponse<GetAllResponse>
>();

type GetOperation = operations['bookmarks_get_bookmarks__bookmark_id__get'];
type GetResponse = GetOperation['responses']['200']['content']['application/json'];

export const get = createServiceMethodFactory({
  service: ID,
  resource_server: RESOURCE_SERVERS.TRANSFER,
  path: `/v2/bookmarks/{bookmark_id}`,
}).generate<
  {
    request?: {
      query?: GetOperation['parameters']['query'];
      data?: GetOperation['requestBody'];
    };
  },
  JSONFetchResponse<GetResponse>
>();

type CreateOperation = operations['bookmarks_post_bookmarks_post'];
type CreateResponse = CreateOperation['responses']['201']['content']['application/json'];

export const create = createServiceMethodFactory({
  service: ID,
  resource_server: RESOURCE_SERVERS.TRANSFER,
  path: `/v2/bookmarks`,
  method: HTTP_METHODS.POST,
}).generate<
  {
    request: {
      data: CreateOperation['requestBody']['content']['application/json'];
    };
  },
  JSONFetchResponse<CreateResponse>
>();

type UpdateOperation = operations['bookmarks_patch_bookmarks__bookmark_id__patch'];
type UpdateResponse = UpdateOperation['responses']['200']['content']['application/json'];

export const update = createServiceMethodFactory({
  service: ID,
  resource_server: RESOURCE_SERVERS.TRANSFER,
  path: `/v2/bookmarks/{bookmark_id}`,
  method: HTTP_METHODS.PATCH,
}).generate<
  {
    request: {
      data: UpdateOperation['requestBody']['content']['application/json'];
    };
  },
  JSONFetchResponse<UpdateResponse>
>();

type RemoveOperation = operations['bookmarks_delete_bookmarks__bookmark_id__delete'];
type RemoveResponse = RemoveOperation['responses']['200'];

export const remove = createServiceMethodFactory({
  service: ID,
  resource_server: RESOURCE_SERVERS.TRANSFER,
  path: `/v2/bookmarks/{bookmark_id}`,
  method: HTTP_METHODS.DELETE,
}).generate<
  {
    request?: {
      data?: never;
      query?: never;
    };
  },
  JSONFetchResponse<RemoveResponse>
>();
