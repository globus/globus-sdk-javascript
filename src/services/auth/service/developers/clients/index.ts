import { ID, SCOPES } from '../../../config.js';
import { HTTP_METHODS, serviceRequest } from '../../../../shared.js';

import type {
  JSONFetchResponse,
  ServiceMethod,
  ServiceMethodDynamicSegments,
} from '../../../../types.js';
import { ResourceEnvelope } from '../index.js';

export * as credentials from './credentials.js';
export * as scopes from './scopes.js';

type ClientGrantType =
  | 'authorization_code'
  | 'client_credentials'
  | 'refresh_token'
  | 'urn:globus:auth:grant_type:dependent_token';

type ClientType =
  | 'confidential_client'
  | 'public_installed_client'
  | 'client_identity'
  | 'resource_server'
  | 'globus_connect_server'
  | 'hybrid_confidential_client_resource_server'
  | 'public_webapp_client';

/**
 * @see https://docs.globus.org/api/auth/reference/#client_resource
 */
export type Client = {
  id: string;
  parent_client: string | null;
  name: string;
  public_client: boolean;
  grant_types: ClientGrantType[];
  visibility: 'public' | 'private';
  scopes: string[];
  fqdns: string[];
  redirect_uris: string[];
  links: { terms_and_conditions?: string; privacy_policy?: string };
  required_idp: string | null;
  preselect_idp: string | null;
  project: string | null;
  client_type: ClientType;
  userinfo_from_effective_identity: boolean;
  prompt_for_named_grant: boolean;
};
type WrappedClient = ResourceEnvelope<'client', Client>;

/**
 * Return a specific client by id.
 * @see https://docs.globus.org/api/auth/reference/#get_clients
 */
export const get = function (client_id, options = {}, sdkOptions?) {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.MANAGE_PROJECTS,
      path: `/v2/api/clients/${client_id}`,
      method: HTTP_METHODS.GET,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<string, {}>;

/**
 * Return a list of clients the authenticated entity is an owner of, or the client
 * associated with the specified fqdn.
 * @see https://docs.globus.org/api/auth/reference/#get_clients
 */
export const getAll = function (options = {}, sdkOptions?) {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.MANAGE_PROJECTS,
      path: `/v2/api/clients`,
      method: HTTP_METHODS.GET,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  query?: {
    fqdn?: string;
  };
  payload?: never;
}>;

type OptionalClientCreateFields = Omit<Client, 'id' | 'name' | 'grant_types' | 'scopes' | 'fqdns'>;
type ClientCreate = (
  | Pick<Client, 'name' | 'public_client'>
  | Pick<Client, 'name' | 'client_type'>
) &
  Partial<OptionalClientCreateFields>;

/**
 * Create a new client
 * @see https://docs.globus.org/api/auth/reference/#create_client
 */
export const create = function (options, sdkOptions?): Promise<JSONFetchResponse<WrappedClient>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.MANAGE_PROJECTS,
      path: `/v2/api/clients`,
      method: HTTP_METHODS.POST,
    },
    { ...options, payload: { client: options?.payload } },
    sdkOptions,
  );
} satisfies ServiceMethod<{
  query?: never;
  payload: ClientCreate;
}>;

type NativeAppCreate = {
  name: string;
  template_id: string;
};

/**
 * Create a new native app. This call is unauthenticated.
 * @see https://docs.globus.org/api/auth/reference/#create_native_app_instance
 */
export const createNativeApp = function (
  options,
  sdkOptions?,
): Promise<JSONFetchResponse<Record<string, any>>> {
  return serviceRequest(
    {
      service: ID,
      path: `/v2/api/clients`,
      method: HTTP_METHODS.POST,
    },
    { ...options, payload: { client: options?.payload } },
    sdkOptions,
  );
} satisfies ServiceMethod<{
  query?: never;
  payload: NativeAppCreate;
}>;

type ClientUpdate = Partial<
  Omit<
    ClientCreate,
    | 'public_client'
    | 'project'
    | 'parent_client'
    | 'client_type'
    | 'userinfo_from_effective_identity'
    | 'prompt_for_named_grant'
  >
>;

/**
 * Update a client by id. All fields are optional.
 * @see https://docs.globus.org/api/auth/reference/#update_client
 */
export const update = function (
  client_id,
  options,
  sdkOptions?,
): Promise<JSONFetchResponse<WrappedClient>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.MANAGE_PROJECTS,
      path: `/v2/api/clients/${client_id}`,
      method: HTTP_METHODS.PUT,
    },
    { ...options, payload: { client: options?.payload } },
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: never;
    payload: ClientUpdate;
  }
>;

/**
 * Delete a client by id.
 * @see https://docs.globus.org/api/auth/reference/#delete_client
 */
export const remove = function (
  client_id,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<WrappedClient>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.MANAGE_PROJECTS,
      path: `/v2/api/clients/${client_id}`,
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
