import { ID, SCOPES, RESOURCE_SERVERS } from '../../../config.js';
import { HTTP_METHODS, serviceRequest } from '../../../../shared.js';
import { createServiceMethodFactory } from '../../../../factory.js';

import type { JSONFetchResponse, ServiceMethodDynamicSegments } from '../../../../types.js';
import { ResourceEnvelope } from '../index.js';

/**
 * @see https://docs.globus.org/api/auth/reference/#client_credential_resource
 */
export type Credential = {
  id: string;
  client: string;
  name: string;
  secret: string | null;
  created: string;
};
type WrappedCredential = ResourceEnvelope<'credential', Credential>;
type WrappedCredentials = ResourceEnvelope<'credentials', Credential[]>;

/**
 * Retrieves a list of all credentials owned by the authenticated entity.
 * @see https://docs.globus.org/api/auth/reference/#get_client_credentials
 */
export const getAll = function (
  client_id,
  options = {},
  sdkOptions?,
): Promise<JSONFetchResponse<WrappedCredentials>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.MANAGE_PROJECTS,
      path: `/v2/api/clients/${client_id}/credentials`,
      method: HTTP_METHODS.GET,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<string, {}>;

type CredentialCreate = {
  name: string;
};

/**
 * Create a credential for the specified client.
 * @see https://docs.globus.org/api/auth/reference/#create_client_credential
 */
export const create = function (
  client_id,
  options,
  sdkOptions?,
): Promise<JSONFetchResponse<WrappedCredential>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.MANAGE_PROJECTS,
      path: `/v2/api/clients/${client_id}/credentials`,
      method: HTTP_METHODS.POST,
    },
    { ...options, payload: { credential: options?.payload } },
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: never;
    payload: CredentialCreate;
  }
>;

/**
 * Delete a credential by id.
 * @see https://docs.globus.org/api/auth/reference/#delete_client_credential
 */
export const remove = function (
  { client_id, credential_id }: { client_id: string; credential_id: string },
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<WrappedCredential>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.MANAGE_PROJECTS,
      path: `/v2/api/clients/${client_id}/credentials/${credential_id}`,
      method: HTTP_METHODS.DELETE,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  { client_id: string; credential_id: string },
  {
    query?: never;
    payload?: never;
  }
>;

/**
 * @private
 */
export const next = {
  getAll: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS[ID],
    path: `/v2/api/clients/{client_id}/credentials`,
  }).generate<
    {
      request?: never;
    },
    JSONFetchResponse<WrappedCredentials>
  >(),

  create: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS[ID],
    path: `/v2/api/clients/{client_id}/credentials`,
    method: HTTP_METHODS.POST,
    transform: (payload) => ({
      ...payload,
      request: {
        ...payload?.request,
        data: { credential: payload?.request?.data },
      },
    }),
  }).generate<
    {
      request: {
        data: CredentialCreate;
      };
    },
    JSONFetchResponse<WrappedCredential>
  >(),

  remove: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS[ID],
    path: `/v2/api/clients/{client_id}/credentials/{credential_id}`,
    method: HTTP_METHODS.DELETE,
  }).generate<
    {
      request?: {
        data?: never;
      };
    },
    JSONFetchResponse<WrappedCredential>
  >(),
};
