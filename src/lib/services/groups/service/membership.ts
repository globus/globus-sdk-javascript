import { ID, SCOPES } from "../config.js";
import { build } from "../../../core/url.js";
import { fetchWithScope } from "../../../core/fetch.js";

import type { operations } from "@globus/types/groups";
import type {
  JSONFetchResponse,
  ServiceMethodDynamicSegments,
} from "../../types.js";

/**
 * Perform actions on members of the group.
 * @see https://groups.api.globus.org/redoc#tag/groups/operation/group_membership_post_actions_v2_groups__group_id__post
 */
export const act = function (
  group_id,
  options,
  sdkOptions?
): Promise<
  JSONFetchResponse<
    operations["group_membership_post_actions_v2_groups__group_id__post"]["responses"]["200"]["content"]["application/json"]
  >
> {
  if (!options?.payload) throw new Error("payload is required.");
  return fetchWithScope(
    SCOPES.ALL,
    build(ID, `/v2/groups/${group_id}/policies`),
    {
      method: "POST",
      body: JSON.stringify(options.payload),
      ...sdkOptions?.fetch?.options,
    }
  );
} satisfies ServiceMethodDynamicSegments<
  operations["update_group_v2_groups__group_id__put"]["parameters"]["path"]["group_id"],
  {
    payload: operations["group_membership_post_actions_v2_groups__group_id__post"]["requestBody"]["content"]["application/json"];
  }
>;
