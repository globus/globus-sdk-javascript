import { HTTP_METHODS, serviceRequest } from '../../../shared.js';

import { ID, SCOPES } from '../../config.js';

import type {
  ServiceMethod,
  ServiceMethodDynamicSegments,
  JSONFetchResponse,
} from '../../../../services/types.js';

/**
 * @see https://docs.globus.org/api/transfer/advanced_collection_management/#pause_rule_document
 */
export type PauseRuleDocument = {
  DATA_TYPE: 'pause_rule';
  id: string;
  message: string;
  start_time: string | null;
  endpoint_id: string;
  endpoint_display_name: string;
  identity_id: string;
  modified_by_id: string;
  created_by_host_manager: boolean;
  editable: boolean;
  pause_ls: boolean;
  pause_mkdir: boolean;
  pause_symlink: boolean;
  pause_rename: boolean;
  pause_task_delete: boolean;
  pause_task_transfer_delete: boolean;
  pause_task_transfer_read: boolean;
};

/**
 * Get a list of pause rules on endpoints that the current user has the "activity_monitor" role on.
 * @see https://docs.globus.org/api/transfer/advanced_endpoint_management/#get_pause_rules
 */
export const getAll = function (
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<{
    DATA_TYPE: 'pause_rule_list';
    DATA: PauseRuleDocument[];
  }>
> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint_manager/pause_rule_list`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  query?: { filter_endpoint?: string; filter_host_endpoint?: string };
  payload?: never;
}>;

/**
 * @see https://docs.globus.org/api/transfer/advanced_endpoint_management/#create_pause_rule
 */
export const create = function (
  options,
  sdkOptions?,
): Promise<JSONFetchResponse<PauseRuleDocument>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint_manager/pause_rule`,
      method: HTTP_METHODS.POST,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  payload: Partial<PauseRuleDocument>;
}>;

/**
 * Fetch a pause_rule by its UUID.
 * @see https://docs.globus.org/api/transfer/advanced_endpoint_management/#get_pause_rule
 */
export const get = function (
  pause_rule_id,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<PauseRuleDocument>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint_manager/pause_rule/${pause_rule_id}`,
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
 * @see https://docs.globus.org/api/transfer/advanced_endpoint_management/#update_pause_rule
 */
export const update = function (
  pause_rule_id,
  options,
  sdkOptions?,
): Promise<JSONFetchResponse<PauseRuleDocument>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint_manager/pause_rule/${pause_rule_id}`,
      method: HTTP_METHODS.PUT,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: never;
    payload: Partial<PauseRuleDocument>;
  }
>;

/**
 * @see https://docs.globus.org/api/transfer/advanced_endpoint_management/#delete_pause_rule
 */
export const remove = function (
  pause_rule_id,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<{
    DATA_TYPE: 'result';
    code: 'Deleted';
    message: string;
    request_id: string;
    resource: string;
  }>
> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint_manager/pause_rule/${pause_rule_id}`,
      method: HTTP_METHODS.DELETE,
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
