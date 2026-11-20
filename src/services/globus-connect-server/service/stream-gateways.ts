import { HTTP_METHODS, serviceRequest } from '../../../services/shared.js';

import type { OpenAPI, GCSServiceMethod, GCSServiceMethodDynamicSegments } from '../index.js';

import type { JSONFetchResponse } from '../../types.js';
import { createGCSServiceMethodFactory } from '../../factory.js';

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Stream_Gateways/#listStreamGateways
 */
export const getAll = function (
  configuration,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['listStreamGateways']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: '/api/stream_gateways',
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethod<OpenAPI.operations['listStreamGateways']['parameters']>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Stream_Gateways/#getStreamGateway
 */
export const get = function (
  configuration,
  streamGatewayId,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['getStreamGateway']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/stream_gateways/${streamGatewayId}`,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  OpenAPI.operations['getStreamGateway']['parameters']['path']['stream_gateway_id'],
  OpenAPI.operations['getStreamGateway']['parameters']
>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Stream_Gateways/#postStreamGateway
 */
export const create = function (
  configuration,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['postStreamGateway']['responses']['201']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: '/api/stream_gateways',
      method: HTTP_METHODS.POST,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethod<{
  payload: OpenAPI.operations['postStreamGateway']['requestBody']['content']['application/json'];
}>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Stream_Gateways/#patchStreamGateway
 */
export const update = function (
  configuration,
  streamGatewayId,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['patchStreamGateway']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/stream_gateways/${streamGatewayId}`,
      method: HTTP_METHODS.PUT,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  OpenAPI.operations['patchStreamGateway']['parameters']['path']['stream_gateway_id'],
  {
    payload: OpenAPI.operations['patchStreamGateway']['requestBody']['content']['application/json'];
  }
>;

/**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Stream_Gateways/#deleteStreamGateway
 */
export const remove = function (
  configuration,
  streamGateWayId,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['deleteStreamGateway']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      resource_server: configuration.endpoint_id,
      path: `/api/stream_gateways/${streamGateWayId}`,
      method: HTTP_METHODS.DELETE,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethodDynamicSegments<
  OpenAPI.operations['deleteStreamGateway']['parameters']['path']['stream_gateway_id'],
  OpenAPI.operations['deleteStreamGateway']['parameters']
>;

/**
 * @private
 */
export const next = {
  getAll: createGCSServiceMethodFactory({
    path: '/api/stream_gateways',
  }).generate<
    {
      request?: OpenAPI.operations['listStreamGateways']['parameters'];
    },
    JSONFetchResponse<
      OpenAPI.operations['listStreamGateways']['responses']['200']['content']['application/json']
    >
  >(),

  get: createGCSServiceMethodFactory({
    path: '/api/stream_gateways/{stream_gateway_id}',
  }).generate<
    {
      request?: {
        query?: OpenAPI.operations['getStreamGateway']['parameters']['query'];
        data?: never;
      };
    },
    JSONFetchResponse<
      OpenAPI.operations['getStreamGateway']['responses']['200']['content']['application/json']
    >
  >(),

  create: createGCSServiceMethodFactory({
    path: '/api/stream_gateways',
    method: HTTP_METHODS.POST,
  }).generate<
    {
      request?: OpenAPI.operations['postStreamGateway']['parameters'];
    },
    JSONFetchResponse<
      OpenAPI.operations['postStreamGateway']['responses']['201']['content']['application/json']
    >
  >(),

  update: createGCSServiceMethodFactory({
    path: '/api/stream_gateways/{stream_gateway_id}',
    method: HTTP_METHODS.PATCH,
  }).generate<
    {},
    JSONFetchResponse<
      OpenAPI.operations['patchStreamGateway']['responses']['200']['content']['application/json']
    >
  >(),

  remove: createGCSServiceMethodFactory({
    path: '/api/stream_gateways/{stream_gateway_id}',
    method: HTTP_METHODS.DELETE,
  }).generate<
    {},
    JSONFetchResponse<
      OpenAPI.operations['deleteStreamGateway']['responses']['200']['content']['application/json']
    >
  >(),
};
