import { EnvironmentConfigurationError } from '../errors';
import {
  getEnvironment,
  ENVIRONMENTS,
  getVerifySSL,
  getHttpTimeout,
  getSDKOptions,
  getServiceBaseUrl,
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

  it('uses GLOBUS_SDK_ENVIRONMENT over GLOBUS_SDK_OPTIONS for sourcing environment', () => {
    process.env['GLOBUS_SDK_OPTIONS'] = JSON.stringify({
      environment: ENVIRONMENTS.PREVIEW,
    });
    process.env['GLOBUS_SDK_ENVIRONMENT'] = ENVIRONMENTS.SANDBOX;
    expect(getEnvironment()).toEqual(ENVIRONMENTS.SANDBOX);
  });

  it('should be sourced from GLOBUS_SDK_OPTIONS when GLOBUS_SDK_ENVIRONMENT is not set', () => {
    process.env['GLOBUS_SDK_OPTIONS'] = JSON.stringify({
      environment: ENVIRONMENTS.PREVIEW,
    });
    delete process.env['GLOBUS_SDK_ENVIRONMENT'];
    expect(getEnvironment()).toEqual(ENVIRONMENTS.PREVIEW);
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

describe('getServiceBaseUrl', () => {
  const ORIGINAL_ENV_VARS = process.env;

  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV_VARS };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV_VARS;
  });

  it('uses the default host for the environment', () => {
    expect(getServiceBaseUrl('AUTH')).toBe('https://auth.globus.org');
    expect(getServiceBaseUrl('AUTH', 'sandbox')).toBe('https://auth.sandbox.globuscs.info');
  });

  it.each(['https://auth.example.org', 'http://localhost:3000', 'http://127.0.0.1:3000/base/'])(
    'supports GLOBUS_SDK_SERVICE_URL_{SERVICE} overrides (%s)',
    (override) => {
      process.env['GLOBUS_SDK_SERVICE_URL_AUTH'] = override;
      expect(getServiceBaseUrl('AUTH')).toBe(override);
    },
  );

  it.each([
    'http://example.org',
    'http://localhost.example.org',
    'ftp://localhost',
    // eslint-disable-next-line no-script-url
    'javascript:alert(1)',
    'auth.example.org',
    '',
  ])('ignores invalid GLOBUS_SDK_SERVICE_URL_{SERVICE} overrides (%s)', (override) => {
    process.env['GLOBUS_SDK_SERVICE_URL_AUTH'] = override;
    expect(getServiceBaseUrl('AUTH')).toBe('https://auth.globus.org');
  });
});

describe('browser (window) configuration', () => {
  const runtime = globalThis as unknown as { window?: Record<string, unknown> };

  beforeEach(() => {
    runtime.window = {};
  });

  afterEach(() => {
    delete runtime.window;
  });

  /**
   * In a browser, `<a id="GLOBUS_SDK_SERVICE_URL_AUTH" href="https://attacker.example/">` is
   * exposed as `window.GLOBUS_SDK_SERVICE_URL_AUTH` and is stringified to its `href`.
   */
  const clobbered = (value: string) => ({
    href: value,
    toString() {
      return this.href;
    },
  });

  it('sources primitive values from window', () => {
    runtime.window = {
      GLOBUS_SDK_ENVIRONMENT: ENVIRONMENTS.SANDBOX,
      GLOBUS_SDK_HTTP_TIMEOUT: 120,
      GLOBUS_SDK_SERVICE_URL_AUTH: 'https://auth.example.org',
    };
    expect(getEnvironment()).toEqual(ENVIRONMENTS.SANDBOX);
    expect(getHttpTimeout()).toBe(120);
    expect(getServiceBaseUrl('AUTH')).toBe('https://auth.example.org');
  });

  it('sources GLOBUS_SDK_OPTIONS as an object or string', () => {
    runtime.window = { GLOBUS_SDK_OPTIONS: { environment: ENVIRONMENTS.PREVIEW } };
    expect(getEnvironment()).toEqual(ENVIRONMENTS.PREVIEW);
    runtime.window = {
      GLOBUS_SDK_OPTIONS: JSON.stringify({ environment: ENVIRONMENTS.STAGING }),
    };
    expect(getEnvironment()).toEqual(ENVIRONMENTS.STAGING);
  });

  it('ignores non-primitive service URL overrides', () => {
    runtime.window = {
      GLOBUS_SDK_SERVICE_URL_AUTH: clobbered('https://attacker.example/'),
    };
    expect(getServiceBaseUrl('AUTH')).toBe('https://auth.globus.org');
  });

  it('ignores non-primitive values', () => {
    runtime.window = {
      GLOBUS_SDK_ENVIRONMENT: clobbered(ENVIRONMENTS.SANDBOX),
      GLOBUS_SDK_HTTP_TIMEOUT: clobbered('1'),
      GLOBUS_SDK_VERIFY_SSL: clobbered('false'),
    };
    expect(getEnvironment()).toEqual(ENVIRONMENTS.PRODUCTION);
    expect(getHttpTimeout()).toBe(60);
    expect(getVerifySSL()).toBe(true);
  });

  it('ignores GLOBUS_SDK_OPTIONS that is not a plain object', () => {
    class Options {
      environment = ENVIRONMENTS.SANDBOX;
    }
    runtime.window = { GLOBUS_SDK_OPTIONS: new Options() };
    expect(getSDKOptions().environment).toBeUndefined();
    expect(getEnvironment()).toEqual(ENVIRONMENTS.PRODUCTION);
  });
});
