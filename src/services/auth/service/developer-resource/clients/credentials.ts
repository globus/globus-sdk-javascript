import { ID, SCOPES } from '../../../config.js';
import { HTTP_METHODS, serviceRequest } from '../../../../shared.js';

import type { JSONFetchResponse, ServiceMethodDynamicSegments } from '../../../../types.js';

/**
 * @see https://docs.globus.org/api/auth/reference/#client_credential_resource
 */
export type Credential = {
  id: string;
  client: string;
  name: string;
  secret: string;
  created: string;
};

/**
 * Retrieves a list of all credentials owned by the authenticated entity.
 * @see https://docs.globus.org/api/auth/reference/#get_client_credentials
 */
export const getAll = function (client_id, options = {}, sdkOptions?) {
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
} satisfies ServiceMethodDynamicSegments<string, Record<string, any>>;

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
): Promise<JSONFetchResponse<Credential>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.MANAGE_PROJECTS,
      path: `/v2/api/clients/${client_id}/credentials`,
      method: HTTP_METHODS.POST,
    },
    options,
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
): Promise<JSONFetchResponse<Credential>> {
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
