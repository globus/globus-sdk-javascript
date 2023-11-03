/**
 * @description A wrapper around the Groups API.
 * @group Service
 * @see [Groups API Documentation](https://docs.globus.org/api/groups/)
 * @module
 */

import * as GROUPS from "./config";

/**
 * @private
 * @internal
 */
export const CONFIG = GROUPS;

/**
 * Service methods for the Groups API.
 */
export * as groups from "./service/groups";
export * as policies from "./service/policies";
export * as membership from "./service/membership";
