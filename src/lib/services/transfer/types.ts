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
    Mkdir: {
      path: string;
    };
    Rename: {
      DATA_TYPE: 'mkdir';
      old_path: string;
      new_path: string;
    };
    Symlink: {
      DATA_TYPE: 'symlink';
      path: string;
      symlink_target: string;
    };

    Delete: {
      DATA_TYPE: 'delete';
      endpoint: string;
      submission_id: string;
      DATA: { DATA_TYPE: string; path: string }[];
      ignore_missing?: boolean;
      recursive?: boolean;
    };

    Transfer: {
      DATA_TYPE: 'transfer';
    };
  };
}
