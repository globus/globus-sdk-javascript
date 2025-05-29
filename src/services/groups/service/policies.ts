import { ID, SCOPES } from '../config.js';
import { serviceRequest } from '../../shared.js';

import type { OpenAPI } from '../index.js';
import type { JSONFetchResponse, ServiceMethodDynamicSegments } from '../../types.js';

/**
 * @see https://groups.api.globus.org/redoc#tag/groups/operation/get_policies_v2_groups__group_id__policies_get
 */
export const get = function (
  group_id,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['get_policies_v2_groups__group_id__policies_get']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      scope: SCOPES.ALL,
      path: `/v2/groups/${group_id}/policies`,
      service: ID,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  OpenAPI.operations['get_policies_v2_groups__group_id__policies_get']['parameters']['path']['group_id'],
  {
    query?: never;
    payload?: never;
  }
>;
