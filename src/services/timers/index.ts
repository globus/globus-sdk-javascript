/**
 * @description A wrapper around the Globus Timers service.
 * @group Service
 * @see [Globus Timers API Documentation](https://timer.automate.globus.org/docs#/)
 * @module
 */
import * as TIMERS from './config.js';

export type * as OpenAPI from '../../open-api/types/timers.js';

/**
 * @private
 * @internal
 */
export const CONFIG = TIMERS;

export * as timer from './service/timer.js';
export * as jobs from './service/jobs/index.js';
