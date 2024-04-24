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

export function isErrorWellFormed(test: unknown): test is WellFormedError {
  return typeof test === 'object' && test !== null && 'code' in test && 'message' in test;
}

export type ConsentRequiredError = {
  code: 'ConsentRequired';
  required_scopes: string[];
  [key: string]: unknown;
};

export function isConsentRequiredError(test: unknown): test is ConsentRequiredError {
  return (
    isErrorWellFormed(test) &&
    test.code === 'ConsentRequired' &&
    'required_scopes' in test &&
    Array.isArray(test.required_scopes)
  );
}

export type AuthorizationRequirementsError = {
  authorization_parameters: {
    session_message: string;
    session_required_identities: string[];
    session_required_mfa: boolean;
    session_required_single_domain: string[];
  };
  [key: string]: unknown;
};

export function isAuthorizationRequirementsError(
  test: unknown,
): test is AuthorizationRequirementsError {
  return (
    isErrorWellFormed(test) &&
    'authorization_parameters' in test &&
    typeof test.authorization_parameters === 'object' &&
    test.authorization_parameters !== null
  );
}
