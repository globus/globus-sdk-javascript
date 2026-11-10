/**
 * An error thrown when a request to the Globus Auth token endpoint (`/v2/oauth2/token`) does
 * not result in a token response, e.g., when refreshing a token or exchanging an authorization code.
 *
 * - When Globus Auth responds with an error, `status` is the HTTP status and `error` is the
 *   OAuth error code (e.g., `invalid_grant`).
 * - When the request could not be completed (e.g., a network error), `status` is `undefined`
 *   and the original error is available as `cause`.
 *
 * @example Distinguishing a refused refresh from an outage.
 * ```ts
 * try {
 *   await manager.refreshToken(token, { throwOnError: true });
 * } catch (e) {
 *   if (errors.isOAuthTokenError(e) && e.requiresReauthentication) {
 *     // The refresh token is no longer valid; the user needs to log in again.
 *   } else {
 *     // Globus Auth is unavailable, or the network failed; try again later.
 *   }
 * }
 * ```
 * @see https://datatracker.ietf.org/doc/html/rfc6749#section-5.2
 */
export class OAuthTokenError extends Error {
  override name = 'OAuthTokenError';

  /**
   * The grant that was being requested.
   */
  readonly grant_type: 'refresh_token' | 'authorization_code';

  /**
   * The resource server of the token being refreshed, when applicable.
   */
  readonly resource_server?: string;

  /**
   * The HTTP status of the response, or `undefined` if no response was received.
   */
  readonly status?: number;

  /**
   * The OAuth `error` code from the response (e.g., `invalid_grant`), when available.
   */
  readonly error?: string;

  /**
   * The OAuth `error_description` from the response, when available.
   */
  readonly error_description?: string;

  /**
   * The parsed response body, when available.
   */
  readonly body?: unknown;

  constructor(
    message: string,
    details: {
      grant_type: OAuthTokenError['grant_type'];
      resource_server?: string;
      status?: number;
      body?: unknown;
    },
    options?: { cause?: unknown },
  ) {
    super(message);
    if (options && 'cause' in options) {
      /**
       * Assigned manually (instead of `super(message, { cause })`) to support targets without `ErrorOptions`.
       */
      Object.defineProperty(this, 'cause', {
        value: options.cause,
        writable: true,
        configurable: true,
      });
    }
    this.grant_type = details.grant_type;
    this.resource_server = details.resource_server;
    this.status = details.status;
    this.body = details.body;
    if (typeof details.body === 'object' && details.body !== null) {
      const { error, error_description: description } = details.body as Record<string, unknown>;
      this.error = typeof error === 'string' ? error : undefined;
      this.error_description = typeof description === 'string' ? description : undefined;
    }
  }

  /**
   * Whether the grant was refused by Globus Auth (`invalid_grant`), e.g., the refresh token
   * has expired or was revoked. The user will need to authenticate again.
   */
  get requiresReauthentication() {
    return this.error === 'invalid_grant';
  }
}

export function isOAuthTokenError(test: unknown): test is OAuthTokenError {
  return test instanceof OAuthTokenError;
}
