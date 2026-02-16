import { HTTP_METHODS, serviceRequest } from '../../shared.js';
import { ID as service } from '../config.js';
import { RESOURCE_SERVERS } from '../../auth/config.js';

import type {
  ServiceMethod,
  ServiceMethodDynamicSegments,
  JSONFetchResponse,
} from '../../../services/types.js';
import { createServiceMethodFactory } from '../../factory.js';

import type { operations } from '../../../open-api/types/transfer.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
const resource_server = RESOURCE_SERVERS[service];

type GetAllOperation = operations['tunnels_list_tunnels_get'];
/**
 * Get a list of tunnels.
 */
export const getAll = function (
  options?,
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
} satisfies ServiceMethod<{
  query?: GetAllOperation['parameters']['query'];
  payload?: GetAllOperation['requestBody'];
}>;

type GetOperation = operations['tunnels_get_tunnels__tunnel_uuid__get'];
/**
 * Get a tunnel by its UUID.
 */
export const get = function (
  tunnel_uuid,
  options?,
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
  options,
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
} satisfies ServiceMethod<{
  query?: CreateOperation['parameters']['query'];
  payload: CreateOperation['requestBody']['content']['application/json'];
}>;

type DeleteOperation = operations['tunnels_delete_tunnels__tunnel_uuid__delete'];
/**
 * Delete a tunnel by its UUID.
 */
export const remove = function (
  tunnel_uuid,
  options?,
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
  tunnel_uuid,
  options,
  sdkOptions?,
): Promise<JSONFetchResponse<PatchOperation['responses']['200']['content']['application/json']>> {
  return serviceRequest(
    {
      service,
      resource_server,
      path: `/v2/tunnels/${tunnel_uuid}`,
      method: HTTP_METHODS.PATCH,
    },
    { payload: { data: { attributes: { ...options.payload } } } },
    sdkOptions,
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
  tunnel_uuid,
  options = {},
  sdkOptions?,
): Promise<JSONFetchResponse<PatchOperation['responses']['200']['content']['application/json']>> {
  return serviceRequest(
    {
      service,
      resource_server,
      path: `/v2/tunnels/${tunnel_uuid}`,
      method: HTTP_METHODS.PATCH,
    },
    { payload: { data: { attributes: { ...options.payload, state: 'STOPPING' } } } },
    sdkOptions,
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
  tunnel_uuid,
  options?,
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
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: GetEventsOperation['parameters']['query'];
    payload?: GetEventsOperation['requestBody'];
  }
>;

/**
 * @private
 */
export const next = {
  getAll: createServiceMethodFactory({
    service,
    resource_server,
    path: `/v2/tunnels`,
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
    resource_server,
    path: `/v2/tunnels/{id}`,
  }).generate<
    {
      request?: {
        query?: GetOperation['parameters']['query'];
        data?: GetOperation['requestBody'];
      };
    },
    JSONFetchResponse<GetOperation['responses']['200']['content']['application/json']>
  >(),
  start: createServiceMethodFactory({
    service,
    resource_server,
    path: `/v2/tunnels/{id}`,
    method: HTTP_METHODS.PATCH,
    transform: (payload) => ({
      ...payload,
      request: {
        ...payload?.request,
        data: { data: { attributes: payload?.request?.data } },
      },
    }),
  }).generate<
    {
      request?: {
        query?: PatchOperation['parameters']['query'];
        data: NonNullable<Pick<PatchPayload, 'listener_ip_address' | 'listener_port'>> &
          Pick<PatchPayload, 'label'>;
      };
    },
    JSONFetchResponse<PatchOperation['responses']['200']['content']['application/json']>
  >(),
  remove: createServiceMethodFactory({
    service,
    resource_server,
    path: `/v2/tunnels/{id}`,
    method: HTTP_METHODS.DELETE,
  }).generate<
    {
      request?: {
        query?: DeleteOperation['parameters']['query'];
        data?: DeleteOperation['requestBody'];
      };
    },
    JSONFetchResponse<DeleteOperation['responses']['200']['content']['application/json']>
  >(),
  create: createServiceMethodFactory({
    service,
    resource_server,
    path: `/v2/tunnels`,
    method: HTTP_METHODS.POST,
  }).generate<
    {
      request?: {
        query?: CreateOperation['parameters']['query'];
        data: CreateOperation['requestBody']['content']['application/json'];
      };
    },
    JSONFetchResponse<CreateOperation['responses']['201']['content']['application/json']>
  >(),
  stop: createServiceMethodFactory({
    service,
    resource_server,
    path: `/v2/tunnels/{id}`,
    method: HTTP_METHODS.PATCH,
    transform: (payload) => ({
      ...payload,
      request: {
        ...payload?.request,
        data: { data: { attributes: { ...payload?.request?.data, state: 'STOPPING' } } },
      },
    }),
  }).generate<
    {
      request?: {
        query?: PatchOperation['parameters']['query'];
        data?: Pick<PatchPayload, 'label'>;
      };
    },
    JSONFetchResponse<PatchOperation['responses']['200']['content']['application/json']>
  >(),
  getEventList: createServiceMethodFactory({
    service,
    resource_server,
    path: `/v2/tunnels/{id}/events`,
  }).generate<
    {
      request?: {
        query?: GetEventsOperation['parameters']['query'];
        data?: GetEventsOperation['requestBody'];
      };
    },
    JSONFetchResponse<GetEventsOperation['responses']['200']['content']['application/json']>
  >(),
};
