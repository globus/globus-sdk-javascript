import {
  HTTP_METHODS,
  serviceRequest,
  normalizeServiceMethodArgs,
} from '../../shared.js';
import { ID } from '../config.js';

import type { OpenAPI } from '../index.js';
import type { ServiceMethod } from '../../types.js';
import { RESOURCE_SERVERS } from '../../auth/config.js';

/**
 * The Timer OpenAPI definitions include default vaules which will present as **required** in
 * the creation context. We're overriding the generated types to make these fields optional.
 */
type OpenAPITimer = OpenAPI.components['schemas']['V2TransferTimerCreate'];
type OpenAPITransferTaskDocument = OpenAPI.components['schemas']['TransferTaskDocument'];

type TransferTaskDocument = Omit<
  OpenAPITransferTaskDocument,
  | 'DATA_TYPE'
  | 'delete_destination_extra'
  | 'encrypt_data'
  | 'fail_on_quota_errors'
  | 'notify_on_failed'
  | 'notify_on_inactive'
  | 'notify_on_succeeded'
  | 'preserve_timestamp'
  | 'skip_source_errors'
  | 'store_base_path_info'
  | 'verify_checksum'
> & {
  DATA_TYPE?: OpenAPITransferTaskDocument['DATA_TYPE'];
  delete_destination_extra?: OpenAPITransferTaskDocument['delete_destination_extra'];
  encrypt_data?: OpenAPITransferTaskDocument['encrypt_data'];
  fail_on_quota_errors?: OpenAPITransferTaskDocument['fail_on_quota_errors'];
  notify_on_failed?: OpenAPITransferTaskDocument['notify_on_failed'];
  notify_on_inactive?: OpenAPITransferTaskDocument['notify_on_inactive'];
  notify_on_succeeded?: OpenAPITransferTaskDocument['notify_on_succeeded'];
  preserve_timestamp?: OpenAPITransferTaskDocument['preserve_timestamp'];
  skip_source_errors?: OpenAPITransferTaskDocument['skip_source_errors'];
  store_base_path_info?: OpenAPITransferTaskDocument['store_base_path_info'];
  verify_checksum?: OpenAPITransferTaskDocument['verify_checksum'];
};

type TimerCreatePayload = {
  timer: Omit<OpenAPITimer, 'resource_server' | 'body'> & {
    resource_server?: OpenAPITimer['resource_server'];
    body: TransferTaskDocument;
  };
};

export const create = function (arg1: any, arg2?: any) {
  const { request, options } = normalizeServiceMethodArgs('timers.timer.create', arg1, arg2);
  return serviceRequest(
    {
      service: ID,
      resource_server: RESOURCE_SERVERS.TIMERS,
      path: '/v2/timer',
      method: HTTP_METHODS.POST,
    },
    request,
    options,
  );
} satisfies ServiceMethod<{
  payload: TimerCreatePayload;
}>;
