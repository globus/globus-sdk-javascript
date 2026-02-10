import {
  HTTP_METHODS,
  serviceRequest,
  normalizeServiceMethodArgsWithSegments,
} from '../../shared.js';
import { getHeadersForService } from '../shared.js';
import { ID, SCOPES } from '../config.js';

import type { ErrorDocument, QueryParameters } from '../types.js';
import type { JSONFetchResponse, ServiceMethodDynamicSegments } from '../../types.js';
import { ConsentRequiredError } from '../../../core/errors.js';

/**
 * @see https://docs.globus.org/api/transfer/file_operations/#file_document
 */
export type FileDocument = {
  readonly DATA_TYPE: 'file';
  readonly name: string;
  readonly type: 'dir' | 'file' | 'invalid_symlink' | 'chr' | 'blk' | 'pipe' | 'other';
  readonly link_target?: string | null;
  readonly size?: number;
  readonly last_modified?: string;
  readonly permissions?: string;
  readonly user?: string | null;
  readonly group?: string | null;
  readonly link_size?: number | null;
  readonly link_user?: string | null;
  readonly link_group?: string | null;
  readonly link_last_modified?: string | null;
};

/**
 * @see https://docs.globus.org/api/transfer/file_operations/#file_list_document
 */
export type FileListDocument = {
  readonly DATA_TYPE: 'file_list';
  readonly endpoint: string;
  readonly path: string;
  readonly absolute_path: string | null;
  readonly rename_supported: boolean;
  readonly symlink_supported: boolean;
  readonly DATA: FileDocument[];
  /**
   * n.b. This is currently included in responses, but undocumented; use with care.
   */
  readonly length: number;
  /**
   * n.b. This is currently included in responses, but undocumented; use with care.
   */
  readonly total: number;
};

/**
 * @see https://docs.globus.org/api/transfer/file_operations/#errors
 */
export type DirectoryListingError = ErrorDocument &
  (
    | ConsentRequiredError
    | {
        code:
          | 'ServiceUnavailable'
          | 'OperationPaused'
          | 'NotSupported'
          | 'ClientError.NotFound'
          | 'EndpointError'
          // Encountered Errors (not documented)
          | 'ExternalError.DirListingFailed.LoginFailed'
          | string;
      }
  );

/**
 * @see https://docs.globus.org/api/transfer/file_operations/#directory_listing_query_parameters
 */
export type DirectoryListingQuery = QueryParameters<
  {
    path?: string;
    show_hidden?: 'true' | 'false';
    local_user?: string;
  },
  'Offset'
>;

/**
 * List the contents of the directory at the specified path on an endpoint’s filesystem.
 * The endpoint must be activated before performing this operation.
 *
 * @see https://docs.globus.org/api/transfer/file_operations/#list_directory_contents
 */
export const ls = function (
  arg1: any,
  arg2?: any,
  arg3?: any,
): Promise<JSONFetchResponse<FileListDocument | DirectoryListingError>> {
  const { segments: endpoint_xid, request, options } = normalizeServiceMethodArgsWithSegments(
    'transfer.file-operations.ls',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/operation/endpoint/${endpoint_xid}/ls`,
    },
    request,
    options,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: DirectoryListingQuery;
  }
>;

/**
 * Create a directory at the specified path on an endpoint filesystem.
 * The endpoint must be activated before performing this operation.
 *
 * @see https://docs.globus.org/api/transfer/file_operations/#make_directory
 */
export const mkdir = function (arg1: any, arg2: any, arg3?: any) {
  const { segments: endpoint_xid, request, options } = normalizeServiceMethodArgsWithSegments(
    'transfer.file-operations.mkdir',
    arg1,
    arg2,
    arg3,
  );
  const serviceRequestOptions = {
    payload: {
      DATA_TYPE: 'mkdir',
      ...request?.payload,
    },
    headers: {
      ...getHeadersForService(HTTP_METHODS.POST),
      ...request?.headers,
    },
  };
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/operation/endpoint/${endpoint_xid}/mkdir`,
      method: HTTP_METHODS.POST,
    },
    serviceRequestOptions,
    options,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    payload: { path: string };
  }
>;

/**
 * Rename or move a file, directory, or symlink on an endpoint filesystem.
 * If the object is a symlink, the symlink itself is renamed, not its target
 * The endpoint must be activated before performing this operation.
 * When moving to a different parent directory, the parent directory of the new path must already exist.
 *
 * @see https://docs.globus.org/api/transfer/file_operations/#rename
 */
export const rename = function (arg1: any, arg2: any, arg3?: any) {
  const { segments: endpoint_xid, request, options } = normalizeServiceMethodArgsWithSegments(
    'transfer.file-operations.rename',
    arg1,
    arg2,
    arg3,
  );
  const serviceRequestOptions = {
    payload: {
      DATA_TYPE: 'rename',
      ...request?.payload,
    },
    headers: {
      ...getHeadersForService(HTTP_METHODS.POST),
      ...request?.headers,
    },
  };
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/operation/endpoint/${endpoint_xid}/rename`,
      method: HTTP_METHODS.POST,
    },
    serviceRequestOptions,
    options,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    payload: {
      old_path: string;
      new_path: string;
    };
  }
>;

/**
 * Create a directory at the specified path on an endpoint filesystem.
 * The endpoint must be activated before performing this operation.
 *
 * @see https://docs.globus.org/api/transfer/file_operations/#symlink
 */
export const symlink = function (arg1: any, arg2: any, arg3?: any) {
  const { segments: endpoint_xid, request, options } = normalizeServiceMethodArgsWithSegments(
    'transfer.file-operations.symlink',
    arg1,
    arg2,
    arg3,
  );
  const serviceRequestOptions = {
    payload: {
      DATA_TYPE: 'symlink',
      ...request?.payload,
    },
    headers: {
      ...getHeadersForService(HTTP_METHODS.POST),
      ...request?.headers,
    },
  };
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/operation/endpoint/${endpoint_xid}/symlink`,
      method: HTTP_METHODS.POST,
    },
    serviceRequestOptions,
    options,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    payload: {
      path: string;
      symlink_target: string;
    };
  }
>;

/**
 * Stat the file or directory at the specified path on a collection.
 *
 * @see https://docs.globus.org/api/transfer/file_operations/#stat
 */
export const stat = function (
  arg1: any,
  arg2: any,
  arg3?: any,
): Promise<JSONFetchResponse<FileDocument>> {
  const { segments: endpoint_xid, request, options } = normalizeServiceMethodArgsWithSegments(
    'transfer.file-operations.stat',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/operation/endpoint/${endpoint_xid}/stat`,
    },
    request,
    options,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query: {
      path: string;
      local_user?: string;
    };
  }
>;
