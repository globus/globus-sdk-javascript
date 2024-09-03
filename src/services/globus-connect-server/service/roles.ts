import type { operations } from '@globus/types/gcs-manager/api';
import { getRequiredScopes } from '../index.js';

import { HTTP_METHODS, serviceRequest } from '../../../services/shared.js';

import type { GCSServiceMethod, GCSServiceMethodDynamicSegments } from '../index';

import type { JSONFetchResponse } from '../../types';

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Roles/#listRoles
 */
export const getAll = function (
  configuration,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<operations['listRoles']['responses']['200']['content']['application/json']>
> {
  return serviceRequest(
    {
      service: configuration,
      scope: getRequiredScopes(configuration),
      path: `/api/roles`,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethod<{
  query?: operations['listRoles']['parameters']['query'];
}>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Roles/#getRole
 */
export const get = function (
  configuration,
  role_id,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<operations['getRole']['responses']['200']['content']['application/json']>
> {
  return serviceRequest(
    {
      service: configuration,
      scope: getRequiredScopes(configuration),
      path: `/api/roles/${role_id}`,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  operations['getRole']['parameters']['path']['role_id'],
  {
    query?: never;
    payload?: never;
  }
>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Roles/#deleteRole
 */
export const remove = function (
  configuration,
  role_id,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<operations['deleteRole']['responses']['200']['content']['application/json']>
> {
  return serviceRequest(
    {
      service: configuration,
      scope: getRequiredScopes(configuration),
      path: `/api/roles/${role_id}`,
      method: HTTP_METHODS.DELETE,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  operations['deleteRole']['parameters']['path']['role_id'],
  {
    query?: never;
    payload?: never;
  }
>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Roles/#postRoles
 */
export const create = function (
  configuration,
  options,
  sdkOptions?,
): Promise<
  JSONFetchResponse<operations['postRoles']['responses']['200']['content']['application/json']>
> {
  return serviceRequest(
    {
      service: configuration,
      scope: getRequiredScopes(configuration),
      path: `/api/roles`,
      method: HTTP_METHODS.POST,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethod<{
  payload: operations['postRoles']['requestBody']['content']['application/json'];
}>;
