import * as AUTH from '../services/auth/config.js';
import * as TRANSFER from '../services/transfer/config.js';
import * as FLOWS from '../services/flows/config.js';
import * as GROUPS from '../services/groups/config.js';
import * as SEARCH from '../services/search/config.js';
import * as TIMER from '../services/timer/config.js';
import * as COMPUTE from '../services/compute/config.js';

import { EnvironmentConfigurationError } from './errors.js';
import { SDKOptions } from '../services/types.js';

function getRuntime() {
  return typeof window !== 'undefined' ? window : process;
}

function isBrowser(runtime: Window | NodeJS.Process): runtime is Window {
  return typeof window === typeof runtime;
}

function env<T>(key: string, fallback: T): T {
  const runtime = getRuntime();
  let envConfiguration;
  if (isBrowser(runtime)) {
    envConfiguration = runtime;
  } else {
    envConfiguration = runtime.env;
  }
  if (key in envConfiguration) {
    return (envConfiguration as Record<typeof key, T>)[key];
  }
  return fallback;
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

export function getEnvironment(): Environment {
  const environment = env<Environment>('GLOBUS_SDK_ENVIRONMENT', ENVIRONMENTS.PRODUCTION);
  if (!environment || !Object.values(ENVIRONMENTS).includes(environment)) {
    throw new EnvironmentConfigurationError('GLOBUS_SDK_ENVIRONMENT', environment);
  }
  return environment;
}

export const SERVICES = {
  [AUTH.ID]: AUTH.ID,
  [TRANSFER.ID]: TRANSFER.ID,
  [FLOWS.ID]: FLOWS.ID,
  [GROUPS.ID]: GROUPS.ID,
  [SEARCH.ID]: SEARCH.ID,
  [TIMER.ID]: TIMER.ID,
  [COMPUTE.ID]: COMPUTE.ID,
};

export type Service = keyof typeof SERVICES;

export const SERVICE_HOSTS: Record<Service, Partial<Record<Environment, string>>> = {
  [AUTH.ID]: AUTH.HOSTS,
  [TRANSFER.ID]: TRANSFER.HOSTS,
  [FLOWS.ID]: FLOWS.HOSTS,
  [GROUPS.ID]: GROUPS.HOSTS,
  [SEARCH.ID]: SEARCH.HOSTS,
  [TIMER.ID]: TIMER.HOSTS,
  [COMPUTE.ID]: COMPUTE.HOSTS,
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
    console.warn(
      'Setting GLOBUS_SDK_VERIFY_SSL to false is disallowed in the Globus Javascript SDK. It will always true in this context',
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

export function getServiceBaseUrl(service: Service, environment: Environment = getEnvironment()) {
  const host = getServiceHost(service, environment);
  return env(`GLOBUS_SDK_SERVICE_URL_${service}`, host ? `https://${host}` : undefined);
}
