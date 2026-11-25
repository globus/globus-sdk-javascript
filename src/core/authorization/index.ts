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

export { AuthorizationManager, AuthorizationManagerConfiguration };

export type {
  AuthorizationRequest,
  StartAuthorizationOptions,
  TokenRevocationFailure,
  TokenRevocationResult,
} from './AuthorizationManager.js';

export { TokenManager } from './TokenManager.js';
export { isTokenExpired, type StoredToken, type TokenMetadata } from './StoredToken.js';
export { OAuthTokenError, isOAuthTokenError } from './OAuthTokenError.js';
export { MemoryStorage } from '../storage/memory.js';

export type {
  Token,
  TokenResponse,
  TokenWithRefresh,
  JwtUserInfo,
} from '../../services/auth/types.js';
