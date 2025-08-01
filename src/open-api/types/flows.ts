export interface paths {
    "/flows": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieve all Flows
         * @description Query the Flows service for a listing of Flows available to a user
         *     according to the permissions (role) they have on the Flow.
         *
         */
        get: {
            parameters: {
                query?: {
                    /** @description An opaque token used to iterate through pages of returned Flows.
                     *     If provided, all other query arguments will be ignored.
                     *     The marker encodes all state in a given query,
                     *     therefore it's unnecessary to provide query arguments
                     *     once an initial marker has been received.
                     *      */
                    marker?: string;
                    /**
                     * @description The number of results to return in a single paged response.
                     *
                     * @example 50
                     */
                    per_page?: number;
                    /**
                     * @description The page of results to return.
                     * @example 2
                     */
                    page?: number;
                    /**
                     * @description Return Flows for which the user has the supplied role. The role the
                     *     user has on the Flow dictates the operations they can perform. If
                     *     multiple roles are specified, the user will have at least one of the
                     *     specified roles on each Flow returned.
                     *
                     * @example [
                     *       "flow_owner",
                     *       "flow_viewers"
                     *     ]
                     */
                    filter_roles?: ("flow_owner" | "flow_viewers" | "flow_starters" | "flow_administrators" | "run_managers" | "run_monitors")[];
                    /**
                     * @deprecated
                     * @description Return Flows for which the user has the provided role. The
                     *     role the user has on the Flow dictates the operations they
                     *     can perform. Roles are cumulative in the sense that
                     *     having, for example, the "flow_starter" role also implies having
                     *     the "flow_viewer" role. Thus, specifying "flow_starter" will also
                     *     include all Flows for which the user has "flow_viewer" role as
                     *     well. If not provided, only Flows for which the caller has
                     *     "flow_owner" role will be returned.
                     *
                     * @example flow_starter
                     */
                    filter_role?: "flow_viewer" | "flow_starter" | "flow_administrator" | "flow_owner" | "run_manager" | "run_monitor";
                    /**
                     * @description Performs a case insensitive substring based search on the Flows'
                     *     scope string fields. If multiple values are specified, each Flow
                     *     returned is guaranteed to contain at least one of the strings in its
                     *     scope strings.
                     *
                     * @example [
                     *       "0abc",
                     *       "100"
                     *     ]
                     */
                    filter_scope_string?: string[];
                    /**
                     * @description Performs a case insensitive substring based search on the Flows' title
                     *     field. If multiple values are specified, each Flow returned
                     *     is guaranteed to contain at least one of the strings in its title.
                     *
                     * @example [
                     *       "hello",
                     *       "science"
                     *     ]
                     */
                    filter_title?: string[];
                    /**
                     * @description Performs a case insensitive substring based search on the Flows'
                     *     subtitle field. If multiple values are specified, each Flow returned
                     *     is guaranteed to contain at least one of the strings in its
                     *     subtitle.
                     *
                     * @example [
                     *       "hello",
                     *       "science"
                     *     ]
                     */
                    filter_subtitle?: string[];
                    /**
                     * @description Performs a case insensitive substring based search on the Flows'
                     *     description field. If multiple values are specified, each Flow returned
                     *     is guaranteed to contain at least one of the strings in its
                     *     description.
                     *
                     * @example [
                     *       "hello",
                     *       "science"
                     *     ]
                     */
                    filter_description?: string[];
                    /**
                     * @description Performs a case insensitive substring based search on the Flows'
                     *     keywords field. If multiple values are specified, each Flow returned
                     *     is guaranteed to contain at least one of the substrings as a
                     *     keyword.
                     *
                     * @example [
                     *       "hello",
                     *       "science"
                     *     ]
                     */
                    filter_keywords?: string[];
                    /**
                     * @description Given a one or more patterns, this filter searches against a
                     *     pre-defined subset of fields for a match. If any of the fields match
                     *     any of the patterns, the Flow is considered a match.
                     *
                     *     The fields that are automatically searched in are:
                     *       - title
                     *       - subtitle
                     *       - flow_owner
                     *       - description
                     *       - id
                     *       - flow_administrators
                     *
                     * @example [
                     *       "globus"
                     *     ]
                     */
                    filter_fulltext?: string[];
                    /**
                     * @description Ordering criteria to apply to the list of flows.
                     *
                     *     This field is a comma-separated list of sort criteria,
                     *     and follows this syntax:
                     *
                     *     ```
                     *     CRITERION1[,CRITERION2[,...]]
                     *     ```
                     *
                     *     and each individual `CRITERION` follows this syntax:
                     *
                     *     ```
                     *     FIELD ORDERING
                     *     ```
                     *
                     *     The first value, `FIELD`, indicates the field to sort by;
                     *     the second value, `ORDERING`, indicates the sorting order.
                     *
                     *     When additional comma-separated criteria are added,
                     *     the first criterion will be used to sort the data;
                     *     subsequent criteria will be applied for ties.
                     *
                     *     Supported fields are:
                     *
                     *     - `id`
                     *     - `scope_string`
                     *     - `flow_owner`
                     *     - `flow_administrators`
                     *     - `title`
                     *     - `created_at`
                     *     - `updated_at`
                     *
                     *     Supported orderings are:
                     *
                     *     - `ASC`
                     *     - `DESC`
                     *
                     * @example [
                     *       "title ASC",
                     *       "id DESC"
                     *     ]
                     */
                    orderby?: components["parameters"]["list_flows_orderby"];
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The requestor has successfully authenticated and queried the Flow's
                 *     service for the Flows available for them.
                 *      */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            flows?: components["schemas"]["FlowResponse"][];
                            /** @description The number of Flows returned. */
                            limit?: number;
                            /** @description An opaque pagination token for iterating through returned
                             *     Flows.
                             *      */
                            marker?: string;
                            has_next_page?: boolean;
                        };
                    };
                };
                /** @description There was an issue parsing the query parameters.
                 *      */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description The requestor presented a token with insufficient scopes.
                 *      */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        /**
         * Deploy a Flow
         * @description Deploy a Flow and its schema.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        definition: components["schemas"]["FlowDefinition"];
                        /** @description A non-unique, human-friendly name used for displaying the provider
                         *     to end users.
                         *      */
                        title?: string;
                        /** @description A concise summary of the provider’s purpose. */
                        subtitle?: string;
                        /** @description A detailed description of the provider for end user display. */
                        description?: string;
                        /** @description A set of terms used to categorize the provider which may be used in
                         *     query and discovery operations. Maximum total length of all
                         *     keywords is 1024 characters.
                         *      */
                        keywords?: string[];
                        /**
                         * @description A set of Principal URNs, or the value "public",
                         *     indicating the identity of users and/or groups
                         *     who can view the flow.
                         *
                         * @example [
                         *       "urn:globus:auth:identity:46bd0f56-e24f-11e5-a510-131bef46955c",
                         *       "urn:globus:groups:id:fdb38a24-03c1-11e3-86f7-12313809f035"
                         *     ]
                         */
                        flow_viewers?: ("public" | components["schemas"]["PrincipalURN"])[];
                        /**
                         * @description A set of Principal URNs, or the value "all_authenticated_users",
                         *     indicating the identity of users who can start the flow.
                         *
                         * @example [
                         *       "urn:globus:auth:identity:46bd0f56-e24f-11e5-a510-131bef46955c",
                         *       "urn:globus:groups:id:fdb38a24-03c1-11e3-86f7-12313809f035"
                         *     ]
                         */
                        flow_starters?: ("all_authenticated_users" | components["schemas"]["PrincipalURN"])[];
                        /**
                         * @description The set of Principal URN values of users who may perform
                         *     administrative operations, including updating the description
                         *     itself, on the flow.
                         *
                         * @example [
                         *       "urn:globus:auth:identity:46bd0f56-e24f-11e5-a510-131bef46955c",
                         *       "urn:globus:groups:id:fdb38a24-03c1-11e3-86f7-12313809f035"
                         *     ]
                         */
                        flow_administrators?: components["schemas"]["PrincipalURN"][];
                        /** @description A published JSON Schema which input to the Flow must conform
                         *     to.
                         *      */
                        input_schema?: Record<string, unknown>;
                        run_managers?: components["schemas"]["RunManagers"];
                        run_monitors?: components["schemas"]["RunMonitors"];
                        /**
                         * Format: uuid
                         * @description A subscription to associate with this flow.
                         *
                         *     If no subscription is specified, the flow may be created
                         *     but may have limits on how long or how much it can be used.
                         *
                         */
                        subscription_id?: string;
                    };
                };
            };
            responses: {
                /** @description The Flow definition was successfully deployed onto the Flows
                 *     service.
                 *      */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["FlowResponse"];
                    };
                };
                /** @description The requestor attempted to deploy a malformed Flow.
                 *      */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description The requestor is not authorized to deploy a Flow.
                 *      */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/flows/validate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Validate a flow
         * @description Validate a flow definition and its schema.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        definition: components["schemas"]["FlowDefinition"];
                        /** @description A JSON Schema describing valid input to the flow.
                         *      */
                        input_schema?: Record<string, unknown>;
                    };
                };
            };
            responses: {
                /** @description The flow passed all validation checks.
                 *      */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["FlowValidationResponse"];
                    };
                };
                /** @description The requestor attempted to validate a malformed flow.
                 *      */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description The requestor is not authorized to validate a flow.
                 *      */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description A conflict was found in the flow definition or input schema.
                 *      */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description The flow definition or input schema failed validation checks.
                 *      */
                422: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["FlowValidationErrorResponse"];
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
    "/flows/{flow_id}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The flow ID */
                flow_id: components["parameters"]["flow_id"];
            };
            cookie?: never;
        };
        /**
         * Retrieve a Flow
         * @description Get a previously deployed Flow.
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The flow ID */
                    flow_id: components["parameters"]["flow_id"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The requestor has successfully authenticated and queried the Flow's
                 *     service for a specific Flow definition.
                 *      */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["FlowResponse"];
                    };
                };
                /** @description The requestor attempted to retrieve a Flow definition for which they
                 *     did not have access.
                 *      */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description The requestor attempted to retrieve a non-existent Flow, or the
                 *     requestor did not have permissions to view a Flow.
                 *      */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        /**
         * Update a Flow
         * @description Update a previously deployed Flow.
         */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The flow ID */
                    flow_id: components["parameters"]["flow_id"];
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        definition?: components["schemas"]["FlowDefinition"];
                        /** @description A JSON schema document.
                         *
                         *     When starting the flow, input keys and values must conform to the schema.
                         *     The Globus Web App uses the input schema to created a guided input page when starting the flow.
                         *      */
                        input_schema?: Record<string, unknown>;
                        /** @description A non-unique, human-friendly name used for displaying the flow to end users.
                         *      */
                        title?: string;
                        /** @description A short summary of the flow's purpose or functionality.
                         *      */
                        subtitle?: string;
                        /** @description Arbitrary text to describe the Flow.
                         *      */
                        description?: string;
                        /** @description If provided, the value must be the calling user's Globus Auth identity URN,
                         *     and the user must be a flow administrator.
                         *
                         *     It is not possible for non-administrators to take ownership of a flow.
                         *     Also, it is currently not possible to assign ownership to another user.
                         *      */
                        flow_owner?: string;
                        /** @description A list of Globus Auth identity and group URNs that may administer the flow.
                         *
                         *     Flow administrators are able to see the full flow definition,
                         *     including any parameters listed in a "__Private_Parameters" value.
                         *      */
                        flow_administrators?: string[];
                        /** @description A list of Globus Auth identity and group URNs that may start the flow.
                         *
                         *     It is possible to make a flow available for use to all authenticated users
                         *     -- including those outside your organization or domain --
                         *     by using the special value "all_authenticated_users".
                         *
                         *     Parameters listed in "__Private_Parameters" values in the definition
                         *     will be removed from the definition when it is viewed by a flow starter.
                         *      */
                        flow_starters?: string[];
                        /** @description A list of Globus Auth identity and group URNs that may see the flow,
                         *     including its definition and input schema.
                         *
                         *     It is possible to make a flow available for viewing to all users
                         *     -- including those outside your organization or domain --
                         *     by using the special value "public".
                         *
                         *     Parameters listed in "__Private_Parameters" values in the definition
                         *     will be removed from the definition when it is viewed by a flow starter.
                         *      */
                        flow_viewers?: string[];
                        /** @description A list of keywords that can be used for grouping or identifying flows.
                         *      */
                        keywords?: string[];
                        run_managers?: components["schemas"]["RunManagers"];
                        run_monitors?: components["schemas"]["RunMonitors"];
                        subscription_id?: string & (unknown | "DEFAULT");
                    };
                };
            };
            responses: {
                /** @description The requestor has successfully authenticated and updated the target
                 *     Flow definition.
                 *      */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["FlowResponse"];
                    };
                };
                /** @description The Flow definition update failed due to an attempt to perform a
                 *     malformed update.
                 *      */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description The requestor attempted to update a Flow for which they did not have
                 *     access.
                 *      */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description The requestor attempted to update a non-existent Flow, or the
                 *     requestor did not have permissions to update a Flow.
                 *      */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        post?: never;
        /**
         * Remove a Flow
         * @description Remove a Flow from the Flow service.
         */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The flow ID */
                    flow_id: components["parameters"]["flow_id"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The requestor has successfully removed the Flow from the Flows
                 *     service.
                 *      */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["FlowResponse"];
                    };
                };
                /** @description The requestor attempted to modify a Flow for which they did not have
                 *     access.
                 *      */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description The requestor attempted to remove a non-existent Flow, or the
                 *     requestor did not have permissions to remove the Flow.
                 *      */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/flows/{flow_id}/run": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The flow ID */
                flow_id: components["parameters"]["flow_id"];
            };
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Start a Flow
         * @description Start a particular Flow, which creates a Run.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The flow ID */
                    flow_id: components["parameters"]["flow_id"];
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        body: components["schemas"]["InputBody"];
                        run_monitors?: components["schemas"]["RunMonitors"];
                        run_managers?: components["schemas"]["RunManagers"];
                        label?: components["schemas"]["Label"];
                        tags?: components["schemas"]["Tags"];
                        activity_notification_policy?: components["schemas"]["ActivityNotificationPolicy"];
                    };
                };
            };
            responses: {
                /** @description The Run was successfully started. */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["FlowRun"];
                    };
                };
                /** @description The Run's input failed validation against the Flow's input schema.
                 *      */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description The requestor presented a token with insufficient scopes.
                 *      */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description The requestor did not have access to run the provided Flow, or the
                 *     Flow does not exist.
                 *      */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description The input tags did not pass validation. */
                422: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description An upstream service has imposed rate limiting.
                 *     The requestor may resubmit the API request.
                 *      */
                429: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description An upstream service returned an uncorrectable error.
                 *     The error may or may not occur if the API request is submitted again.
                 *     It may be possible to resubmit the API request.
                 *      */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/flows/{flow_id}/validate_run": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The flow ID */
                flow_id: components["parameters"]["flow_id"];
            };
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Validate a run
         * @description Validate that a run input body will pass the target flow's input schema validation (if any),
         *     that run metadata will meet the Flows service's metadata constraints,
         *     and that known scope requirements are met by the user's or client's Globus Auth token.
         *
         *     If validation passes, then it is likely that the flow can be started
         *     with the same inputs and Globus Auth token.
         *
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The flow ID */
                    flow_id: components["parameters"]["flow_id"];
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        activity_notification_policy?: components["schemas"]["ActivityNotificationPolicy"];
                        body: components["schemas"]["InputBody"];
                        label?: components["schemas"]["Label"];
                        run_managers?: components["schemas"]["RunManagers"];
                        run_monitors?: components["schemas"]["RunMonitors"];
                        tags?: components["schemas"]["Tags"];
                    };
                };
            };
            responses: {
                /** @description The inputs and Globus Auth token passed validation.
                 *
                 *     It is likely that the user or client will be able to start the flow
                 *     using the same Globus Auth token and input values.
                 *      */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ValidateRun"];
                    };
                };
                /** @description The input body failed validation against the flow's input schema.
                 *      */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description The user or client is not allowed to run the flow,
                 *     or the Globus Auth token is missing required scopes.
                 *      */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/runs/{run_id}/release": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The run ID */
                run_id: components["parameters"]["run_id"];
            };
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Remove a Run
         * @description Remove the state for a particular invocation of a Flow.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The run ID */
                    run_id: components["parameters"]["run_id"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The request was successful. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["FlowRun"];
                    };
                };
                /** @description The requestor is not authorized to access the run or flow,
                 *     or has not provided access tokens with sufficient privileges.
                 *      */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description The requested Run or Flow was not found. Or, the requestor did not
                 *     have access to view the Run.
                 *      */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description The requestor attempted to remove the state for a Run which had
                 *     not yet reached a completed status.
                 *      */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description An upstream service rate-limited the request to release the Run.
                 *     The requestor may re-submit the request at a later time.
                 *      */
                429: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description The run is in an unexpected state in the Flows service.
                 *     Please contact Globus support.
                 *      */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description A request to an upstream service failed for an unknown reason.
                 *     The requestor can re-submit the request or contact Globus support.
                 *      */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/flows/{flow_id}/{run_id}/resume": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The flow ID */
                flow_id: components["parameters"]["flow_id"];
                /** @description The run ID */
                run_id: components["parameters"]["run_id"];
            };
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Resume a Run
         * @description Attempt to resume a Run, particularly when it has reached a
         *     status of INACTIVE. A Flow Run may reach an INACTIVE status
         *     when an Action type state within the Flow returns its status
         *     as INACTIVE. The resume operation on the Flow Run provides a
         *     hint that the cause of the Action becoming INACTIVE may have
         *     been cleared, and thus the resume operation on the Action
         *     Provider should be invoked to allow the Action state to resume
         *     and thus resume the Flow Run.
         *
         *     In the particular case that an Action state is INACTIVE with a
         *     code value of "ConsentRequired" it is further assumed that the
         *     Bearer token provided in the Authorization header on the
         *     resume operation now carries sufficient consents to continue
         *     the INACTIVE Action. Thus, the Flow service will use the
         *     Bearer token to generate new dependent tokens for running the
         *     Action and use these tokens to request that the Action be
         *     resumed at the Action Provider.
         *
         *     Note again that in reasons other than "ConsentRequired" for a
         *     Flow or Action to go INACTIVE, the resume operation is just a
         *     hint. For example, when the code is "ActivationRequired,"
         *     indicating that a Globus collection or endpoint needs to be
         *     Activated by the user, performing that Activation out-of-band
         *     from the Flow will allow the Flow to proceed even without the
         *     resume operation as the Action is periodically polled for
         *     progress. Performing the resume operation may simply cause a
         *     poll to happen more quickly and thus allow the Action to
         *     resume more quickly.
         *
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The flow ID */
                    flow_id: components["parameters"]["flow_id"];
                    /** @description The run ID */
                    run_id: components["parameters"]["run_id"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The request was successful. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["FlowRun"];
                    };
                };
                /** @description The requested Run or Flow was not found. Or, the requestor did not
                 *     have access to manage the Run.
                 *      */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/runs/{run_id}/resume": paths["/flows/{flow_id}/{run_id}/resume"];
    "/runs/{run_id}/cancel": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The run ID */
                run_id: components["parameters"]["run_id"];
            };
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Cancel a Run
         * @description Cancel the execution for a particular Run of a Flow.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The run ID */
                    run_id: components["parameters"]["run_id"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The request was successfully received. */
                202: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["FlowRun"];
                    };
                };
                /** @description The requested Run or Flow was not found. Or, the requestor did not
                 *     have access to view the Run.
                 *      */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description The service encountered an Upstream error when attempting to cancel
                 *     the Run.
                 *      */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/flows/{flow_id}/runs/{run_id}/log": {
        parameters: {
            query?: {
                /** @description An integer limit on the number of log records returned. */
                limit?: number;
                /** @description A flag to indicate if log records should be returned in reverse order.
                 *      */
                reverse_order?: boolean;
                /** @description A token used to iterate through pages of returned log records.
                 *      */
                pagination_token?: string;
            };
            header?: never;
            path: {
                /** @description The flow ID */
                flow_id: components["parameters"]["flow_id"];
                /** @description The run ID */
                run_id: components["parameters"]["run_id"];
            };
            cookie?: never;
        };
        /**
         * Get execution details on a Run
         * @description Retrieve detailed execution information for a particular Flow Run
         *
         */
        get: {
            parameters: {
                query?: {
                    /** @description An integer limit on the number of log records returned. */
                    limit?: number;
                    /** @description A flag to indicate if log records should be returned in reverse order.
                     *      */
                    reverse_order?: boolean;
                    /** @description A token used to iterate through pages of returned log records.
                     *      */
                    pagination_token?: string;
                };
                header?: never;
                path: {
                    /** @description The flow ID */
                    flow_id: components["parameters"]["flow_id"];
                    /** @description The run ID */
                    run_id: components["parameters"]["run_id"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The request was successfully received. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @description The number of log states returned. */
                            limit: number;
                            /** @description An opaque pagination token for iterating through returned
                             *     records. If there are no more entries, this field will not
                             *     exist.
                             *      */
                            marker?: string;
                            has_next_page: boolean;
                            entries: Record<string, unknown>[];
                        };
                    };
                };
                /** @description There was an issue parsing the query parameters.
                 *      */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description The requested Action or Flow was not found. Or, the
                 *     requestor did not have access to view the Action.
                 *      */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
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
    "/runs/{run_id}/log": paths["/flows/{flow_id}/runs/{run_id}/log"];
    "/flows/{flow_id}/runs": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The flow ID */
                flow_id: components["parameters"]["flow_id"];
            };
            cookie?: never;
        };
        /**
         * Get a Flow's Runs
         * @description Retrieve a listing of Runs launched from a particular Flow. If hitting
         *     the *\/actions endpoint, the response will list the Runs under a
         *     "actions" key. If hitting the *\/runs endpoint, the response will list
         *     the Runs under a "runs" key.
         *
         */
        get: {
            parameters: {
                query?: {
                    /** @description An opaque token used to iterate through pages of returned Actions.
                     *     If provided, all other query arguments will be ignored.
                     *     The marker encodes all state in a given query,
                     *     therefore it's unnecessary to provide query arguments
                     *     once an initial marker has been received.
                     *      */
                    marker?: string;
                    /**
                     * @deprecated
                     * @description ("marker" is now the preferred name for this parameter.)
                     *     An opaque token used to iterate through pages of returned Actions. If
                     *     provided, all other query arguments will be ignored. The
                     *     pagination_token encodes all state in a given query, therefore it's
                     *     unnecessary to provide query arguments once an initial token has been
                     *     received.
                     *
                     */
                    pagination_token?: string;
                    /**
                     * @description The number of results to return in a single paged response.
                     *
                     * @example 50
                     */
                    per_page?: number;
                    /**
                     * @description The page of results to return.
                     * @example 2
                     */
                    page?: number;
                    /**
                     * @description Return Actions for which the user has the supplied role. The role the
                     *     user has on the Action dictates the operations they can perform.
                     *     If multiple roles are specified, the user will have at least one of
                     *     the specified roles on each Action returned.
                     *
                     * @example [
                     *       "run_manager"
                     *     ]
                     */
                    filter_roles?: ("run_owner" | "run_manager" | "run_monitor" | "flow_run_manager" | "flow_run_monitor")[];
                    /**
                     * @deprecated
                     * @description Return Actions for which the user has the provided
                     *     role. The role the user has on the Action dictates the
                     *     operations they can perform. Roles are cumulative in the
                     *     sense that having, for example, the "run_manager" role also
                     *     implies having the "run_monitor" role. Thus, specifying
                     *     manager will also include all Actions for which the user
                     *     has "run_monitor" role as well. If not provided, only Actions
                     *     for which the caller has "run_owner" role will be returned.
                     *
                     * @example [
                     *       "run_manager"
                     *     ]
                     */
                    filter_role?: "run_monitor" | "run_manager" | "run_owner" | "flow_run_manager" | "flow_run_monitor";
                    /**
                     * @description Return Actions which are in the specified state. The state of the
                     *     Action dictates the operations which can performed on them. If
                     *     multiple statuses are specified, each Action returned will be in one
                     *     of the specified states. By default, Actions in any state will be
                     *     returned.
                     *
                     * @example [
                     *       "FAILED",
                     *       "INACTIVE"
                     *     ]
                     */
                    filter_status?: ("SUCCEEDED" | "FAILED" | "ENDED" | "ACTIVE" | "INACTIVE")[];
                    /**
                     * @description Performs a case insensitive string based search on the Actions'
                     *     label fields. If multiple values are specified, each Action returned
                     *     is guaranteed to contain at least one of the strings in its label.
                     *
                     * @example [
                     *       "science",
                     *       "tests"
                     *     ]
                     */
                    filter_label?: string[];
                    /**
                     * @description Given a pair of comma-separated ISO 8601 datetime strings,
                     *     filter results to only those runs which completed execution
                     *     within the specified range.
                     *
                     *     If one of the dates is omitted, it forms an open range.
                     *     For example, if the filter has a datetime followed by a comma (`"DT,"`),
                     *     all records with a date greater then or equal to `DT` will be returned.
                     *     Similarly, if the filter has a comma followed by a datetime (`",DT"`),
                     *     all records with dates less than `DT` will be returned.
                     *     If there is no comma, it is treated in the same way as `"DT,"`, above.
                     *
                     *     Results will contain runs which completed between the first datetime
                     *     onwards, up to (but not including) the second datetime.
                     *
                     *     Note that runs which are still executing will not have a completion time
                     *     and will be automatically excluded if this filter is applied.
                     *
                     * @example 2021-03-09T21:52:14,2021-03-09T21:53
                     */
                    filter_completion_time?: components["parameters"]["filter_completion_time"];
                    /**
                     * @description Given a pair of comma separated ISO 8601 date/time strings,
                     *     filter results to only those runs which started execution
                     *     within the specified range.
                     *
                     *     If one of the dates is omitted, it forms an open range.
                     *     For example, if the filter has a datetime followed by a comma (`"DT,"`),
                     *     all records with a date greater then or equal to `DT` will be returned.
                     *     Similarly, if the filter has a comma followed by a datetime (`",DT"`),
                     *     all records with dates less than `DT` will be returned.
                     *     If there is no comma, it is treated in the same way as `"DT,"`, above.
                     *
                     *     Results will contain runs which began between the first datetime
                     *     onwards, up to (but not including) the second datetime.
                     *
                     * @example 2021-03-09T21:52:14,2021-03-09T21:53
                     */
                    filter_start_time?: components["parameters"]["filter_start_time"];
                    /**
                     * @description Ordering criteria to apply to the list of runs.
                     *
                     *     This field is a comma-separated list of sort criteria,
                     *     and follows this syntax:
                     *
                     *     ```
                     *     CRITERION1[,CRITERION2[,...]]
                     *     ```
                     *
                     *     and each individual `CRITERION` follows this syntax:
                     *
                     *     ```
                     *     FIELD ORDERING
                     *     ```
                     *
                     *     The first value, `FIELD`, indicates the field to sort by;
                     *     the second value, `ORDERING`, indicates the sorting order.
                     *
                     *     When additional comma-separated criteria are added,
                     *     the first criterion will be used to sort the data;
                     *     subsequent criteria will be applied for ties.
                     *
                     *     Supported fields are:
                     *
                     *     - `id`
                     *     - `start_time`
                     *     - `completion_time`
                     *     - `status`
                     *     - `label`
                     *
                     *     Supported orderings are:
                     *
                     *     - `ASC`
                     *     - `DESC`
                     *
                     * @example [
                     *       "start_time ASC",
                     *       "id DESC"
                     *     ]
                     */
                    orderby?: components["parameters"]["list_runs_orderby"];
                };
                header?: never;
                path: {
                    /** @description The flow ID */
                    flow_id: components["parameters"]["flow_id"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The request was successfully received. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @description An opaque pagination token for iterating through returned
                             *     Actions. If there are no more entries, this field will not
                             *     exist.
                             *      */
                            marker?: string;
                            has_next_page: boolean;
                            actions: components["schemas"]["FlowRun"][];
                        };
                    };
                };
                /** @description The requestor presented a token with insufficient scopes.
                 *      */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description The Flow does not exist or the requestor did not have access to
                 *     enumerate the Flow's Actions.
                 *      */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
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
    "/runs": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List all Runs
         * @description Retrieve a listing of Actions/Runs launched across all Flows. If hitting
         *     the *\/actions endpoint, the response will list the Runs under a
         *     "actions" key. If hitting the *\/runs endpoint, the response will list
         *     the Runs under a "runs" key.
         *
         */
        get: {
            parameters: {
                query?: {
                    /** @description An opaque token used to iterate through pages of returned Actions.
                     *     If provided, all other query arguments will be ignored.
                     *     The marker encodes all state in a given query,
                     *     therefore it's unnecessary to provide query arguments
                     *     once an initial marker has been received.
                     *      */
                    marker?: string;
                    /**
                     * @deprecated
                     * @description ("marker" is now the preferred name for this parameter.)
                     *     An opaque token used to iterate through pages of returned Actions. If
                     *     provided, all other query arguments will be ignored. The
                     *     pagination_token encodes all state in a given query, therefore it's
                     *     unnecessary to provide query arguments once an initial token has been
                     *     received.
                     *
                     */
                    pagination_token?: string;
                    /**
                     * @description The number of results to return in a single paged response.
                     *
                     * @example 50
                     */
                    per_page?: number;
                    /**
                     * @description The page of results to return.
                     * @example 2
                     */
                    page?: number;
                    /**
                     * @description Return Runs for which the user has the supplied role. The role the
                     *     user has on the Action dictates the operations they can perform.
                     *     If multiple roles are specified, the user will have at least one of
                     *     the specified roles on each Action returned.
                     *
                     * @example [
                     *       "run_owner",
                     *       "run_managers"
                     *     ]
                     */
                    filter_roles?: ("run_owner" | "run_managers" | "run_monitors" | "flow_run_managers" | "flow_run_monitors")[];
                    /**
                     * @deprecated
                     * @description Return Runs for which the user has the provided
                     *     role. The role the user has on the Runs dictates the
                     *     operations they can perform. Roles are cumulative in the
                     *     sense that having, for example, the "run_manager" role also
                     *     implies having the "run_monitor" role. Thus, specifying
                     *     manager will also include all Runs for which the user
                     *     has "run_monitor" role as well. If not provided, only Runs
                     *     for which the caller has "run_owner" role will be returned.
                     *
                     * @example run_manager
                     */
                    filter_role?: "run_monitor" | "run_manager" | "run_owner";
                    /**
                     * @description Return Actions which are in the specified state. The state of the
                     *     Action dictates the operations which can performed on them. If
                     *     multiple statuses are specified, each Action returned will be in one
                     *     of the specified states. By default, Actions in any state will be
                     *     returned.
                     *
                     * @example [
                     *       "FAILED",
                     *       "INACTIVE"
                     *     ]
                     */
                    filter_status?: ("SUCCEEDED" | "FAILED" | "ENDED" | "ACTIVE" | "INACTIVE")[];
                    /**
                     * @description Performs a case insensitive string based search on the Actions'
                     *     label fields. If multiple values are specified, each Action returned
                     *     is guaranteed to contain at least one of the strings in its label.
                     *
                     * @example [
                     *       "science",
                     *       "tests"
                     *     ]
                     */
                    filter_label?: string[];
                    /**
                     * @description Performs a case insensitive string based search to filter for
                     *     Actions which have parent Flow's with a matching title(s). If
                     *     multiple values are specified, each Action returned will have a
                     *     parent Flow with a title matching at least one of the strings.
                     *
                     * @example [
                     *       "globus",
                     *       "tests"
                     *     ]
                     */
                    filter_flow_title?: string[];
                    /**
                     * @description Performs an equality based search to filter for Runs which were
                     *     initiated from the specified Flow ID(s). If multiple values are
                     *     specified, each Run returned will have been initiated from at least
                     *     one of the specified Flow IDs.
                     *
                     * @example [
                     *       "00000000-19d9-4f5b-9329-22ed12d4d3dd",
                     *       "11111111-19a5-4d19-998e-0709c40321e9"
                     *     ]
                     */
                    filter_flow_id?: string[];
                    /**
                     * @description Given a pair of comma-separated ISO 8601 datetime strings,
                     *     filter results to only those runs which completed execution
                     *     within the specified range.
                     *
                     *     If one of the dates is omitted, it forms an open range.
                     *     For example, if the filter has a datetime followed by a comma (`"DT,"`),
                     *     all records with a date greater then or equal to `DT` will be returned.
                     *     Similarly, if the filter has a comma followed by a datetime (`",DT"`),
                     *     all records with dates less than `DT` will be returned.
                     *     If there is no comma, it is treated in the same way as `"DT,"`, above.
                     *
                     *     Results will contain runs which completed between the first datetime
                     *     onwards, up to (but not including) the second datetime.
                     *
                     *     Note that runs which are still executing will not have a completion time
                     *     and will be automatically excluded if this filter is applied.
                     *
                     * @example 2021-03-09T21:52:14,2021-03-09T21:53
                     */
                    filter_completion_time?: components["parameters"]["filter_completion_time"];
                    /**
                     * @description Given a pair of comma separated ISO 8601 date/time strings,
                     *     filter results to only those runs which started execution
                     *     within the specified range.
                     *
                     *     If one of the dates is omitted, it forms an open range.
                     *     For example, if the filter has a datetime followed by a comma (`"DT,"`),
                     *     all records with a date greater then or equal to `DT` will be returned.
                     *     Similarly, if the filter has a comma followed by a datetime (`",DT"`),
                     *     all records with dates less than `DT` will be returned.
                     *     If there is no comma, it is treated in the same way as `"DT,"`, above.
                     *
                     *     Results will contain runs which began between the first datetime
                     *     onwards, up to (but not including) the second datetime.
                     *
                     * @example 2021-03-09T21:52:14,2021-03-09T21:53
                     */
                    filter_start_time?: components["parameters"]["filter_start_time"];
                    /**
                     * @description Ordering criteria to apply to the list of runs.
                     *
                     *     This field is a comma-separated list of sort criteria,
                     *     and follows this syntax:
                     *
                     *     ```
                     *     CRITERION1[,CRITERION2[,...]]
                     *     ```
                     *
                     *     and each individual `CRITERION` follows this syntax:
                     *
                     *     ```
                     *     FIELD ORDERING
                     *     ```
                     *
                     *     The first value, `FIELD`, indicates the field to sort by;
                     *     the second value, `ORDERING`, indicates the sorting order.
                     *
                     *     When additional comma-separated criteria are added,
                     *     the first criterion will be used to sort the data;
                     *     subsequent criteria will be applied for ties.
                     *
                     *     Supported fields are:
                     *
                     *     - `id`
                     *     - `start_time`
                     *     - `completion_time`
                     *     - `status`
                     *     - `label`
                     *
                     *     Supported orderings are:
                     *
                     *     - `ASC`
                     *     - `DESC`
                     *
                     * @example [
                     *       "start_time ASC",
                     *       "id DESC"
                     *     ]
                     */
                    orderby?: components["parameters"]["list_runs_orderby"];
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The request was successfully received. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @description An opaque pagination token for iterating through returned
                             *     Actions. If there are no more entries, this field will not
                             *     exist.
                             *      */
                            marker?: string;
                            has_next_page: boolean;
                            actions?: components["schemas"]["FlowRun"][];
                            runs?: components["schemas"]["FlowRun"][];
                        };
                    };
                };
                /** @description The requestor presented a token with insufficient scopes.
                 *      */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description The Flow does not exist or the requestor did not have access to
                 *     enumerate the Actions.
                 *      */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
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
    "/runs/{run_id}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The run ID */
                run_id: components["parameters"]["run_id"];
            };
            cookie?: never;
        };
        /**
         * Get details about a run
         * @description Get details about a run.
         *
         */
        get: {
            parameters: {
                query?: {
                    /**
                     * @description If present and set to a true value,
                     *     metadata about the associated flow will be included.
                     *
                     * @example true
                     */
                    include_flow_description?: true | true | false | false;
                };
                header?: never;
                path: {
                    /** @description The run ID */
                    run_id: components["parameters"]["run_id"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The request was successfully received. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["FlowRunWithFlowEmbed"];
                    };
                };
                /** @description The requestor presented a token with insufficient scopes.
                 *      */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description The Run does not exist or the requestor did not have access to
                 *     view the Run's status.
                 *      */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        /**
         * Update a Run's metadata
         * @description Modify a Run's metadata.
         *
         *     By default only the Run initiator is able to modify a Run's metadata.
         *     Note that delegating manage access to a principal will allow them
         *     to further alter the principals with monitor and manage access.
         *
         */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The run ID */
                    run_id: components["parameters"]["run_id"];
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["RunUpdate"];
                };
            };
            responses: {
                /** @description The request was successfully received. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["FlowRun"];
                    };
                };
                /** @description The requestor presented a token with insufficient scopes.
                 *      */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description The Run does not exist or the requestor did not have access to
                 *     modify the Run.
                 *      */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description The request's JSON body did not pass schema validation.
                 *      */
                422: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description An upstream service has imposed rate limiting.
                 *     The requestor may resubmit the API request.
                 *      */
                429: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description An unknown upstream service error occurred.
                 *     The problem may be resolved by re-submitting the API request.
                 *      */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/runs/{run_id}/definition": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The run ID */
                run_id: components["parameters"]["run_id"];
            };
            cookie?: never;
        };
        /**
         * Get the Flow definition and input schema that were used to start a Run
         * @description Flow definitions and input schemas may be updated after a Run has been started.
         *
         *     This route allows users to view the Flow definition and input schema
         *     that were used to start a given Run.
         *
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The run ID */
                    run_id: components["parameters"]["run_id"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The request was successfully received. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["GetRunDefinitionResponse"];
                    };
                };
                /** @description The requestor presented a token with insufficient scopes.
                 *      */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description The Run does not exist or the requestor did not have access to view the Run.
                 *      */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
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
    "/batch/runs": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Update metadata for multiple Runs. */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        filters: {
                            run_ids: string[];
                        };
                        set?: components["schemas"]["BatchRunUpdateSetOperation"];
                        add?: components["schemas"]["BatchRunUpdateOperation"];
                        remove?: components["schemas"]["BatchRunUpdateOperation"];
                    };
                };
            };
            responses: {
                202: components["responses"]["HTTP202Response"];
                403: components["responses"]["HTTP403Response"];
                422: components["responses"]["HTTP422Response"];
            };
        };
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
        /**
         * The flow definition
         * @description The flow definition.
         *
         *     If this parameter is used when updating a flow,
         *     runs that are currently executing will continue to use the definition
         *     that they were initially started with.
         *
         */
        FlowDefinition: {
            Comment?: string;
            StartAt: string;
            States: {
                [key: string]: components["schemas"]["Pass"] | components["schemas"]["Action"] | components["schemas"]["Wait"] | components["schemas"]["Choice"] | components["schemas"]["ExpressionEval"] | components["schemas"]["Fail"];
            };
        };
        FlowRun: {
            /** @description The ID for a particular Flow invocation. Analogous to a run_id.
             *      */
            action_id: string;
            /** @description The ID for a particular Flow invocation. Analogous to an action_id.
             *      */
            run_id: string;
            /** @description The Flow to which this Run belongs.
             *      */
            flow_id: string;
            /**
             * Format: date-time
             * @description A timezone-aware ISO8601 format string that represents the time at
             *     which the last update to this Run's Flow occurred.
             *
             */
            flow_last_updated: string;
            /**
             * Format: date-time
             * @description A timezone-aware ISO8601 format string that represents the time at
             *     which this Run started.
             *
             */
            start_time: string;
            /**
             * Format: date-time
             * @description A timezone-aware ISO8601 format string that represents the time at
             *     which this Run reached a completed status.
             *
             */
            completion_time: string;
            label: components["schemas"]["Label"];
            /**
             * @description The current state of the Run.
             * @enum {string}
             */
            status: "SUCCEEDED" | "FAILED" | "ENDED" | "ACTIVE" | "INACTIVE";
            display_status?: string;
            details: Record<string, unknown>;
            run_owner: components["schemas"]["PrincipalURN"];
            run_monitors?: components["schemas"]["RunMonitors"];
            run_managers?: components["schemas"]["RunManagers"];
            /**
             * @description The role the requesting user has on the Run.
             *
             * @enum {string}
             */
            user_role: "run_monitor" | "run_manager" | "run_owner";
            tags: components["schemas"]["Tags"];
        };
        ValidateRun: {
            /**
             * @description A message indicating the validation was successful
             *
             * @example success
             */
            message: string;
        };
        GetRunDefinitionResponse: {
            /** @description The Flow used to start the Run.
             *      */
            flow_id: string;
            /** @description The definition of the Flow at the time the Run was started.
             *      */
            definition: Record<string, unknown>;
            /** @description The input schema of the Flow at the time the Run was started.
             *      */
            input_schema: Record<string, unknown>;
        };
        FlowEmbed: {
            /** @description The unique identifier for the Flow. */
            id: string;
            flow_owner?: components["schemas"]["PrincipalURN"];
            /**
             * Format: date-time
             * @description A timezone-aware ISO8601 format string that represents the time at
             *     which the Flow was created.
             *
             */
            created_at: string;
            /**
             * Format: date-time
             * @description A timezone-aware ISO8601 format string that represents the time at
             *     which the Flow was last updated.
             *
             */
            updated_at?: string;
            /**
             * Format: date-time
             * @description A timezone-aware ISO8601 format string that represents the time at
             *     which the Flow was deleted (not present if the Flow has not been deleted).
             *
             */
            deleted_at?: string;
            /** @description A non-unique, human-friendly name used for displaying the Flow to end users.
             *      */
            title: string;
            /** @description A concise summary of the Flow's purpose. */
            subtitle?: string;
            /** @description A detailed description of the Flow for end user display. */
            description?: string;
            /** @description A set of terms used to categorize the Flow which may be used in
             *     query and discovery operations.
             *      */
            keywords?: string[];
        };
        FlowRunWithFlowEmbed: components["schemas"]["FlowRun"] & {
            flow_description?: components["schemas"]["FlowEmbed"];
        };
        RunUpdate: {
            label?: components["schemas"]["Label"];
            run_monitors?: components["schemas"]["RunMonitors"];
            run_managers?: components["schemas"]["RunManagers"];
            tags?: components["schemas"]["Tags"];
        };
        /**
         * Activity notification policy
         * @description The email notification policy for the run.
         */
        ActivityNotificationPolicy: {
            /**
             * @description The set of statuses on which to notify the run's owner by email.
             *
             * @default [
             *       "INACTIVE"
             *     ]
             */
            status: ("INACTIVE" | "FAILED" | "SUCCEEDED")[];
        };
        /**
         * Input body
         * @description The input body that will be passed into the flow when it starts.
         *     If the flow defines an input schema, the input body will be validated against the input schema.
         *     If there is no input schema, no validation will be performed.
         */
        InputBody: {
            [key: string]: unknown;
        };
        /**
         * Label
         * @description A short, human-readable description of the run.
         * @example Generate a report for experiment xDA202-batch-3
         */
        Label: string;
        /**
         * Run managers
         * @description A list of Globus Auth identity and group URNs that may manage runs of the flow.
         *
         *     "Managing" operations include updating, canceling, and deleting the run.
         *
         *     Only users with the "run_manager" role will be able to view this list.
         *     Users with only the "run_monitor" role will see an empty list.
         *
         */
        RunManagers: components["schemas"]["PrincipalURN"][];
        /**
         * Run monitors
         * @description A list of Globus Auth identity and group URNs that may monitor runs of the flow.
         *
         *     "Monitoring" operations include checking the run status and its logs.
         *
         *     Only users with the "run_manager" role will be able to view this list.
         *     Users with only the "run_monitor" role will see an empty list.
         *
         */
        RunMonitors: components["schemas"]["PrincipalURN"][];
        /**
         * Tags
         * @description A list of tags to associate with the run.
         *
         *     Tags are normalized by stripping leading and trailing whitespace,
         *     and by replacing all whitespace with a single space.
         *
         *     When updating a run, existing tags will be overwritten.
         *     This means that an empty array will delete all existing tags.
         *
         * @example [
         *       "Experiment:xDA202",
         *       "Site:Nautilus",
         *       "Friday COB Report"
         *     ]
         */
        Tags: string[];
        /**
         * @description A URN representation of an Identity in Globus either of a user from
         *     Globus Auth or a group from Globus Groups.
         *
         * @example urn:globus:auth:identity:46bd0f56-e24f-11e5-a510-131bef46955c
         */
        PrincipalURN: string;
        JsonPathPattern: string;
        NextOrEnd: {
            Next?: string;
            End?: boolean;
        } & (unknown | unknown);
        Parameters: {
            Parameters?: {
                [key: string]: unknown;
            };
        };
        InputPath: {
            InputPath?: components["schemas"]["JsonPathPattern"];
        };
        ResultPath: {
            ResultPath?: components["schemas"]["JsonPathPattern"];
        };
        ParametersOrInputPathNotRequired: components["schemas"]["Parameters"] & components["schemas"]["InputPath"];
        ParametersOrInputPath: (components["schemas"]["Parameters"] & components["schemas"]["InputPath"]) & (unknown | unknown);
        Pass: {
            Type?: string;
            Comment?: unknown;
            Next?: unknown;
            End?: unknown;
            InputPath?: unknown;
            Parameters?: unknown;
            ResultPath?: unknown;
        } & components["schemas"]["NextOrEnd"] & components["schemas"]["ParametersOrInputPathNotRequired"] & components["schemas"]["ResultPath"];
        Catch: {
            Catch?: ({
                ErrorEquals: string[];
                Next: string;
                ResultPath?: unknown;
            } & components["schemas"]["ResultPath"])[];
        };
        Action: {
            /** Format: uri */
            ActionUrl: string;
            /** Format: uri */
            ActionScope?: string;
            RunAs?: string;
            /** @default false */
            ExceptionOnActionFailure: boolean;
            WaitTime?: number;
            Type: string;
            Comment?: unknown;
            Next?: unknown;
            End?: unknown;
            InputPath?: unknown;
            Parameters?: unknown;
            ResultPath?: unknown;
            Catch?: unknown;
        } & components["schemas"]["NextOrEnd"] & components["schemas"]["ParametersOrInputPath"] & components["schemas"]["ResultPath"] & components["schemas"]["Catch"];
        ExpressionEval: {
            Type?: string;
            Comment?: unknown;
            Parameters: unknown;
            ResultPath: unknown;
            Next: string;
        } & components["schemas"]["Parameters"] & components["schemas"]["ResultPath"];
        Wait: {
            Type?: string;
            Comment?: unknown;
            Next?: string;
            Seconds?: number;
            SecondsPath?: components["schemas"]["JsonPathPattern"];
            /** Format: date-time */
            Timestamp?: string;
            TimestampPath?: components["schemas"]["JsonPathPattern"];
        } & (unknown | unknown | unknown | unknown);
        ChoiceRule: {
            And?: components["schemas"]["ChoiceRule"][];
            Or?: components["schemas"]["ChoiceRule"][];
            Not?: components["schemas"]["ChoiceRule"];
            Variable?: string;
            StringEquals?: string;
            StringEqualsPath?: components["schemas"]["JsonPathPattern"];
            StringLessThan?: string;
            StringLessThanPath?: components["schemas"]["JsonPathPattern"];
            StringGreaterThan?: string;
            StringGreaterThanPath?: components["schemas"]["JsonPathPattern"];
            StringLessThanEquals?: string;
            StringLessThanEqualsPath?: components["schemas"]["JsonPathPattern"];
            StringGreaterThanEquals?: string;
            StringGreaterThanEqualsPath?: components["schemas"]["JsonPathPattern"];
            StringMatches?: string;
            NumericEquals?: number;
            NumericEqualsPath?: components["schemas"]["JsonPathPattern"];
            NumericLessThan?: number;
            NumericLessThanPath?: components["schemas"]["JsonPathPattern"];
            NumericGreaterThan?: number;
            NumericGreaterThanPath?: components["schemas"]["JsonPathPattern"];
            NumericLessThanEquals?: number;
            NumericLessThanEqualsPath?: components["schemas"]["JsonPathPattern"];
            NumericGreaterThanEquals?: number;
            NumericGreaterThanEqualsPath?: components["schemas"]["JsonPathPattern"];
            BooleanEquals?: boolean;
            BooleanEqualsPath?: components["schemas"]["JsonPathPattern"];
            /** Format: date-time */
            TimestampEquals?: string;
            TimestampEqualsPath?: components["schemas"]["JsonPathPattern"];
            /** Format: date-time */
            TimestampLessThan?: string;
            TimestampLessThanPath?: components["schemas"]["JsonPathPattern"];
            /** Format: date-time */
            TimestampGreaterThan?: string;
            TimestampGreaterThanPath?: components["schemas"]["JsonPathPattern"];
            /** Format: date-time */
            TimestampLessThanEquals?: string;
            TimestampLessThanEqualsPath?: components["schemas"]["JsonPathPattern"];
            /** Format: date-time */
            TimestampGreaterThanEquals?: string;
            TimestampGreaterThanEqualsPath?: components["schemas"]["JsonPathPattern"];
            IsNull?: boolean;
            IsPresent?: boolean;
            IsNumeric?: boolean;
            IsString?: boolean;
            IsBoolean?: boolean;
            IsTimestamp?: boolean;
        } & (unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown);
        Choice: {
            Type?: string;
            Comment?: string;
            Default?: string;
            Choices: ({
                Next?: string;
            } & components["schemas"]["ChoiceRule"])[];
        };
        Fail: {
            Type?: string;
            Comment?: string;
            Cause?: string;
            Error?: string;
        };
        FlowResponse: {
            /** @description The unique identifier for the Flow. */
            id?: string;
            definition?: components["schemas"]["FlowDefinition"];
            /** @description A JSON Schema compliant definition of the format of the `body` field
             *     when requesting a Flow be run.
             *      */
            input_schema?: Record<string, unknown>;
            /**
             * Format: uri
             * @description The scope of any bearer token to be used on authenticated accesses
             *     to the Flow.
             *
             */
            globus_auth_scope?: string;
            /** @description A list of scopes according to RunAs values as defined in the Flow.
             *      */
            globus_auth_scopes_by_RunAs?: string[];
            /**
             * @description The role the requesting user has on the Flow.
             *
             * @enum {string}
             */
            user_role?: "flow_viewer" | "flow_starter" | "flow_administrator" | "flow_owner";
            /**
             * @description A set of Principal URN values, or the value "public"
             *     indicating the identity of users who can view the Flow
             *     definition. Only calling users with the "administrator"
             *     role will be provided this list. Otherwise, the value
             *     will always be an empty list.
             *
             * @example [
             *       "public",
             *       "urn:globus:auth:identity:46bd0f56-e24f-11e5-a510-131bef46955c",
             *       "urn:globus:groups:id:fdb38a24-03c1-11e3-86f7-12313809f035"
             *     ]
             */
            flow_viewers?: components["schemas"]["PrincipalURN"][];
            /**
             * @description A set of Principal URN values, or the value
             *     "all_authenticated_users" indicating the identity of users
             *     who can initiate a run of the Flow. Only calling users
             *     with the "administrator" role will be provided this
             *     list. Otherwise, the value will always be an empty list.
             *
             * @example [
             *       "all_authenticated_users",
             *       "urn:globus:auth:identity:46bd0f56-e24f-11e5-a510-131bef46955c",
             *       "urn:globus:groups:id:fdb38a24-03c1-11e3-86f7-12313809f035"
             *     ]
             */
            flow_starters?: components["schemas"]["PrincipalURN"][];
            /** @description The set of Principal URN values of users who may perform
             *     administrative operations, including updating the
             *     description itself. Only calling users with the
             *     "administrator" role will be provided this
             *     list. Otherwise, the value will always be an empty list.
             *      */
            flow_administrators?: components["schemas"]["PrincipalURN"][];
            flow_owner?: components["schemas"]["PrincipalURN"];
            /**
             * Format: date-time
             * @description A timezone-aware ISO8601 format string that represents the time at
             *     which the Flow was created.
             *
             */
            created_at?: string;
            /**
             * Format: date-time
             * @description A timezone-aware ISO8601 format string that represents the time at
             *     which the Flow was last updated.
             *
             */
            updated_at?: string;
            synchronous?: boolean;
            /** @description True if the Flow supports the /log operation providing detailed
             *     information on the intermediate states of a Flow invocation.
             *      */
            log_supported?: boolean;
            types?: ("Action" | "Event")[];
            /** @enum {string} */
            api_version?: "1.0";
            /** @description A non-unique, human-friendly name used for displaying the Flow
             *     to end users.
             *      */
            title?: string;
            /** @description A concise summary of the Flow's purpose. */
            subtitle?: string;
            /** @description A detailed description of the Flow for end user display. */
            description?: string;
            /** @description A set of terms used to categorize the Flow which may be used in
             *     query and discovery operations.
             *      */
            keywords?: string[];
            principal_urn?: components["schemas"]["PrincipalURN"];
            /** @description The Flow's Globus Auth username. */
            globus_auth_username?: string;
            /**
             * Format: uri
             * @description The web-addressable location at which this Flow can be referenced
             *     and run from.
             *
             */
            flow_url?: string;
            /**
             * Format: uuid
             * @description A subscription_id associated with this Flow. If no
             *     subscription_id is present, the Flow may be
             *     accepted, but may have limits on how long or how
             *     much it can be used.
             *
             */
            subscription_id?: string;
        };
        FlowValidationResponse: {
            scopes?: components["schemas"]["FlowScopes"];
        };
        FlowValidationErrorResponse: {
            /** @description A unique identifier for the validation error, used for debugging.
             *      */
            debug_id: string;
            error: {
                /** @description A readable keyword describing the failure. */
                code: string;
                /** An array of failure objects, describing what failed. */
                detail: string | components["schemas"]["LocationErrorList"];
                /** @description A human-readable message providing more context about the failure. */
                message?: string;
            };
        };
        LocationErrorList: {
            /** The path of object keys that led to the validation failure. */
            loc: string[];
            /** A readable description of the validation failure. */
            msg: string;
            /** A readable failure category. */
            type: string;
        }[];
        FlowScopes: {
            [key: string]: string[];
        };
        BatchRunUpdateOperation: {
            tags?: string[];
            run_managers?: components["schemas"]["PrincipalURN"][];
            run_monitors?: components["schemas"]["PrincipalURN"][];
        };
        BatchRunUpdateSetOperation: {
            tags?: string[];
            run_managers?: components["schemas"]["PrincipalURN"][];
            run_monitors?: components["schemas"]["PrincipalURN"][];
            /** @enum {string} */
            status?: "cancel";
        };
    };
    responses: {
        /** @description The requested operation was accepted.
         *
         *     The operation may have been completed, or may be completed at a later time.
         *     A follow-up API request may be needed to confirm the status of the operation.
         *      */
        HTTP202Response: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": Record<string, unknown>;
            };
        };
        /** @description The requesting user is not authorized to make the requested changes. */
        HTTP403Response: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": {
                    error: {
                        /** A readable keyword describing the failure. */
                        code: string;
                        /** A readable description of the failure. */
                        detail: string;
                    };
                };
            };
        };
        /** @description The input document failed input validation in some way. */
        HTTP422Response: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": {
                    error: {
                        /** A readable keyword describing the failure. */
                        code: string;
                        detail: components["schemas"]["LocationErrorList"];
                    };
                };
            };
        };
    };
    parameters: {
        /** @description The flow ID */
        flow_id: string;
        /** @description The run ID */
        run_id: string;
        /**
         * @description Given a pair of comma-separated ISO 8601 datetime strings,
         *     filter results to only those runs which completed execution
         *     within the specified range.
         *
         *     If one of the dates is omitted, it forms an open range.
         *     For example, if the filter has a datetime followed by a comma (`"DT,"`),
         *     all records with a date greater then or equal to `DT` will be returned.
         *     Similarly, if the filter has a comma followed by a datetime (`",DT"`),
         *     all records with dates less than `DT` will be returned.
         *     If there is no comma, it is treated in the same way as `"DT,"`, above.
         *
         *     Results will contain runs which completed between the first datetime
         *     onwards, up to (but not including) the second datetime.
         *
         *     Note that runs which are still executing will not have a completion time
         *     and will be automatically excluded if this filter is applied.
         *
         * @example 2021-03-09T21:52:14,2021-03-09T21:53
         */
        filter_completion_time: string;
        /**
         * @description Given a pair of comma separated ISO 8601 date/time strings,
         *     filter results to only those runs which started execution
         *     within the specified range.
         *
         *     If one of the dates is omitted, it forms an open range.
         *     For example, if the filter has a datetime followed by a comma (`"DT,"`),
         *     all records with a date greater then or equal to `DT` will be returned.
         *     Similarly, if the filter has a comma followed by a datetime (`",DT"`),
         *     all records with dates less than `DT` will be returned.
         *     If there is no comma, it is treated in the same way as `"DT,"`, above.
         *
         *     Results will contain runs which began between the first datetime
         *     onwards, up to (but not including) the second datetime.
         *
         * @example 2021-03-09T21:52:14,2021-03-09T21:53
         */
        filter_start_time: string;
        /**
         * @description Ordering criteria to apply to the list of flows.
         *
         *     This field is a comma-separated list of sort criteria,
         *     and follows this syntax:
         *
         *     ```
         *     CRITERION1[,CRITERION2[,...]]
         *     ```
         *
         *     and each individual `CRITERION` follows this syntax:
         *
         *     ```
         *     FIELD ORDERING
         *     ```
         *
         *     The first value, `FIELD`, indicates the field to sort by;
         *     the second value, `ORDERING`, indicates the sorting order.
         *
         *     When additional comma-separated criteria are added,
         *     the first criterion will be used to sort the data;
         *     subsequent criteria will be applied for ties.
         *
         *     Supported fields are:
         *
         *     - `id`
         *     - `scope_string`
         *     - `flow_owner`
         *     - `flow_administrators`
         *     - `title`
         *     - `created_at`
         *     - `updated_at`
         *
         *     Supported orderings are:
         *
         *     - `ASC`
         *     - `DESC`
         *
         * @example [
         *       "title ASC",
         *       "id DESC"
         *     ]
         */
        list_flows_orderby: string[];
        /**
         * @description Ordering criteria to apply to the list of runs.
         *
         *     This field is a comma-separated list of sort criteria,
         *     and follows this syntax:
         *
         *     ```
         *     CRITERION1[,CRITERION2[,...]]
         *     ```
         *
         *     and each individual `CRITERION` follows this syntax:
         *
         *     ```
         *     FIELD ORDERING
         *     ```
         *
         *     The first value, `FIELD`, indicates the field to sort by;
         *     the second value, `ORDERING`, indicates the sorting order.
         *
         *     When additional comma-separated criteria are added,
         *     the first criterion will be used to sort the data;
         *     subsequent criteria will be applied for ties.
         *
         *     Supported fields are:
         *
         *     - `id`
         *     - `start_time`
         *     - `completion_time`
         *     - `status`
         *     - `label`
         *
         *     Supported orderings are:
         *
         *     - `ASC`
         *     - `DESC`
         *
         * @example [
         *       "start_time ASC",
         *       "id DESC"
         *     ]
         */
        list_runs_orderby: string[];
    };
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
