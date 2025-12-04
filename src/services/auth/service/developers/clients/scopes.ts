import { ID, SCOPES } from '../../../config.js';
import { HTTP_METHODS, serviceRequest } from '../../../../shared.js';

import type { JSONFetchResponse, ServiceMethodDynamicSegments } from '../../../../types.js';
import type { ScopeCreate, WrappedScope } from '../scopes.js';

/**
 * Return a single scope by id for the specified client.
 * @see https://docs.globus.org/api/auth/reference/#get_scopes
 */
export const get = function ({ client_id, scope_id }, options = {}, sdkOptions?) {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.MANAGE_PROJECTS,
      path: `/v2/api/clients/${client_id}/scopes/${scope_id}`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<{ client_id: string; scope_id: string }, {}>;

/**
 * Create a new scope for each registered FQDN and the id of the client.
 * @see https://docs.globus.org/api/auth/reference/#create_scope
 */
export const create = function (
  client_id,
  options,
  sdkOptions?,
): Promise<JSONFetchResponse<WrappedScope>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.MANAGE_PROJECTS,
      path: `/v2/api/clients/${client_id}/scopes`,
      method: HTTP_METHODS.POST,
    },
    { ...options, payload: { scope: options?.payload } },
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: never;
    payload: ScopeCreate;
  }
>;
