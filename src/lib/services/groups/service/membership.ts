import type { operations } from '@globus/types/groups';
import { ID, SCOPES } from '../config.js';
import { HTTP_METHODS, serviceRequest } from '../../shared.js';

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
    operations['group_membership_post_actions_v2_groups__group_id__post']['responses']['200']['content']['application/json']
  >
> {
  if (!options?.payload) throw new Error('payload is required.');
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v2/groups/${group_id}`,
      method: HTTP_METHODS.POST,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  operations['update_group_v2_groups__group_id__put']['parameters']['path']['group_id'],
  {
    payload: operations['group_membership_post_actions_v2_groups__group_id__post']['requestBody']['content']['application/json'];
  }
>;
