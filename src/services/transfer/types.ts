import { AuthorizationRequirementsError } from '../../core/errors.js';
import { ExtractKeys, Segment } from '../types.js';
import { EndpointDocument } from './service/endpoint.js';

/**
 * @see https://docs.globus.org/api/transfer/overview/#errors
 */
export type ErrorDocument = {
  code: string;
  message: string;
  request_id: string;
  resource: string;
  /**
   * If a Globus Auth policy failure was encountered, and caused the error, this property will be present.
   */
  authorization_parameters?: AuthorizationRequirementsError['authorization_parameters'];
};

/**
 * @see https://docs.globus.org/api/transfer/overview/#common_query_parameters
 */
export type CommonQueryParameters = {
  orderby?: string;
  fields?: string;
  filter?: string;
};

export type EntityType =
  | 'GCSv5_endpoint'
  | 'GCSv5_mapped_collection'
  | 'GCSv5_guest_collection'
  | 'GCP_mapped_collection'
  | 'GCP_guest_collection';

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

/**
 * @see https://docs.globus.org/api/transfer/endpoint_roles/
 */
export type EndpointRole =
  | 'administrator'
  | 'access_manager'
  | 'activity_manager'
  | 'activity_monitor';

/**
 * Mimics the OpenAPI generated types for Transfer (does not provide OpenAPI spec).
 *
 * The usage (and expansion) of this interface is deprecated. Types should be defined, and exported, in the
 * service methods that use them, and should not be defined here.
 *
 * @deprecated Use service method co-located types instead.
 * @private
 */
export interface Operations
  extends Record<
    string,
    {
      parameters?: Segment;
      response?: any;
      payload?: any;
    }
  > {
  CreateEndpoint: {
    payload: Partial<Pick<EndpointDocument, GuestCollectionUpdatableField>> & {
      DATA_TYPE?: 'shared_endpoint';
      host_endpoint_id: string;
      host_path: string;
    };
    response: {
      DATA_TYPE: 'endpoint_create_result';
      code: 'Created';
      globus_connect_setup_key: string | null;
      id: string;
      message: string;
      request_id: string;
      resource: '/shared_endpoint';
    };
  };
  UpdateEndpoint: {
    payload: Partial<Pick<EndpointDocument, MappedCollectionUpdatableField | 'DATA_TYPE'>>;
    response: {
      DATA_TYPE: 'result';
      code: 'Updated';
      message: string;
      request_id: string;
      resource: `/endpoint/${string}`;
    };
  };
  RemoveEndpoint: {
    response: {
      DATA_TYPE: 'result';
      code: 'Deleted';
      message: string;
      request_id: string;
      resource: `/endpoint/${string}`;
    };
  };
}

/**
 * Used to define query parameter types for the Transfer service.
 * @private **Intended for internal service method definition only.**
 *
 * @param Parameters The allowed query parameters for the request.
 * @param PaginationType The type of pagination the request uses, if any.
 *                       If not specified, no pagination query parameters will be included.
 * @param IncludeCommon Whether to include Transfer common query parameters as allowed query parameters.
 *                      Defaults to `true`, which includes common query parameters.
 *                      Set to `false` to exclude common query parameters.
 *
 * @example `QueryParameters<{ endpoint_id: string }, 'Offset'>`
 */
export type QueryParameters<
  Parameters extends Record<string, unknown>,
  PaginationType extends keyof Pagination | undefined = undefined,
  IncludeCommon extends boolean = true,
> = Parameters &
  (PaginationType extends keyof Pagination ? Pagination[PaginationType]['Query'] : {}) &
  (IncludeCommon extends true ? CommonQueryParameters : {});

/**
 * Add pagination response members to an object; Use for creating paginated responses in the Transfer service.
 * @private **Intended for internal service method definition only.**
 * @param PaginationType The type of pagination the response uses.
 * @param Response The response to extend with the pagination response.
 * @example `PaginatedResponse<'Offset', { DATA_TYPE: 'task_list'; tasks: TaskDocument[] }>`
 */
export type PaginatedResponse<PaginationType, Response> = Response &
  (PaginationType extends keyof Pagination ? Pagination[PaginationType]['Response'] : {});

/**
 * Pagination used by the Transfer service.
 *
 * Each pagination definition contains a `Query` and `Response` type.
 * - The `Query` type is used to define the query parameters used by the pagination method.
 * - The `Response` type is used to define the response properties returned by the pagination method (usually as
 * top-level keys in the response body).
 *
 * Service methods **SHOULD** include the supported pagination members in their query parameters and response types, these
 * are just made available as a convenience.
 *
 * @see https://docs.globus.org/api/transfer/overview/#paging
 */
export type Pagination = {
  /**
   * @see https://docs.globus.org/api/transfer/overview/#offset_paging
   */
  Offset: {
    Query: {
      limit?: `${number}` | number;
      offset?: `${number}` | number;
    };
    Response: {
      limit: number;
      offset: number;
      has_next_page: `${boolean}` | boolean;
    };
  };
  /**
   * @see https://docs.globus.org/api/transfer/overview/#marker_paging
   */
  Marker: {
    Query: {
      marker?: `${number}` | number;
    };
    Response: {
      next_marker: number | null;
    };
  };
  /**
   * @see https://docs.globus.org/api/transfer/overview/#last_key_paging
   */
  LastKey: {
    Query: {
      limit?: `${number}` | number;
      last_key: string;
    };
    Response: {
      has_next_page: `${boolean}` | boolean;
      last_key: string | null;
      limit: number;
    };
  };
  /**
   * @see https://docs.globus.org/api/transfer/overview/#next_token_paging
   */
  NextToken: {
    Query: {
      next_token?: string;
      max_results?: `${number}` | number;
    };
    Response: {
      next_token: string | null;
    };
  };
};

/**
 * @private
 * @deprecated Move to co-located service method types.
 */
export interface Transfer {
  Request: {
    /**
     * Common fields for Transfer and Delete requests.
     * @see https://docs.globus.org/api/transfer/task_submit/#common_transfer_and_delete_fields
     */
    Common: {
      submission_id: string;
      label?: string;
      notify_on_succeeded?: boolean;
      notify_on_failed?: boolean;
      deadline?: string;
      store_base_path_info?: boolean;
    };
    Mkdir: {
      DATA_TYPE: 'mkdir';
      path: string;
    };
    Rename: {
      DATA_TYPE: 'rename';
      old_path: string;
      new_path: string;
    };
    Symlink: {
      DATA_TYPE: 'symlink';
      path: string;
      symlink_target: string;
    };
    Delete: Transfer['Request']['Common'] & {
      DATA_TYPE: 'delete';
      DATA: {
        DATA_TYPE: string;
        path: string;
      }[];
      endpoint: string;
      ignore_missing?: boolean;
      recursive?: boolean;
      interpret_globs?: boolean;
      local_user?: string;
    };
    Transfer: Transfer['Request']['Common'] & {
      DATA_TYPE: 'transfer';
      DATA: {
        DATA_TYPE: string;
        source_path: string;
        destination_path: string;
        recursive?: boolean;
        external_checksum?: string;
        checksum_algorithm?: string;
      }[];
      source_endpoint: string;
      destination_endpoint: string;
      filter_rules?: {
        DATA_TYPE: 'filter_rule';
        method: 'include' | 'exclude';
        type?: 'file' | 'dir';
        name: string;
      }[];
      encrypt_data?: boolean;
      sync_level?: 0 | 1 | 2 | 3;
      verify_checksum?: boolean;
      preserve_timestamp?: boolean;
      delete_destination_extra?: boolean;
      /**
       * @beta
       */
      recursive_symlinks?: 'ignore' | 'keep' | 'copy';
      skip_source_errors?: boolean;
      fail_on_quota_errors?: boolean;
      source_local_user?: string;
      destination_local_user?: string;
    };
  };
}
