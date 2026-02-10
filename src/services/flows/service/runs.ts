import { ID, SCOPES } from '../config.js';
import {
  HTTP_METHODS,
  serviceRequest,
  wrapServiceMethod,
  wrapServiceMethodWithSegments,
} from '../../shared.js';

import type {
  ServiceMethod,
  ServiceMethodDynamicSegments,
  JSONFetchResponse,
} from '../../../services/types.js';

import type { OpenAPI } from '../index.js';

/**
 * @see https://globusonline.github.io/globus-flows/#tag/Runs/paths/~1runs/get
 */
export const getAll = wrapServiceMethod(
  'flows.runs.getAll',
  function (
    options?: {
      query?: OpenAPI.paths['/runs']['get']['parameters']['query'];
      payload?: never;
    },
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
  },
) satisfies ServiceMethod<{
  query?: OpenAPI.paths['/runs']['get']['parameters']['query'];
  payload?: never;
}>;

/**
 * Get details about a run
 * @see https://globusonline.github.io/globus-flows/#tag/Runs/paths/~1runs~1{run_id}/get
 */
export const get = wrapServiceMethodWithSegments(
  'flows.runs.get',
  function (
    run_id: string,
    options?: {
      query?: OpenAPI.paths['/runs/{run_id}']['get']['parameters']['query'];
      payload?: never;
    },
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
  },
) satisfies ServiceMethodDynamicSegments<
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
export const cancel = wrapServiceMethodWithSegments(
  'flows.runs.cancel',
  function (
    run_id: string,
    options?: {
      query?: never;
      payload?: never;
    },
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
  },
) satisfies ServiceMethodDynamicSegments<
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
export const getLog = wrapServiceMethodWithSegments(
  'flows.runs.getLog',
  function (
    run_id: string,
    options?: {
      query?: OpenAPI.paths['/runs/{run_id}/log']['get']['parameters']['query'];
    },
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
  },
) satisfies ServiceMethodDynamicSegments<
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
export const update = wrapServiceMethodWithSegments(
  'flows.runs.update',
  function (
    run_id: string,
    options?: {
      query?: never;
      payload?: OpenAPI.paths['/runs/{run_id}']['put']['requestBody']['content']['application/json'];
    },
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
  },
) satisfies ServiceMethodDynamicSegments<
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
export const remove = wrapServiceMethodWithSegments(
  'flows.runs.remove',
  function (
    run_id: string,
    options?: {
      query?: never;
      payload?: never;
    },
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
  },
) satisfies ServiceMethodDynamicSegments<
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
export const getDefinition = wrapServiceMethodWithSegments(
  'flows.runs.getDefinition',
  function (
    run_id: string,
    options?: {
      query?: never;
      payload?: never;
    },
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
  },
) satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: never;
    payload?: never;
  }
>;
