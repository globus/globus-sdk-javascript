import { getRequiredScopes } from "../index";
import { HTTP_METHODS, serviceRequest } from "../../shared";

import type { GCSServiceMethod } from "../index";
import type { JSONFetchResponse } from "../../types";

import type { operations } from "@globus/types/gcs-manager/api";

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Endpoint/#getEndpoint
 */
export const get = function (
  configuration,
  options?,
  sdkOptions?
): Promise<
  JSONFetchResponse<
    operations["getEndpoint"]["responses"]["200"]["content"]["application/json"]
  >
> {
  return serviceRequest(
    {
      service: configuration,
      scope: getRequiredScopes(configuration),
      path: `/api/endpoint`,
    },
    options,
    sdkOptions
  );
} satisfies GCSServiceMethod<{
  query?: never;
  payload?: never;
}>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Endpoint/#putEndpoint
 */
export const update = function (
  configuration,
  options?,
  sdkOptions?
): Promise<
  JSONFetchResponse<
    operations["putEndpoint"]["responses"]["200"]["content"]["application/json"]
  >
> {
  return serviceRequest(
    {
      service: configuration,
      scope: getRequiredScopes(configuration),
      path: `/api/endpoint`,
      method: HTTP_METHODS.PUT,
    },
    options,
    sdkOptions
  );
} satisfies GCSServiceMethod<{
  payload: operations["putEndpoint"]["requestBody"]["content"]["application/json"];
}>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Endpoint/#patchEndpoint
 */
export const patch = function (
  configuration,
  options?,
  sdkOptions?
): Promise<
  JSONFetchResponse<
    operations["patchEndpoint"]["responses"]["200"]["content"]["application/json"]
  >
> {
  return serviceRequest(
    {
      service: configuration,
      scope: getRequiredScopes(configuration),
      path: `/api/endpoint`,
      method: HTTP_METHODS.PATCH,
    },
    options,
    sdkOptions
  );
} satisfies GCSServiceMethod<{
  /**
   * @todo The generated PATCH type is resolving to the Endpoint document, which
   * has some properties that are required (i.e. `display_name`). For now, we're
   * just allowing unknown properties to be passed in, but we should fix this
   * when the auotgenerated types are corrected.
   */
  payload:
    | operations["patchEndpoint"]["requestBody"]["content"]["application/json"]
    | Record<string, unknown>;
}>;
