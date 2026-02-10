import {
  HTTP_METHODS,
  serviceRequest,
  normalizeServiceMethodArgs,
  normalizeServiceMethodArgsWithSegments,
} from '../../shared.js';
import { ID as service } from '../config.js';
import { RESOURCE_SERVERS } from '../../auth/config.js';

import type {
  ServiceMethod,
  ServiceMethodDynamicSegments,
  JSONFetchResponse,
} from '../../../services/types.js';
import type { operations } from '../../../open-api/types/transfer.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
const resource_server = RESOURCE_SERVERS[service];

type GetAllOperation = operations['tunnels_list_tunnels_get'];
/**
 * Get a list of tunnels.
 */
export const getAll = function (
  arg1?: any,
  arg2?: any,
): Promise<JSONFetchResponse<GetAllOperation['responses']['200']['content']['application/json']>> {
  const { request, options } = normalizeServiceMethodArgs('transfer.tunnel.getAll', arg1, arg2);
  return serviceRequest(
    {
      service,
      resource_server,
      path: `/v2/tunnels`,
    },
    request,
    options,
  );
} satisfies ServiceMethod<{
  query?: GetAllOperation['parameters']['query'];
  payload?: GetAllOperation['requestBody'];
}>;

type GetOperation = operations['tunnels_get_tunnels__tunnel_uuid__get'];
/**
 * Get a tunnel by its UUID.
 */
export const get = function (
  arg1: any,
  arg2?: any,
  arg3?: any,
): Promise<JSONFetchResponse<GetOperation['responses']['200']['content']['application/json']>> {
  const { segments: tunnel_uuid, request, options } = normalizeServiceMethodArgsWithSegments(
    'transfer.tunnel.get',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service,
      resource_server,
      path: `/v2/tunnels/${tunnel_uuid}`,
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

type CreateOperation = operations['tunnels_post_tunnels_post'];
/**
 * Create a new tunnel.
 */
export const create = function (
  arg1: any,
  arg2?: any,
): Promise<JSONFetchResponse<CreateOperation['responses']['201']['content']['application/json']>> {
  const { request, options } = normalizeServiceMethodArgs('transfer.tunnel.create', arg1, arg2);
  return serviceRequest(
    {
      service,
      resource_server,
      path: `/v2/tunnels`,
      method: HTTP_METHODS.POST,
    },
    request,
    options,
  );
} satisfies ServiceMethod<{
  query?: CreateOperation['parameters']['query'];
  payload: CreateOperation['requestBody']['content']['application/json'];
}>;

type DeleteOperation = operations['tunnels_delete_tunnels__tunnel_uuid__delete'];
/**
 * Delete a tunnel by its UUID.
 */
export const remove = function (
  arg1: any,
  arg2?: any,
  arg3?: any,
): Promise<JSONFetchResponse<DeleteOperation['responses']['200']['content']['application/json']>> {
  const { segments: tunnel_uuid, request, options } = normalizeServiceMethodArgsWithSegments(
    'transfer.tunnel.remove',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service,
      resource_server,
      path: `/v2/tunnels/${tunnel_uuid}`,
      method: HTTP_METHODS.DELETE,
    },
    request,
    options,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: DeleteOperation['parameters']['query'];
    payload?: DeleteOperation['requestBody'];
  }
>;

type PatchOperation = operations['tunnels_patch_tunnels__tunnel_uuid__patch'];
type PatchPayload =
  PatchOperation['requestBody']['content']['application/json']['data']['attributes'];
/**
 * Start a tunnel that's in the `AWAITING_LISTENER` state.
 */
export const start = function (
  arg1: any,
  arg2: any,
  arg3?: any,
): Promise<JSONFetchResponse<PatchOperation['responses']['200']['content']['application/json']>> {
  const { segments: tunnel_uuid, request, options } = normalizeServiceMethodArgsWithSegments(
    'transfer.tunnel.start',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service,
      resource_server,
      path: `/v2/tunnels/${tunnel_uuid}`,
      method: HTTP_METHODS.PATCH,
    },
    { payload: { data: { attributes: { ...request?.payload } } } },
    options,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: PatchOperation['parameters']['query'];
    payload: NonNullable<Pick<PatchPayload, 'listener_ip_address' | 'listener_port'>> &
      Pick<PatchPayload, 'label'>;
  }
>;

/**
 * Stop a tunnel that isn't already in the `STOPPED` or `STOPPING` state.
 */
export const stop = function (
  arg1: any,
  arg2?: any,
  arg3?: any,
): Promise<JSONFetchResponse<PatchOperation['responses']['200']['content']['application/json']>> {
  const { segments: tunnel_uuid, request, options } = normalizeServiceMethodArgsWithSegments(
    'transfer.tunnel.stop',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service,
      resource_server,
      path: `/v2/tunnels/${tunnel_uuid}`,
      method: HTTP_METHODS.PATCH,
    },
    { payload: { data: { attributes: { ...request?.payload, state: 'STOPPING' } } } },
    options,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: PatchOperation['parameters']['query'];
    payload?: Pick<PatchPayload, 'label'>;
  }
>;

type GetEventsOperation =
  operations['get_tunnel_events_by_tunnel_uuid_tunnels__tunnel_uuid__events_get'];
/**
 * Get all events for a given tunnel.
 */
export const getEventList = function (
  arg1: any,
  arg2?: any,
  arg3?: any,
): Promise<
  JSONFetchResponse<GetEventsOperation['responses']['200']['content']['application/json']>
> {
  const { segments: tunnel_uuid, request, options } = normalizeServiceMethodArgsWithSegments(
    'transfer.tunnel.getEventList',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service,
      resource_server,
      path: `/v2/tunnels/${tunnel_uuid}/events`,
    },
    request,
    options,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: GetEventsOperation['parameters']['query'];
    payload?: GetEventsOperation['requestBody'];
  }
>;
