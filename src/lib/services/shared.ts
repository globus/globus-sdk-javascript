import { fetchWithScope } from '../core/fetch.js';
import { build } from '../core/url.js';
import { getSDKOptions, Service } from '../core/global.js';

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
   * The scope that will be passed to `fetchWithScope`.
   */
  scope: string;
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
  return fetchWithScope(
    config.scope,
    build(
      config.service,
      config.path,
      {
        search: options?.query,
      },
      sdkOptions,
    ),
    {
      method: config.method,
      body: options?.payload ? JSON.stringify(options.payload) : undefined,
      ...sdkOptions?.fetch?.options,
      /**
       * Merge the headers from the options and SDK options.
       */
      headers: {
        ...options?.headers,
        /**
         * Key/value pairs found in the `fetch` options override those found in the
         * service method options.
         */
        ...sdkOptions?.fetch?.options?.headers,
      },
    },
  );
}
