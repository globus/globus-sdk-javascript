/**
 * @description A wrapper around the Globus Timer service.
 * @group Service
 * @see [Globus Timer API Documentation](https://timer.automate.globus.org/docs#/)
 * @module
 */
import * as TIMER from "./config";

/**
 * @private
 * @internal
 */
export const CONFIG = TIMER;

import { create } from "./service/timer";
export { create };
