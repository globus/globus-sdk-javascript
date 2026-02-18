import { serviceRequest } from '../../shared.js';
import { ID as service } from '../config.js';
import { RESOURCE_SERVERS } from '../../auth/config.js';
import { createServiceMethodFactory } from '../../factory.js';

import type {
  ServiceMethodDynamicSegments,
  JSONFetchResponse,
  ServiceMethod,
} from '../../../services/types.js';
import type { operations } from '../../../open-api/types/transfer.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
const resource_server = RESOURCE_SERVERS[service];

type GetAllOperation = operations['stream_access_points_list_stream_access_points_get'];
/**
 * Get a list of all stream access points.
 */
export const getAll = function (
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<GetAllOperation['responses']['200']['content']['application/json']>> {
  return serviceRequest(
    {
      service,
      resource_server,
      path: `/v2/stream_access_points`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  query?: GetAllOperation['parameters']['query'];
  payload?: GetAllOperation['requestBody'];
}>;

type GetOperation =
  operations['stream_access_points_get_stream_access_points__stream_access_point_uuid__get'];
/**
 * Fetch a stream-access-point by its UUID.
 */
export const get = function (
  stream_access_point_uuid,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<GetOperation['responses']['200']['content']['application/json']>> {
  return serviceRequest(
    {
      service,
      resource_server,
      path: `/v2/stream_access_points/${stream_access_point_uuid}`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: GetOperation['parameters']['query'];
    payload?: GetOperation['requestBody'];
  }
>;

/**
 * @private
 */
export const next = {
  getAll: createServiceMethodFactory({
    service,
    resource_server: RESOURCE_SERVERS.TRANSFER,
    path: `/v2/stream_access_points`,
  }).generate<
    {
      request?: {
        query?: GetAllOperation['parameters']['query'];
        data?: GetAllOperation['requestBody'];
      };
    },
    JSONFetchResponse<GetAllOperation['responses']['200']['content']['application/json']>
  >(),
  get: createServiceMethodFactory({
    service,
    resource_server: RESOURCE_SERVERS.TRANSFER,
    path: `/v2/stream_access_points/{stream_access_point_uuid}`,
  }).generate<
    {
      request?: {
        query?: GetOperation['parameters']['query'];
        data?: GetOperation['requestBody'];
      };
    },
    JSONFetchResponse<GetOperation['responses']['200']['content']['application/json']>
  >(),
};
