import type {
  JSONFetchResponse,
  ServiceMethod,
  ServiceMethodDynamicSegments,
} from '../../../types.js';
import { createServiceMethodFactory } from '../../../factory.js';
import { ID, SCOPES, RESOURCE_SERVERS } from '../../config.js';
import { HTTP_METHODS, serviceRequest } from '../../../../services/shared.js';
import { Identity } from '../identities/index.js';
import { ResourceEnvelope } from './index.js';

type AdminIdentity = Identity & { identity_provider: string; identity_type: string };
type AdminGroup = { id: string };

/**
 * @see https://docs.globus.org/api/auth/reference/#projects_resource
 */
export type Project = {
  id: string;
  project_name: string;
  display_name: string;
  contact_email: string;
  admins: {
    identities: AdminIdentity[];
    groups: AdminGroup[];
  };
  admin_ids: string[] | null;
  admin_group_ids: string[] | null;
};
type WrappedProject = ResourceEnvelope<'project', Project>;
type WrappedProjects = ResourceEnvelope<'projects', Project[]>;

/**
 * Return a specific project by id if the authenticated entity is an admin of that project.
 * @see https://docs.globus.org/api/auth/reference/#get_projects
 */
export const get = function (
  project_id,
  options = {},
  sdkOptions?,
): Promise<JSONFetchResponse<WrappedProject>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.MANAGE_PROJECTS,
      path: `/v2/api/projects/${project_id}`,
      method: HTTP_METHODS.GET,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<string, {}>;

/**
 * Return a list of projects the authenticated entity is an admin of.
 * @see https://docs.globus.org/api/auth/reference/#get_projects
 */
export const getAll = function (
  options = {},
  sdkOptions?,
): Promise<JSONFetchResponse<WrappedProjects>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.MANAGE_PROJECTS,
      path: `/v2/api/projects`,
      method: HTTP_METHODS.GET,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  payload?: never;
}>;

/** Note that project_name is an alias for display_name and is not submitted on create or update */
type ProjectCreate = Pick<Project, 'display_name' | 'contact_email'> &
  (
    | {
        admin_ids: string[];
        admin_group_ids?: string[];
      }
    | {
        admin_ids?: string[];
        admin_group_ids: string[];
      }
  );

/**
 * Create a new project with a set of admins
 *
 * @see https://docs.globus.org/api/auth/reference/#create_project
 */
export const create = function (options, sdkOptions?): Promise<JSONFetchResponse<WrappedProject>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.MANAGE_PROJECTS,
      path: `/v2/api/projects`,
      method: HTTP_METHODS.POST,
    },
    { ...options, payload: { project: options?.payload } },
    sdkOptions,
  );
} satisfies ServiceMethod<{
  query?: never;
  payload: ProjectCreate;
}>;

/**
 * Update a project by id. All fields are optional.
 *
 * @see https://docs.globus.org/api/auth/reference/#update_project
 */
export const update = function (
  project_id,
  options,
  sdkOptions?,
): Promise<JSONFetchResponse<WrappedProject>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.MANAGE_PROJECTS,
      path: `/v2/api/projects/${project_id}`,
      method: HTTP_METHODS.PUT,
    },
    { ...options, payload: { project: options?.payload } },
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: never;
    payload: Partial<ProjectCreate>;
  }
>;

/**
 * Delete a project by id.
 *
 * @see https://docs.globus.org/api/auth/reference/#delete_project
 */
export const remove = function (
  project_id,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<WrappedProject>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.MANAGE_PROJECTS,
      path: `/v2/api/projects/${project_id}`,
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
    path: `/v2/api/projects/{project_id}`,
  }).generate<
    {
      request?: {
        data?: never;
      };
    },
    JSONFetchResponse<WrappedProject>
  >(),
  getAll: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS[ID],
    path: `/v2/api/projects`,
  }).generate<
    {
      request?: {
        data?: never;
      };
    },
    JSONFetchResponse<WrappedProjects>
  >(),
  create: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS[ID],
    path: `/v2/api/projects`,
    method: HTTP_METHODS.POST,
    transform: (payload) => ({
      ...payload,
      request: {
        ...payload?.request,
        data: { project: payload?.request?.data },
      },
    }),
  }).generate<
    {
      request: {
        query?: never;
        data: ProjectCreate;
      };
    },
    JSONFetchResponse<WrappedProject>
  >(),
  update: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS[ID],
    path: `/v2/api/projects/{project_id}`,
    method: HTTP_METHODS.PUT,
    transform: (payload) => ({
      ...payload,
      request: {
        ...payload?.request,
        data: { project: payload?.request?.data },
      },
    }),
  }).generate<
    {
      request: {
        query?: never;
        data: Partial<ProjectCreate>;
      };
    },
    JSONFetchResponse<WrappedProject>
  >(),
  remove: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS[ID],
    path: `/v2/api/projects/{project_id}`,
    method: HTTP_METHODS.DELETE,
  }).generate<
    {
      request?: {
        data?: never;
      };
    },
    JSONFetchResponse<WrappedProject>
  >(),
};
