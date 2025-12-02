import { ID, SCOPES } from '../../config.js';
import { HTTP_METHODS, serviceRequest } from '../../../shared.js';

import type {
  JSONFetchResponse,
  ServiceMethod,
  ServiceMethodDynamicSegments,
} from '../../../types.js';

/**
 * @see https://docs.globus.org/api/auth/reference/#policy_resource
 */
export type Policy = {
  id: string;
  project_id: string;
  high_assurance: boolean;
  authentication_assurance_timeout: number;
  display_name: string;
  description: string;
  domain_constraints_include?: string[];
  domain_constraints_exclude?: string[];
  required_mfa?: boolean;
};

/**
 * Returns a specific policy if the authenticated entity is an admin of the project owning the policy.
 * @see https://docs.globus.org/api/auth/reference/#get_policies
 */
export const get = function (policy_id, options = {}, sdkOptions?) {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.MANAGE_PROJECTS,
      path: `/v2/api/policies/${policy_id}`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<string, Record<string, any>>;

/**
 * Returns a list of policies the authenticated entity is an admin of.
 * @see https://docs.globus.org/api/auth/reference/#get_policies
 */
export const getAll = function (options = {}, sdkOptions?) {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.MANAGE_PROJECTS,
      path: `/v2/api/policies`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  headers?: Record<string, string>;
  payload?: never;
}>;

type PolicyCreate = Omit<Policy, 'id'>;

/**
 * Create a new policy
 * @see https://docs.globus.org/api/auth/reference/#create_policy
 */
export const create = function (options, sdkOptions?): Promise<JSONFetchResponse<Policy>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.MANAGE_PROJECTS,
      path: `/v2/api/policies`,
      method: HTTP_METHODS.POST,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  query?: never;
  payload: PolicyCreate;
}>;

/**
 * Update a policy by id. All fields are optional.
 * @see https://docs.globus.org/api/auth/reference/#update_policy
 */
export const update = function (
  policy_id,
  options,
  sdkOptions?,
): Promise<JSONFetchResponse<Policy>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.MANAGE_PROJECTS,
      path: `/v2/api/policies/${policy_id}`,
      method: HTTP_METHODS.PUT,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: never;
    payload: Partial<PolicyCreate>;
  }
>;

/**
 * Delete a policy by id.
 * @see https://docs.globus.org/api/auth/reference/#delete_policy
 */
export const remove = function (
  policy_id,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<Policy>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.MANAGE_PROJECTS,
      path: `/v2/api/policies/${policy_id}`,
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
