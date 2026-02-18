import { ID, SCOPES, RESOURCE_SERVERS } from '../../config.js';
import { serviceRequest } from '../../../../services/shared.js';

import type {
  ServiceMethod,
  ServiceMethodDynamicSegments,
  JSONFetchResponse,
} from '../../../types.js';
import { createServiceMethodFactory } from '../../../../services/factory.js';

export * as consents from './consents.js';

/**
 * @see https://docs.globus.org/api/auth/reference/#identity-resource
 */
export type Identity = {
  id: string;
  username: string;
  status: 'unused' | 'used' | 'private' | 'closed';
  email: string;
  name: string;
  organization: string;
};

/**
 * Fetch a single Identity by ID.
 * @see https://docs.globus.org/api/auth/reference/#get_identity
 */
export const get = function (identity_id, options = {}, sdkOptions?) {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.VIEW_IDENTITIES,
      path: `/v2/api/identities/${identity_id}`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<string, Record<string, any>>;

/**
 * Return a list of identities that match provided query parameters.
 * @see https://docs.globus.org/api/auth/reference/#get_identities
 */
export const getAll = function (options = {}, sdkOptions?) {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.VIEW_IDENTITIES,
      path: `/v2/api/identities`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  query?: {
    ids?: string | string[];
    usernames?: string | string[];
  };
  headers?: Record<string, string>;
  payload?: never;
}>;

/**
 * @private
 */
export const next = {
  get: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS[ID],
    path: `/v2/api/identities/{identity_id}`,
  }).generate<
    {
      request?: {
        data?: never;
      };
    },
    JSONFetchResponse<Identity>
  >(),
  getAll: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS[ID],
    path: `/v2/api/identities`,
  }).generate<
    {
      request?: {
        query?: {
          ids?: string | string[];
          usernames?: string | string[];
        };
        data?: never;
      };
    },
    JSONFetchResponse<Identity>
  >(),
};
