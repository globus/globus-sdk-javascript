import { ID, SCOPES } from '../../config.js';
import { serviceRequest } from '../../../../services/shared.js';

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

export const getAll = function (
  identity_id,
  options = {},
  sdkOptions?,
): Promise<JSONFetchResponse<{ consents: Consent[] }>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.VIEW_IDENTITIES,
      path: `/identities/${identity_id}/consents`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<string, Record<string, any>>;
