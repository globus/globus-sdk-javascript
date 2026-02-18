import { ID, SCOPES, RESOURCE_SERVERS } from '../../config.js';
import { HTTP_METHODS, serviceRequest } from '../../../shared.js';

import type {
  JSONFetchResponse,
  ServiceMethod,
  ServiceMethodDynamicSegments,
} from '../../../types.js';
import { createServiceMethodFactory } from '../../../factory.js';
import { ResourceEnvelope } from './index.js';

/**
 * @see https://docs.globus.org/api/auth/reference/#policy_resource
 */
export type Policy = {
  id: string;
  project_id: string;
  high_assurance: boolean;
  authentication_assurance_timeout: number | null;
  display_name: string;
  description: string;
  domain_constraints_include: string[] | null;
  domain_constraints_exclude: string[] | null;
  required_mfa: boolean;
};
type WrappedPolicy = ResourceEnvelope<'policy', Policy>;
type WrappedPolicies = ResourceEnvelope<'policies', Policy[]>;

/**
 * Returns a specific policy if the authenticated entity is an admin of the project owning the policy.
 * @see https://docs.globus.org/api/auth/reference/#get_policies
 */
export const get = function (
  policy_id,
  options = {},
  sdkOptions?,
): Promise<JSONFetchResponse<WrappedPolicy>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.MANAGE_PROJECTS,
      path: `/v2/api/policies/${policy_id}`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<string, {}>;

/**
 * Returns a list of policies the authenticated entity is an admin of.
 * @see https://docs.globus.org/api/auth/reference/#get_policies
 */
export const getAll = function (
  options = {},
  sdkOptions?,
): Promise<JSONFetchResponse<WrappedPolicies>> {
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
  payload?: never;
}>;

export type PolicyCreate = Pick<Policy, 'display_name' | 'description'> &
  Partial<Omit<Policy, 'id'>>;

/**
 * Create a new policy
 * @see https://docs.globus.org/api/auth/reference/#create_policy
 */
export const create = function (options, sdkOptions?): Promise<JSONFetchResponse<WrappedPolicy>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.MANAGE_PROJECTS,
      path: `/v2/api/policies`,
      method: HTTP_METHODS.POST,
    },
    { ...options, payload: { policy: options?.payload } },
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
): Promise<JSONFetchResponse<WrappedPolicy>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.MANAGE_PROJECTS,
      path: `/v2/api/policies/${policy_id}`,
      method: HTTP_METHODS.PUT,
    },
    { ...options, payload: { policy: options?.payload } },
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
): Promise<JSONFetchResponse<WrappedPolicy>> {
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

/**
 * @private
 */
export const next = {
  get: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS[ID],
    path: `/v2/api/policies/{policy_id}`,
  }).generate<
    {
      request?: {
        data?: never;
      };
    },
    JSONFetchResponse<WrappedPolicy>
  >(),
  getAll: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS[ID],
    path: `/v2/api/policies`,
  }).generate<
    {
      request?: {
        data?: never;
      };
    },
    JSONFetchResponse<WrappedPolicies>
  >(),
  create: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS[ID],
    path: `/v2/api/policies`,
    method: HTTP_METHODS.POST,
    transform: (payload) => ({
      ...payload,
      request: {
        ...payload?.request,
        data: { policy: payload?.request?.data },
      },
    }),
  }).generate<
    {
      request: {
        query?: never;
        data: PolicyCreate;
      };
    },
    JSONFetchResponse<WrappedPolicy>
  >(),
  update: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS[ID],
    path: `/v2/api/policies/{policy_id}`,
    method: HTTP_METHODS.PUT,
    transform: (payload) => ({
      ...payload,
      request: {
        ...payload?.request,
        data: { policy: payload?.request?.data },
      },
    }),
  }).generate<
    {
      request: {
        query?: never;
        data: Partial<PolicyCreate>;
      };
    },
    JSONFetchResponse<WrappedPolicy>
  >(),
  remove: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS[ID],
    path: `/v2/api/policies/{policy_id}`,
    method: HTTP_METHODS.DELETE,
  }).generate<
    {
      request?: {
        data?: never;
      };
    },
    JSONFetchResponse<WrappedPolicy>
  >(),
};
