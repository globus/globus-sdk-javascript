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
 * Keys that should not be included in the query string object (not recognized by Globus Auth),
 * but are found on the `AuthorizationRequirementsError` object.
 */
const NO_OP_KEYS: (keyof AuthorizationRequirementsError)[] = ['required_scopes'];
/**
 * Convert an `AuthorizationRequirementsError` to a query string object accepted by Globus Auth.
 */
export function toAuthorizationQueryParams(
  error: AuthorizationRequirementsError,
): AuthorizationQueryParameters & Partial<AuthorizationRequestParameters> {
  /**
   * Map properties from the `AuthorizationRequirementsError` to accepted query parameters.
   */
  const mapped = {
    /**
     * `required_scopes` isn't a query parameter accepted by Globus Auth, but
     * in most cases the `required_scopes` represented in the error are intended
     * to be included in the `scopes` (OAuth) parameter.
     * @see https://docs.globus.org/api/auth/sessions/#client-initiated-authns
     */
    scope: error.authorization_parameters.required_scopes?.join(' '),
    /**
     * We still include the entire `authorization_parameters` object in addition to the mapped values for parsing.
     */
    ...error.authorization_parameters,
  };

  return Object.entries(mapped).reduce((acc, [key, v]) => {
    /**
     * Remove keys that are not recognized by Globus Auth and empty values.
     */
    if (NO_OP_KEYS.includes(key) || v === undefined || v === null) {
      return acc;
    }
    /**
     * All other values are converted to strings.
     */
    let value = v;
    if (Array.isArray(value)) {
      value = value.join(',');
    } else if (typeof v === 'boolean') {
      value = value ? 'true' : 'false';
    }
    return { ...acc, [key]: value };
  }, {});
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
