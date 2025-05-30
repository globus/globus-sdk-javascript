import { HTTP_METHODS, serviceRequest } from '../../../shared.js';
import { ID, SCOPES } from '../../config.js';

import type {
  ServiceMethod,
  ServiceMethodDynamicSegments,
  JSONFetchResponse,
} from '../../../../services/types.js';

import type { PaginatedResponse, QueryParameters } from '../../types.js';
import type {
  SkippedErrorsListDocument,
  SuccessfulTransfersDocument,
  TaskDocument,
  TaskEventListDocument,
} from '../task.js';
import { PauseRuleDocument } from './pause-rule.js';

type LocalUserStatus = 'OK' | 'NO_PERMISSION' | 'NOT_SCANNED' | 'ENDPOINT_ERROR' | 'NO_ENDPOINT';

/**
 * @see https://docs.globus.org/api/transfer/advanced_endpoint_management/#task_document
 */
export type EndpointManagerTaskDocument = TaskDocument & {
  source_endpoint_id: string | null;
  source_endpoint_display_name: string | null;
  destination_endpoint_id: string | null;
  destination_endpoint_display_name: string | null;
  /**
   * @deprecated
   */
  source_host_endpoint: string | null;
  source_host_endpoint_id: string | null;
  source_host_endpoint_display_name: string | null;
  source_mapped_collection_id: string | null;
  source_mapped_collection_display_name: string | null;
  /**
   * @deprecated
   */
  destination_host_endpoint: string | null;
  destination_host_endpoint_id: string | null;
  destination_host_endpoint_display_name: string | null;
  destination_mapped_collection_id: string | null;
  destination_mapped_collection_display_name: string | null;

  source_host_path: string | null;
  destination_host_path: string | null;
  is_ok: boolean | null;
  source_local_user: null;
  source_local_user_status: LocalUserStatus;
  destination_local_user: string | null;
  destination_local_user_status: LocalUserStatus;
  owner_string: string;
};

/**
 * @see https://docs.globus.org/api/transfer/advanced_endpoint_management/#get_tasks
 */
export const getAll = function (
  options = {},
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    PaginatedResponse<
      'LastKey',
      {
        DATA_TYPE: 'task_list';
        DATA: EndpointManagerTaskDocument[];
      }
    >
  >
> {
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
  query?: QueryParameters<
    {
      filter_status?: string;
      filter_task_id?: string;
      filter_owner_id?: string;
      filter_endpoint?: string;
      filter_is_paused?: boolean;
      filter_completion_time?: string;
      filter_min_faults?: number;
      filter_local_user?: string;
    },
    'LastKey'
  >;
  payload?: never;
}>;

/**
 * @see https://docs.globus.org/api/transfer/advanced_endpoint_management/#get_task
 */
export const get = function (
  task_id,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<EndpointManagerTaskDocument>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint_manager/task/${task_id}`,
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
 * @see https://docs.globus.org/api/transfer/advanced_collection_management/#admin_cancel_document
 */
export type AdminCancelDocument = {
  DATA_TYPE: 'admin_cancel';
  id: number;
  message: string;
  task_id_list: string[];
  done: boolean;
};

/**
 * @see https://docs.globus.org/api/transfer/advanced_collection_management/#cancel_tasks
 */
export const cancel = function (
  options,
  sdkOptions?,
): Promise<
  JSONFetchResponse<{
    DATA_TYPE: 'admin_cancel';
    readonly id?: AdminCancelDocument['id'];
    readonly done?: AdminCancelDocument['done'];
  }>
> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint_manager/admin_cancel`,
      method: HTTP_METHODS.POST,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  query?: never;
  payload: {
    DATA_TYPE: AdminCancelDocument['DATA_TYPE'];
    task_id_list: AdminCancelDocument['task_id_list'];
    message: AdminCancelDocument['message'];
  };
}>;

/**
 * @see https://docs.globus.org/api/transfer/advanced_endpoint_management/#get_cancel_status_by_id
 */
export const getAdminCancel = function (
  admin_cancel_id,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<AdminCancelDocument>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint_manager/admin_cancel/${admin_cancel_id}`,
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
 * @see https://docs.globus.org/api/transfer/advanced_endpoint_management/#get_task_events
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
      path: `/v0.10/endpoint_manager/task/${task_id}/event_list`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: QueryParameters<{ filter_is_error?: 1 }, 'Offset'>;
    payload?: never;
  }
>;

/**
 * @see https://docs.globus.org/api/transfer/advanced_endpoint_management/#get_task_successful_transfers_as_admin
 */
export const getSuccessfulTransfers = function (
  task_id,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<PaginatedResponse<'Marker', SuccessfulTransfersDocument>>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint_manager/task/${task_id}/successful_transfers`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: QueryParameters<{}, 'Marker'>;
    payload?: never;
  }
>;

/**
 * @see https://docs.globus.org/api/transfer/advanced_endpoint_management/#get_task_skipped_errors_transfers_as_admin
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
      path: `/v0.10/endpoint_manager/task/${task_id}/skipped_errors`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: QueryParameters<{}, 'Marker'>;
    payload?: never;
  }
>;

/**
 * @see https://docs.globus.org/api/transfer/advanced_endpoint_management/#admin_pause_document
 */
export type AdminPauseDocument = {
  DATA_TYPE: 'admin_pause';
  task_id_list: string[];
  message: string;
};

/**
 * @see https://docs.globus.org/api/transfer/advanced_endpoint_management/#pause_tasks_as_admin
 */
export const pause = function (
  options,
  sdkOptions?,
): Promise<JSONFetchResponse<AdminPauseDocument>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint_manager/admin_pause`,
      method: HTTP_METHODS.POST,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  query?: never;
  payload?: Pick<AdminPauseDocument, 'task_id_list' | 'message' | 'DATA_TYPE'>;
}>;

/**
 * @see https://docs.globus.org/api/transfer/advanced_collection_management/#admin_resume_document
 */
export type AdminResumeDocument = {
  task_id_list: string[];
};

/**
 * @see https://docs.globus.org/api/transfer/advanced_endpoint_management/#resume_tasks_as_admin
 */
export const resume = function (
  options,
  sdkOptions?,
): Promise<JSONFetchResponse<AdminResumeDocument>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint_manager/admin_resume`,
      method: HTTP_METHODS.POST,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  query?: never;
  payload?: AdminResumeDocument;
}>;

/**
 * @see https://docs.globus.org/api/transfer/advanced_endpoint_management/#get_task_pause_info_as_admin
 */
export const getPauseInfo = function (
  task_id,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<PauseRuleDocument>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint_manager/task/${task_id}/pause_info`,
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
