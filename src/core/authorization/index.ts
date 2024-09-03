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

/**
 * Create an instance of the {@link AuthorizationManager}.
 */
export function create(configuration: AuthorizationManagerConfiguration) {
  return new AuthorizationManager(configuration);
}
