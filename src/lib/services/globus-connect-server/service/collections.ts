import { getRequiredScopes } from "../index.js";
import { HTTP_METHODS, serviceRequest } from "../../shared.js";

import type {
  GCSServiceMethod,
  GCSServiceMethodDynamicSegments,
} from "../index";

import type { JSONFetchResponse } from "../../types";
import type { operations } from "@globus/types/gcs-manager/api";

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Collections/#listCollections
 */
export const getAll = function (
  configuration,
  options?,
  sdkOptions?
): Promise<
  JSONFetchResponse<
    operations["listCollections"]["responses"]["200"]["content"]["application/json"]
  >
> {
  return serviceRequest(
    {
      service: configuration,
      scope: getRequiredScopes(configuration),
      path: `/api/collections`,
    },
    options,
    sdkOptions
  );
} satisfies GCSServiceMethod<{
  query?: operations["listCollections"]["parameters"]["query"];
}>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Collections/#getCollection
 */
export const get = function (
  configuration,
  collection_id,
  options?,
  sdkOptions?
): Promise<
  JSONFetchResponse<
    operations["getCollection"]["responses"]["200"]["content"]["application/json"]
  >
> {
  return serviceRequest(
    {
      service: configuration,
      scope: getRequiredScopes(configuration),
      path: `/api/collections/${collection_id}`,
    },
    options,
    sdkOptions
  );
} satisfies GCSServiceMethodDynamicSegments<
  operations["getCollection"]["parameters"]["path"]["collection_id"],
  {
    query?: operations["getCollection"]["parameters"]["query"];
  }
>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Collections/#deleteCollection
 */
export const remove = function (
  configuration,
  collection_id,
  options?,
  sdkOptions?
): Promise<
  JSONFetchResponse<
    operations["deleteCollection"]["responses"]["200"]["content"]["application/json"]
  >
> {
  return serviceRequest(
    {
      service: configuration,
      scope: getRequiredScopes(configuration),
      path: `/api/collections/${collection_id}`,
      method: HTTP_METHODS.DELETE,
    },
    options,
    sdkOptions
  );
} satisfies GCSServiceMethodDynamicSegments<
  operations["deleteCollection"]["parameters"]["path"]["collection_id"],
  {
    query?: never;
    payload?: never;
  }
>;
