import { getServiceBaseUrl, getEnvironment, Environment, Service } from './global.js';
import type { GCSConfiguration } from '../services/globus-connect-server/index.js';
import { SDKOptions } from '../services/types.js';

/**
 * An extremely simplified parameter serializer based on our current needs.
 *
 * **This is intended for internal @globus/sdk use only.**
 *
 * @private
 */
export function stringifyParameters(parameters: {
  [key: string]:
    | string
    | number
    | boolean
    | Array<string | number | null | undefined>
    | null
    | undefined;
}) {
  const search = new URLSearchParams();

  Array.from(Object.entries(parameters)).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      /**
       * Arrays are converted to comma-separated strings.
       */
      search.set(key, value.join(','));
    } else if (value !== undefined) {
      search.set(key, String(value));
    }
  });

  return search.toString();
}

/**
 * Return the base URL for a service (based on the environment).
 * @param service The service to build the URL for.
 * @param path The path to the resource.
 * @param environment The environment to use.
 */
export function getServiceURL(
  service: Service,
  path = '',
  environment: Environment = getEnvironment(),
): URL {
  const base = getServiceBaseUrl(service, environment);
  return new URL(path, base);
}

/**
 * Build a URL for a service or GCSConfiguration.
 *
 * @param service The service identifier or GCSConfiguration object to build the URL for.
 * @param path The path to the resource.
 * @param options Additional options for the URL.
 */
export function build(
  serviceOrConfiguration: Service | GCSConfiguration,
  path: string,
  options?: {
    search?: Parameters<typeof stringifyParameters>[0];
  },
  sdkOptions?: SDKOptions,
) {
  let url;
  if (typeof serviceOrConfiguration === 'object') {
    url = new URL(path, serviceOrConfiguration.host);
  } else {
    url = getServiceURL(serviceOrConfiguration, path, sdkOptions?.environment);
  }
  if (options && options.search) {
    url.search = stringifyParameters(options.search);
  }
  return url.toString();
}
