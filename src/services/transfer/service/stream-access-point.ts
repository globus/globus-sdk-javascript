import {
  serviceRequest,
  normalizeServiceMethodArgs,
  normalizeServiceMethodArgsWithSegments,
} from '../../shared.js';
import { ID as service } from '../config.js';
import { RESOURCE_SERVERS } from '../../auth/config.js';

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
  arg1?: any,
  arg2?: any,
): Promise<JSONFetchResponse<GetAllOperation['responses']['200']['content']['application/json']>> {
  const { request, options } = normalizeServiceMethodArgs('transfer.stream-access-point.getAll', arg1, arg2);
  return serviceRequest(
    {
      service,
      resource_server,
      path: `/v2/stream_access_points`,
    },
    request,
    options,
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
  arg1: any,
  arg2?: any,
  arg3?: any,
): Promise<JSONFetchResponse<GetOperation['responses']['200']['content']['application/json']>> {
  const { segments: stream_access_point_uuid, request, options } = normalizeServiceMethodArgsWithSegments(
    'transfer.stream-access-point.get',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service,
      resource_server,
      path: `/v2/stream_access_points/${stream_access_point_uuid}`,
    },
    request,
    options,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: GetOperation['parameters']['query'];
    payload?: GetOperation['requestBody'];
  }
>;
