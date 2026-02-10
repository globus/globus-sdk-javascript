import {
  HTTP_METHODS,
  serviceRequest,
  wrapServiceMethod,
  wrapServiceMethodWithSegments,
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
export const getAll = wrapServiceMethod(
  'transfer.tunnel.getAll',
  function (
    options?: {
      query?: GetAllOperation['parameters']['query'];
      payload?: GetAllOperation['requestBody'];
    },
    sdkOptions?,
  ): Promise<JSONFetchResponse<GetAllOperation['responses']['200']['content']['application/json']>> {
    return serviceRequest(
      {
        service,
        resource_server,
        path: `/v2/tunnels`,
      },
      options,
      sdkOptions,
    );
  },
) satisfies ServiceMethod<{
  query?: GetAllOperation['parameters']['query'];
  payload?: GetAllOperation['requestBody'];
}>;

type GetOperation = operations['tunnels_get_tunnels__tunnel_uuid__get'];
/**
 * Get a tunnel by its UUID.
 */
export const get = wrapServiceMethodWithSegments(
  'transfer.tunnel.get',
  function (
    tunnel_uuid: string,
    options?: {
      query?: GetOperation['parameters']['query'];
      payload?: GetOperation['requestBody'];
    },
    sdkOptions?,
  ): Promise<JSONFetchResponse<GetOperation['responses']['200']['content']['application/json']>> {
    return serviceRequest(
      {
        service,
        resource_server,
        path: `/v2/tunnels/${tunnel_uuid}`,
      },
      options,
      sdkOptions,
    );
  },
) satisfies ServiceMethodDynamicSegments<
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
export const create = wrapServiceMethod(
  'transfer.tunnel.create',
  function (
    options?: {
      query?: CreateOperation['parameters']['query'];
      payload: CreateOperation['requestBody']['content']['application/json'];
    },
    sdkOptions?,
  ): Promise<JSONFetchResponse<CreateOperation['responses']['201']['content']['application/json']>> {
    return serviceRequest(
      {
        service,
        resource_server,
        path: `/v2/tunnels`,
        method: HTTP_METHODS.POST,
      },
      options,
      sdkOptions,
    );
  },
) satisfies ServiceMethod<{
  query?: CreateOperation['parameters']['query'];
  payload: CreateOperation['requestBody']['content']['application/json'];
}>;

type DeleteOperation = operations['tunnels_delete_tunnels__tunnel_uuid__delete'];
/**
 * Delete a tunnel by its UUID.
 */
export const remove = wrapServiceMethodWithSegments(
  'transfer.tunnel.remove',
  function (
    tunnel_uuid: string,
    options?: {
      query?: DeleteOperation['parameters']['query'];
      payload?: DeleteOperation['requestBody'];
    },
    sdkOptions?,
  ): Promise<JSONFetchResponse<DeleteOperation['responses']['200']['content']['application/json']>> {
    return serviceRequest(
      {
        service,
        resource_server,
        path: `/v2/tunnels/${tunnel_uuid}`,
        method: HTTP_METHODS.DELETE,
      },
      options,
      sdkOptions,
    );
  },
) satisfies ServiceMethodDynamicSegments<
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
export const start = wrapServiceMethodWithSegments(
  'transfer.tunnel.start',
  function (
    tunnel_uuid: string,
    options?: {
      query?: PatchOperation['parameters']['query'];
      payload: NonNullable<Pick<PatchPayload, 'listener_ip_address' | 'listener_port'>> &
        Pick<PatchPayload, 'label'>;
    },
    sdkOptions?,
  ): Promise<JSONFetchResponse<PatchOperation['responses']['200']['content']['application/json']>> {
    return serviceRequest(
      {
        service,
        resource_server,
        path: `/v2/tunnels/${tunnel_uuid}`,
        method: HTTP_METHODS.PATCH,
      },
      { payload: { data: { attributes: { ...options?.payload } } } },
      sdkOptions,
    );
  },
) satisfies ServiceMethodDynamicSegments<
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
export const stop = wrapServiceMethodWithSegments(
  'transfer.tunnel.stop',
  function (
    tunnel_uuid: string,
    options?: {
      query?: PatchOperation['parameters']['query'];
      payload?: Pick<PatchPayload, 'label'>;
    },
    sdkOptions?,
  ): Promise<JSONFetchResponse<PatchOperation['responses']['200']['content']['application/json']>> {
    return serviceRequest(
      {
        service,
        resource_server,
        path: `/v2/tunnels/${tunnel_uuid}`,
        method: HTTP_METHODS.PATCH,
      },
      { payload: { data: { attributes: { ...options?.payload, state: 'STOPPING' } } } },
      sdkOptions,
    );
  },
) satisfies ServiceMethodDynamicSegments<
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
export const getEventList = wrapServiceMethodWithSegments(
  'transfer.tunnel.getEventList',
  function (
    tunnel_uuid: string,
    options?: {
      query?: GetEventsOperation['parameters']['query'];
      payload?: GetEventsOperation['requestBody'];
    },
    sdkOptions?,
  ): Promise<
    JSONFetchResponse<GetEventsOperation['responses']['200']['content']['application/json']>
  > {
    return serviceRequest(
      {
        service,
        resource_server,
        path: `/v2/tunnels/${tunnel_uuid}/events`,
      },
      options,
      sdkOptions,
    );
  },
) satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: GetEventsOperation['parameters']['query'];
    payload?: GetEventsOperation['requestBody'];
  }
>;
