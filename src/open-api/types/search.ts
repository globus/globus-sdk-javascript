export interface paths {
    "/v1/index/{index_id}/search": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Search Query
         * @description Takes a GET request and parses the query from (url-encoded) query parameters.
         *     Returns query results.
         *
         *     The results can be paginated with limit+offset up to the boundary of 10,000 results.
         */
        get: {
            parameters: {
                query: {
                    q: string;
                    limit?: number;
                    advanced?: boolean;
                    /** @description Set to true to allow this operation to return data with visibility which does not include the current user. Only allowed for index admins and owners. */
                    bypass_visible_to?: boolean;
                    filter_principal_sets?: string[];
                    offset?: number;
                };
                header?: never;
                path: {
                    index_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description
                 *     A Search Result document.
                 *
                 *     The offset, count, total, and has_next_page fields are computed based on the
                 *     number of results which were matched and which results were returned by the
                 *     search.
                 *     As long as `has_next_page` is True, you can add the count of results to the offset
                 *     of a prior query to fetch another page of results.
                 *      */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["GSearchResult"];
                    };
                };
            };
        };
        put?: never;
        /**
         * Complex Search Query
         * @description Takes a POST request and parses the query from the request body.
         *     The search may include advanced filtering criteria, facets (aggregations), field
         *     weights (boosts), and sorting criteria.
         *
         *     The results can be paginated with limit+offset up to the boundary of 10,000 results.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    index_id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["GSearchRequestBody"];
                };
            };
            responses: {
                /** @description
                 *     A Search Result document.
                 *
                 *     The offset, count, total, and has_next_page fields are computed based on the
                 *     number of results which were matched and which results were returned by the
                 *     search.
                 *     As long as `has_next_page` is True, you can add the count of results to the offset
                 *     of a prior query to fetch another page of results.
                 *      */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["GSearchResult"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/index/{index_id}/scroll": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Scroll Query
         * @description Scrolling is similar to a complex post query, but is intended for collecting all
         *     results matching a search.
         *
         *     Scroll queries use marker+has_next_page for pagination and have no pagination limit.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    index_id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["GScrollRequest"];
                };
            };
            responses: {
                /** @description
                 *     A Scroll Result document.
                 *
                 *     This is nearly identical to a Search Result, but includes the `marker` parameter.
                 *     `marker` is an opaque token which can be used on subsequent requests for pagination.
                 *
                 *     NOTE: In rare cases, `has_next_page` may be True until an empty page of results is
                 *     reached.
                 *      */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["GScrollResponse"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/index/{index_id}/ingest": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Ingest
         * @description Create or update a single document or a collection of documents.
         *     This submits an asynchronous task and returns the task ID.
         *
         *     It is possible for ingest to fail immediately with a non-200 response, but a 200 Ok
         *     does not indicate that the task will succeed. It just means it was accepted for
         *     processing. The status of the resulting task will be given by the state of the task.
         *
         *     Use Get Task to monitor tasks after submission.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    index_id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["GIngest"];
                };
            };
            responses: {
                /** @description A Task Submission response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["TaskSubmitResponse"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/task/{task_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Task
         * @description Lookup a Task by ID.
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    task_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Task"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/task_list/{index_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Task List
         * @description List up to 1000 of the most recent tasks for an index.
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    index_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["TaskList"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/index/{index_id}/entry": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Entry
         * @description Lookup a specific entry by ID.
         */
        get: {
            parameters: {
                query: {
                    /** @description The subject for this entry */
                    subject: string;
                    /** @description The entry ID for this entry. The default entry ID is null */
                    entry_id?: string | null;
                    /** @description Set to true to allow this operation to return data with visibility which does not include the current user. Only allowed for index admins and owners. */
                    bypass_visible_to?: boolean;
                };
                header?: never;
                path: {
                    index_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["GMetaResult"];
                    };
                };
            };
        };
        /**
         * Upsert Entry
         * @description Create or update a single entry.
         *     This is just a wrapper around Ingest.
         */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    index_id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["GMetaEntry"];
                };
            };
            responses: {
                /** @description A Task Submission response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["TaskSubmitResponse"];
                    };
                };
            };
        };
        /**
         * Upsert Entry
         * @description Create or update a single entry.
         *     This is just a wrapper around Ingest.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    index_id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["GMetaEntry"];
                };
            };
            responses: {
                /** @description A Task Submission response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["TaskSubmitResponse"];
                    };
                };
            };
        };
        /**
         * Delete Entry
         * @description Delete a specific entry by ID.
         */
        delete: {
            parameters: {
                query: {
                    /** @description The subject for this entry */
                    subject: string;
                    /** @description The entry ID for this entry. The default entry ID is null */
                    entry_id?: string | null;
                };
                header?: never;
                path: {
                    index_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A Task Submission response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["TaskSubmitResponse"];
                    };
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/index/{index_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Index Info
         * @description Lookup descriptive information about an index.
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    index_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["IndexWithPermissions"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        /**
         * Index Delete
         * @description Delete an Index.
         *     This operation is not instantaneous, but marks the index for deletion by
         *     putting it into the 'delete-pending' state.
         *     Once all active tasks have been cancelled and the index is safe to clean up,
         *     it will be deleted.
         *
         *     If an index is non-trial, the deletion will wait for 30 days.
         *     During that time, the index will not be usable, except for the
         *     `POST /v1/index/<index_id>/reopen` operation, which cancels the deletion.
         */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    index_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description An index deletion response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["IndexDeleteResponse"];
                    };
                };
            };
        };
        options?: never;
        head?: never;
        /**
         * Index Update Metadata
         * @description Update an index's display_name and description. Only index owners and admins
         *     can update an index's metadata. Only indexes with the open status can be updated.
         *
         *     Returns the updated index metadata in the response.
         */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    index_id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["IndexUpdate"];
                };
            };
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["IndexInfo"];
                    };
                };
            };
        };
        trace?: never;
    };
    "/v1/index_list": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Index List
         * @description Lookup descriptive information about all indices on which you have write or admin
         *     permissions. Returns a list of at most 100 such indices.
         *
         *     The indices will be annotated with a list of permissions which the current user has
         *     on the indices.
         *
         *     By default, all indices where the user has a role are included in the results.
         *     To filter to a subset of roles, pass the `filter_roles` query parameter.
         */
        get: {
            parameters: {
                query?: {
                    filter_roles?: ("owner" | "admin" | "writer")[];
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["IndexListWPermissions"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/index": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Index Create
         * @description Create a new Index. You will automatically be assigned as an 'owner' on the
         *     resulting index.
         *
         *     New indices have `is_trial=true` when they are created. Users are limited
         *     in the number of trial indices they may own -- so the operation may fail if
         *     you already own a trial index.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["IndexCreate"];
                };
            };
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["IndexInfo"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/index/{index_id}/reopen": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Index Reopen
         * @description On an index which has a status of `delete-pending`, reopen that index and
         *     change its status to `open`. This operation is a special case of index
         *     update and requires 'owner' permissions on the index.
         *
         *     Reopening an index is valid on trial and non-trial indices, but trial indices
         *     may be deleted at any time after their deletion.
         *     Therefore, this API is most useful for cancelling the deletion of a non-trial index.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    index_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description An index reopen response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["IndexReopenResponse"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/index/{index_id}/role_list": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Role List
         * @description List all roles on an index. In order to list roles, you must have the
         *     'admin' or 'owner' role on an index.
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    index_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["RoleList"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/index/{index_id}/role": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Role Create
         * @description Create a new Role on an index. In order to create a role, you must already
         *     have the 'admin' or 'owner' role. Only owners can create other owners.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    index_id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["RoleCreate"];
                };
            };
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Role"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/index/{index_id}/role/{role_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Role Delete
         * @description Delete a Role on an index. In order to delete a role, you must have the
         *     'admin' or 'owner' role. Unlike role creation, admin users can delete owner
         *     roles.
         *
         *     The last owner role on an index cannot be deleted -- there is always at
         *     least one owner.
         */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    index_id: string;
                    role_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["DeletedRole"];
                    };
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/index/{index_id}/batch_delete_by_subject": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Delete By Subject
         * @description Delete the document with the given Subject(s).
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    index_id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["DeleteBySubjectRequest"];
                };
            };
            responses: {
                /** @description A Task Submission response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["TaskSubmitResponse"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/index/{index_id}/subject": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Subject
         * @description Lookup the document for a given Subject.
         */
        get: {
            parameters: {
                query: {
                    /** @description The subject for this operation */
                    subject: string;
                    /** @description Set to true to allow this operation to return data with visibility which does not include the current user. Only allowed for index admins and owners. */
                    bypass_visible_to?: boolean;
                };
                header?: never;
                path: {
                    index_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["GMetaResult"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        /**
         * Delete Subject
         * @description Delete the document with the given Subject.
         */
        delete: {
            parameters: {
                query: {
                    /** @description The subject for this operation */
                    subject: string;
                };
                header?: never;
                path: {
                    index_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A Task Submission response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["TaskSubmitResponse"];
                    };
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/index/{index_id}/delete_by_query": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Delete By Query
         * @description Delete all documents in an index matching a given query.
         *     Boost, sort, limit, offset, and facet parameters are allowed but will be ignored.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    index_id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["DeleteByQuery"];
                };
            };
            responses: {
                /** @description A Task Submission response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["TaskSubmitResponse"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/beta/index/{index_id}/mapping/{field_name}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * [BETA] Get Field Mapping
         * @description Lookup the mapped type for a specific field in an index.
         *     The `mappings` object will contain only one field.
         *
         *     Requires a `writer`, `admin`, or `owner` role on the index.
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    index_id: string;
                    field_name: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Field to type mapping. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["UGFieldMappings"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/beta/index/{index_id}/field_budget": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * [BETA] Get Field Budget Information
         * @description Requires a `writer`, `admin`, or `owner` role on the index.
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    index_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Field budget information, showing an index's usage of fields. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["FieldBudget"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/beta/index/{index_id}/mapping": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * [BETA] Get Index Mapping
         * @description Lookup the mapped types of all fields in an index.
         *
         *     Requires a `writer`, `admin`, or `owner` role on the index.
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    index_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Field to type mapping. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["UGFieldMappings"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        ResultEntry: {
            content?: {
                [key: string]: unknown;
            };
            entry_id?: string;
            matched_principal_sets?: string[];
        };
        GMetaResult: {
            /** @default 2019-08-27 */
            readonly "@version": unknown;
            subject?: string;
            entries?: components["schemas"]["ResultEntry"][];
        };
        ApproximateMetricFacetResult: {
            /** @default 2017-09-01 */
            readonly "@version": unknown;
            readonly name?: string;
            approximate_value?: number;
        };
        MetricFacetResult: {
            /** @default 2017-09-01 */
            readonly "@version": unknown;
            readonly name?: string;
            value?: number;
        };
        GBucket: {
            /** @default 2017-09-01 */
            readonly "@version": unknown;
            value?: unknown;
            count?: number;
        };
        BucketFacetResult: {
            /** @default 2017-09-01 */
            readonly "@version": unknown;
            readonly name?: string;
            buckets?: components["schemas"]["GBucket"][];
        };
        GFacetResult: components["schemas"]["ApproximateMetricFacetResult"] | components["schemas"]["MetricFacetResult"] | components["schemas"]["BucketFacetResult"];
        GSearchResult: {
            total?: number;
            /** @description The length of the 'gmeta' array. */
            count?: number;
            gmeta?: components["schemas"]["GMetaResult"][];
            /** @description True if another page of results is available with pagination. */
            has_next_page?: boolean;
            /** @default 2017-09-01 */
            readonly "@version": unknown;
            offset?: number;
            facet_results?: components["schemas"]["GFacetResult"][];
        };
        TermsFacet: {
            /** @default 2017-09-01 */
            "@version": unknown;
            /**
             * @description The field to which the facet refers.
             *     Any dots (`.`) must be escaped with a preceding backslash (`\`) character.
             * @example my_field_name
             */
            field_name: string;
            /** @description A name for this facet which is referenced in the results.
             *
             *     If `name` is omitted, it will default to the value of the `field_name` property. If more than one facet in a single search request references the same field, a name *must* be provided. */
            name?: string;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "terms";
            /** @default 10 */
            size: number;
        };
        MetricFacet: {
            /** @default 2017-09-01 */
            "@version": unknown;
            /**
             * @description The field to which the facet refers.
             *     Any dots (`.`) must be escaped with a preceding backslash (`\`) character.
             * @example my_field_name
             */
            field_name: string;
            /** @description A name for this facet which is referenced in the results.
             *
             *     If `name` is omitted, it will default to the value of the `field_name` property. If more than one facet in a single search request references the same field, a name *must* be provided. */
            name?: string;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "sum" | "avg";
            missing?: number;
        };
        DateHistogramRange: {
            low?: unknown;
            high?: unknown;
        };
        DateHistogramFacet: {
            /** @default 2017-09-01 */
            "@version": unknown;
            /**
             * @description The field to which the facet refers.
             *     Any dots (`.`) must be escaped with a preceding backslash (`\`) character.
             * @example my_field_name
             */
            field_name: string;
            /** @description A name for this facet which is referenced in the results.
             *
             *     If `name` is omitted, it will default to the value of the `field_name` property. If more than one facet in a single search request references the same field, a name *must* be provided. */
            name?: string;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "date_histogram";
            histogram_range?: components["schemas"]["DateHistogramRange"];
            /** @enum {string} */
            date_interval: "year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second";
        };
        NumericHistogramRange: {
            low: number;
            high: number;
        };
        NumericHistogramFacet: {
            /** @default 2017-09-01 */
            "@version": unknown;
            /**
             * @description The field to which the facet refers.
             *     Any dots (`.`) must be escaped with a preceding backslash (`\`) character.
             * @example my_field_name
             */
            field_name: string;
            /** @description A name for this facet which is referenced in the results.
             *
             *     If `name` is omitted, it will default to the value of the `field_name` property. If more than one facet in a single search request references the same field, a name *must* be provided. */
            name?: string;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "numeric_histogram";
            size: number;
            histogram_range: components["schemas"]["NumericHistogramRange"];
        };
        GFacet: components["schemas"]["TermsFacet"] | components["schemas"]["MetricFacet"] | components["schemas"]["MetricFacet"] | components["schemas"]["DateHistogramFacet"] | components["schemas"]["NumericHistogramFacet"];
        GFilterMatchAll: {
            /** @default 2017-09-01 */
            "@version": unknown;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "match_all";
            /**
             * @description Control whether or not this filter should be applied before or after facets are
             *     calculated. If True, the filter will not impact facet results, but will filter the
             *     query results.
             *
             *     Defaults to True for all filters except `match_all`, where it defaults to False.
             *
             * @default false
             */
            post_filter: boolean;
            /** @example my_field_name */
            field_name: string;
            values: unknown[];
        };
        GFilterMatchAny: {
            /** @default 2017-09-01 */
            "@version": unknown;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "match_any";
            /**
             * @description Control whether or not this filter should be applied before or after facets are
             *     calculated. If True, the filter will not impact facet results, but will filter the
             *     query results.
             *
             *     Defaults to True for all filters except `match_all`, where it defaults to False.
             *
             * @default true
             */
            post_filter: boolean;
            /** @example my_field_name */
            field_name: string;
            values: unknown[];
        };
        RangeFilterValue: {
            from?: unknown;
            to?: unknown;
            gte?: unknown;
            gt?: unknown;
            lte?: unknown;
            lt?: unknown;
        };
        GFilterRange: {
            /** @default 2017-09-01 */
            "@version": unknown;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "range";
            /**
             * @description Control whether or not this filter should be applied before or after facets are
             *     calculated. If True, the filter will not impact facet results, but will filter the
             *     query results.
             *
             *     Defaults to True for all filters except `match_all`, where it defaults to False.
             *
             * @default true
             */
            post_filter: boolean;
            /** @example my_field_name */
            field_name: string;
            values: components["schemas"]["RangeFilterValue"][];
        };
        Coordinate: {
            lat: number;
            lon: number;
        };
        GFilterBoundingBox: {
            /** @default 2017-09-01 */
            "@version": unknown;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "geo_bounding_box";
            /**
             * @description Control whether or not this filter should be applied before or after facets are
             *     calculated. If True, the filter will not impact facet results, but will filter the
             *     query results.
             *
             *     Defaults to True for all filters except `match_all`, where it defaults to False.
             *
             * @default true
             */
            post_filter: boolean;
            /** @example my_field_name */
            field_name: string;
            /**
             * @description A coordinate pair is a geographical point, expressed as an object with two keys, `lat`
             *     and `lon`, for latitude and longitude. The values must be floats, positive or negative,
             *     within the range of acceptable coordinate values: [-90.0, 90.0] for latitude, and
             *     [-180.0, 180.0] for longitude.
             *
             * @example {
             *       "lat": 40.9,
             *       "lon": 87.5
             *     }
             */
            top_left: components["schemas"]["Coordinate"];
            /**
             * @description A coordinate pair is a geographical point, expressed as an object with two keys, `lat`
             *     and `lon`, for latitude and longitude. The values must be floats, positive or negative,
             *     within the range of acceptable coordinate values: [-90.0, 90.0] for latitude, and
             *     [-180.0, 180.0] for longitude.
             *
             * @example {
             *       "lat": 40.9,
             *       "lon": 87.5
             *     }
             */
            bottom_right: components["schemas"]["Coordinate"];
        };
        GeoPolygon: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "Polygon";
            coordinates: unknown[][];
        };
        GeoShape: components["schemas"]["GeoPolygon"];
        GFilterGeoShape: {
            /** @default 2017-09-01 */
            "@version": unknown;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "geo_shape";
            /**
             * @description Control whether or not this filter should be applied before or after facets are
             *     calculated. If True, the filter will not impact facet results, but will filter the
             *     query results.
             *
             *     Defaults to True for all filters except `match_all`, where it defaults to False.
             *
             * @default true
             */
            post_filter: boolean;
            /** @example my_field_name */
            field_name: string;
            shape: components["schemas"]["GeoShape"];
            /**
             * @description The relationship between the provided shape and the queried field.
             *
             *     'intersects': (default) Return documents whose shape intersects the query shape.
             *     'within': Return documents whose shape is fully within the query shape.
             *
             * @default intersects
             * @enum {string}
             */
            relation: "intersects" | "within";
        };
        GFilterExists: {
            /** @default 2017-09-01 */
            "@version": unknown;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "exists";
            /**
             * @description Control whether or not this filter should be applied before or after facets are
             *     calculated. If True, the filter will not impact facet results, but will filter the
             *     query results.
             *
             *     Defaults to True for all filters except `match_all`, where it defaults to False.
             *
             * @default true
             */
            post_filter: boolean;
            /** @example my_field_name */
            field_name: string;
        };
        GFilterLike: {
            /** @default 2017-09-01 */
            "@version": unknown;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "like";
            /**
             * @description Control whether or not this filter should be applied before or after facets are
             *     calculated. If True, the filter will not impact facet results, but will filter the
             *     query results.
             *
             *     Defaults to True for all filters except `match_all`, where it defaults to False.
             *
             * @default true
             */
            post_filter: boolean;
            /**
             * @description The field name to query with this 'like' filter. This field must be a text field.
             * @example my_field_name
             */
            field_name: string;
            /** @description A filter expression containing * and ? wildcards for a 'like' filter. */
            value: string;
        };
        GFilterMatchAllNested: {
            /** @default 2017-09-01 */
            "@version": unknown;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "match_all";
            /** @example my_field_name */
            field_name: string;
            values: unknown[];
        };
        GFilterMatchAnyNested: {
            /** @default 2017-09-01 */
            "@version": unknown;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "match_any";
            /** @example my_field_name */
            field_name: string;
            values: unknown[];
        };
        GFilterRangeNested: {
            /** @default 2017-09-01 */
            "@version": unknown;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "range";
            /** @example my_field_name */
            field_name: string;
            values: components["schemas"]["RangeFilterValue"][];
        };
        GFilterBoundingBoxNested: {
            /** @default 2017-09-01 */
            "@version": unknown;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "geo_bounding_box";
            /** @example my_field_name */
            field_name: string;
            /**
             * @description A coordinate pair is a geographical point, expressed as an object with two keys, `lat`
             *     and `lon`, for latitude and longitude. The values must be floats, positive or negative,
             *     within the range of acceptable coordinate values: [-90.0, 90.0] for latitude, and
             *     [-180.0, 180.0] for longitude.
             *
             * @example {
             *       "lat": 40.9,
             *       "lon": 87.5
             *     }
             */
            top_left: components["schemas"]["Coordinate"];
            /**
             * @description A coordinate pair is a geographical point, expressed as an object with two keys, `lat`
             *     and `lon`, for latitude and longitude. The values must be floats, positive or negative,
             *     within the range of acceptable coordinate values: [-90.0, 90.0] for latitude, and
             *     [-180.0, 180.0] for longitude.
             *
             * @example {
             *       "lat": 40.9,
             *       "lon": 87.5
             *     }
             */
            bottom_right: components["schemas"]["Coordinate"];
        };
        GFilterGeoShapeNested: {
            /** @default 2017-09-01 */
            "@version": unknown;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "geo_shape";
            /** @example my_field_name */
            field_name: string;
            shape: components["schemas"]["GeoShape"];
            /**
             * @description The relationship between the provided shape and the queried field.
             *
             *     'intersects': (default) Return documents whose shape intersects the query shape.
             *     'within': Return documents whose shape is fully within the query shape.
             *
             * @default intersects
             * @enum {string}
             */
            relation: "intersects" | "within";
        };
        GFilterExistsNested: {
            /** @default 2017-09-01 */
            "@version": unknown;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "exists";
            /** @example my_field_name */
            field_name: string;
        };
        GFilterLikeNested: {
            /** @default 2017-09-01 */
            "@version": unknown;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "like";
            /**
             * @description The field name to query with this 'like' filter. This field must be a text field.
             * @example my_field_name
             */
            field_name: string;
            /** @description A filter expression containing * and ? wildcards for a 'like' filter. */
            value: string;
        };
        GFilterNotNested: {
            /** @default 2017-09-01 */
            "@version": unknown;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "not";
            filter: components["schemas"]["GFilterNested"];
        };
        GFilterOrNested: {
            /** @default 2017-09-01 */
            "@version": unknown;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "or";
            filters: components["schemas"]["GFilterNested"][];
        };
        GFilterAndNested: {
            /** @default 2017-09-01 */
            "@version": unknown;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "and";
            filters: components["schemas"]["GFilterNested"][];
        };
        GFilterNested: components["schemas"]["GFilterMatchAllNested"] | components["schemas"]["GFilterMatchAnyNested"] | components["schemas"]["GFilterRangeNested"] | components["schemas"]["GFilterBoundingBoxNested"] | components["schemas"]["GFilterGeoShapeNested"] | components["schemas"]["GFilterExistsNested"] | components["schemas"]["GFilterLikeNested"] | components["schemas"]["GFilterNotNested"] | components["schemas"]["GFilterOrNested"] | components["schemas"]["GFilterAndNested"];
        GFilterNot: {
            /** @default 2017-09-01 */
            "@version": unknown;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "not";
            /**
             * @description Control whether or not this filter should be applied before or after facets are
             *     calculated. If True, the filter will not impact facet results, but will filter the
             *     query results.
             *
             *     Defaults to True for all filters except `match_all`, where it defaults to False.
             *
             * @default true
             */
            post_filter: boolean;
            filter: components["schemas"]["GFilterNested"];
        };
        GFilterOr: {
            /** @default 2017-09-01 */
            "@version": unknown;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "or";
            /**
             * @description Control whether or not this filter should be applied before or after facets are
             *     calculated. If True, the filter will not impact facet results, but will filter the
             *     query results.
             *
             *     Defaults to True for all filters except `match_all`, where it defaults to False.
             *
             * @default true
             */
            post_filter: boolean;
            filters: components["schemas"]["GFilterNested"][];
        };
        GFilterAnd: {
            /** @default 2017-09-01 */
            "@version": unknown;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "and";
            /**
             * @description Control whether or not this filter should be applied before or after facets are
             *     calculated. If True, the filter will not impact facet results, but will filter the
             *     query results.
             *
             *     Defaults to True for all filters except `match_all`, where it defaults to False.
             *
             * @default true
             */
            post_filter: boolean;
            filters: components["schemas"]["GFilterNested"][];
        };
        GFilter: components["schemas"]["GFilterMatchAll"] | components["schemas"]["GFilterMatchAny"] | components["schemas"]["GFilterRange"] | components["schemas"]["GFilterBoundingBox"] | components["schemas"]["GFilterGeoShape"] | components["schemas"]["GFilterExists"] | components["schemas"]["GFilterLike"] | components["schemas"]["GFilterNot"] | components["schemas"]["GFilterOr"] | components["schemas"]["GFilterAnd"];
        GBoost: {
            /** @default 2017-09-01 */
            "@version": unknown;
            /** @example my_field_name */
            field_name: string;
            factor: number;
        };
        GSort: {
            /** @default 2017-09-01 */
            "@version": unknown;
            /** @example my_field_name */
            field_name: string;
            /**
             * @default desc
             * @enum {string}
             */
            order: "asc" | "desc";
        };
        GSearchRequestBody2017: {
            q?: string;
            /** @default 10 */
            limit: number;
            advanced?: boolean;
            /**
             * @description Set to true to allow this operation to return data with visibility which does not include the current user. Only allowed for index admins and owners.
             * @default false
             */
            bypass_visible_to: boolean;
            filter_principal_sets?: string[];
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            "@version": "2017-09-01";
            offset?: number;
            facets?: components["schemas"]["GFacet"][];
            filters?: components["schemas"]["GFilter"][];
            boosts?: components["schemas"]["GBoost"][];
            sort?: components["schemas"]["GSort"][];
        };
        GFilterMatchAllV1: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "match_all";
            /** @example my_field_name */
            field_name: string;
            values: unknown[];
        };
        GFilterMatchAnyV1: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "match_any";
            /** @example my_field_name */
            field_name: string;
            values: unknown[];
        };
        RangeFilterValueV1: {
            from?: unknown;
            to?: unknown;
            gte?: unknown;
            gt?: unknown;
            lte?: unknown;
            lt?: unknown;
        };
        GFilterRangeV1: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "range";
            /** @example my_field_name */
            field_name: string;
            values: components["schemas"]["RangeFilterValueV1"][];
        };
        GFilterBoundingBoxV1: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "geo_bounding_box";
            /** @example my_field_name */
            field_name: string;
            /**
             * @description A coordinate pair is a geographical point, expressed as an object with two keys, `lat`
             *     and `lon`, for latitude and longitude. The values must be floats, positive or negative,
             *     within the range of acceptable coordinate values: [-90.0, 90.0] for latitude, and
             *     [-180.0, 180.0] for longitude.
             *
             * @example {
             *       "lat": 40.9,
             *       "lon": 87.5
             *     }
             */
            top_left: components["schemas"]["Coordinate"];
            /**
             * @description A coordinate pair is a geographical point, expressed as an object with two keys, `lat`
             *     and `lon`, for latitude and longitude. The values must be floats, positive or negative,
             *     within the range of acceptable coordinate values: [-90.0, 90.0] for latitude, and
             *     [-180.0, 180.0] for longitude.
             *
             * @example {
             *       "lat": 40.9,
             *       "lon": 87.5
             *     }
             */
            bottom_right: components["schemas"]["Coordinate"];
        };
        GeoPolygonV1: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "Polygon";
            coordinates: unknown[][];
        };
        GeoShapeV1: components["schemas"]["GeoPolygonV1"];
        GFilterGeoShapeV1: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "geo_shape";
            /** @example my_field_name */
            field_name: string;
            shape: components["schemas"]["GeoShapeV1"];
            /**
             * @description The relationship between the provided shape and the queried field.
             *
             *     'intersects': (default) Return documents whose shape intersects the query shape.
             *     'within': Return documents whose shape is fully within the query shape.
             *
             * @default intersects
             * @enum {string}
             */
            relation: "intersects" | "within";
        };
        GFilterExistsV1: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "exists";
            /** @example my_field_name */
            field_name: string;
        };
        GFilterLikeV1: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "like";
            /**
             * @description The field name to query with this 'like' filter. This field must be a text field.
             * @example my_field_name
             */
            field_name: string;
            /** @description A filter expression containing * and ? wildcards for a 'like' filter. */
            value: string;
        };
        GFilterNotV1: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "not";
            filter: components["schemas"]["GFilterV1"];
        };
        GFilterOrV1: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "or";
            filters: components["schemas"]["GFilterV1"][];
        };
        GFilterAndV1: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "and";
            filters: components["schemas"]["GFilterV1"][];
        };
        GFilterV1: components["schemas"]["GFilterMatchAllV1"] | components["schemas"]["GFilterMatchAnyV1"] | components["schemas"]["GFilterRangeV1"] | components["schemas"]["GFilterBoundingBoxV1"] | components["schemas"]["GFilterGeoShapeV1"] | components["schemas"]["GFilterExistsV1"] | components["schemas"]["GFilterLikeV1"] | components["schemas"]["GFilterNotV1"] | components["schemas"]["GFilterOrV1"] | components["schemas"]["GFilterAndV1"];
        TermsFacetV1: {
            /**
             * @description The field to which the facet refers.
             *     Any dots (`.`) must be escaped with a preceding backslash (`\`) character.
             * @example my_field_name
             */
            field_name: string;
            /** @description A name for this facet which is referenced in the results.
             *
             *     If `name` is omitted, it will default to the value of the `field_name` property. If more than one facet in a single search request references the same field, a name *must* be provided. */
            name?: string;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "terms";
            additional_filters?: components["schemas"]["GFilterV1"][];
            /** @default 10 */
            size: number;
        };
        MetricFacetV1: {
            /**
             * @description The field to which the facet refers.
             *     Any dots (`.`) must be escaped with a preceding backslash (`\`) character.
             * @example my_field_name
             */
            field_name: string;
            /** @description A name for this facet which is referenced in the results.
             *
             *     If `name` is omitted, it will default to the value of the `field_name` property. If more than one facet in a single search request references the same field, a name *must* be provided. */
            name?: string;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "sum" | "avg";
            additional_filters?: components["schemas"]["GFilterV1"][];
            missing?: number;
        };
        DistinctCountFacetV1: {
            /**
             * @description The field to which the facet refers.
             *     Any dots (`.`) must be escaped with a preceding backslash (`\`) character.
             * @example my_field_name
             */
            field_name: string;
            /** @description A name for this facet which is referenced in the results.
             *
             *     If `name` is omitted, it will default to the value of the `field_name` property. If more than one facet in a single search request references the same field, a name *must* be provided. */
            name?: string;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "distinct_count";
            additional_filters?: components["schemas"]["GFilterV1"][];
        };
        DateHistogramRangeV1: {
            low?: unknown;
            high?: unknown;
        };
        DateHistogramFacetV1: {
            /**
             * @description The field to which the facet refers.
             *     Any dots (`.`) must be escaped with a preceding backslash (`\`) character.
             * @example my_field_name
             */
            field_name: string;
            /** @description A name for this facet which is referenced in the results.
             *
             *     If `name` is omitted, it will default to the value of the `field_name` property. If more than one facet in a single search request references the same field, a name *must* be provided. */
            name?: string;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "date_histogram";
            additional_filters?: components["schemas"]["GFilterV1"][];
            histogram_range?: components["schemas"]["DateHistogramRangeV1"];
            /** @enum {string} */
            date_interval: "year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second";
        };
        NumericHistogramRangeV1: {
            low: number;
            high: number;
        };
        NumericHistogramFacetV1: {
            /**
             * @description The field to which the facet refers.
             *     Any dots (`.`) must be escaped with a preceding backslash (`\`) character.
             * @example my_field_name
             */
            field_name: string;
            /** @description A name for this facet which is referenced in the results.
             *
             *     If `name` is omitted, it will default to the value of the `field_name` property. If more than one facet in a single search request references the same field, a name *must* be provided. */
            name?: string;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "numeric_histogram";
            additional_filters?: components["schemas"]["GFilterV1"][];
            size: number;
            histogram_range: components["schemas"]["NumericHistogramRangeV1"];
        };
        GFacetV1: components["schemas"]["TermsFacetV1"] | components["schemas"]["MetricFacetV1"] | components["schemas"]["MetricFacetV1"] | components["schemas"]["DistinctCountFacetV1"] | components["schemas"]["DateHistogramFacetV1"] | components["schemas"]["NumericHistogramFacetV1"];
        GBoostV1: {
            /** @example my_field_name */
            field_name: string;
            factor: number;
        };
        GSortV1: {
            /** @example my_field_name */
            field_name: string;
            /**
             * @default desc
             * @enum {string}
             */
            order: "asc" | "desc";
        };
        SimpleQSettings: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            mode: "query_string";
            default_operator: string;
        };
        AdvancedQSettings: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            mode: "advanced_query_string";
            default_operator: string;
        };
        QSettings: components["schemas"]["SimpleQSettings"] | components["schemas"]["AdvancedQSettings"];
        GSearchRequestBodyV1: {
            q?: string;
            /** @default 10 */
            limit: number;
            advanced?: boolean;
            /**
             * @description Set to true to allow this operation to return data with visibility which does not include the current user. Only allowed for index admins and owners.
             * @default false
             */
            bypass_visible_to: boolean;
            filter_principal_sets?: string[];
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            "@version": "query#1.0.0";
            offset?: number;
            facets?: components["schemas"]["GFacetV1"][];
            filters?: components["schemas"]["GFilterV1"][];
            boosts?: components["schemas"]["GBoostV1"][];
            sort?: components["schemas"]["GSortV1"][];
            q_settings?: components["schemas"]["QSettings"];
            post_facet_filters?: components["schemas"]["GFilterV1"][];
        };
        GSearchRequestBody: components["schemas"]["GSearchRequestBody2017"] | components["schemas"]["GSearchRequestBodyV1"];
        GScrollRequest2017: {
            marker?: unknown;
            q?: string;
            /** @default 10 */
            limit: number;
            advanced?: boolean;
            /**
             * @description Set to true to allow this operation to return data with visibility which does not include the current user. Only allowed for index admins and owners.
             * @default false
             */
            bypass_visible_to: boolean;
            filter_principal_sets?: string[];
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            "@version": "2017-09-01";
            filters?: components["schemas"]["GFilter"][];
        };
        GScrollRequestV1: {
            marker?: unknown;
            q?: string;
            /** @default 10 */
            limit: number;
            advanced?: boolean;
            /**
             * @description Set to true to allow this operation to return data with visibility which does not include the current user. Only allowed for index admins and owners.
             * @default false
             */
            bypass_visible_to: boolean;
            filter_principal_sets?: string[];
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            "@version": "scroll#1.0.0";
            filters?: components["schemas"]["GFilterV1"][];
            q_settings?: components["schemas"]["QSettings"];
        };
        GScrollRequest: components["schemas"]["GScrollRequest2017"] | components["schemas"]["GScrollRequestV1"];
        GScrollResponse: {
            total?: number;
            /** @description The length of the 'gmeta' array. */
            count?: number;
            gmeta?: components["schemas"]["GMetaResult"][];
            /** @description True if another page of results is available with pagination. */
            has_next_page?: boolean;
            marker?: unknown;
        };
        GMetaEntry: {
            /** @default 2017-09-01 */
            "@version": unknown;
            subject: string;
            /** @default null */
            id: string | null;
            content: {
                [key: string]: unknown;
            };
            visible_to: string[];
            principal_sets?: {
                [key: string]: string[];
            };
        };
        GIngestEntry: {
            /** @default 2017-09-01 */
            "@version": unknown;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            ingest_type: "GMetaEntry";
            /**
             * @description A field_mapping explicitly sets the type for fields being  used in the ingest document.
             *     The fieldnames are used as keys and their values are the types to which they map.  Dots
             *     in fieldnames are interpreted as part of the path to a field, but may be escaped with a
             *     backslash.
             *
             *     Currently, only geo datatypes are supported.
             *
             * @example {
             *       "location.center": "geo_point",
             *       "location.boundary": "geo_shape"
             *     }
             */
            field_mapping?: {
                [key: string]: "geo_point" | "geo_shape";
            };
            ingest_data: components["schemas"]["GMetaEntry"];
        };
        GMetaList: {
            /** @default 2017-09-01 */
            "@version": unknown;
            gmeta: components["schemas"]["GMetaEntry"][];
        };
        GIngestList: {
            /** @default 2017-09-01 */
            "@version": unknown;
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            ingest_type: "GMetaList";
            /**
             * @description A field_mapping explicitly sets the type for fields being  used in the ingest document.
             *     The fieldnames are used as keys and their values are the types to which they map.  Dots
             *     in fieldnames are interpreted as part of the path to a field, but may be escaped with a
             *     backslash.
             *
             *     Currently, only geo datatypes are supported.
             *
             * @example {
             *       "location.center": "geo_point",
             *       "location.boundary": "geo_shape"
             *     }
             */
            field_mapping?: {
                [key: string]: "geo_point" | "geo_shape";
            };
            ingest_data: components["schemas"]["GMetaList"];
        };
        GIngest: components["schemas"]["GIngestEntry"] | components["schemas"]["GIngestList"];
        TaskSubmitResponse: {
            /** @description Always true for successful task submission. */
            acknowledged?: boolean;
            /**
             * Format: uuid
             * @description The ID of the task which was just created.
             */
            task_id?: string;
        };
        Task: {
            /** Format: uuid */
            task_id?: string;
            /** @enum {string} */
            state?: "PENDING" | "PROGRESS" | "SUCCESS" | "FAILED" | "CREATING";
            state_description?: string;
            task_type?: string;
            /** Format: uuid */
            index_id?: string;
            /** Format: date */
            creation_date?: string;
            message?: string;
            additional_details?: unknown;
            /** Format: date */
            completion_date?: string | null;
        };
        TaskList: {
            /** Format: uuid */
            index_id?: string;
            tasks?: components["schemas"]["Task"][];
        };
        IndexWithPermissions: {
            /** @default 2017-09-01 */
            readonly "@version": unknown;
            display_name?: string;
            description?: string;
            /** Format: uuid */
            id?: string;
            max_size_in_mb?: number;
            size_in_mb?: number;
            num_subjects?: number;
            num_entries?: number;
            /** Format: date */
            creation_date?: string;
            /** Format: date */
            content_last_modified_date?: string | null;
            entry_schema?: {
                [key: string]: unknown;
            };
            /** Format: uuid */
            subscription_id?: string;
            is_trial?: boolean;
            status?: string;
            /** @description The 'available' field indicates whether or not an index is available to serve queries and process tasks. It is `true` for active indices, but `false` when an index is being deleted or Globus Search is unable to access the index data. */
            available?: boolean;
            permissions?: ("owner" | "admin" | "writer")[];
        };
        IndexUpdate: {
            /**
             * @description The name of the index
             * @default null
             */
            display_name: string | null;
            /**
             * @description A description of the index
             * @default null
             */
            description: string | null;
        };
        IndexInfo: {
            /** @default 2017-09-01 */
            readonly "@version": unknown;
            display_name?: string;
            description?: string;
            /** Format: uuid */
            id?: string;
            max_size_in_mb?: number;
            size_in_mb?: number;
            num_subjects?: number;
            num_entries?: number;
            /** Format: date */
            creation_date?: string;
            /** Format: date */
            content_last_modified_date?: string | null;
            entry_schema?: {
                [key: string]: unknown;
            };
            /** Format: uuid */
            subscription_id?: string;
            is_trial?: boolean;
            status?: string;
            /** @description The 'available' field indicates whether or not an index is available to serve queries and process tasks. It is `true` for active indices, but `false` when an index is being deleted or Globus Search is unable to access the index data. */
            available?: boolean;
        };
        IndexDeleteResponse: {
            /** @description Always true for successful index deletion. */
            acknowledged?: boolean;
            /**
             * Format: uuid
             * @description The ID of the index which was marked for deletion.
             */
            index_id?: string;
        };
        IndexListWPermissions: {
            index_list?: components["schemas"]["IndexWithPermissions"][];
        };
        IndexCreate: {
            /** @description The name of the index */
            display_name: string;
            /** @description A description of the index */
            description: string;
        };
        IndexReopenResponse: {
            /** @description Always true for successful index reopen. */
            acknowledged?: boolean;
            /**
             * Format: uuid
             * @description The ID of the index which was reopened.
             */
            index_id?: string;
        };
        Role: {
            /** @description The ID of the role. */
            id?: string;
            /**
             * @description The name of the role. This implies some set of permissions.
             * @enum {string}
             */
            role_name?: "owner" | "admin" | "writer";
            /** Format: uuid */
            index_id?: string;
            /** @description The principal URN for the entity which has this role. */
            principal?: string;
            /**
             * @description The type of principal encoded by the URN.
             * @enum {string}
             */
            principal_type?: "identity" | "group";
            /** Format: date */
            creation_date?: string;
        };
        RoleList: {
            role_list?: components["schemas"]["Role"][];
        };
        RoleCreate: {
            /**
             * @description The name of the role. This implies some set of permissions.
             * @enum {string}
             */
            role_name?: "owner" | "admin" | "writer";
            /** @description The principal URN for the entity which has this role. */
            principal?: string;
        };
        DeletedRole: {
            deleted?: components["schemas"]["Role"];
            success?: boolean;
        };
        DeleteBySubjectRequest: {
            subjects: string[];
        };
        DeleteByQueryV1: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            "@version": "delete_by_query#1.0.0";
            q?: string;
            advanced?: boolean;
            q_settings?: components["schemas"]["QSettings"];
            filters?: components["schemas"]["GFilterV1"][];
        };
        DeleteByQuery: components["schemas"]["GSearchRequestBody2017"] | components["schemas"]["DeleteByQueryV1"];
        UGFieldMappings: {
            /** @default 2017-09-01 */
            readonly "@version": unknown;
            /**
             * @description A mapping from full field names to their types.
             * @example {
             *       "foo": "long",
             *       "bar.baz": "text"
             *     }
             */
            mappings?: {
                [key: string]: unknown;
            };
        };
        FieldBudget: {
            /** @description The size of the budget for the index. */
            budget?: number;
            /** @description The amount of the budget which has been used (i.e., budget - remaining). */
            used?: number;
            /** @description The amount of the budget remaining (i.e., budget - used). */
            remaining?: number;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
