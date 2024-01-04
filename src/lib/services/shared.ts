import _fetch from 'cross-fetch';
import { build } from '../core/url.js';
import { getSDKOptions, Service } from '../core/global.js';
import { getTokenForScope } from '../core/consent.js';

import type { ServiceMethodOptions, SDKOptions } from './types.js';
import type { GCSConfiguration } from '../services/globus-connect-server/index.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum HTTP_METHODS {
  POST = 'POST',
  GET = 'GET',
  DELETE = 'DELETE',
  PUT = 'PUT',
  PATCH = 'PATCH',
}

/**
 * Our domain-specific language for describing service requests.
 * @private
 */
type ServiceRequestDSL = {
  /**
   * The service that the request will be made to.
   */
  service: Service | GCSConfiguration;
  /**
   * The scope that will be passed to `getTokenForScope` and injected as an `Authorization` header if none is provided by the caller.
   */
  scope: string | undefined;
  /**
   * The path of the resource (appended to the service's host).
   */
  path: string;
  /**
   * The HTTP method to use for the request.
   */
  method?: HTTP_METHODS;
};

/**
 * A helper function for making service requests that will handle the arguments
 * of `ServiceMethod` and `ServiceMethodDynamicSegments` functions in a uniform
 * way.
 *
 * @example
 * ```ts
 * export const get = function (flow_id, options?, sdkOptions?) {
 *  return serviceRequest({
 *   service: FLOWS.ID,
 *   scope: SCOPES.VIEW_FLOWS,
 *   path: `/flows/${flow_id}`,
 *  }, options, sdkOptions);
 * } satisfies ServiceMethodDynamicSegments<string, Record<string, any>>;
 * ```
 *
 * @private
 * @param config The ServiceRequestDSL for the request.
 * @param options The options passed to the service method.
 * @param passedSdkOptions The SDK options passed to the service method.
 * @returns
 */
export function serviceRequest(
  config: ServiceRequestDSL,
  options?: ServiceMethodOptions,
  passedSdkOptions?: SDKOptions,
) {
  /**
   * Get the SDK options, merging any passed options with the global options.
   */
  const sdkOptions = getSDKOptions(passedSdkOptions);
  const injectedFetchOptions = sdkOptions?.fetch?.options || {};

  const headers = {
    ...options?.headers,
    /**
     * Key/value pairs found in the `fetch` options override those found in the
     * service method options.
     */
    ...injectedFetchOptions.headers,
  };

  /**
   * If a `scope` was provided, and there is no `Authorization` header
   * provider, we'll try to get a token for the scope and use it.
   */
  if (config.scope && !headers?.['Authorization']) {
    const token = getTokenForScope(config.scope);
    if (token) {
      headers['Authorization'] = token;
    }
  }

  /**
   * If a raw body was provided, use that. Otherwise, if a payload was provided, serialize it.
   */
  let body = options?.body;
  if (!body && options?.payload) {
    body = JSON.stringify(options.payload);
  }

  /**
   * If `Content-Type` header was not provided, and there is a body, we assume it is JSON.
   */
  if (!headers?.['Content-Type'] && body) {
    headers['Content-Type'] = 'application/json';
  }

  const url = build(
    config.service,
    config.path,
    {
      search: options?.query,
    },
    sdkOptions,
  );

  const init = {
    method: config.method,
    body,
    ...injectedFetchOptions,
    /**
     * Merge the headers from the options and SDK options.
     */
    headers,
  };

  /* eslint-disable no-underscore-dangle */
  if (injectedFetchOptions?.__callable) {
    delete init.__callable;
    return injectedFetchOptions.__callable(url, init);
  }
  /* eslint-enable no-underscore-dangle */

  return _fetch(url, init);
}
