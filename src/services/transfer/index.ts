/**
 * @description A wrapper around the Globus Transfer service.
 * @group Service
 * @see [Globus Transfer API Documentation](https://docs.globus.org/api/transfer/)
 * @module
 */
import * as TRANSFER from './config.js';

import { endpointSearch, next as nextEndpointSearch } from './service/endpoint-search.js';

/**
 * @private
 * @internal
 */
export const CONFIG = TRANSFER;

export type * from './types.js';

export const next = {
  endpointSearch: nextEndpointSearch.endpointSearch,
};

export { endpointSearch };

export * as fileOperations from './service/file-operations.js';
export * as taskSubmission from './service/task-submission.js';
export * as endpoint from './service/endpoint.js';
export * as task from './service/task.js';
export * as access from './service/access.js';
export * as roles from './service/roles.js';
export * as collectionBookmarks from './service/collection-bookmarks.js';
export * as tunnel from './service/tunnel.js';
export * as streamAccessPoint from './service/stream-access-point.js';

export * as endpointManager from './service/endpoint-manager/index.js';

export * as utils from './utils.js';
