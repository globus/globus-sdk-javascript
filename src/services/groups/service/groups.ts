import { ID, SCOPES } from '../config.js';
import { serviceRequest } from '../../shared.js';

import type { OpenAPI } from '../index.js';

import type {
  JSONFetchResponse,
  ServiceMethod,
  ServiceMethodDynamicSegments,
} from '../../types.js';

/**
 * @see https://groups.api.globus.org/redoc#tag/groups/operation/get_my_groups_and_memberships_v2_groups_my_groups_get
 */
export const getMyGroups = function (
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['get_my_groups_and_memberships_v2_groups_my_groups_get']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      scope: SCOPES.ALL,
      path: `/v2/groups/my_groups`,
      service: ID,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  query?: {
    /**
     * @todo This should probably be replaced with a more specific type for the method's accepted query parameters once available.
     */
    statuses?: OpenAPI.components['schemas']['StatusEnum'][];
  };
}>;

/**
 * @see https://groups.api.globus.org/redoc#tag/groups/operation/get_group_v2_groups__group_id__get
 */
export const get = function (
  group_id,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['get_group_v2_groups__group_id__get']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v2/groups/${group_id}`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  OpenAPI.operations['get_group_v2_groups__group_id__get']['parameters']['path']['group_id'],
  {
    query?: OpenAPI.operations['get_group_v2_groups__group_id__get']['parameters']['query'];
  }
>;
