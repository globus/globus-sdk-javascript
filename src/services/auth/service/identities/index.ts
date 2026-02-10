import { ID, SCOPES } from '../../config.js';
import {
  serviceRequest,
  normalizeServiceMethodArgs,
  normalizeServiceMethodArgsWithSegments,
} from '../../../../services/shared.js';

import type { ServiceMethod, ServiceMethodDynamicSegments } from '../../../types.js';

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
export const get = function (arg1: any, arg2?: any, arg3?: any) {
  const { segments: identity_id, request, options } = normalizeServiceMethodArgsWithSegments(
    'auth.identities.get',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.VIEW_IDENTITIES,
      path: `/v2/api/identities/${identity_id}`,
    },
    request,
    options,
  );
} satisfies ServiceMethodDynamicSegments<string, Record<string, any>>;

/**
 * Return a list of identities that match provided query parameters.
 * @see https://docs.globus.org/api/auth/reference/#get_identities
 */
export const getAll = function (arg1?: any, arg2?: any) {
  const { request, options } = normalizeServiceMethodArgs('auth.identities.getAll', arg1, arg2);
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.VIEW_IDENTITIES,
      path: `/v2/api/identities`,
    },
    request,
    options,
  );
} satisfies ServiceMethod<{
  query?: {
    ids?: string | string[];
    usernames?: string | string[];
  };
  headers?: Record<string, string>;
  payload?: never;
}>;
