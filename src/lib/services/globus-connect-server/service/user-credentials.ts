import { getRequiredScopes } from "../index.js";
import { serviceRequest } from "../../../services/shared.js";

import type {
  GCSServiceMethod,
  GCSServiceMethodDynamicSegments,
} from "../index";

import type { JSONFetchResponse } from "../../types";
import type { operations } from "@globus/types/gcs-manager/api";

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_User_Credentials/#listUserCredentials
 */
export const getAll = function (
  configuration,
  options?,
  sdkOptions?
): Promise<
  JSONFetchResponse<
    operations["listUserCredentials"]["responses"]["200"]["content"]["application/json"]
  >
> {
  return serviceRequest(
    {
      service: configuration,
      scope: getRequiredScopes(configuration),
      path: `/api/user_credentials`,
    },
    options,
    sdkOptions
  );
} satisfies GCSServiceMethod<{
  query?: operations["listUserCredentials"]["parameters"]["query"];
}>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_User_Credentials/#getUserCredential
 */
export const get = function (
  configuration,
  user_credential_id,
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
      path: `/api/user_credentials/${user_credential_id}`,
    },
    options,
    sdkOptions
  );
} satisfies GCSServiceMethodDynamicSegments<
  operations["getUserCredential"]["parameters"]["path"]["user_credential_id"],
  {
    query?: never;
    payload?: never;
  }
>;
