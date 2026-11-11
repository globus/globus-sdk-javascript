/**
 * @module Errors
 * @example
 * import { errors } from "globus/sdk";
 * if (errors.isConsentRequiredError(...)) { ... }
 */
import type { AuthorizationQueryParameters } from '../services/auth/index.js';
import type { AuthorizationRequestParameters } from './authorization/pkce.js';

export class EnvironmentConfigurationError extends Error {
  override name = 'EnvironmentConfigurationError';

  constructor(variable: string, value: unknown) {
    super();
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    this.message = `Invalid configuration value provided for ${variable} (${value}).`;
  }
}

export type WellFormedError = {
  code: string;
  message: string;
};

/**
 * Test an unknown argument to determine if it can be further parsed as a potentnial known error.
 */
export function isErrorWellFormed(test: unknown): test is WellFormedError {
  return typeof test === 'object' && test !== null && 'code' in test && 'message' in test;
}

/**
 * An error that indicates that the user must provide consent for additional scopes.
 * - This error typically encountered when interacting with Globus Transfer or Globus Connect Server.
 * - Many instances of `code: "ConsentRequire"` in the Globus platform are being migrated to `AuthorizationRequirementsError`.
 */
export type ConsentRequiredError = {
  code: 'ConsentRequired';
  required_scopes: string[];
  [key: string]: unknown;
};

/**
 * Whether or not the provide object is recognized as a `ConsentRequiredError`.
 * @see {@link ConsentRequiredError}
 */
export function isConsentRequiredError(test: unknown): test is ConsentRequiredError {
  return (
    isErrorWellFormed(test) &&
    test.code === 'ConsentRequired' &&
    'required_scopes' in test &&
    Array.isArray(test.required_scopes)
  );
}

/**
 * An error that includes an `authorization_parameters` property, a.k.a "G.A.R.E".
 *
 * A well-known error shape is provided by services when additional authorization requirements must be met by the session.
 * This object can be converted to parameters accepted by Globus Auth using `sdk.errors.toAuthorizationQueryParams()`.
 */
export type AuthorizationRequirementsError = {
  authorization_parameters: {
    session_message?: string;
    session_required_identities?: string[];
    session_required_mfa?: boolean;
    session_required_single_domain?: string[];
    session_required_policies?: string[];
    prompt?: string;
    required_scopes?: string[];
  };
  /**
   * @todo At the moment, most Globus services do not guarentee a `code` property for this error type.
   * Once it becomes more common, this type (and the `isAuthorizationRequirementsError` function) should be updated.
   * @see https://globus-sdk-python.readthedocs.io/en/stable/experimental/auth_requirements_errors.html
   */
  // code: string;
  [key: string]: unknown;
};
/**
 * The `authorization_parameters` that are allowed to be mapped to Globus Auth query parameters.
 *
 * The contents of an `AuthorizationRequirementsError` are provided by the service that
 * produced the error (which may be operated by a third-party, e.g., Globus Connect Server) and
 * should be treated as untrusted. Only parameters related to session requirements are
 * forwarded to Globus Auth – an error response must never be able to influence
 * protocol-level parameters (e.g., `client_id`, `redirect_uri`, `state`, `code_challenge`).
 * @see https://docs.globus.org/api/auth/sessions/#client-initiated-authns
 */
const ALLOWED_AUTHORIZATION_PARAMETERS = [
  'session_message',
  'session_required_identities',
  'session_required_single_domain',
  'session_required_mfa',
  'session_required_policies',
  'prompt',
] as const;

/**
 * Convert a value from an `AuthorizationRequirementsError` to its query parameter (string) equivalent.
 * Values that are not of an expected type result in `undefined`.
 */
function toQueryParamValue(value: unknown): string | undefined {
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }
  if (Array.isArray(value) && value.every((v) => typeof v === 'string')) {
    return value.join(',');
  }
  return undefined;
}

/**
 * Convert an `AuthorizationRequirementsError` to a query string object accepted by Globus Auth.
 *
 * Only known session-related parameters (and `required_scopes`, as `scope`) are included
 * in the result; any other properties found in `authorization_parameters` are ignored.
 */
export function toAuthorizationQueryParams(
  error: AuthorizationRequirementsError,
): AuthorizationQueryParameters & Partial<Pick<AuthorizationRequestParameters, 'scope'>> {
  const { authorization_parameters: parameters } = error;
  const mapped: Record<string, string> = {};
  /**
   * `required_scopes` isn't a query parameter accepted by Globus Auth, but
   * in most cases the `required_scopes` represented in the error are intended
   * to be included in the `scopes` (OAuth) parameter.
   * @see https://docs.globus.org/api/auth/sessions/#client-initiated-authns
   */
  const { required_scopes: requiredScopes } = parameters;
  if (Array.isArray(requiredScopes) && requiredScopes.every((v) => typeof v === 'string')) {
    mapped['scope'] = requiredScopes.join(' ');
  }

  ALLOWED_AUTHORIZATION_PARAMETERS.forEach((key) => {
    if (!Object.prototype.hasOwnProperty.call(parameters, key)) return;
    const value = toQueryParamValue(parameters[key]);
    if (value !== undefined) {
      mapped[key] = value;
    }
  });

  return mapped;
}

/**
 * Check if an object is an `AuthorizationRequirementsError`.
 * @see {@link AuthorizationRequirementsError}
 */
export function isAuthorizationRequirementsError(
  test: unknown,
): test is AuthorizationRequirementsError {
  return (
    typeof test === 'object' &&
    test !== null &&
    'authorization_parameters' in test &&
    typeof test.authorization_parameters === 'object' &&
    test.authorization_parameters !== null
  );
}
