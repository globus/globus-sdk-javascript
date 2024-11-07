import { ID, SCOPES } from '../config.js';
import { HTTP_METHODS, serviceRequest } from '../../../services/shared.js';
import type {
  JSONFetchResponse,
  ServiceMethod,
  ServiceMethodDynamicSegments,
} from '../../types.js';

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

type ValidateSuccessResponse = {
  scopes: Record<string, any>;
};

/**
 * An error that was generated during validation that includes the location of the error.
 */
export type ValidationLocationError = {
  /**
   * The location of the error represents the path to the property that caused the error.
   */
  loc: string[];
  msg: string;
  type: string;
};

type ValidateErrorResponse = {
  error: {
    code: string;
    /**
     * When `detail` is a string, it is a general error message and cannot be mapped to a specific location
     * in the provided payload.
     */
    detail: string | ValidationLocationError[];
    /**
     * `message` being available is dependent on the error code.
     */
    message?: string;
  };
  debug_id: string;
};

/**
 * Validate a flow definition and its schema.
 * @see https://globusonline.github.io/globus-flows/#tag/Flows/paths/~1flows~1validate/post
 */
export const validate = function (
  options,
  sdkOptions?,
): Promise<JSONFetchResponse<ValidateSuccessResponse | ValidateErrorResponse>> {
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
  payload: {
    definition: Record<string, any>;
    input_schema?: Record<string, any>;
  };
}>;

/**
 * Deploy (Create) a Flow
 * @see https://globusonline.github.io/globus-flows/#tag/Flows/paths/~1flows/post
 */
export const deploy = function (options?, sdkOptions?) {
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
  payload: {
    definition: Record<string, any>;
    input_schema?: Record<string, any>;
    title?: string;
    subtitle?: string;
    description?: string;
    keywords?: string[];
    flow_viewers?: string[];
    flows_starters?: string[];
    flow_administrators?: string[];
    subscription_id?: string;
  };
}>;
