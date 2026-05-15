/**
 * @module @globus/sdk
 * @description `@globus/sdk` provides modules for interacting with the various APIs that make up the Globus platform.
 */

/**
 * Core
 */
export * as info from './core/info/index.js';
export * as logger from './core/logger.js';
export * as authorization from './core/authorization/index.js';
export * as errors from './core/errors.js';

/**
 * Services
 */
export * as auth from './services/auth/index.js';
export * as transfer from './services/transfer/index.js';
export * as search from './services/search/index.js';
export * as groups from './services/groups/index.js';
export * as flows from './services/flows/index.js';
export * as gcs from './services/globus-connect-server/index.js';
export * as timers from './services/timers/index.js';
export * as compute from './services/compute/index.js';

export { serviceRequest as request } from './services/shared.js';

/**
 * Applications
 */
export * as webapp from './apps/web.js';
