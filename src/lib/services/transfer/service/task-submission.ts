import { HTTP_METHODS, serviceRequest } from '../../shared.js';

import { getHeadersForService } from '../shared.js';
import { ID, SCOPES } from '../config.js';

import type { Transfer } from '../types.js';
import type { JSONFetchResponse, SDKOptions, ServiceMethod } from '../../types.js';

type TaskLink = {
  DATA_TYPE: 'link';
  href: string;
  rel: string;
  resource: string;
  title: string;
};

interface TaskSubmissionResult {
  DATA_TYPE: string;
  resource: string;
  /**
   * @see https://docs.globus.org/api/transfer/task_submit/#result_codes
   */
  code: 'Accpeted' | 'Duplicate';
  message: string;
  request_id: string;
  submission_id: string;
  task_id: string;
  /**
   * @deprecated Undocumented property.
   */
  task_link: TaskLink;
}

export type TransferResult = TaskSubmissionResult & {
  DATA_TYPE: 'transfer_result';
  resource: '/transfer';
};

export type DeleteResult = {
  DATA_TYPE: 'delete_result';
  resource: '/delete';
} & TaskSubmissionResult;

type UndocumentedEncouneredErrorCodes = 'EndpointNotFound' | string;

type TaskSubmissionError = {
  /**
   * Known error codes provided by the Transfer documentation.
   *
   * Since the documentation does not provide an exhaustive list of error codes,
   * we also include a catch-all type (`string`) for any undocumented error codes.
   *
   * @see https://docs.globus.org/api/transfer/task_submit/#errors
   */
  code:
    | 'ClientError.BadRequest'
    | 'BadRequest'
    | 'PermissionDenied'
    | 'ConsentRequired'
    | 'ServiceUnavailable'
    | 'Conflict'
    | UndocumentedEncouneredErrorCodes;
  message: string;
  request_id: string;
  resource: string;
};

export type TransferError = TaskSubmissionError & {
  resource: '/transfer';
};

export type DeleteError = TaskSubmissionError & {
  resource: '/delete';
};

/**
 * Submit a delete task. A delete submission contains a single endpoint and a
 * list of paths to delete.
 *
 * @see https://docs.globus.org/api/transfer/task_submit/#submit_delete_task
 */
export const submitDelete = function (
  options,
  sdkOptions?: SDKOptions,
): Promise<JSONFetchResponse<DeleteResult | DeleteError>> {
  const serviceRequestOptions = {
    payload: {
      DATA_TYPE: 'delete',
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
      scope: SCOPES.ALL,
      path: `/v0.10/delete`,
      method: HTTP_METHODS.POST,
    },
    serviceRequestOptions,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  payload: Omit<Transfer['Request']['Delete'], 'DATA_TYPE'>;
}>;

/**
 * @see https://docs.globus.org/api/transfer/task_submit/#submit_transfer_task
 */
export const submitTransfer = function (
  options,
  sdkOptions?: SDKOptions,
): Promise<JSONFetchResponse<TransferResult | TransferError>> {
  const serviceRequestOptions = {
    payload: {
      DATA_TYPE: 'transfer',
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
      scope: SCOPES.ALL,
      path: `/v0.10/transfer`,
      method: HTTP_METHODS.POST,
    },
    serviceRequestOptions,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  payload: Omit<Transfer['Request']['Transfer'], 'DATA_TYPE'>;
}>;

type SubmissionId = {
  DATA_TYPE: 'submission_id';
  value: string;
};

/**
 * Get a submission id, required when submitting transfer and delete tasks.
 * Note that this is different than the task id returned by the submit operations.
 *
 * @see https://docs.globus.org/api/transfer/task_submit/#get_submission_id
 */
export const submissionId = function (
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<SubmissionId>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/submission_id`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  query?: never;
  payload?: never;
}>;
