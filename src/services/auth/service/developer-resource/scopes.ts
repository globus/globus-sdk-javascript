import { ID, SCOPES } from '../../config.js';
import { HTTP_METHODS, serviceRequest } from '../../../shared.js';

import type {
  JSONFetchResponse,
  ServiceMethod,
  ServiceMethodDynamicSegments,
} from '../../../types.js';

type DependentScope = {
  scope: string;
  optional: boolean;
  requires_refresh_token: boolean;
};

/**
 * @see https://docs.globus.org/api/auth/reference/#scope_resource
 */
export type Scope = {
  id: string;
  client: string;
  scope_string: string;
  name: string;
  description: string;
  dependent_scopes: DependentScope[];
  advertised: boolean;
  allows_refresh_token: boolean;
};

/**
 * Return a single scope by id
 * @see https://docs.globus.org/api/auth/reference/#get_scopes
 */
export const get = function (scope_id, options = {}, sdkOptions?) {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.MANAGE_PROJECTS,
      path: `/v2/api/scopes/${scope_id}`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<string, Record<string, any>>;

/**
 * Return a list of scopes
 * @see https://docs.globus.org/api/auth/reference/#get_scopes
 */
export const getAll = function (options = {}, sdkOptions?) {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.MANAGE_PROJECTS,
      path: `/v2/api/scopes`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  query?: { ids?: string } | { scope_strings?: string };
  headers?: Record<string, string>;
  payload?: never;
}>;

export type ScopeCreate = Pick<Scope, 'name' | 'description'> & { scope_suffix: string } & Partial<
    Omit<Scope, 'id' | 'client' | 'scope_string'>
  >;

export type ScopeUpdate = Partial<Omit<ScopeCreate, 'scope_suffix'>>;

/**
 * Update a scope by id.
 * @see https://docs.globus.org/api/auth/reference/#update_scope
 */
export const update = function (scope_id, options, sdkOptions?): Promise<JSONFetchResponse<Scope>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.MANAGE_PROJECTS,
      path: `/v2/api/scopes/${scope_id}`,
      method: HTTP_METHODS.PUT,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: never;
    payload: ScopeUpdate;
  }
>;

/**
 * Delete a scope by id.
 * @see https://docs.globus.org/api/auth/reference/#delete_scope
 */
export const remove = function (
  scope_id,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<Scope>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.MANAGE_PROJECTS,
      path: `/v2/api/scopes/${scope_id}`,
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
