/**
 * @description A wrapper around the Globus Search service.
 * @group Service
 * @see [Globus Search API Documentation](https://docs.globus.org/api/search/reference/)
 * @module
 */
import * as SEARCH from './config.js';

/**
 * @private
 * @internal
 */
export const CONFIG = SEARCH;

export type * as OpenAPI from '../../open-api/types/search.js';
export type * from './types.js';

export * as query from './service/query.js';
export * as subject from './service/subject.js';
export * as entry from './service/entry.js';
export * as index from './service/search-index.js';
