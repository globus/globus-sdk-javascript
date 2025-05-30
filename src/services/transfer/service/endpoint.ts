import { HTTP_METHODS, serviceRequest } from '../../shared.js';
import { ID, SCOPES } from '../config.js';

import type {
  ServiceMethodDynamicSegments,
  JSONFetchResponse,
  ServiceMethod,
  ExtractKeys,
} from '../../../services/types.js';

/**
 * @see https://docs.globus.org/api/transfer/endpoint_roles/
 */
export type EndpointRole =
  | 'administrator'
  | 'access_manager'
  | 'activity_manager'
  | 'activity_monitor';

export type EntityType =
  | 'GCSv5_endpoint'
  | 'GCSv5_mapped_collection'
  | 'GCSv5_guest_collection'
  | 'GCP_mapped_collection'
  | 'GCP_guest_collection';

/**
 * @see https://docs.globus.org/api/transfer/endpoints_and_collections/#server_document
 */
export type ServerDocument = {
  DATA_TYPE: 'server';
  id: number;
  hostname: null | string;
  port: null | number;
  scheme: null | 'ftp' | 'gsiftp';
  subject: null | string;
  incoming_data_port_start: null | number;
  incoming_data_port_end: null | number;
  outgoing_data_port_start: null | number;
  outgoing_data_port_end: null | number;
  /**
   * @deprecated
   */
  uri: string;
  /**
   * @deprecated
   */
  is_connected: boolean;
  /**
   * @deprecated
   */
  is_paused: boolean;
};

/**
 * @see https://docs.globus.org/api/transfer/endpoints_and_collections/#endpoint_or_collection_document
 */
export type EndpointDocument = {
  DATA_TYPE: 'endpoint';
  DATA?: ServerDocument[];
  id: string;
  display_name: string;
  organization: string | null;
  department: string | null;
  keywords: string | null;
  /**
   * @deprecated
   */
  name: string | null;
  /**
   * @deprecated use `id` instead in API requests, and use `display_name`
   *             to display to users.
   */
  canonical_name: string;
  /**
   * @deprecated use `owner_id` or `owner_string` instead.
   */
  username: string;
  owner_id: string;
  owner_string: string;
  description: string | null;
  contact_email: string | null;
  contact_info: string | null;
  info_link: string | null;
  user_message: string | null;
  user_message_link: string | null;
  public: boolean;
  subscription_id: string | null;
  french_english_bilingual: boolean;
  default_directory: string | null;
  force_encryption: boolean;
  disable_verify: boolean;
  disable_anonymous_writes: boolean;
  entity_type: EntityType;
  force_verify: boolean;
  mfa_required: boolean;
  /**
   * @deprecated GCSv4-specific property - no longer supported
   */
  expire_time: null;
  /**
   * @deprecated GCSv4-specific property - no longer supported
   */
  expires_in: null;
  /**
   * @deprecated GCSv4-specific property - no longer supported
   */
  activated: boolean;
  /**
   * @deprecated GCSv4-specific property - no longer supported
   */
  myproxy_server: string | null;
  /**
   * @deprecated GCSv4-specific property - no longer supported
   */
  myproxy_dn: string | null;
  /**
   * @deprecated GCSv4-specific property - no longer supported
   */
  oauth_server: string | null;
  requester_pays: boolean;
  /**
   * @deprecated - use entity_type intead
   */
  is_globus_connect: boolean;
  gcs_version: string | null;
  globus_connect_setup_key: string | null;
  /**
   * @deprecated use `host_endpoint_id` and `host_endpoint_display_name`
   */
  host_endpoint: string | null;
  /**
   * UUID of standard endpoint hosting the shared endpoint; `null` for non-shared endpoints.
   */
  host_endpoint_id: string | null;
  host_endpoint_display_name: string | null;
  host_path: string | null;
  /**
   * @deprecated
   */
  s3_url: null;
  /**
   * @deprecated
   */
  s3_owner_activated: false;
  /**
   * @deprecated GCSv4-specific property - use entity_type instead
   */
  acl_available: boolean;
  /**
   * @deprecated use `my_effective_roles` instead.
   */
  acl_editable: boolean;
  in_use: boolean;
  my_effective_roles: Array<EndpointRole | 'restricted_administrator'>;
  gcp_connected: boolean | null;
  gcp_paused: boolean | null;
  network_use: 'normal' | 'minimal' | 'aggressive' | 'custom' | null;
  location: string | null;
  max_concurrency: number | null;
  preferred_concurrency: number | null;
  max_parallelism: number | null;
  preferred_parallelism: number | null;
  /**
   * @deprecated GCSv4-specific property - no longer supported
   */
  local_user_info_available: boolean | null;
  https_server: string | null;
  gcs_manager_url: `${string}://${string}` | null;
  tlsftp_server: `tlsftp://${string}:${string}` | null;
  high_assurance: boolean;
  acl_max_expiration_period_mins: number | null;
  authentication_timeout_mins: number | null;
  /**
   * @deprecated use `high_assurance` and `authentication_timeout_mins` instead.
   */
  authentication_assurance_timeout: number;
  non_functional: boolean;
  non_functional_endpoint_id: string | null;
  non_functional_endpoint_display_name: string | null;
  mapped_collection_id: string | null;
  mapped_collection_display_name: string | null;
  last_accessed_time: string | null;
};

export type EndpointListDocument = {
  DATA_TYPE: 'endpoint_list';
  DATA: EndpointDocument[];
  length: number;
};

/**
 * Fetch an endpoint by its UUID.
 */
export const get = function (
  endpoint_xid,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<EndpointDocument>> {
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
 * @see https://docs.globus.org/api/transfer/gcp_management/#update_collection_by_id
 */
type GuestCollectionUpdatableField = ExtractKeys<
  EndpointDocument,
  | 'acl_max_expiration_period_mins'
  | 'display_name'
  | 'organization'
  | 'department'
  | 'keywords'
  | 'description'
  | 'contact_email'
  | 'contact_info'
  | 'info_link'
  | 'owner_string'
  | 'default_directory'
  | 'force_encryption'
  | 'disable_verify'
>;

export type CreatePayload = Partial<Pick<EndpointDocument, GuestCollectionUpdatableField>> & {
  DATA_TYPE?: 'shared_endpoint';
  host_endpoint_id: string;
  host_path: string;
};
export type CreateResponse = {
  DATA_TYPE: 'endpoint_create_result';
  code: 'Created';
  globus_connect_setup_key: string | null;
  id: string;
  message: string;
  request_id: string;
  resource: '/shared_endpoint';
};
/**
 * Create a Globus Connect Personal guest collection.
 * As of 2024-04-17, this method (and the Transfer API) only supports creating Globus Connect Personal guest collections.
 *
 * Globus Connect Personal mapped collections are created from the Globus Connect Personal application.
 * All GCSv5 collections should be created using Globus Connect Server (i.e. {@link "@globus/sdk".gcs.collections.create | `gcs.collections.create`}).
 *
 * @see https://docs.globus.org/api/transfer/gcp_management/#create_guest_collection
 */
export const create = function (options?, sdkOptions?): Promise<JSONFetchResponse<CreateResponse>> {
  if (options?.payload) {
    Object.assign(options.payload, { DATA_TYPE: 'shared_endpoint' });
  }

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
  payload?: CreatePayload;
}>;

/**
 * @see https://docs.globus.org/api/transfer/gcp_management/#update_collection_by_id
 */
type MappedCollectionUpdatableField = ExtractKeys<
  EndpointDocument,
  | GuestCollectionUpdatableField
  | 'authentication_timeout_mins'
  | 'subscription_id'
  | 'public'
  | 'location'
  | 'network_use'
  | 'max_concurrency'
  | 'preferred_concurrency'
  | 'max_parallelism'
  | 'preferred_parallelism'
  | 'user_message'
  | 'user_message_link'
>;

export type UpdatePayload = Partial<
  Pick<EndpointDocument, MappedCollectionUpdatableField | 'DATA_TYPE'>
>;
export type UpdateResponse = {
  DATA_TYPE: 'result';
  code: 'Updated';
  message: string;
  request_id: string;
  resource: `/endpoint/${string}`;
};
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
): Promise<JSONFetchResponse<UpdateResponse>> {
  if (options?.payload) {
    Object.assign(options.payload, { DATA_TYPE: 'endpoint' });
  }

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
    payload: UpdatePayload;
    query?: never;
  }
>;

export type RemoveResponse = {
  DATA_TYPE: 'result';
  code: 'Deleted';
  message: string;
  request_id: string;
  resource: `/endpoint/${string}`;
};
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
): Promise<JSONFetchResponse<RemoveResponse>> {
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
