import {
  isErrorWellFormed,
  isConsentRequiredError,
  isAuthorizationRequirementsError,
  toAuthorizationQueryParams,
} from '../errors';

export const TRANSFER_GENERIC_ERROR = {
  code: 'NotSupported',
  message: 'GCSv4 is no longer supported. Contact your sysadmin.',
  request_id: 'eHcbiFRv5',
  resource: '/operation/endpoint/ddb59aef-6d04-11e5-ba46-22000b92c6ec/ls',
};

describe('isErrorWellFormed', () => {
  it('should return true for a well-formed error', () => {
    expect(isErrorWellFormed(TRANSFER_GENERIC_ERROR)).toBe(true);
  });

  it('should return false for a non-object', () => {
    expect(isErrorWellFormed('test')).toBe(false);
  });

  it('should return false for a null value', () => {
    expect(isErrorWellFormed(null)).toBe(false);
  });

  it('should return false for a missing code property', () => {
    expect(isErrorWellFormed({ message: 'test' })).toBe(false);
  });

  it('should return false for a missing message property', () => {
    expect(isErrorWellFormed({ code: 'test' })).toBe(false);
  });
});

export const TRANSFER_CONSENT_REQUIRED_ERROR = {
  code: 'ConsentRequired',
  message: 'Missing required data_access consent',
  request_id: 'HARVa82zp',
  required_scopes: [
    'urn:globus:auth:scope:transfer.api.globus.org:all[*https://auth.globus.org/scopes/6c54cade-bde5-45c1-bdea-f4bd71dba2cc/data_access]',
  ],
  resource: '/operation/endpoint/6c54cade-bde5-45c1-bdea-f4bd71dba2cc/ls',
};

describe('isConsentRequiredError', () => {
  it('should return true for a consent required error', () => {
    expect(isConsentRequiredError(TRANSFER_CONSENT_REQUIRED_ERROR)).toBe(true);
  });

  it('should return false for a non-consent required error', () => {
    expect(isConsentRequiredError({ code: 'test' })).toBe(false);
  });

  it('should return false for a missing required_scopes property', () => {
    expect(isConsentRequiredError({ code: 'ConsentRequired' })).toBe(false);
  });

  it('should return false for a missing code property', () => {
    expect(isConsentRequiredError({ required_scopes: ['test'] })).toBe(false);
  });
});

export const TRANSFER_AUTHORIZATION_REQUIREMENTS_ERROR = {
  authorization_parameters: {
    session_message: 'Session reauthentication required (Globus Transfer)',
    session_required_identities: [],
    session_required_mfa: false,
    session_required_single_domain: ['globus.org'],
  },
  code: 'ExternalError.DirListingFailed.LoginFailed',
  message:
    'Command Failed: Error (login)\nEndpoint: Globus Staff GCSv5.4 Demo POSIX HA (eed63c24-36cb-4f29-a47f-91d94a65fef8)\nServer: 35.89.91.21:443\nMessage: Login Failed\n---\nDetails: 530-Login incorrect. : GlobusError: v=1 c=LOGIN_DENIED\\r\\n530-GridFTP-Message: None of your identities are from domains allowed by resource policies\\r\\n530-GridFTP-JSON-Result: {"DATA_TYPE": "result#1.0.0", "code": "permission_denied", "detail": {"DATA_TYPE": "not_from_allowed_domain#1.0.0", "allowed_domains": ["globus.org"]}, "has_next_page": false, "http_response_code": 403, "message": "None of your identities are from domains allowed by resource policies"}\\r\\n530 End.\\r\\n\n',
  request_id: 'rvWu7tCfa',
  resource: '/operation/endpoint/eed63c24-36cb-4f29-a47f-91d94a65fef8/ls',
};

describe('isAuthorizationRequirementsError', () => {
  it('should return true for an authorization requirements error', () => {
    expect(isAuthorizationRequirementsError(TRANSFER_AUTHORIZATION_REQUIREMENTS_ERROR)).toBe(true);
  });

  it('should return false for a missing authorization_parameters property', () => {
    expect(isAuthorizationRequirementsError({ code: 'test' })).toBe(false);
  });
});

describe('toAuthorizationQueryParams', () => {
  it('reformat as expected', () => {
    expect(toAuthorizationQueryParams(TRANSFER_AUTHORIZATION_REQUIREMENTS_ERROR)).toEqual({
      session_message: 'Session reauthentication required (Globus Transfer)',
      session_required_identities: '',
      session_required_mfa: 'false',
      session_required_single_domain: 'globus.org',
    });
  });
  it('handles empty', () => {
    expect(
      toAuthorizationQueryParams({
        authorization_parameters: {},
      }),
    ).toEqual({});
  });
  it('drops known unsupported properties', () => {
    expect(
      toAuthorizationQueryParams({
        authorization_parameters: {
          required_scopes: ['foobar'],
        },
      }),
    ).toEqual({});
  });
});
