/**
 * @module Authorization
 * @description Provides modules for interacting with Globus-related authorization contexts in your application.
 * @example
 * import { authorization } from "globus/sdk";
 * const manager = authorization.create(...);
 */
import {
  AuthorizationManager,
  type AuthorizationManagerConfiguration,
} from './AuthorizationManager.js';

import * as tokens from './tokens.js';

export * as tokens from './tokens.js';

/**
 * @deprecated This will be removed in a future release. Use an instance of the AuthorizationManager instead.
 */
export const { getTokenForScope } = tokens;

/**
 * Create an instance of the {@link AuthorizationManager}.
 */
export function create(configuration: AuthorizationManagerConfiguration) {
  return new AuthorizationManager(configuration);
}
