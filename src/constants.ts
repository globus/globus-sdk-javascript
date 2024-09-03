/**
 * @module Constants
 * @description Constants provided by the SDK.
 *
 * @example
 * // Using the global exported constants.
 * import { GCS } from "@globus/sdk/constants";
 * console.log(GCS.CONNECTORS.POSIX);
 *
 * @example
 * // Using the service-specific exported constants.
 * import GCS from "@globus/sdk/service/globus-connect-server/constants";
 * console.log(GCS.CONNECTORS.POSIX);
 */

export * as GCS from './services/globus-connect-server/constants.js';
