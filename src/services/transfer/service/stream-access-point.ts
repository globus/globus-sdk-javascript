import { serviceRequest } from '../../shared.js';
import { ID, SCOPES } from '../config.js';

import type {
  ServiceMethodDynamicSegments,
  JSONFetchResponse,
  ServiceMethod,
} from '../../../services/types.js';
import { operations } from '../../../open-api/types/transfer.js';

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
      service: ID,
      scope: SCOPES.ALL,
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
      service: ID,
      scope: SCOPES.ALL,
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
