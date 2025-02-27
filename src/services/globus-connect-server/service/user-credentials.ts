import { HTTP_METHODS, serviceRequest } from '../../../services/shared.js';

import type { OpenAPI, GCSServiceMethod, GCSServiceMethodDynamicSegments } from '../index';

import type { JSONFetchResponse } from '../../types';
/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_User_Credentials/#listUserCredentials
 */
export const getAll = function (
  configuration,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['listUserCredentials']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/user_credentials`,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethod<{
  query?: OpenAPI.operations['listUserCredentials']['parameters']['query'];
}>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_User_Credentials/#getUserCredential
 */
export const get = function (
  configuration,
  user_credential_id,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['getCollection']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/user_credentials/${user_credential_id}`,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  OpenAPI.operations['getUserCredential']['parameters']['path']['user_credential_id'],
  {
    query?: never;
    payload?: never;
  }
>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_User_Credentials/#deleteUserCredential
 */
export const remove = function (
  configuration,
  user_credential_id,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['deleteUserCredential']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/user_credentials/${user_credential_id}`,
      method: HTTP_METHODS.DELETE,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  OpenAPI.operations['deleteUserCredential']['parameters']['path']['user_credential_id'],
  {
    query?: never;
    payload?: never;
  }
>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_User_Credentials/#postUserCredential
 */
export const create = function (
  configuration,
  options,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['postUserCredential']['responses']['201']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/user_credentials`,
      method: HTTP_METHODS.POST,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethod<{
  payload: OpenAPI.operations['postUserCredential']['requestBody']['content']['application/json'];
}>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_User_Credentials/#putUserCredential
 */
export const update = function (
  configuration,
  user_credential_id,
  options,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['putUserCredential']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/user_credentials/${user_credential_id}`,
      method: HTTP_METHODS.PUT,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  OpenAPI.operations['putUserCredential']['parameters']['path']['user_credential_id'],
  {
    payload: OpenAPI.operations['putUserCredential']['requestBody']['content']['application/json'];
  }
>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_User_Credentials/#patchUserCredential
 */
export const patch = function (
  configuration,
  user_credential_id,
  options,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['patchUserCredential']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/user_credentials/${user_credential_id}`,
      method: HTTP_METHODS.PATCH,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  OpenAPI.operations['patchUserCredential']['parameters']['path']['user_credential_id'],
  {
    payload: Partial<
      OpenAPI.operations['patchUserCredential']['requestBody']['content']['application/json']
    >;
  }
>;
