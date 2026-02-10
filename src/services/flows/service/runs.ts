import { ID, SCOPES } from '../config.js';
import {
  HTTP_METHODS,
  serviceRequest,
  normalizeServiceMethodArgs,
  normalizeServiceMethodArgsWithSegments,
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
export const getAll = function (
  arg1?: any,
  arg2?: any,
): Promise<
  JSONFetchResponse<
    OpenAPI.paths['/runs']['get']['responses']['200']['content']['application/json']
  >
> {
  const { request, options } = normalizeServiceMethodArgs('flows.runs.getAll', arg1, arg2);
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.RUN_MANAGE,
      path: `/runs`,
    },
    request,
    options,
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
  arg1: any,
  arg2?: any,
  arg3?: any,
): Promise<
  JSONFetchResponse<
    OpenAPI.paths['/runs/{run_id}']['get']['responses']['200']['content']['application/json']
  >
> {
  const { segments: run_id, request, options } = normalizeServiceMethodArgsWithSegments(
    'flows.runs.get',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.RUN_MANAGE,
      path: `/runs/${run_id}`,
    },
    request,
    options,
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
  arg1: any,
  arg2?: any,
  arg3?: any,
): Promise<
  JSONFetchResponse<
    OpenAPI.paths['/runs/{run_id}/cancel']['post']['responses']['202']['content']['application/json']
  >
> {
  const { segments: run_id, request, options } = normalizeServiceMethodArgsWithSegments(
    'flows.runs.cancel',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.RUN_MANAGE,
      path: `/runs/${run_id}/cancel`,
      method: HTTP_METHODS.POST,
    },
    request,
    options,
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
  arg1: any,
  arg2?: any,
  arg3?: any,
): Promise<
  JSONFetchResponse<
    OpenAPI.paths['/runs/{run_id}/log']['get']['responses']['200']['content']['application/json']
  >
> {
  const { segments: run_id, request, options } = normalizeServiceMethodArgsWithSegments(
    'flows.runs.getLog',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.RUN_MANAGE,
      path: `/runs/${run_id}/log`,
    },
    request,
    options,
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
  arg1: any,
  arg2?: any,
  arg3?: any,
): Promise<
  JSONFetchResponse<
    OpenAPI.paths['/runs/{run_id}']['put']['responses']['200']['content']['application/json']
  >
> {
  const { segments: run_id, request, options } = normalizeServiceMethodArgsWithSegments(
    'flows.runs.update',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.RUN_MANAGE,
      path: `/runs/${run_id}`,
      method: HTTP_METHODS.PUT,
    },
    request,
    options,
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
  arg1: any,
  arg2?: any,
  arg3?: any,
): Promise<
  JSONFetchResponse<
    OpenAPI.paths['/runs/{run_id}/release']['post']['responses']['200']['content']['application/json']
  >
> {
  const { segments: run_id, request, options } = normalizeServiceMethodArgsWithSegments(
    'flows.runs.remove',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.RUN_MANAGE,
      path: `/runs/${run_id}/release`,
      method: HTTP_METHODS.POST,
    },
    request,
    options,
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
  arg1: any,
  arg2?: any,
  arg3?: any,
): Promise<
  JSONFetchResponse<
    OpenAPI.paths['/runs/{run_id}/definition']['get']['responses']['200']['content']['application/json']
  >
> {
  const { segments: run_id, request, options } = normalizeServiceMethodArgsWithSegments(
    'flows.runs.getDefinition',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.RUN_MANAGE,
      path: `/runs/${run_id}/definition`,
      method: HTTP_METHODS.GET,
    },
    request,
    options,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: never;
    payload?: never;
  }
>;
