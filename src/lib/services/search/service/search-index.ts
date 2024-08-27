import { HTTP_METHODS, serviceRequest } from '../../shared.js';
import { ID, SCOPES } from '../config.js';

import type {
  JSONFetchResponse,
  ServiceMethod,
  ServiceMethodDynamicSegments,
} from '../../types.js';

/**
 * @see https://docs.globus.org/api/search/reference/index_list/#indexwithpermissions
 */
type IndexWithPermissions = {
  permissions: string[];
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
};

type GSearchIndex = {
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
};

/**
 * @see https://docs.globus.org/api/search/reference/index_show/
 */
export const get = function (
  index_id,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<GSearchIndex>> {
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
export const getAll = function (
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<IndexWithPermissions[]>> {
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

type GIngest =
  | {
      ingest_type: string;
      ingest_data: Record<string, unknown>;
      field_mapping: Record<string, unknown>;
    }
  | {
      ingest_type: 'GMetaList';
      ingest_data: GMetaList;
      field_mapping: Record<string, unknown>;
    }
  | {
      ingest_type: 'GMetaEntry';
      ingest_data: GMetaEntry;
      field_mapping: Record<string, unknown>;
    };

type GMetaList = {
  gmeta: GMetaEntry[];
};

type GMetaEntry = {
  id: string;
  subject: string;
  visible_to: string | 'public' | 'all_authenticated_users';
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
