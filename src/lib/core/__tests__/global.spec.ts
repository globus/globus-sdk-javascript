import { EnvironmentConfigurationError } from '../errors';
import {
  getEnvironment,
  ENVIRONMENTS,
  getVerifySSL,
  getHttpTimeout,
  getSDKOptions,
} from '../global';

describe('getEnvironment', () => {
  const ORIGINAL_ENV_VARS = process.env;

  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV_VARS };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV_VARS;
  });

  it('should be production when not set', () => {
    delete process.env['GLOBUS_SDK_ENVIRONMENT'];
    expect(getEnvironment()).toEqual(ENVIRONMENTS.PRODUCTION);
  });

  it('should be sandbox', () => {
    process.env['GLOBUS_SDK_ENVIRONMENT'] = ENVIRONMENTS.SANDBOX;
    expect(getEnvironment()).toEqual(ENVIRONMENTS.SANDBOX);
  });

  it('should throw Error when environment string does not exist', () => {
    process.env['GLOBUS_SDK_ENVIRONMENT'] = 'sindbox'; // <- intentional misspelling
    expect(() => {
      getEnvironment();
    }).toThrow(EnvironmentConfigurationError);
  });
});

describe('getVerifySSL', () => {
  it('should always be true', () => {
    expect(getVerifySSL()).toBe(true);
  });
});

describe('getSDKOptions', () => {
  const ORIGINAL_ENV_VARS = process.env;

  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV_VARS };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV_VARS;
  });

  it('sources from stringified process.env', () => {
    const options = {
      fetch: {
        options: {
          headers: {
            'User-Agent': 'hello-world',
          },
        },
      },
    };
    process.env['GLOBUS_SDK_OPTIONS'] = JSON.stringify(options);
    expect(getSDKOptions()).toEqual(options);
  });

  it('merges passed options with stringified process.env', () => {
    const options = {
      fetch: {
        options: {
          headers: {
            'User-Agent': 'hello-world',
          },
        },
      },
    };
    process.env['GLOBUS_SDK_OPTIONS'] = JSON.stringify(options);
    const result = getSDKOptions({
      fetch: {
        options: {
          headers: {
            Authorization: 'Bearer example-token',
          },
        },
      },
    });
    expect(result.fetch.options.headers).toEqual({
      Authorization: 'Bearer example-token',
      'User-Agent': 'hello-world',
    });
  });

  it('returns passed options when process.env is empty', () => {
    const result = getSDKOptions({
      fetch: {
        options: {
          headers: {
            Authorization: 'Bearer example-token',
          },
        },
      },
    });
    expect(result.fetch.options.headers).toEqual({
      Authorization: 'Bearer example-token',
    });
  });
});

/**
 * Basically just mirroring the `globus-python-sdk` testing
 * for this env variable
 * @see https://github.com/globus/globus-sdk-python/blob/e1d5a0df866b475d1aa1201520d337f09e2db608/tests/unit/test_base_client.py#L46
 */
describe('getHttpTimeout', () => {
  const ORIGINAL_ENV_VARS = process.env;

  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV_VARS };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV_VARS;
  });

  it('should be 60 seconds when not set', () => {
    delete process.env['GLOBUS_SDK_HTTP_TIMEOUT'];
    expect(getHttpTimeout()).toBe(60);
  });

  it('should be `null` when set to -1', () => {
    process.env['GLOBUS_SDK_HTTP_TIMEOUT'] = '-1';
    expect(getHttpTimeout()).toBeNull();
  });

  it('should be 120 seconds', () => {
    process.env['GLOBUS_SDK_HTTP_TIMEOUT'] = '120';
    expect(getHttpTimeout()).toBe(120);
  });
});
