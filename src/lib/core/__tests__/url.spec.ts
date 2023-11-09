import { EnvironmentConfigurationError } from '../errors';
import { ENVIRONMENTS } from '../global';
import { build, getServiceURL, stringifyParameters } from '../url';

describe.each(Object.values(ENVIRONMENTS))('getServiceUrl succeeds', (environment) => {
  it('should produce a valid Globus Auth service URL', () => {
    expect(() => {
      getServiceURL('AUTH', environment);
    }).not.toThrow();
  });

  it('should produce a valid Globus Transfer service URL', () => {
    expect(() => {
      getServiceURL('TRANSFER', environment);
    }).not.toThrow();
  });
});

describe('getServiceUrl failure', () => {
  it('should throw an error when passed an invalid value', () => {
    expect(() => {
      getServiceURL('TRANSFER', '///%%%###');
    }).toThrow();
  });
});

describe.each(Object.values(ENVIRONMENTS))('build succeeds for all environments', (environment) => {
  const ORIGINAL_ENV_VARS = process.env;

  beforeEach(() => {
    process.env = {
      ...ORIGINAL_ENV_VARS,
      GLOBUS_SDK_ENVIRONMENT: environment,
    };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV_VARS;
  });

  it('should not throw errors for all environments', () => {
    expect(() => {
      build('AUTH', 'test-path');
    }).not.toThrow();
  });
});

describe('build fails when invalid GLOBUS_SDK_ENVIRONMENT is set', () => {
  const ORIGINAL_ENV_VARS = process.env;

  afterAll(() => {
    process.env = ORIGINAL_ENV_VARS;
  });

  it('should throw an error', () => {
    process.env['GLOBUS_SDK_ENVIRONMENT'] = 'sindbox'; // <- intentional misspelling

    expect(() => {
      build('AUTH', 'test-path');
    }).toThrow(EnvironmentConfigurationError);
  });
});

describe('stringifyParameters', () => {
  it('should serialize a simple object', () => {
    expect(stringifyParameters({ storage_gateway: 'my-storage-gateway' })).toEqual(
      'storage_gateway=my-storage-gateway',
    );
  });

  it('should serialize an object with an array (single value)', () => {
    /**
     * Example from the GCS Manager API
     * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Roles/#listRoles
     */
    expect(stringifyParameters({ include: ['all_roles'] })).toEqual('include=all_roles');
  });

  it('should serialize an object with an array (many values)', () => {
    /**
     * Example from the Groups V2 API
     * @see https://groups.api.globus.org/redoc?_gl=1*16m8wdi*_ga*MTI3NTI4MzEzMi4xNjc1MTk1MTMw*_ga_7ZB89HGG0P*MTY5MDU3OTExNS4xNjUuMS4xNjkwNTc5MTk2LjAuMC4w#tag/groups/operation/get_statuses_v2_groups_statuses_get
     */
    expect(
      stringifyParameters({
        include: ['memberships', 'my_memberships', 'policies', 'allowed_actions'],
      }),
    ).toEqual('include=memberships%2Cmy_memberships%2Cpolicies%2Callowed_actions');
  });
});
