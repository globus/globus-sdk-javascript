/**
 * @description A wrapper around the Globus Flows service.
 * @group Service
 * @see [Globus Flows API Documentation](https://docs.globus.org/api/flows/)
 * @module
 */
import * as FLOWS from './config.js';

/**
 * @private
 * @internal
 */
export const CONFIG = FLOWS;

export * as flows from './service/flows.js';
export * as runs from './service/runs.js';
