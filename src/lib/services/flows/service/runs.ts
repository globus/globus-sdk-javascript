import { ID, SCOPES } from "../config.js";
import { serviceRequest } from "../../shared.js";

import type { ServiceMethod } from "../../../services/types.js";

/**
 * @see https://globusonline.github.io/flows/#tag/Runs/paths/~1runs/get
 */
export const getAll = function (options = {}, sdkOptions?) {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.RUN_MANAGE,
      path: `/runs`,
    },
    options,
    sdkOptions
  );
} satisfies ServiceMethod<{
  query?: Record<string, string>;
  headers?: Record<string, string>;
  payload?: never;
}>;
