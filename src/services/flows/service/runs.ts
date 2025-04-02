import { ID, SCOPES } from '../config.js';
import { HTTP_METHODS, serviceRequest } from '../../shared.js';

import type { ServiceMethod, ServiceMethodDynamicSegments } from '../../../services/types.js';

/**
 * @see https://globusonline.github.io/globus-flows/#tag/Runs/paths/~1runs/get
 */
export const getAll = function (options = {}, sdkOptions?) {
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
  query?: Record<string, string>;
  headers?: Record<string, string>;
  payload?: never;
}>;

/**
 * Cancel the execution for a particular Run of a Flow.
 * https://globusonline.github.io/globus-flows/#tag/Runs/paths/~1runs~1%7Brun_id%7D~1cancel/post
 */
export const cancel = function (run_id, options?, sdkOptions?) {
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
} satisfies ServiceMethodDynamicSegments<string, Record<string, any>>;

/**
 * Retrieve detailed execution information for a particular Flow Run.
 * @see https://globusonline.github.io/globus-flows/#tag/Runs/paths/~1runs~1%7Baction_id%7D~1log/get
 */
export const getLog = function (run_id, options?, sdkOptions?) {
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
    query?: {
      limit?: number | string;
      reverse_order?: boolean;
      pagination_token?: string;
    };
  }
>;

/**
 * Update a Run's metadata.
 *
 * @see https://globusonline.github.io/globus-flows/#tag/Runs/paths/~1runs~1{run_id}/put
 */
export const update = function (run_id, options?, sdkOptions?) {
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
    payload?: {
      label?: string;
      run_monitors?: string[];
      run_managers?: string[];
      tags?: string[];
    };
  }
>;

/**
 * Remove a Run.
 *
 * @see https://globusonline.github.io/globus-flows/#tag/Runs/paths/~1runs~1{run_id}~1release/post
 */
export const remove = function (run_id, options?, sdkOptions?) {
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
export const getDefinition = function (run_id, options?, sdkOptions?) {
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
