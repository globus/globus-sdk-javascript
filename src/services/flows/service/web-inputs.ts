import { ID, SCOPES } from '../config.js';
import { HTTP_METHODS, serviceRequest } from '../../shared.js';
import { createServiceMethodFactory } from '../../factory.js';
import { RESOURCE_SERVERS } from '../../auth/config.js';

import type { OpenAPI } from '../index.js';
import type {
  JSONFetchResponse,
  ServiceMethod,
  ServiceMethodDynamicSegments,
} from '../../types.js';

export const get = function (
  web_input_id: string,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.paths['/web_inputs/{web_input_id}']['get']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.WEB_INPUT_VIEW,
      path: `/web_inputs/${web_input_id}`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: OpenAPI.paths['/web_inputs/{web_input_id}']['get']['parameters']['query'];
  },
  JSONFetchResponse<
    OpenAPI.paths['/web_inputs/{web_input_id}']['get']['responses']['200']['content']['application/json']
  >
>;

/**
 * @see https://flows.globus.org/redoc#tag/Web-Inputs/paths/~1web_inputs/get
 */
export const getAll = function (
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.paths['/web_inputs']['get']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.WEB_INPUT_VIEW,
      path: `/web_inputs`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  query?: OpenAPI.paths['/web_inputs']['get']['parameters']['query'];
}>;

/**
 * @see https://flows.globus.org/redoc#tag/Web-Inputs/paths/~1web_inputs~1%7Bweb_input_id%7D~1response/post
 */
export const respond = function (
  web_input_id: string,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.paths['/web_inputs/{web_input_id}/response']['post']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.WEB_INPUT_RESPOND,
      path: `/web_inputs/${web_input_id}/response`,
      method: HTTP_METHODS.POST,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    body: OpenAPI.paths['/web_inputs/{web_input_id}/response']['post']['requestBody']['content']['application/json'];
  },
  JSONFetchResponse<
    OpenAPI.paths['/web_inputs/{web_input_id}/response']['post']['responses']['200']['content']['application/json']
  >
>;

/**
 * @private
 */
export const next = {
  get: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS.FLOWS,
    path: `/web_inputs/{web_input_id}`,
  }).generate<
    {
      request?: {
        query?: OpenAPI.paths['/web_inputs/{web_input_id}']['get']['parameters']['query'];
      };
    },
    JSONFetchResponse<
      OpenAPI.paths['/web_inputs/{web_input_id}']['get']['responses']['200']['content']['application/json']
    >
  >(),
  getAll: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS.FLOWS,
    path: `/web_inputs`,
  }).generate<
    {
      request?: {
        query?: OpenAPI.paths['/web_inputs']['get']['parameters']['query'];
      };
    },
    JSONFetchResponse<
      OpenAPI.paths['/web_inputs']['get']['responses']['200']['content']['application/json']
    >
  >(),
  respond: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVERS.FLOWS,
    path: `/web_inputs/{web_input_id}/response`,
  }).generate<
    {
      request?: {
        query?: OpenAPI.paths['/web_inputs/{web_input_id}/response']['post']['parameters']['query'];
        data?: OpenAPI.paths['/web_inputs/{web_input_id}/response']['post']['requestBody']['content']['application/json'];
      };
    },
    JSONFetchResponse<
      OpenAPI.paths['/web_inputs/{web_input_id}/response']['post']['responses']['200']['content']['application/json']
    >
  >(),
};
