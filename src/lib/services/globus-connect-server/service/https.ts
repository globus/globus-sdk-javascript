import { getRequiredScopes } from '../index.js';
import { HTTP_METHODS, serviceRequest } from '../../shared.js';

import type { GCSServiceMethodDynamicSegments } from '../index';

import type { JSONFetchResponse } from '../../types.js';

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/https-access-collections/
 */
export const get = function (
  configuration,
  path,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<unknown>> {
  return serviceRequest(
    {
      service: configuration,
      scope: getRequiredScopes(configuration),
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
export const remove = function (
  configuration,
  path,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<unknown>> {
  return serviceRequest(
    {
      service: configuration,
      scope: getRequiredScopes(configuration),
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
export const update = function (
  configuration,
  path,
  options,
  sdkOptions?,
): Promise<JSONFetchResponse<unknown>> {
  return serviceRequest(
    {
      service: configuration,
      scope: getRequiredScopes(configuration),
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
