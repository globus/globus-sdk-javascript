export interface Transfer {
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
