/**
 * Types and helpers for tokens persisted by the `AuthorizationManager`.
 *
 * This module intentionally has no runtime dependencies so it can be imported
 * anywhere (e.g., `services/shared.ts`) without introducing circular imports.
 */
import type { Token } from '../../services/auth/types.js';

/**
 * Metadata added to a token by the `TokenManager` when it is stored.
 * @since 4.3.0
 */
export type TokenMetadata = {
  /**
   * The timestamp when the token was added to the storage as a number of milliseconds since the Unix epoch.
   *
   * **IMPORTANT**: This value might **not** represent the time when the token was created by the authorization server.
   */
  created: number;
  /**
   * The timestamp when the token will expire as a number of milliseconds since the Unix epoch, based
   * on the `expires_in` value from the token response and the time when the token was stored.
   */
  expires: number | null;
};

/**
 * A token as it is persisted in the `AuthorizationManager` storage.
 */
export type StoredToken = Token & {
  /**
   * Tokens stored before the introduction of the `__metadata` field will be missing this property.
   * @since 4.3.0
   */
  __metadata?: TokenMetadata;
};

/**
 * Determines whether or not a stored token is expired.
 * @param token The token to check.
 * @param augment An optional number of milliseconds to add to the current time when checking the expiration,
 * e.g., `30_000` to determine whether the token will be expired 30 seconds from now.
 * @returns `true` if the token is expired, `false` if it is not expired, and `undefined` if the expiration status cannot be determined
 * based on the token's metadata. This can happen if the token is missing the `__metadata` field or the `expires` field.
 */
export function isTokenExpired(
  token: StoredToken | null,
  augment: number = 0,
): boolean | undefined {
  /* eslint-disable no-underscore-dangle */
  if (!token || !token.__metadata || typeof token.__metadata.expires !== 'number') {
    return undefined;
  }
  return Date.now() + augment >= token.__metadata.expires;
  /* eslint-enable no-underscore-dangle */
}
