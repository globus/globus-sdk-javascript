import { HTTP_METHODS, serviceRequest } from '../../shared.js';
import { getHeadersForService } from '../shared.js';
import { ID, SCOPES } from '../config.js';
import { RESOURCE_SERVERS } from '../../auth/config.js';
import { createServiceMethodFactory } from '../../factory.js';

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
    query: {
      path: string;
      local_user?: string;
    };
  }
>;

/**
 * @private
 */
export const next = {
  ls: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS.TRANSFER,
    path: `/v0.10/operation/endpoint/{endpoint_xid}/ls`,
  }).generate<
    {
      request?: {
        query?: DirectoryListingQuery;
      };
    },
    JSONFetchResponse<FileListDocument | DirectoryListingError>
  >(),
  mkdir: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS.TRANSFER,
    path: `/v0.10/operation/endpoint/{endpoint_xid}/mkdir`,
    method: HTTP_METHODS.POST,
    transform: (payload) => ({
      ...payload,
      request: {
        ...payload?.request,
        data: { DATA_TYPE: 'mkdir', ...payload?.request?.data },
      },
    }),
  }).generate<
    {
      request: {
        data: { path: string };
      };
    },
    Response
  >(),
  rename: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS.TRANSFER,
    path: `/v0.10/operation/endpoint/{endpoint_xid}/rename`,
    method: HTTP_METHODS.POST,
    transform: (payload) => ({
      ...payload,
      request: {
        ...payload?.request,
        data: { DATA_TYPE: 'rename', ...payload?.request?.data },
      },
    }),
  }).generate<
    {
      request: {
        data: {
          old_path: string;
          new_path: string;
        };
      };
    },
    Response
  >(),
  symlink: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS.TRANSFER,
    path: `/v0.10/operation/endpoint/{endpoint_xid}/symlink`,
    method: HTTP_METHODS.POST,
    transform: (payload) => ({
      ...payload,
      request: {
        ...payload?.request,
        data: { DATA_TYPE: 'symlink', ...payload?.request?.data },
      },
    }),
  }).generate<
    {
      request: {
        data: {
          path: string;
          symlink_target: string;
        };
      };
    },
    Response
  >(),
  stat: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS.TRANSFER,
    path: `/v0.10/operation/endpoint/{endpoint_xid}/stat`,
  }).generate<
    {
      request: {
        query: {
          path: string;
          local_user?: string;
        };
      };
    },
    JSONFetchResponse<FileDocument>
  >(),
};
