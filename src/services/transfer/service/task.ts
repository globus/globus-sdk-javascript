import { HTTP_METHODS, serviceRequest } from '../../shared.js';

import { ID, SCOPES } from '../config.js';

import type {
  ServiceMethod,
  ServiceMethodDynamicSegments,
  JSONFetchResponse,
} from '../../../services/types.js';

import type { PaginatedResponse, QueryParameters } from '../types.js';
import { PauseRuleDocument } from './endpoint-manager/pause-rule.js';

export type TaskDocument = {
  DATA_TYPE: 'task';
  task_id: string;
  type: 'TRANSFER' | 'DELETE';
  status: 'ACTIVE' | 'INACTIVE' | 'SUCCEEDED' | 'FAILED';
  fatal_error: object | null;
  label: string | null;
  /**
   * @deprecated use `owner_id` instead.
   */
  username: string;
  owner_id: string;
  request_time: string;
  completion_time: string | null;
  deadline: string | null;
  /**
   * @deprecated use `source_endpoint_id`
   */
  source_endpoint: string;
  source_endpoint_id: string;
  source_endpoint_display_name: string;
  /**
   * @deprecated use `destination_endpoint_id`
   */
  destination_endpoint: string;
  destination_endpoint_id: string | null;
  destination_endpoint_display_name: string;
  sync_level: number | null;
  encrypt_data: boolean;
  verify_checksum: boolean;
  delete_destination_extra: boolean;
  recursive_symlinks: string | null;
  preserve_timestamp: boolean;
  skip_source_errors: boolean;
  fail_on_quota_errors: boolean;
  command: string;
  history_deleted: boolean;
  faults: number;
  files: number;
  directories: number;
  symlinks: number;
  files_skipped: number;
  files_transferred: number;
  subtasks_total: number;
  subtasks_pending: number;
  subtasks_retrying: number;
  subtasks_succeeded: number;
  subtasks_expired: number;
  subtasks_canceled: number;
  subtasks_failed: number;
  subtasks_skipped_errors: number;
  bytes_transferred: number;
  bytes_checksummed: number;
  effective_bytes_per_second: number;
  nice_status: string | null;
  /**
   * @deprecated use `event_list`
   */
  nice_status_details: null;
  nice_status_short_description: string | null;
  nice_status_expires_in: -1 | 0 | string | null;
  canceled_by_admin: 'SOURCE' | 'DESTINATION' | 'BOTH' | null;
  canceled_by_admin_message: string | null;
  is_paused: boolean;
  source_base_path?: string | null;
  destination_base_path?: string | null;
};

export type TaskListDocument = {
  DATA_TYPE: 'task_list';
  DATA: TaskDocument[];
};

/**
 * Get a list of tasks submitted by the current user.
 * @see https://docs.globus.org/api/transfer/task/#get_task_list
 */
export const getAll = function (
  options = {},
  sdkOptions?,
): Promise<JSONFetchResponse<PaginatedResponse<'Offset', TaskListDocument>>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/task_list`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  query?: QueryParameters<'Offset'>;
  headers?: Record<string, string>;
  payload?: never;
}>;

/**
 * Fetch a task by its UUID.
 * @see https://docs.globus.org/api/transfer/task/#get_task_by_id
 */
export const get = function (
  task_id,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<TaskDocument>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/task/${task_id}`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: never;
    payload?: never;
  }
>;

/**
 * @see https://docs.globus.org/api/transfer/task/#update_task_by_id
 */
export const update = function (
  task_id,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<{
    DATA_TYPE: 'result';
    code: 'Updated';
    message: string;
    request_id: string;
    resource: `/task/${string}/cancel`;
  }>
> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/task/${task_id}`,
      method: HTTP_METHODS.PUT,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: never;
    payload: Record<string, string>;
  }
>;

/**
 * @see https://docs.globus.org/api/transfer/task/#cancel_task_by_id
 */
export const cancel = function (
  task_id,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<TaskDocument>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/task/${task_id}/cancel`,
      method: HTTP_METHODS.POST,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: never;
    payload?: never;
  }
>;

/**
 * @see https://docs.globus.org/api/transfer/task/#remove_task_by_id
 */
export const remove = function (
  task_id,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<TaskDocument>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/task/${task_id}/remove`,
      method: HTTP_METHODS.POST,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: never;
    payload?: never;
  }
>;

/**
 * @see https://docs.globus.org/api/transfer/task/#event_document
 */
export type EventDocument = {
  DATA_TYPE: 'event';
  code: string;
  is_error: boolean;
  description: string;
  details: string;
  time: string;
};

export type TaskEventListDocument = {
  DATA_TYPE: 'event_list';
  DATA: EventDocument[];
};

/**
 * @see https://docs.globus.org/api/transfer/task/#get_event_list
 */
export const getEventList = function (
  task_id,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<PaginatedResponse<'Offset', TaskEventListDocument>>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/task/${task_id}/event_list`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: QueryParameters<'Offset'>;
    headers?: Record<string, string>;
    payload?: never;
  }
>;

/**
 * `source_path` or `destination_path` will be `null` when the user does not have
 * role permissions for either side of the transfer.
 * @see https://docs.globus.org/api/transfer/task/#successful_transfer_fields
 */
export type SuccessfulTransferDocument = {
  DATA_TYPE: 'successful_transfer';
  source_path: string | null;
  destination_path: string | null;
  checksum: string | null;
  checksum_algorithm: string | null;
  dynamic: boolean;
  size: number;
};

export type SuccessfulTransfersListDocument = {
  DATA_TYPE: 'successful_transfers';
  marker: number;
  next_marker: null | number;
  DATA: SuccessfulTransferDocument[];
};

/**
 * @see https://docs.globus.org/api/transfer/task/#get_task_successful_transfers
 */
export const getSuccessfulTransfers = function (
  task_id,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<SuccessfulTransfersListDocument>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/task/${task_id}/successful_transfers`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: QueryParameters<'Marker'>;
    headers?: Record<string, string>;
    payload?: never;
  }
>;

/**
 * `source_path` or `destination_path` will be `null` when the user does not have
 * role permissions for either side of the transfer.
 * @see https://docs.globus.org/api/transfer/task/#skipped_error_fields
 */
export type SkippedErrorDocument = {
  DATA_TYPE: 'skipped_error';
  error_code: 'PERMISSION_DENIED' | 'FILE_NOT_FOUND';
  error_details: string;
  error_time: string;
  source_path: string | null;
  destination_path: string | null;
  is_directory: boolean;
  is_symlink: boolean;
  is_delete_destination_extra: boolean;
  external_checksum: string;
  checksum_algorithm: string;
};

export type SkippedErrorsListDocument = {
  DATA_TYPE: 'skipped_errors';
  marker: number;
  next_marker: null | number;
  DATA: SkippedErrorDocument[];
};

/**
 * @see https://docs.globus.org/api/transfer/task/#get_task_skipped_errors
 */
export const getSkippedErrors = function (
  task_id,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<PaginatedResponse<'Marker', SkippedErrorsListDocument>>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/task/${task_id}/skipped_errors`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: QueryParameters<'Marker'>;
    headers?: Record<string, string>;
    payload?: never;
  }
>;

/**
 * @see https://docs.globus.org/api/transfer/task/#limited_pause_rule_document
 */
export type PauseRuleLimitedDocument = Omit<
  PauseRuleDocument,
  'modified_by' | 'modified_by_id' | 'created_by_host_manager' | 'editable' | 'DATA_TYPE'
> & {
  DATA_TYPE: 'pause_rule_limited';
};
/**
 * @see https://docs.globus.org/api/transfer/task/#get_task_pause_info
 */
type PauseInfoLimitedDocument = {
  DATA_TYPE: 'pause_info_limited';
  pause_rules: PauseRuleLimitedDocument[];
  source_pause_message: string | null;
  destination_pause_message: string | null;
  source_pause_message_share: string | null;
  destination_pause_message_share: string | null;
};

/**
 * @see https://docs.globus.org/api/transfer/task/#get_task_pause_info
 */
export const getPauseInfo = function (
  task_id,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<PauseInfoLimitedDocument>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/task/${task_id}/pause_info`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: never;
    headers?: Record<string, string>;
    payload?: never;
  }
>;
