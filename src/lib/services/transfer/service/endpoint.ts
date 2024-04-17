import { HTTP_METHODS, serviceRequest } from '../../shared.js';
import { ID, SCOPES } from '../config.js';

import type {
  ServiceMethodDynamicSegments,
  JSONFetchResponse,
  ServiceMethod,
} from '../../../services/types.js';

/**
 * Fetch an endpoint by its UUID.
 */
export const get = function (
  endpoint_xid,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<Globus.Transfer.EndpointDocument>> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint/${endpoint_xid}`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: never;
    payload?: never;
  }
>;

/**
 * Create a Globus Connect Personal guest collection.
 * As of 2024-04-17, this method (and the Transfer API) only supports creating Globus Connect Personal guest collections.
 *
 * Globus Connect Personal mapped collections are created from the Globus Connect Personal application.
 * All GCSv5 collections should be created using Globus Connect Server (i.e. {@link "@globus/sdk".gcs.collections.create | `gcs.collections.create`}).
 *
 * @see https://docs.globus.org/api/transfer/gcp_management/#create_guest_collection
 */
export const create = function (
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<{
    DATA_TYPE: 'endpoint_create_result';
    code: 'Created';
    globus_connect_setup_key: string | null;
    id: string;
    message: string;
    request_id: string;
    resource: '/shared_endpoint';
  }>
> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: '/v0.10/shared_endpoint',
      method: HTTP_METHODS.POST,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  payload?: Globus.Transfer.GuestCollectionDocument;
}>;

/**
 * Update a Globus Connect Personal collection.
 * As of 2024-04-17, this method (and the Transfer API) only supports updating Globus Connect Personal collections.
 *
 * All GCSv5 collections should be updated using Globus Connect Server (i.e. {@link "@globus/sdk".gcs.collections.update | `gcs.collections.update`}).
 *
 * @see https://docs.globus.org/api/transfer/gcp_management/#update_collection_by_id
 */
export const update = function (
  endpoint_xid,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<{
    DATA_TYPE: 'result';
    code: 'Updated';
    message: string;
    request_id: string;
    resource: `/endpoint/${string}`;
  }>
> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint/${endpoint_xid}`,
      method: HTTP_METHODS.PUT,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    payload: Partial<Globus.Transfer.EndpointDocument>;
  }
>;

/**
 * Delete a Globus Connect Personal entity by its UUID.
 * As of 2024-01-08, this method (and the Transfer API) only supports deleting Globus Connect Personal entities.
 *
 * All GCSv5 endpoints and collections should be deleted (and managed) using Globus Connect Server (i.e. {@link "@globus/sdk".gcs.collections.remove | `gcs.collections.remove`}).
 *
 * @see https://docs.globus.org/api/transfer/gcp_management/#delete_endpoint_by_id
 */
export const remove = function (
  endpoint_xid,
  options?,
  sdkOptions?,
): Promise<
  JSONFetchResponse<{
    DATA_TYPE: 'result';
    code: 'Deleted';
    message: string;
    request_id: string;
    resource: `/endpoint/${string}`;
  }>
> {
  return serviceRequest(
    {
      service: ID,
      scope: SCOPES.ALL,
      path: `/v0.10/endpoint/${endpoint_xid}`,
      method: HTTP_METHODS.DELETE,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: never;
    payload?: never;
  }
>;
