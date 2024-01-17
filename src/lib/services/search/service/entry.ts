import { serviceRequest } from '../../shared.js';
import { ID, SCOPES } from '../config.js';

import type { ResultFormatVersion } from '../types.js';
import type { ServiceMethodDynamicSegments } from '../../types.js';

/**
 * Lookup a single Entry in a Search Index.
 * @param index_id The UUID of the index to query.
 *
 * @see https://docs.globus.org/api/search/reference/get_entry/
 */
export const get = function (index_id, options?, sdkOptions?) {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.SEARCH,
      path: `/v1/index/${index_id}/entry`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    /**
     * @see https://docs.globus.org/api/search/reference/get_entry/#parameters
     */
    query?: {
      subject: string;
      entry_id?: string;
      result_format_version?: ResultFormatVersion | string;
      bypass_visible_to?: 'true' | 'false';
    };
  }
>;
