import { HTTP_METHODS, serviceRequest } from '../../../shared.js';

import { ID, SCOPES } from '../../config.js';

import type {
  ServiceMethod,
  ServiceMethodDynamicSegments,
  JSONFetchResponse,
} from '../../../../services/types.js';

import type { Transfer } from '../../types.js';

/**
 * @see https://docs.globus.org/api/transfer/advanced_endpoint_management/#get_tasks
 */
export const getAll = function (options = {}, sdkOptions?) {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/task_list`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<
  {
    query?: Globus.Transfer.AdminTaskQuery;
    payload?: never;
  },
  JSONFetchResponse<
    {
      DATA_TYPE: 'task_list';
      DATA: Globus.Transfer.EndpointManagerTaskDocument[];
    } & Transfer['Paging']['LastKey']['Response']
  >
>;

/**
 * @see https://docs.globus.org/api/transfer/advanced_endpoint_management/#get_task
 */
export const get = function (task_id, options?, sdkOptions?) {
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
  },
  JSONFetchResponse<Globus.Transfer.EndpointManagerTaskDocument>
>;

/**
 * @see https://docs.globus.org/api/transfer/advanced_endpoint_management/#admin_cancel
 */
export const cancel = function (options, sdkOptions?) {
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
} satisfies ServiceMethod<
  {
    query?: never;
    payload: Globus.Transfer.AdminCancelDocument;
  },
  JSONFetchResponse<Globus.Transfer.AdminCancelDocumentResponse>
>;

/**
 * @see https://docs.globus.org/api/transfer/advanced_endpoint_management/#get_cancel_status_by_id
 */
export const getAdminCancel = function (admin_cancel_id, options?, sdkOptions?) {
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
  },
  JSONFetchResponse<Globus.Transfer.AdminCancelDocumentResponse>
>;

/**
 * @see https://docs.globus.org/api/transfer/advanced_endpoint_management/#get_task_events
 */
export const getEventList = function (task_id, options?, sdkOptions?) {
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
    query?: Transfer['Paging']['Offset']['Query'] & { filter_is_error?: 1 };
    payload?: never;
  },
  JSONFetchResponse<Globus.Transfer.TaskEventListDocument>
>;

/**
 * @see https://docs.globus.org/api/transfer/advanced_endpoint_management/#get_task_successful_transfers_as_admin
 */
export const getSuccessfulTransfers = function (task_id, options?, sdkOptions?) {
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
    query?: Transfer['Paging']['Marker']['Query'];
    payload?: never;
  },
  JSONFetchResponse<Globus.Transfer.SuccessfulTransfersDocument>
>;

/**
 * @see https://docs.globus.org/api/transfer/advanced_endpoint_management/#get_task_skipped_errors_transfers_as_admin
 */
export const getSkippedErrors = function (task_id, options?, sdkOptions?) {
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
    query?: Transfer['Paging']['Marker']['Query'];
    payload?: never;
  },
  JSONFetchResponse<Globus.Transfer.SkippedErrorsDocument>
>;

/**
 * @see https://docs.globus.org/api/transfer/advanced_endpoint_management/#pause_tasks_as_admin
 */
export const pause = function (options, sdkOptions?) {
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
} satisfies ServiceMethod<
  {
    query?: never;
    payload?: Globus.Transfer.AdminPauseDocument;
  },
  JSONFetchResponse<Globus.Transfer.AdminPauseDocumentResponse>
>;

/**
 * @see https://docs.globus.org/api/transfer/advanced_endpoint_management/#resume_tasks_as_admin
 */
export const resume = function (options = {}, sdkOptions?) {
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
} satisfies ServiceMethod<
  {
    query?: never;
    payload?: Globus.Transfer.AdminResumeDocument;
  },
  JSONFetchResponse<Globus.Transfer.AdminResumeDocument>
>;

/**
 * @see https://docs.globus.org/api/transfer/advanced_endpoint_management/#get_task_pause_info_as_admin
 */
export const getPauseInfo = function (task_id, options?, sdkOptions?) {
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
  },
  JSONFetchResponse<Globus.Transfer.AdminPauseDocumentResponse>
>;