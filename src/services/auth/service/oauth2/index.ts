import { ID } from '../../config.js';
import {
  HTTP_METHODS,
  serviceRequest,
  normalizeServiceMethodArgs,
} from '../../../../services/shared.js';

import type { ServiceMethod } from '../../../types.js';

export const userinfo = function (arg1?: any, arg2?: any) {
  const { request, options } = normalizeServiceMethodArgs('auth.oauth2.userinfo', arg1, arg2);
  return serviceRequest(
    {
      service: ID,
      scope: undefined,
      path: `/v2/oauth2/userinfo`,
      method: HTTP_METHODS.GET,
    },
    request,
    options,
  );
} satisfies ServiceMethod<{
  payload: never;
}>;

export * as token from './token.js';
