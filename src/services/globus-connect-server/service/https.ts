import { HTTP_METHODS, serviceRequest } from '../../shared.js';

import type { GCSServiceMethodDynamicSegments } from '../index.js';

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/https-access-collections/
 */
export const get = function (configuration, path, options?, sdkOptions?): Promise<Response> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  string,
  {
    query?: {
      /**
       * @see https://docs.globus.org/globus-connect-server/v5.4/https-access-collections/#request_a_browser_download
       */
      download?: boolean;
    };
  }
>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/https-access-collections/
 */
export const remove = function (configuration, path, options?, sdkOptions?): Promise<Response> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path,
      method: HTTP_METHODS.DELETE,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  string,
  {
    query?: never;
    payload?: never;
  }
>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/https-access-collections/
 */
export const update = function (configuration, path, options, sdkOptions?): Promise<Response> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path,
      method: HTTP_METHODS.PUT,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  string,
  {
    query?: never;
    payload?: never;
  }
>;
