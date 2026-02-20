import _fetch from 'cross-fetch';
import { getClientInfoRequestHeaders } from '../core/info/index.js';
import { build } from '../core/url.js';
import { getSDKOptions, Service } from '../core/global.js';
import { isAuthorizationRequirementsError } from '../core/errors.js';
import { RESOURCE_SERVERS } from './auth/config.js';
import { isRefreshToken } from './auth/tokens.js';
import type { ServiceMethodOptions, SDKOptions } from './types.js';
import type {
  GCSConfiguration,
  UnauthenticatedGCSConfiguration,
} from '../services/globus-connect-server/index.js';

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
export type ServiceRequestDSL = {
  /**
   * The service that the request will be made to.
   */
  service?: Service | GCSConfiguration | UnauthenticatedGCSConfiguration;
  /**
   * A specific scope that is required for the request. If a scope is provided,
   * the `serviceRequest` function will attempt to get a token for the request
   * based on the the `service` => `resource_server` mapping.
   * @deprecated Define using `resource_server` instead.
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
  /**
   * For some resources, it doesn't make sense for requests to be retried.
   * Setting this to `true` will prevent any retry logic from being applied.
   */
  preventRetry?: boolean;
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
export async function serviceRequest(
  this: unknown,
  config: ServiceRequestDSL,
  options?: ServiceMethodOptions,
  passedSdkOptions?: SDKOptions,
): Promise<Response> {
  /**
   * Get the SDK options, merging any passed options with the global options.
   */
  const sdkOptions = getSDKOptions(passedSdkOptions);
  const injectedFetchOptions = sdkOptions?.fetch?.options || {};

  const headers: Record<string, string> = {
    ...getClientInfoRequestHeaders(),
    ...options?.headers,
    /**
     * Key/value pairs found in the `fetch` options override those found in the
     * service method options.
     */
    ...injectedFetchOptions.headers,
  };

  /**
   * The `AuthorizationManager` instance provided with the call.
   */
  const manager = options?.manager || sdkOptions?.manager;

  let token;
  /**
   * If a `resource_server` was provided, and the SDK is configured with a `manager`
   * instance, we'll try to get a token for the resource server and use it.
   */
  if (config.resource_server && manager) {
    token = manager.tokens.getByResourceServer(config.resource_server);
    if (token) {
      headers['Authorization'] = `Bearer ${token.access_token}`;
    }
  }
  /**
   * If the `scope` property is provided, and the SDK is configured with a `manager`,
   * we'll try to map the service to a resource server. This is mostly to support
   * backwards compatibility of the `scope` property being used in the `ServiceRequestDSL`.
   *
   * @todo This condition will likely be removed in a future version in favor of using `resource_server` to
   * configure a service request.
   */
  if (
    config.scope &&
    manager &&
    config.service &&
    /**
     * Only attempt to get a token if the `service` property is a string or has an `endpoint_id` property (GCSConfiguration).
     */
    (typeof config.service === 'string' || 'endpoint_id' in config.service)
  ) {
    const resourceServer =
      typeof config.service === 'string'
        ? RESOURCE_SERVERS[config.service]
        : // For `GCSConfiguration` objects, the `endpoint_id` is the resource server.
          config.service.endpoint_id;

    token = manager.tokens.getByResourceServer(resourceServer);
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

  const url = config.service
    ? build(
        config.service,
        config.path,
        {
          search: options?.query,
        },
        sdkOptions,
      )
    : config.path;

  const init = {
    method: config.method,
    body,
    ...injectedFetchOptions,
    /**
     * Merge the headers from the options and SDK options.
     */
    headers,
  };

  /**
   * The request handler for the fetch call. This can be overridden by providing a
   * `__callable` property in the `fetch` options.
   */
  let handler = _fetch;
  /* eslint-disable no-underscore-dangle */
  if (injectedFetchOptions?.__callable) {
    handler = injectedFetchOptions.__callable.bind(this);
    /**
     * Remove the `__callable` property from the `fetch` options before passing the options along.
     */
    delete init.__callable;
  }
  /* eslint-enable no-underscore-dangle */

  /**
   * If the resource is configured to prevent retries, there is no `manager` instance,
   * or token, the request will be made as-is.
   */
  if (config.preventRetry || !manager || !token || !isRefreshToken(token)) {
    return handler(url, init);
  }

  /**
   * Automatic Retry Handling
   */

  const initialResponse = await handler(url, init);
  /**
   * If the response is "ok", we can return it as-is.
   */
  if (initialResponse.ok) {
    return initialResponse;
  }
  /**
   * Do a safe check to see if the response contains any authorization requirements.
   */
  let hasAuthorizationRequirements;
  try {
    hasAuthorizationRequirements = isAuthorizationRequirementsError(
      /**
       * It is important to clone the response before calling `json` avoid
       * `body used already for [...]` errors when the initial response is
       * returned.
       */
      await initialResponse.clone().json(),
    );
  } catch (_e) {
    hasAuthorizationRequirements = false;
  }
  /**
   * We only attempt to refresh the original token supplied with teh request, if the
   * response status is 401 and the response does not contain any authorization requirements.
   */
  const shouldAttemptTokenRefresh = initialResponse.status === 401 && !hasAuthorizationRequirements;
  if (shouldAttemptTokenRefresh) {
    const newToken = await manager.refreshToken(token);
    if (!newToken) {
      return initialResponse;
    }
    /**
     * Retry the request with the new token.
     */
    return handler(url, {
      ...init,
      headers: {
        ...init.headers,
        Authorization: `Bearer ${newToken.access_token}`,
      },
    });
  }
  /**
   * No retry was attempted, return the initial response.
   */
  return initialResponse;
}
