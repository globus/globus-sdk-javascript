import {
  serviceRequest,
  normalizeServiceMethodArgsWithSegments,
} from '../../shared.js';
import { ID, SCOPES } from '../config.js';

import type { ResultFormatVersion } from '../types.js';
import type { ServiceMethodDynamicSegments } from '../../types.js';

/**
 * Lookup a single Entry in a Search Index.
 * @param index_id The UUID of the Search index where the lookup will be performed.
 *
 * @see https://docs.globus.org/api/search/reference/get_entry/
 */
export const get = function (arg1: any, arg2?: any, arg3?: any) {
  const { segments: index_id, request, options } = normalizeServiceMethodArgsWithSegments(
    'search.entry.get',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.SEARCH,
      path: `/v1/index/${index_id}/entry`,
    },
    request,
    options,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    /**
     * @see https://docs.globus.org/api/search/reference/get_entry/#parameters
     */
    query: {
      subject: string;
      entry_id?: string;
      result_format_version?: ResultFormatVersion | string;
      bypass_visible_to?: 'true' | 'false';
    };
  }
>;
