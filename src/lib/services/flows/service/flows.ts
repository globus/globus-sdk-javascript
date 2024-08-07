import { ID, SCOPES } from '../config.js';
import { HTTP_METHODS, serviceRequest } from '../../../services/shared.js';
import type { ServiceMethod, ServiceMethodDynamicSegments } from '../../types.js';

/**
 * @see https://globusonline.github.io/globus-flows/#tag/Flows/paths/~1flows/get
 */
export const getAll = function (options?, sdkOptions?) {
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
  query?: Record<string, string>;
  headers?: Record<string, string>;
}>;

/**
 * @see https://globusonline.github.io/globus-flows/#tag/Flows/paths/~1flows~1{flow_id}/get
 */
export const get = function (flow_id, options?, sdkOptions?) {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.VIEW_FLOWS,
      path: `/flows/${flow_id}`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<string, Record<string, any>>;

/**
 * @see https://globusonline.github.io/globus-flows/#tag/Flows/paths/~1flows~1{flow_id}/delete
 */
export const remove = function (flow_id, options?, sdkOptions?) {
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
export const run = function (flow_id, options?, sdkOptions?) {
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
    payload: {
      label?: string;
      body: Record<string, any>;
      tags?: string[];
    };
  }
>;
