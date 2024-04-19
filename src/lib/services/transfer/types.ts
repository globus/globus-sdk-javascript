import { ExtractKeys, Segment } from '../types';

type EntityType =
  | 'GCSv5_endpoint'
  | 'GCSv5_mapped_collection'
  | 'GCSv5_guest_collection'
  | 'GCP_mapped_collection'
  | 'GCP_guest_collection';

/**
 * @see https://docs.globus.org/api/transfer/gcp_management/#update_collection_by_id
 */
type GuestCollectionUpdatableField = ExtractKeys<
  Components['schemas']['Endpoint'],
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
  Components['schemas']['Endpoint'],
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
type EndpointRole = 'administrator' | 'access_manager' | 'activity_manager' | 'activity_monitor';

export interface Components {
  schemas: {
    Endpoint: {
      DATA_TYPE: 'endpoint';
      DATA?: Components['schemas']['Server'][];
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
    };

    Server: {
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
  };
}

export interface Operations
  extends Record<
    string,
    {
      parameters?: Segment;
      response?: any;
      payload?: any;
    }
  > {
  GetEndpoint: {
    parameters: string;
    response: Components['schemas']['Endpoint'];
  };
  CreateEndpoint: {
    payload: Partial<Pick<Components['schemas']['Endpoint'], GuestCollectionUpdatableField>> & {
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
    payload: Partial<
      Pick<Components['schemas']['Endpoint'], MappedCollectionUpdatableField | 'DATA_TYPE'>
    >;
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

export interface Transfer {
  /**
   * Pagination used by the Transfer service.
   *
   * Each pagination definition contains a `Query` and `Response` type.
   * - The `Query` type is used to define the query parameters used by the pagination method.
   * - The `Response` type is used to define the response properties returned by the pagination method (usually as
   * top-level keys in the response body).
   *
   * @see https://docs.globus.org/api/transfer/overview/#paging
   */
  Paging: {
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
   * @see https://docs.globus.org/api/transfer/file_operations/#list_directory_contents
   */
  DirectoryListingQuery: {
    path?: string;
    show_hidden?: 'true' | 'false';
    limit?: `${number}` | number;
    offset?: `${number}` | number;
    orderby?: string;
    filter?: string;
  };

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
