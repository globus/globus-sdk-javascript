/**
 * Utilities and methods related to the Globus Web App.
 * @see https://app.globus.org/
 */

import { getEnvironment, type Environment } from '../core/global';
import type { SDKOptions } from '../services/types';

/**
 * The hostnames for the Globus Web App in each environment.
 */
export const HOSTS: Record<Environment, string> = {
  integration: 'app.integration.globuscs.info',
  sandbox: 'app.sandbox.globuscs.info',
  test: 'app.test.globuscs.info',
  staging: 'app.staging.globuscs.info',
  preview: 'app.preview.globus.org',
  production: 'app.globus.org',
};

/**
 * Return the hostname for the Globus Web App in the given environment.
 */
export function host(env: Environment = getEnvironment()) {
  return HOSTS[env];
}

/**
 * Return a URL for the Globus Web App.
 */
export function url(path?: string, sdkOptions?: SDKOptions) {
  return new URL(path || '', `https://${host(sdkOptions?.environment)}`);
}

type WebAppURLIdentifier = 'TASK' | 'FILE_MANAGER' | 'COLLECTION' | 'ENDPOINT';

const WEBAPP_URLS: Record<WebAppURLIdentifier, string> = {
  TASK: '/activity/%s/overview',
  FILE_MANAGER: '/file-manager',
  COLLECTION: '/file-manager/collections/%s/overview',
  ENDPOINT: '/file-manager/collections/%s/overview',
};

/**
 * Obtain a URL for a specific page in the Globus Web App.
 * @example
 * ```typescript
 * const url = urlFor('TASK', ['example-uuid']);
 * ```
 */
export function urlFor(
  identifier: WebAppURLIdentifier,
  segments?: string[],
  sdkOptions?: SDKOptions,
) {
  const path = WEBAPP_URLS[identifier].replace(/%s/g, segments?.join('/') || '');
  return url(path, sdkOptions);
}
