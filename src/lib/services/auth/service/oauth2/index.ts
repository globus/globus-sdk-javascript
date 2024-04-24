import { ID } from '../../config.js';
import { HTTP_METHODS, serviceRequest } from '../../../../services/shared.js';

import type { ServiceMethod } from '../../../types.js';

export const userinfo = function (options?, sdkOptions?) {
  return serviceRequest(
    {
      service: ID,
      scope: undefined,
      path: `/v2/oauth2/userinfo`,
      method: HTTP_METHODS.GET,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  payload: never;
}>;

export * as token from './token.js';
