import {
  FLOWS_AUTHORIZATION_REQUIREMENTS_ERROR,
  TRANSFER_AUTHORIZATION_REQUIREMENTS_ERROR,
} from '../../__mocks__/errors/authorization_parameters';

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

describe('isAuthorizationRequirementsError', () => {
  it('should return true for an authorization requirements error', () => {
    expect(isAuthorizationRequirementsError(TRANSFER_AUTHORIZATION_REQUIREMENTS_ERROR)).toBe(true);
  });

  it('should return false for a missing authorization_parameters property', () => {
    expect(isAuthorizationRequirementsError({ code: 'test' })).toBe(false);
  });
  /**
   * Service Errors
   */
  it('supports Globus Flows', () => {
    expect(isAuthorizationRequirementsError(FLOWS_AUTHORIZATION_REQUIREMENTS_ERROR)).toBe(true);
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
