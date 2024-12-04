import type { operations } from '@globus/types/gcs-manager/api';
import { HTTP_METHODS, serviceRequest } from '../../../services/shared.js';

import type { GCSServiceMethod, GCSServiceMethodDynamicSegments } from '../index';

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
    operations['listUserCredentials']['responses']['200']['content']['application/json']
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
  query?: operations['listUserCredentials']['parameters']['query'];
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
  JSONFetchResponse<operations['getCollection']['responses']['200']['content']['application/json']>
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
  operations['getUserCredential']['parameters']['path']['user_credential_id'],
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
    operations['deleteUserCredential']['responses']['200']['content']['application/json']
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
  operations['deleteUserCredential']['parameters']['path']['user_credential_id'],
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
    operations['postUserCredential']['responses']['201']['content']['application/json']
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
  payload: operations['postUserCredential']['requestBody']['content']['application/json'];
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
    operations['putUserCredential']['responses']['200']['content']['application/json']
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
  operations['putUserCredential']['parameters']['path']['user_credential_id'],
  {
    payload: operations['putUserCredential']['requestBody']['content']['application/json'];
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
    operations['patchUserCredential']['responses']['200']['content']['application/json']
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
  operations['patchUserCredential']['parameters']['path']['user_credential_id'],
  {
    payload: Partial<
      operations['patchUserCredential']['requestBody']['content']['application/json']
    >;
  }
>;
