import _fetch from 'cross-fetch';
import { build } from '../core/url.js';
import { getSDKOptions, Service } from '../core/global.js';

import type { ServiceMethodOptions, SDKOptions } from './types.js';
import type { GCSConfiguration } from '../services/globus-connect-server/index.js';
import { RESOURCE_SERVERS } from './auth/config.js';

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
   * A specific scope that is required for the request. If a scope is provided,
   * the `serviceRequest` function will attempt to get a token for the request
   * based on the the `service` => `resource_server` mapping.
   */
  scope?: string;
  /**
   * The resource server that the request will be made to. This can be provided
   * instead of (or addition to) the `scope` property. If this is provided, the
   * `serviceRequest` function will attempt to get a token for the resource server
   * when a `manager` instance is provided in the SDK options.
   */
  resource_server?: string;
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
  this: unknown,
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
   * If a `resource_server` was provided, and the SDK is configured with a `manager`
   * instance, we'll try to get a token for the resource server and use it.
   */
  if (config.resource_server && sdkOptions?.manager) {
    const token = sdkOptions.manager.tokens.getByResourceServer(config.resource_server);
    if (token) {
      headers['Authorization'] = `Bearer ${token.access_token}`;
    }
  }
  /**
   * If the `scope` property is provided, and the SDK is configured with a `manager`,
   * we'll try to map the service to a resource server. This is mostly to support
   * backwards compatibility of the `scope` property being used in the `ServiceRequestDSL`.
   */
  if (config.scope && sdkOptions?.manager) {
    const resourceServer =
      typeof config.service === 'string'
        ? RESOURCE_SERVERS[config.service]
        : // For `GCSConfiguration` objects, the `endpoint_id` is the resource server.
          config.service.endpoint_id;

    const token = sdkOptions.manager.tokens.getByResourceServer(resourceServer);
    if (token) {
      headers['Authorization'] = `Bearer ${token.access_token}`;
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
    /**
     * Remove the `__callable` property from the `fetch` options before passing the options along.
     */
    delete init.__callable;
    return injectedFetchOptions.__callable.call(this, url, init);
  }
  /* eslint-enable no-underscore-dangle */

  return _fetch(url, init);
}
