import { serviceRequest } from '../../shared.js';
import { ID, SCOPES } from '../config.js';
import { createServiceMethodFactory } from '../../factory.js';

import type { ServiceMethodDynamicSegments } from '../../types.js';
import type { ResultFormatVersion } from '../types.js';

/**
 * Lookup a single Subject in a Search Index.
 * @param index_id The UUID of the Search index where the lookup will be performed.
 *
 * @see https://docs.globus.org/api/search/reference/get_subject/
 */
export const get = function (index_id, options?, sdkOptions?) {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.SEARCH,
      path: `/v1/index/${index_id}/subject`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    /**
     * @see https://docs.globus.org/api/search/reference/get_subject/#parameters
     */
    query: {
      subject: string;
      result_format_version?: ResultFormatVersion | string;
      bypass_visible_to?: 'true' | 'false';
    };
  }
>;

/**
 * @private
 */
export const next = {
  get: createServiceMethodFactory({
    service: ID,
    resource_server: RESOURCE_SERVER,
    path: `/v1/index/{index_id}/subject`,
  }).generate<{
    request?: {
      query?: {
        subject: string;
        result_format_version?: ResultFormatVersion | string;
        bypass_visible_to?: 'true' | 'false';
      };
    };
  }>(),
};
