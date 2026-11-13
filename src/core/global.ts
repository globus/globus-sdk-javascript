import * as AUTH from '../services/auth/config.js';
import * as TRANSFER from '../services/transfer/config.js';
import * as FLOWS from '../services/flows/config.js';
import * as GROUPS from '../services/groups/config.js';
import * as SEARCH from '../services/search/config.js';
import * as TIMERS from '../services/timers/config.js';
import * as COMPUTE from '../services/compute/config.js';
import * as DOWNLOADS from '../services/downloads/config.js';

import { EnvironmentConfigurationError } from './errors.js';
import { SDKOptions } from '../services/types.js';
import { log } from './logger.js';

function getRuntime() {
  return typeof window !== 'undefined' ? window : process;
}

function isBrowser(runtime: Window | NodeJS.Process): runtime is Window {
  return typeof window === typeof runtime;
}

/**
 * Whether or not the value is a plain object (e.g., an object literal).
 */
function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

/**
 * Configuration keys that are allowed to be sourced as (plain) objects.
 */
const OBJECT_CONFIGURATION_KEYS = ['GLOBUS_SDK_OPTIONS'];

/**
 * Whether or not a value sourced from the runtime is an acceptable configuration value.
 *
 * In browsers, configuration is sourced from properties of `window`, which can be
 * created by the document itself (e.g., `<a id="GLOBUS_SDK_...">` is exposed as `window.GLOBUS_SDK_...`).
 * To ensure injected markup cannot be used to configure the SDK ("DOM clobbering"), only
 * primitive values (and, a plain object for `GLOBUS_SDK_OPTIONS`) are honored.
 */
function isValidConfigurationValue(key: string, value: unknown) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    (OBJECT_CONFIGURATION_KEYS.includes(key) && isPlainObject(value))
  );
}

function env<T>(key: string, fallback: T): T {
  const runtime = getRuntime();
  let envConfiguration;
  if (isBrowser(runtime)) {
    envConfiguration = runtime;
  } else {
    envConfiguration = runtime.env;
  }
  if (!(key in envConfiguration)) {
    return fallback;
  }
  const value = (envConfiguration as Record<typeof key, unknown>)[key];
  if (!isValidConfigurationValue(key, value)) {
    log('warn', `Ignoring invalid runtime configuration value provided for ${key}.`);
    return fallback;
  }
  return value as T;
}

/**
 * Handlers for: GLOBUS_SDK_ENVIRONMENT
 */
export const ENVIRONMENTS = {
  PRODUCTION: 'production',
  PREVIEW: 'preview',
  STAGING: 'staging',
  SANDBOX: 'sandbox',
  INTEGRATION: 'integration',
  TEST: 'test',
} as const;

export type Environment = (typeof ENVIRONMENTS)[keyof typeof ENVIRONMENTS];

export const SERVICES = {
  [AUTH.ID]: AUTH.ID,
  [TRANSFER.ID]: TRANSFER.ID,
  [FLOWS.ID]: FLOWS.ID,
  [GROUPS.ID]: GROUPS.ID,
  [SEARCH.ID]: SEARCH.ID,
  [TIMERS.ID]: TIMERS.ID,
  [COMPUTE.ID]: COMPUTE.ID,
  [DOWNLOADS.ID]: DOWNLOADS.ID,
};

export type Service = keyof typeof SERVICES;

export const SERVICE_HOSTS: Record<Service, Partial<Record<Environment, string>>> = {
  [AUTH.ID]: AUTH.HOSTS,
  [TRANSFER.ID]: TRANSFER.HOSTS,
  [FLOWS.ID]: FLOWS.HOSTS,
  [GROUPS.ID]: GROUPS.HOSTS,
  [SEARCH.ID]: SEARCH.HOSTS,
  [TIMERS.ID]: TIMERS.HOSTS,
  [COMPUTE.ID]: COMPUTE.HOSTS,
  [DOWNLOADS.ID]: DOWNLOADS.HOSTS,
};

/**
 * Get the computed SDK options based on the runtime.
 * This should be used any time we're referencing the SDK options in
 * methods to ensure we're including any global overrides.
 */
export function getSDKOptions(options?: SDKOptions) {
  let globalOptions = env<string | SDKOptions>('GLOBUS_SDK_OPTIONS', {});
  if (typeof globalOptions === 'string') {
    globalOptions = JSON.parse(globalOptions) as SDKOptions;
  }
  return {
    ...globalOptions,
    ...options,
    fetch: {
      ...globalOptions?.fetch,
      ...options?.fetch,
      options: {
        ...globalOptions?.fetch?.options,
        ...options?.fetch?.options,
        headers: {
          ...globalOptions?.fetch?.options?.headers,
          ...options?.fetch?.options?.headers,
        },
      },
    },
  };
}

export function getEnvironment(): Environment {
  const globalOptions = getSDKOptions();
  const environment = env<Environment>(
    'GLOBUS_SDK_ENVIRONMENT',
    globalOptions?.environment ?? ENVIRONMENTS.PRODUCTION,
  );
  if (globalOptions?.environment && environment !== globalOptions.environment) {
    log(
      'debug',
      'GLOBUS_SDK_ENVIRONMENT and GLOBUS_SDK_OPTIONS.environment are set to different values. GLOBUS_SDK_ENVIRONMENT will take precedence',
    );
  }
  if (!environment || !Object.values(ENVIRONMENTS).includes(environment)) {
    throw new EnvironmentConfigurationError('GLOBUS_SDK_ENVIRONMENT', environment);
  }
  return environment;
}

/**
 * Handlers for: GLOBUS_SDK_VERIFY_SSL
 * Since disabling SSL is at least not-recommended, we consider
 * this value to always be true, but provide a warning when it set
 * to one of the falsey values for informational purposes.
 *
 * Taking direction from `globus-sdk-python` for possible false values
 * @see https://github.com/globus/globus-sdk-python/blob/18eced9c12e2ec41745d1be183148845198b999c/src/globus_sdk/config/env_vars.py#L20
 */
export function getVerifySSL(): boolean {
  const verifySSLTemp = env<string>('GLOBUS_SDK_VERIFY_SSL', 'true').toLowerCase();
  if (['n', 'no', 'f', 'false', 'off', '0'].includes(verifySSLTemp)) {
    log(
      'warn',
      'Setting GLOBUS_SDK_VERIFY_SSL to false is disallowed in the Globus JavaScript SDK. It will always true in this context',
    );
  }
  return true;
}

/**
 * Handlers for: GLOBUS_SDK_HTTP_TIMEOUT
 */
export function getHttpTimeout() {
  const timeout = Number(env<string | number>('GLOBUS_SDK_HTTP_TIMEOUT', 60));
  if (timeout === -1) {
    return null;
  }
  return timeout;
}

export function getServiceHost(service: Service, environment: Environment = getEnvironment()) {
  return SERVICE_HOSTS[service][environment];
}

/**
 * Hostnames that are allowed to be used with `http:` for service URL overrides.
 */
const LOOPBACK_HOSTNAMES = ['localhost', '127.0.0.1', '[::1]'];

/**
 * Whether or not the provided value can be used as the base URL of a service.
 * - The value must be a string that can be parsed as a URL.
 * - The URL must use `https:`; `http:` is only allowed for loopback addresses (i.e., local development).
 */
function isValidServiceBaseUrl(value: unknown): value is string {
  if (typeof value !== 'string') {
    return false;
  }
  let url;
  try {
    url = new URL(value);
  } catch {
    return false;
  }
  return (
    url.protocol === 'https:' ||
    (url.protocol === 'http:' && LOOPBACK_HOSTNAMES.includes(url.hostname))
  );
}

/**
 * Get the base URL for a service.
 *
 * The default URL (based on the environment) can be overridden using `GLOBUS_SDK_SERVICE_URL_{SERVICE}`.
 * Since requests to the resulting URL will include credentials, overrides that
 * are not valid `https:` (or, loopback `http:`) URLs are ignored.
 */
export function getServiceBaseUrl(service: Service, environment: Environment = getEnvironment()) {
  const host = getServiceHost(service, environment);
  const fallback = host ? `https://${host}` : undefined;
  const key = `GLOBUS_SDK_SERVICE_URL_${service}`;
  const override = env<unknown>(key, undefined);
  if (override === undefined) {
    return fallback;
  }
  if (!isValidServiceBaseUrl(override)) {
    log('warn', `Ignoring invalid service URL provided for ${key}.`);
    return fallback;
  }
  return override;
}
