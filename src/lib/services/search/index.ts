/**
 * @description A wrapper around the Globus Search service.
 * @group Service
 * @see [Globus Search API Documentation](https://docs.globus.org/api/search/reference/)
 * @module
 */
import * as SEARCH from "./config.js";

/**
 * @private
 * @internal
 */
export const CONFIG = SEARCH;

export * as query from "./service/query.js";
