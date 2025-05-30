import { HTTP_METHODS, serviceRequest } from '../../shared.js';
import { getHeadersForService } from '../shared.js';
import { ID, SCOPES } from '../config.js';

import type { ErrorDocument, Transfer, TransferQueryParameters } from '../types.js';
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

export type DirectoryListingQuery = TransferQueryParameters<
  {
    path?: string;
    show_hidden?: 'true' | 'false';
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
  endpoint_xid,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<FileListDocument | DirectoryListingError>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/operation/endpoint/${endpoint_xid}/ls`,
    },
    options,
    sdkOptions,
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
export const mkdir = function (endpoint_xid, options, sdkOptions?) {
  const serviceRequestOptions = {
    payload: {
      DATA_TYPE: 'mkdir',
      ...options?.payload,
    },
    headers: {
      ...getHeadersForService(HTTP_METHODS.POST),
      ...options?.headers,
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
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    payload: Omit<Transfer['Request']['Mkdir'], 'DATA_TYPE'>;
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
export const rename = function (endpoint_xid, options, sdkOptions?) {
  const serviceRequestOptions = {
    payload: {
      DATA_TYPE: 'rename',
      ...options?.payload,
    },
    headers: {
      ...getHeadersForService(HTTP_METHODS.POST),
      ...options?.headers,
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
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    payload: Omit<Transfer['Request']['Rename'], 'DATA_TYPE'>;
  }
>;

/**
 * Create a directory at the specified path on an endpoint filesystem.
 * The endpoint must be activated before performing this operation.
 *
 * @see https://docs.globus.org/api/transfer/file_operations/#symlink
 */
export const symlink = function (endpoint_xid, options, sdkOptions?) {
  const serviceRequestOptions = {
    payload: {
      DATA_TYPE: 'symlink',
      ...options?.payload,
    },
    headers: {
      ...getHeadersForService(HTTP_METHODS.POST),
      ...options?.headers,
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
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    payload: Omit<Transfer['Request']['Symlink'], 'DATA_TYPE'>;
  }
>;

/**
 * Stat the file or directory at the specified path on a collection.
 *
 * @see https://docs.globus.org/api/transfer/file_operations/#stat
 */
export const stat = function (
  endpoint_xid,
  options,
  sdkOptions?,
): Promise<JSONFetchResponse<FileDocument>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/operation/endpoint/${endpoint_xid}/stat`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: {
      path: string;
      local_user?: string;
    };
  }
>;
