import { ID, SCOPES } from '../../config.js';
import {
  serviceRequest,
  wrapServiceMethodWithSegments,
} from '../../../../services/shared.js';

import type { JSONFetchResponse, ServiceMethodDynamicSegments } from '../../../types.js';

export type Consent = {
  auto_approved: boolean;
  effective_identity: string;
  id: number;
  client: string;
  updated: string;
  /**
   * An array of `Consent.id` values that represents the location of this consent in the dependency graph.
   */
  dependency_path: number[];
  status: string;
  allows_refresh: boolean;
  scope_name: string;
  created: string;
  atomically_revocable: boolean;
  scope: string;
  last_used: string;
};

export const getAll = wrapServiceMethodWithSegments(
  'auth.identities.consents.getAll',
  function (
    identity_id: string,
    options?: Record<string, any>,
    sdkOptions?,
  ): Promise<JSONFetchResponse<{ consents: Consent[] }>> {
    return serviceRequest(
      {
        service: ID,
        scope: SCOPES.VIEW_IDENTITIES,
        path: `/v2/api/identities/${identity_id}/consents`,
      },
      options,
      sdkOptions,
    );
  },
) satisfies ServiceMethodDynamicSegments<string, Record<string, any>>;
