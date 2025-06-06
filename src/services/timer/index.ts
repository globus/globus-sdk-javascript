/**
 * @description A wrapper around the Globus Timer service.
 * @group Service
 * @see [Globus Timer API Documentation](https://timer.automate.globus.org/docs#/)
 * @module
 */
import * as TIMER from './config.js';

export type * as OpenAPI from '../../open-api/types/timer.js';

/**
 * @private
 * @internal
 */
export const CONFIG = TIMER;

export * as timer from './service/timer.js';
export * as jobs from './service/jobs/index.js';
