import { serviceRequest } from '../../shared.js';
import { ID, SCOPES } from '../config.js';
import { RESOURCE_SERVERS } from '../../auth/config.js';
import { createServiceMethodFactory } from '../../factory.js';

import type { JSONFetchResponse, SDKOptions, ServiceMethodOptions } from '../../types.js';
import type { OpenAPI } from '../index.js';

/**
 * Task document types from OpenAPI
 */
export type Task = OpenAPI.components['schemas']['Task'];
export type TaskList = OpenAPI.components['schemas']['TaskList'];
export type TaskSubmitResponse = OpenAPI.components['schemas']['TaskSubmitResponse'];

/**
 * Get a task by ID.
 * @param task_id The UUID of the task to retrieve.
 *
 * @see https://docs.globus.org/api/search/reference/get_task/
 */
export const get = function (
  task_id: string,
  options?: ServiceMethodOptions,
  sdkOptions?: SDKOptions,
): Promise<JSONFetchResponse<Task>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.SEARCH,
      path: `/v1/task/${task_id}`,
    },
    options,
    sdkOptions,
  );
};

/**
 * Get a list of tasks for an index.
 * @param index_id The UUID of the index.
 *
 * @see https://docs.globus.org/api/search/reference/task_list/
 */
export const getAll = function (
  index_id: string,
  options?: ServiceMethodOptions,
  sdkOptions?: SDKOptions,
): Promise<JSONFetchResponse<TaskList>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.SEARCH,
      path: `/v1/task_list/${index_id}`,
    },
    options,
    sdkOptions,
  );
};

/**
 * @private
 */
export const next = {
  /**
   * Get a task by ID.
   * @param task_id The UUID of the task to retrieve.
   *
   * @see https://docs.globus.org/api/search/reference/get_task/
   */
  get: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS[ID],
    path: `/v1/task/{task_id}`,
  }).generate<
    {
      request?: {
        query?: never;
        data?: never;
      };
    },
    JSONFetchResponse<Task>
  >(),
  /**
   * Get a list of tasks for an index.
   * @param index_id The UUID of the index.
   *
   * @see https://docs.globus.org/api/search/reference/task_list/
   */
  getAll: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS[ID],
    path: `/v1/task_list/{index_id}`,
  }).generate<
    {
      request?: {
        query?: never;
        data?: never;
      };
    },
    JSONFetchResponse<TaskList>
  >(),
};
