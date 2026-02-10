import { ID, SCOPES } from '../../config.js';
import {
  serviceRequest,
  wrapServiceMethod,
  wrapServiceMethodWithSegments,
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
export const get = wrapServiceMethodWithSegments(
  'auth.identities.get',
  function (identity_id: string, options?: Record<string, any>, sdkOptions?) {
    return serviceRequest(
      {
        service: ID,
        scope: SCOPES.VIEW_IDENTITIES,
        path: `/v2/api/identities/${identity_id}`,
      },
      options,
      sdkOptions,
    );
  },
) satisfies ServiceMethodDynamicSegments<string, Record<string, any>>;

/**
 * Return a list of identities that match provided query parameters.
 * @see https://docs.globus.org/api/auth/reference/#get_identities
 */
export const getAll = wrapServiceMethod(
  'auth.identities.getAll',
  function (
    options?: {
      query?: {
        ids?: string | string[];
        usernames?: string | string[];
      };
      headers?: Record<string, string>;
      payload?: never;
    },
    sdkOptions?,
  ) {
    return serviceRequest(
      {
        service: ID,
        scope: SCOPES.VIEW_IDENTITIES,
        path: `/v2/api/identities`,
      },
      options,
      sdkOptions,
    );
  },
) satisfies ServiceMethod<{
  query?: {
    ids?: string | string[];
    usernames?: string | string[];
  };
  headers?: Record<string, string>;
  payload?: never;
}>;
