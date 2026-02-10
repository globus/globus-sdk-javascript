import { ID } from '../config.js';
import {
  HTTP_METHODS,
  serviceRequest,
  wrapServiceMethodWithSegments,
} from '../../shared.js';
import { RESOURCE_SERVERS } from '../../auth/config.js';

import type { OpenAPI } from '../index.js';
import type { JSONFetchResponse, ServiceMethodDynamicSegments } from '../../types.js';

/**
 * Perform actions on members of the group.
 * @see https://groups.api.globus.org/redoc#tag/groups/operation/group_membership_post_actions_v2_groups__group_id__post
 */
export const act = wrapServiceMethodWithSegments(
  'groups.membership.act',
  function (
    group_id: OpenAPI.operations['update_group_v2_groups__group_id__put']['parameters']['path']['group_id'],
    options?: {
      query?: never;
      payload: OpenAPI.operations['group_membership_post_actions_v2_groups__group_id__post']['requestBody']['content']['application/json'];
    },
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
  },
) satisfies ServiceMethodDynamicSegments<
  OpenAPI.operations['update_group_v2_groups__group_id__put']['parameters']['path']['group_id'],
  {
    query?: never;
    payload: OpenAPI.operations['group_membership_post_actions_v2_groups__group_id__post']['requestBody']['content']['application/json'];
  }
>;
