/**
 * @description A wrapper around the Globus Timer service.
 * @group Service
 * @see [Globus Timer API Documentation](https://timer.automate.globus.org/docs#/)
 * @module
 */
import * as TIMER from './config.js';

import { create } from './service/timer.js';

export type * as OpenAPI from '../../open-api/types/timer';

/**
 * @private
 * @internal
 */
export const CONFIG = TIMER;
export { create };
