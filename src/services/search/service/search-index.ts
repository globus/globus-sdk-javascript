import { HTTP_METHODS, serviceRequest } from '../../shared.js';
import { ID, SCOPES } from '../config.js';

import type {
  JSONFetchResponse,
  ServiceMethod,
  ServiceMethodDynamicSegments,
} from '../../types.js';

export * as roles from './roles.js';

/**
 * @see https://docs.globus.org/api/search/reference/index_list/#indexwithpermissions
 */
export type IndexWithPermissions = GSearchIndex & {
  permissions: string[];
};

export type GSearchIndex = {
  display_name: string;
  id: string;
  description: string;
  creation_date: string;
  is_trial: boolean;
  subscription_id: string;
  max_size_in_mb: number;
  size_in_mb: number;
  num_subjects: number;
  num_entries: number;
  status: 'open' | 'delete-pending' | string;
};

/**
 * @see https://docs.globus.org/api/search/reference/index_list/#indexlist
 */
export type IndexList = {
  index_list: IndexWithPermissions[];
};

/**
 * `permissions` is included in the response as a convenience to
 * the client, but it is not a field in GSearchIndex itself.
 *
 * @see https://docs.globus.org/api/search/reference/index_show/
 */
export const get = function (
  index_id,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<IndexWithPermissions>> {
  return serviceRequest(
    {
      service: ID,
      // scope: SCOPES.ALL,
      path: `/v1/index/${index_id}`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<string, {}>;

/**
 * @see https://docs.globus.org/api/search/reference/index_list/
 */
export const getAll = function (options?, sdkOptions?): Promise<JSONFetchResponse<IndexList>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v1/index_list`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{}>;

type IndexCreate = {
  display_name: string;
  description: string;
};

/**
 * @see https://docs.globus.org/api/search/reference/index_create/
 */
export const create = function (options, sdkOptions?): Promise<JSONFetchResponse<GSearchIndex>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v1/index`,
      method: HTTP_METHODS.POST,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  payload: IndexCreate;
}>;

type IndexDeleteResponse = {
  index_id: string;
  acknowledged: boolean;
};

/**
 * @see https://docs.globus.org/api/search/reference/index_delete/
 */
export const remove = function (
  index_id,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<IndexDeleteResponse>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v1/index/${index_id}`,
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

type IndexReopenResponse = {
  index_id: string;
  acknowledged: boolean;
};

/**
 * @see https://docs.globus.org/api/search/reference/index_reopen/
 */
export const reopen = function (
  index_id,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<IndexReopenResponse>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v1/index/${index_id}/reopen`,
      method: HTTP_METHODS.POST,
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

type IngestResponse = {
  task_id: string;
  as_identity: string;
  success: boolean;
  num_documents_ingested: number;
};

/**
 * A mapping from field names (dotted) to the types for those fields. Currently only supports `geo_point` and `geo_shape` as types.
 */
type FieldMapping = Record<string, 'geo_point' | 'geo_shape' | string>;

/**
 * A `GIngest` document is a wrapper around a {@link GMetaList} or {@link GMetaEntry} which supplies attributes relevant to the ingest and indexing of metadata into the Globus Search service.
 * @see https://docs.globus.org/api/search/reference/ingest/#gingest
 */
export type GIngest =
  | {
      ingest_type: string;
      ingest_data: Record<string, unknown>;
      field_mapping?: FieldMapping;
    }
  | {
      ingest_type: 'GMetaList';
      ingest_data: GMetaList;
      field_mapping?: FieldMapping;
    }
  | {
      ingest_type: 'GMetaEntry';
      ingest_data: GMetaEntry;
      field_mapping?: FieldMapping;
    };

/**
 * A GMetaList is a collection of {@link GMetaEntry} documents.
 * @see https://docs.globus.org/api/search/reference/ingest/#gmetalist
 */
export type GMetaList = {
  gmeta: GMetaEntry[];
};

/**
 * A GMetaEntry is a single block of data pertaining to a given subject.
 * @see https://docs.globus.org/api/search/reference/ingest/#gmetaentry
 */
export type GMetaEntry = {
  id?: string;
  subject: string;
  visible_to: 'public' | 'all_authenticated_users' | string;
  principal_sets: Record<string, unknown>;
  content: Record<string, unknown>;
};

export const ingest = function (
  index_id,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<IngestResponse>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v1/index/${index_id}/ingest`,
      method: HTTP_METHODS.POST,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    payload: GIngest;
  }
>;
