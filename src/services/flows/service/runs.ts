import { ID, SCOPES } from '../config.js';
import { RESOURCE_SERVERS } from '../../auth/config.js';
import { HTTP_METHODS, serviceRequest } from '../../shared.js';
import { createServiceMethodFactory } from '../../factory.js';

import type {
  ServiceMethod,
  ServiceMethodDynamicSegments,
  JSONFetchResponse,
} from '../../../services/types.js';

import type { OpenAPI } from '../index.js';

/**
 * @see https://globusonline.github.io/globus-flows/#tag/Runs/paths/~1runs/get
 */
export const getAll = function (
  options = {},
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.paths['/runs']['get']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.RUN_MANAGE,
      path: `/runs`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  query?: OpenAPI.paths['/runs']['get']['parameters']['query'];
  payload?: never;
}>;

/**
 * Get details about a run
 * @see https://globusonline.github.io/globus-flows/#tag/Runs/paths/~1runs~1{run_id}/get
 */
export const get = function (
  run_id,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.paths['/runs/{run_id}']['get']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.RUN_MANAGE,
      path: `/runs/${run_id}`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: OpenAPI.paths['/runs/{run_id}']['get']['parameters']['query'];
    payload?: never;
  }
>;

/**
 * Cancel the execution for a particular Run of a Flow.
 * https://globusonline.github.io/globus-flows/#tag/Runs/paths/~1runs~1%7Brun_id%7D~1cancel/post
 */
export const cancel = function (
  run_id,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.paths['/runs/{run_id}/cancel']['post']['responses']['202']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.RUN_MANAGE,
      path: `/runs/${run_id}/cancel`,
      method: HTTP_METHODS.POST,
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
 * Retrieve detailed execution information for a particular Flow Run.
 * @see https://globusonline.github.io/globus-flows/#tag/Runs/paths/~1runs~1%7Baction_id%7D~1log/get
 */
export const getLog = function (
  run_id,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.paths['/runs/{run_id}/log']['get']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.RUN_MANAGE,
      path: `/runs/${run_id}/log`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: OpenAPI.paths['/runs/{run_id}/log']['get']['parameters']['query'];
  }
>;

/**
 * Update a Run's metadata.
 *
 * @see https://globusonline.github.io/globus-flows/#tag/Runs/paths/~1runs~1{run_id}/put
 */
export const update = function (
  run_id,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.paths['/runs/{run_id}']['put']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.RUN_MANAGE,
      path: `/runs/${run_id}`,
      method: HTTP_METHODS.PUT,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: never;
    payload?: OpenAPI.paths['/runs/{run_id}']['put']['requestBody']['content']['application/json'];
  }
>;

/**
 * Remove a Run.
 *
 * @see https://globusonline.github.io/globus-flows/#tag/Runs/paths/~1runs~1{run_id}~1release/post
 */
export const remove = function (
  run_id,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.paths['/runs/{run_id}/release']['post']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.RUN_MANAGE,
      path: `/runs/${run_id}/release`,
      method: HTTP_METHODS.POST,
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
 * Get the Flow definition and input schema that were used to start a Run
 *
 * @see https://globusonline.github.io/globus-flows/#tag/Runs/paths/~1runs~1{run_id}~1definition/get
 */
export const getDefinition = function (
  run_id,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.paths['/runs/{run_id}/definition']['get']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.RUN_MANAGE,
      path: `/runs/${run_id}/definition`,
      method: HTTP_METHODS.GET,
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
 * @private
 */
export const next = {
  getAll: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS.FLOWS,
    path: `/runs`,
  }).generate<
    {
      request?: {
        query?: OpenAPI.paths['/runs']['get']['parameters']['query'];
      };
    },
    JSONFetchResponse<
      OpenAPI.paths['/runs']['get']['responses']['200']['content']['application/json']
    >
  >(),
  get: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS.FLOWS,
    path: `/runs/{run_id}`,
  }).generate<
    {
      request?: {
        query?: OpenAPI.paths['/runs/{run_id}']['get']['parameters']['query'];
      };
    },
    JSONFetchResponse<
      OpenAPI.paths['/runs/{run_id}']['get']['responses']['200']['content']['application/json']
    >
  >(),
  cancel: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS.FLOWS,
    path: `/runs/{run_id}/cancel`,
    method: HTTP_METHODS.POST,
  }).generate<
    {
      request?: {
        query?: never;
        data?: never;
      };
    },
    JSONFetchResponse<
      OpenAPI.paths['/runs/{run_id}/cancel']['post']['responses']['202']['content']['application/json']
    >
  >(),
  getLog: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS.FLOWS,
    path: `/runs/{run_id}/log`,
  }).generate<
    {
      request?: {
        query?: OpenAPI.paths['/runs/{run_id}/log']['get']['parameters']['query'];
      };
    },
    JSONFetchResponse<
      OpenAPI.paths['/runs/{run_id}/log']['get']['responses']['200']['content']['application/json']
    >
  >(),
  update: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS.FLOWS,
    path: `/runs/{run_id}`,
    method: HTTP_METHODS.PUT,
  }).generate<
    {
      request: {
        data: OpenAPI.paths['/runs/{run_id}']['put']['requestBody']['content']['application/json'];
      };
    },
    JSONFetchResponse<
      OpenAPI.paths['/runs/{run_id}']['put']['responses']['200']['content']['application/json']
    >
  >(),
  remove: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS.FLOWS,
    path: `/runs/{run_id}/release`,
    method: HTTP_METHODS.POST,
  }).generate<
    {
      request?: {
        query?: never;
        data?: never;
      };
    },
    JSONFetchResponse<
      OpenAPI.paths['/runs/{run_id}/release']['post']['responses']['200']['content']['application/json']
    >
  >(),
  getDefinition: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS.FLOWS,
    path: `/runs/{run_id}/definition`,
  }).generate<
    {
      request?: {
        query?: never;
        data?: never;
      };
    },
    JSONFetchResponse<
      OpenAPI.paths['/runs/{run_id}/definition']['get']['responses']['200']['content']['application/json']
    >
  >(),
};
