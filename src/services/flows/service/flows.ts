import { ID, SCOPES } from '../config.js';
import { RESOURCE_SERVERS } from '../../auth/config.js';
import { HTTP_METHODS, serviceRequest } from '../../../services/shared.js';
import { createServiceMethodFactory } from '../../factory.js';

import type { OpenAPI } from '../index.js';

import type {
  JSONFetchResponse,
  ServiceMethod,
  ServiceMethodDynamicSegments,
} from '../../types.js';

/**
 * @see https://globusonline.github.io/globus-flows/#tag/Flows/paths/~1flows/get
 */
export const getAll = function (
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.paths['/flows']['get']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.VIEW_FLOWS,
      path: `/flows`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  query?: OpenAPI.paths['/flows']['get']['parameters']['query'];
}>;

/**
 * @see https://globusonline.github.io/globus-flows/#tag/Flows/paths/~1flows~1{flow_id}/get
 */
export const get = function (
  flow_id,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.paths['/flows/{flow_id}']['get']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.VIEW_FLOWS,
      path: `/flows/${flow_id}`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: OpenAPI.paths['/flows/{flow_id}']['get']['parameters']['query'];
  }
>;

/**
 * @see https://globusonline.github.io/globus-flows/#tag/Flows/paths/~1flows~1{flow_id}/delete
 */
export const remove = function (
  flow_id,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.paths['/flows/{flow_id}']['delete']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      scope: SCOPES.MANAGE_FLOWS,
      service: ID,
      path: `/flows/${flow_id}`,
      method: HTTP_METHODS.DELETE,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: never;
    payload?: never;
  }
>;

/**
 * Run an instance of a particular Flow.
 * @see https://globusonline.github.io/globus-flows/#tag/Runs/paths/~1flows~1%7Bflow_id%7D~1run/post
 */
export const run = function (
  flow_id,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.paths['/flows/{flow_id}/run']['post']['responses']['201']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.VIEW_FLOWS,
      path: `/flows/${flow_id}/run`,
      method: HTTP_METHODS.POST,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: never;
    payload: OpenAPI.paths['/flows/{flow_id}/run']['post']['requestBody']['content']['application/json'];
  }
>;

/**
 * An error that was generated during validation that includes the location of the error.
 */
export type ValidationLocationError = OpenAPI.components['schemas']['LocationErrorList'][number];

/**
 * Validate a flow definition and its schema.
 * @see https://globusonline.github.io/globus-flows/#tag/Flows/paths/~1flows~1validate/post
 */
export const validate = function (
  options,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    | OpenAPI.paths['/flows/validate']['post']['responses']['200']['content']['application/json']
    | OpenAPI.paths['/flows/validate']['post']['responses']['422']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.MANAGE_FLOWS,
      path: `/flows/validate`,
      method: HTTP_METHODS.POST,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  query?: never;
  payload: OpenAPI.paths['/flows/validate']['post']['requestBody']['content']['application/json'];
}>;

/**
 * Create a Flow
 * @see https://globusonline.github.io/globus-flows/#tag/Flows/paths/~1flows/post
 */
export const create = function (
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.paths['/flows']['post']['responses']['201']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.MANAGE_FLOWS,
      path: `/flows`,
      method: HTTP_METHODS.POST,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  query?: never;
  payload: OpenAPI.paths['/flows']['post']['requestBody']['content']['application/json'];
}>;

/**
 * An alias for `create` to match the API documentation.
 */
export const deploy = create;

/**
 * Update a Flow
 * @see https://globusonline.github.io/globus-flows/#tag/Flows/paths/~1flows~1{flow_id}/put
 */
export const update = function (
  flow_id,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.paths['/flows/{flow_id}']['put']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.MANAGE_FLOWS,
      path: `/flows/${flow_id}`,
      method: HTTP_METHODS.PUT,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: never;
    payload: OpenAPI.paths['/flows/{flow_id}']['put']['requestBody']['content']['application/json'];
  }
>;

/**
 * @private
 */
export const next = {
  getAll: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS.FLOWS,
    path: `/flows`,
  }).generate<
    {
      request?: {
        query?: OpenAPI.paths['/flows']['get']['parameters']['query'];
      };
    },
    JSONFetchResponse<
      OpenAPI.paths['/flows']['get']['responses']['200']['content']['application/json']
    >
  >(),
  get: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS.FLOWS,
    path: `/flows/{flow_id}`,
  }).generate<
    {
      request?: {
        query?: OpenAPI.paths['/flows/{flow_id}']['get']['parameters']['query'];
      };
    },
    JSONFetchResponse<
      OpenAPI.paths['/flows/{flow_id}']['get']['responses']['200']['content']['application/json']
    >
  >(),
  remove: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS.FLOWS,
    path: `/flows/{flow_id}`,
    method: HTTP_METHODS.DELETE,
  }).generate<
    {
      request?: {
        query?: never;
        data?: never;
      };
    },
    JSONFetchResponse<
      OpenAPI.paths['/flows/{flow_id}']['delete']['responses']['200']['content']['application/json']
    >
  >(),
  run: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS.FLOWS,
    path: `/flows/{flow_id}/run`,
    method: HTTP_METHODS.POST,
  }).generate<
    {
      request: {
        data: OpenAPI.paths['/flows/{flow_id}/run']['post']['requestBody']['content']['application/json'];
      };
    },
    JSONFetchResponse<
      OpenAPI.paths['/flows/{flow_id}/run']['post']['responses']['201']['content']['application/json']
    >
  >(),
  validate: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS.FLOWS,
    path: `/flows/validate`,
    method: HTTP_METHODS.POST,
  }).generate<
    {
      request: {
        data: OpenAPI.paths['/flows/validate']['post']['requestBody']['content']['application/json'];
      };
    },
    JSONFetchResponse<
      | OpenAPI.paths['/flows/validate']['post']['responses']['200']['content']['application/json']
      | OpenAPI.paths['/flows/validate']['post']['responses']['422']['content']['application/json']
    >
  >(),
  create: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS.FLOWS,
    path: `/flows`,
    method: HTTP_METHODS.POST,
  }).generate<
    {
      request: {
        data: OpenAPI.paths['/flows']['post']['requestBody']['content']['application/json'];
      };
    },
    JSONFetchResponse<
      OpenAPI.paths['/flows']['post']['responses']['201']['content']['application/json']
    >
  >(),
  update: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS.FLOWS,
    path: `/flows/{flow_id}`,
    method: HTTP_METHODS.PUT,
  }).generate<
    {
      request: {
        data: OpenAPI.paths['/flows/{flow_id}']['put']['requestBody']['content']['application/json'];
      };
    },
    JSONFetchResponse<
      OpenAPI.paths['/flows/{flow_id}']['put']['responses']['200']['content']['application/json']
    >
  >(),
};
