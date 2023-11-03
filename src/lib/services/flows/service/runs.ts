import { ID, SCOPES } from "../config";
import { serviceRequest } from "../../shared";

import type { ServiceMethod } from "../../../services/types";

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
