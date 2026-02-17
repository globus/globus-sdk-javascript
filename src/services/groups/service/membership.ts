import { ID } from '../config.js';
import { RESOURCE_SERVERS } from '../../auth/config.js';
import { HTTP_METHODS, serviceRequest } from '../../shared.js';
import { createServiceMethodFactory } from '../../factory.js';

import type { OpenAPI } from '../index.js';
import type { JSONFetchResponse, ServiceMethodDynamicSegments } from '../../types.js';

/**
 * Perform actions on members of the group.
 * @see https://groups.api.globus.org/redoc#tag/groups/operation/group_membership_post_actions_v2_groups__group_id__post
 */
export const act = function (
  group_id,
  options,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['group_membership_post_actions_v2_groups__group_id__post']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: ID,
      resource_server: RESOURCE_SERVERS.GROUPS,
      path: `/v2/groups/${group_id}`,
      method: HTTP_METHODS.POST,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  OpenAPI.operations['update_group_v2_groups__group_id__put']['parameters']['path']['group_id'],
  {
    query?: never;
    payload: OpenAPI.operations['group_membership_post_actions_v2_groups__group_id__post']['requestBody']['content']['application/json'];
  }
>;

/**
 * @private
 */
export const next = {
  act: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS.GROUPS,
    path: `/v2/groups/{group_id}`,
    method: HTTP_METHODS.POST,
  }).generate<
    {
      request: {
        query?: never;
        data: OpenAPI.operations['group_membership_post_actions_v2_groups__group_id__post']['requestBody']['content']['application/json'];
      };
    },
    JSONFetchResponse<
      OpenAPI.operations['group_membership_post_actions_v2_groups__group_id__post']['responses']['200']['content']['application/json']
    >
  >(),
};
