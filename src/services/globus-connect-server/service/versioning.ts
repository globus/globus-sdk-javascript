import { serviceRequest } from '../../../services/shared.js';

import type { OpenAPI, GCSServiceMethod } from '../index';
import type { JSONFetchResponse } from '../../types';

/**
 * **This operation can be performed without an `Authorization` header.**
 * @see https://docs.globus.org/globus-connect-server/v5.4/api/openapi_Versioning/#getInfo
 */
export const info = function (
  configuration,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['getInfo']['responses']['200']['content']['application/json']
  >
> {
  return serviceRequest(
    {
      service: configuration,
      path: `/api/info`,
    },
    options,
    sdkOptions,
  );
} satisfies GCSServiceMethod<
  {
    query?: never;
    payload?: never;
  },
  Response,
  true
>;
