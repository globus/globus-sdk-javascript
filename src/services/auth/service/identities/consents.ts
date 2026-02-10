import { ID, SCOPES } from '../../config.js';
import {
  serviceRequest,
  normalizeServiceMethodArgsWithSegments,
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

export const getAll = function (
  arg1: any,
  arg2?: any,
  arg3?: any,
): Promise<JSONFetchResponse<{ consents: Consent[] }>> {
  const { segments: identity_id, request, options } = normalizeServiceMethodArgsWithSegments(
    'auth.identities.consents.getAll',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.VIEW_IDENTITIES,
      path: `/v2/api/identities/${identity_id}/consents`,
    },
    request,
    options,
  );
} satisfies ServiceMethodDynamicSegments<string, Record<string, any>>;
