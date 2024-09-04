import type { components } from '@globus/types/timer';
import { HTTP_METHODS, serviceRequest } from '../../shared.js';
import { ID } from '../config.js';

import type { SDKOptions, ServiceMethod } from '../../types.js';

export const create = function (options, sdkOptions?: SDKOptions) {
  return serviceRequest(
    {
      service: ID,
      scope: 'https://auth.globus.org/scopes/524230d7-ea86-4a52-8312-86065a9e0417/timer',
      path: '/v2/timer',
      method: HTTP_METHODS.POST,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  payload: components['schemas']['V2TimerCreate'];
}>;
