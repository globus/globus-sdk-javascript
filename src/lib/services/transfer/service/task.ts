import { HTTP_METHODS, serviceRequest } from '../../shared.js';

import { ID, SCOPES } from '../config.js';

import type {
  ServiceMethod,
  ServiceMethodDynamicSegments,
  JSONFetchResponse,
} from '../../../services/types.js';

import type { Transfer } from '../types.js';

/**
 * Get a list of tasks submitted by the current user.
 * @see https://docs.globus.org/api/transfer/task/#get_task_list
 */
export const getAll = function (
  options = {},
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    {
      DATA_TYPE: 'task_list';
      DATA: Globus.Transfer.TaskDocument[];
    } & Transfer['Paging']['Offset']['Response']
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
  query?: Transfer['Paging']['Offset']['Query'];
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
): Promise<JSONFetchResponse<Globus.Transfer.TaskDocument>> {
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
): Promise<JSONFetchResponse<Globus.Transfer.TaskDocument>> {
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
): Promise<JSONFetchResponse<Globus.Transfer.TaskDocument>> {
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
 * @see https://docs.globus.org/api/transfer/task/#get_event_list
 */
export const getEventList = function (
  task_id,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<Globus.Transfer.TaskEventListDocument>> {
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
    query?: Transfer['Paging']['Offset']['Query'];
    headers?: Record<string, string>;
    payload?: never;
  }
>;

/**
 * @see https://docs.globus.org/api/transfer/task/#get_task_successful_transfers
 */
export const getSuccessfulTransfers = function (
  task_id,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<Globus.Transfer.SuccessfulTransfersListDocument>> {
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
    query?: Transfer['Paging']['Marker']['Query'];
    headers?: Record<string, string>;
    payload?: never;
  }
>;

/**
 * @see https://docs.globus.org/api/transfer/task/#get_task_skipped_errors
 */
export const getSkippedErrors = function (
  task_id,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<Globus.Transfer.SkippedErrorsListDocument>> {
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
    query?: Transfer['Paging']['Marker']['Query'];
    headers?: Record<string, string>;
    payload?: never;
  }
>;

/**
 * @see https://docs.globus.org/api/transfer/task/#get_task_pause_info
 */
export const getPauseInfo = function (
  task_id,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<Globus.Transfer.PauseInfoLimitedDocument>> {
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
