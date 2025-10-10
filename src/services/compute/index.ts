/**
 * @description A wrapper around the Globus Compute service.
 * @group Service
 * @see [Globus Compute API Documentation](https://compute.api.globus.org/redoc)
 * @module
 */
import * as COMPUTE from './config.js';

export type * as OpenAPI from '../../open-api/types/compute.js';

/**
 * @private
 * @internal
 */
export const CONFIG = COMPUTE;

export * as endpoints from './service/endpoints.js';
