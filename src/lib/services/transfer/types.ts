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
        limit?: `${number}`;
        offset?: `${number}`;
      };
      Response: {
        limit: number;
        offset: number;
        has_next_page: `${boolean}`;
      };
    };
    /**
     * @see https://docs.globus.org/api/transfer/overview/#marker_paging
     */
    Marker: {
      Query: {
        marker?: string;
      };
      Response: {
        next_marker: string | null;
      };
    };
    /**
     * @see https://docs.globus.org/api/transfer/overview/#last_key_paging
     */
    LastKey: {
      Query: {
        limit?: `${number}`;
        last_key: string;
      };
      Response: {
        has_next_page: `${boolean}`;
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
        max_results?: `${number}`;
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
    limit?: `${number}`;
    offset?: `${number}`;
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
