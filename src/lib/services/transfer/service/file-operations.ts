import { HTTP_METHODS, serviceRequest } from '../../shared.js';

import { getHeadersForService } from '../shared.js';
import { ID } from '../config.js';

import type { Transfer } from '../types.js';
import type { ServiceMethodDynamicSegments } from '../../types.js';

/**
 * List the contents of the directory at the specified path on an endpoint’s filesystem.
 * The endpoint must be activated before performing this operation.
 *
 * @see https://docs.globus.org/api/transfer/file_operations/#list_directory_contents
 */
export const ls = function (endpoint_xid, options?, sdkOptions?) {
  return serviceRequest(
    {
      service: ID,
      scope: 'urn:globus:auth:scope:transfer.api.globus.org:all',
      path: `/v0.10/operation/endpoint/${endpoint_xid}/ls`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: Transfer['DirectoryListingQuery'];
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
      scope: 'urn:globus:auth:scope:transfer.api.globus.org:all',
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
      scope: 'urn:globus:auth:scope:transfer.api.globus.org:all',
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
      scope: 'urn:globus:auth:scope:transfer.api.globus.org:all',
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
