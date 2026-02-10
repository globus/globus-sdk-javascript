import {
  HTTP_METHODS,
  serviceRequest,
  normalizeServiceMethodArgs,
} from '../../shared.js';

import { getHeadersForService } from '../shared.js';
import { ID, SCOPES } from '../config.js';

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
 * Common fields for Transfer and Delete requests.
 * @see https://docs.globus.org/api/transfer/task_submit/#common_transfer_and_delete_fields
 */
export type CommonTransferAndDeleteFields = {
  submission_id: string;
  label?: string;
  notify_on_succeeded?: boolean;
  notify_on_failed?: boolean;
  deadline?: string;
  store_base_path_info?: boolean;
};

/**
 * @see https://docs.globus.org/api/transfer/task_submit/#filter_rules
 */
export type FilterRule = {
  DATA_TYPE: 'filter_rule';
  method: 'exclude' | 'include';
  type?: 'file' | 'dir' | undefined | null;
  name: string;
};

/**
 * @see https://docs.globus.org/api/transfer/task_submit/#transfer_item_fields
 */
export type TransferItem = {
  DATA_TYPE: 'transfer_item';
  source_path: string;
  destination_path: string;
  recursive?: boolean;
  external_checksum?: string;
  checksum_algorithm?: string;
};

/**
 * @see https://docs.globus.org/api/transfer/task_submit/#transfer_symlink_item_fields
 */
export type TransferSymlinkItem = {
  DATA_TYPE: 'transfer_symlink_item';
  source_path: string;
  destination_path: string;
};

/**
 * https://docs.globus.org/api/transfer/task_submit/#transfer_specific_fields
 */
export type TransferFields = CommonTransferAndDeleteFields & {
  DATA_TYPE: 'transfer';
  DATA: (TransferItem | TransferSymlinkItem)[];
  source_endpoint: string;
  destination_endpoint: string;
  filter_rules?: FilterRule[];
  encrypt_data?: boolean;
  sync_level?: 0 | 1 | 2 | 3;
  verify_checksum?: boolean;
  preserve_timestamp?: boolean;
  delete_destination_extra?: boolean;
  /**
   * @beta
   */
  recursive_symlinks?: 'ignore' | 'keep' | 'copy';
  skip_source_errors?: boolean;
  fail_on_quota_errors?: boolean;
  source_local_user?: string;
  destination_local_user?: string;
};

/**
 * @see https://docs.globus.org/api/transfer/task_submit/#delete_item_fields
 */
export type DeleteItem = {
  DATA_TYPE: 'delete_item';
  path: string;
};

/**
 * @see https://docs.globus.org/api/transfer/task_submit/#delete_specific_fields
 */
export type DeleteFields = CommonTransferAndDeleteFields & {
  DATA_TYPE: 'delete';
  DATA: DeleteItem[];
  endpoint: string;
  ignore_missing?: boolean;
  recursive?: boolean;
  interpret_globs?: boolean;
  local_user?: string;
};

/**
 * Submit a delete task. A delete submission contains a single endpoint and a
 * list of paths to delete.
 *
 * @see https://docs.globus.org/api/transfer/task_submit/#submit_delete_task
 */
export const submitDelete = function (
  arg1: any,
  arg2?: any,
): Promise<JSONFetchResponse<DeleteResult | DeleteError>> {
  const { request, options } = normalizeServiceMethodArgs('transfer.task-submission.submitDelete', arg1, arg2);
  const serviceRequestOptions = {
    payload: {
      DATA_TYPE: 'delete',
      ...request?.payload,
    },
    headers: {
      ...getHeadersForService(HTTP_METHODS.POST),
      ...request?.headers,
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
    options,
  );
} satisfies ServiceMethod<{
  payload: Omit<DeleteFields, 'DATA_TYPE'>;
}>;

/**
 * @see https://docs.globus.org/api/transfer/task_submit/#submit_transfer_task
 */
export const submitTransfer = function (
  arg1: any,
  arg2?: any,
): Promise<JSONFetchResponse<TransferResult | TransferError>> {
  const { request, options } = normalizeServiceMethodArgs('transfer.task-submission.submitTransfer', arg1, arg2);
  const serviceRequestOptions = {
    payload: {
      DATA_TYPE: 'transfer',
      ...request?.payload,
    },
    headers: {
      ...getHeadersForService(HTTP_METHODS.POST),
      ...request?.headers,
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
    options,
  );
} satisfies ServiceMethod<{
  payload: Omit<TransferFields, 'DATA_TYPE'>;
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
  arg1?: any,
  arg2?: any,
): Promise<JSONFetchResponse<SubmissionId>> {
  const { request, options } = normalizeServiceMethodArgs('transfer.task-submission.submissionId', arg1, arg2);
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/submission_id`,
    },
    request,
    options,
  );
} satisfies ServiceMethod<{
  query?: never;
  payload?: never;
}>;
