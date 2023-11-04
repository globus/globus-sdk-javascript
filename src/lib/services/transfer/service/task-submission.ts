import { HTTP_METHODS, serviceRequest } from "../../shared.js";

import { getHeadersForService } from "../shared.js";
import { ID } from "../config.js";

import type { Transfer } from "../types.js";
import type { SDKOptions, ServiceMethod } from "../../types.js";

/**
 * Submit a delete task. A delete submission contains a single endpoint and a
 * list of paths to delete.
 *
 * @see https://docs.globus.org/api/transfer/task_submit/#submit_delete_task
 */
export const submitDelete = function (options, sdkOptions?: SDKOptions) {
  const serviceRequestOptions = {
    payload: {
      DATA_TYPE: "delete",
      ...options?.payload,
    },
    headers: {
      ...getHeadersForService(HTTP_METHODS.POST),
      ...options?.headers,
    },
  };
  return serviceRequest(
    {
      service: ID,
      scope: "urn:globus:auth:scope:transfer.api.globus.org:all",
      path: `/v0.10/delete`,
      method: HTTP_METHODS.POST,
    },
    serviceRequestOptions,
    sdkOptions
  );
} satisfies ServiceMethod<{
  payload: Omit<Transfer["Request"]["Delete"], "DATA_TYPE">;
}>;

export const submitTransfer = function (options, sdkOptions?: SDKOptions) {
  const serviceRequestOptions = {
    payload: {
      DATA_TYPE: "transfer",
      ...options?.payload,
    },
    headers: {
      ...getHeadersForService(HTTP_METHODS.POST),
      ...options?.headers,
    },
  };
  return serviceRequest(
    {
      service: ID,
      scope: "urn:globus:auth:scope:transfer.api.globus.org:all",
      path: `/v0.10/transfer`,
      method: HTTP_METHODS.POST,
    },
    serviceRequestOptions,
    sdkOptions
  );
} satisfies ServiceMethod<{
  payload: Omit<Transfer["Request"]["Transfer"], "DATA_TYPE">;
}>;

/**
 * Get a submission id, required when submitting transfer and delete tasks.
 * Note that this is different than the task id returned by the submit operations.
 *
 * @see https://docs.globus.org/api/transfer/task_submit/#get_submission_id
 */
export const submissionId = function (options?, sdkOptions?) {
  return serviceRequest(
    {
      service: ID,
      scope: "urn:globus:auth:scope:transfer.api.globus.org:all",
      path: `/v0.10/submission_id`,
    },
    options,
    sdkOptions
  );
} satisfies ServiceMethod<{
  query?: never;
  payload?: never;
}>;
