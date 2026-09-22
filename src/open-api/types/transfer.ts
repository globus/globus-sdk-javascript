export interface paths {
    "/stream_access_points": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Stream Access Points List
         * @description Get a list of all stream access points.
         *
         *     If the user provides a UUID in filter_fulltext, test if it's a SAP UUID and return that SAP directly.
         */
        get: operations["stream_access_points_list_stream_access_points_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/stream_access_points/{stream_access_point_uuid}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Stream Access Points Get
         * @description Get a stream access point by UUID
         */
        get: operations["stream_access_points_get_stream_access_points__stream_access_point_uuid__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/tunnels": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Tunnels List */
        get: operations["tunnels_list_tunnels_get"];
        put?: never;
        /** Tunnels Post */
        post: operations["tunnels_post_tunnels_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/tunnels/{tunnel_uuid}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Tunnels Get */
        get: operations["tunnels_get_tunnels__tunnel_uuid__get"];
        put?: never;
        post?: never;
        /** Tunnels Delete */
        delete: operations["tunnels_delete_tunnels__tunnel_uuid__delete"];
        options?: never;
        head?: never;
        /** Tunnels Patch */
        patch: operations["tunnels_patch_tunnels__tunnel_uuid__patch"];
        trace?: never;
    };
    "/tunnels/{tunnel_uuid}/events": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Tunnel Events By Tunnel Uuid
         * @description Return events associated with a particular tunnel.
         *     Filter events with code_name or is_error query params.
         */
        get: operations["get_tunnel_events_by_tunnel_uuid_tunnels__tunnel_uuid__events_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/bookmarks": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Bookmarks List
         * @description List the user's bookmarks. Bookmarks on High Assurance collections have
         *     their paths redacted to null.
         */
        get: operations["bookmarks_list_bookmarks_get"];
        put?: never;
        /**
         * Bookmarks Post
         * @description Create a bookmark. Requires that the user has visibility on the collection
         *     and is in session if the collection is High Assurance.
         */
        post: operations["bookmarks_post_bookmarks_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/bookmarks/{bookmark_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Bookmarks Get
         * @description Get a bookmark by UUID. Requires that the user owns the bookmark and is in
         *     session for the bookmark's collection if it is High Assurance.
         */
        get: operations["bookmarks_get_bookmarks__bookmark_id__get"];
        put?: never;
        post?: never;
        /**
         * Bookmarks Delete
         * @description Delete a bookmark by UUID. Requires that the user owns the bookmark.
         */
        delete: operations["bookmarks_delete_bookmarks__bookmark_id__delete"];
        options?: never;
        head?: never;
        /**
         * Bookmarks Patch
         * @description Update a bookmark by UUID. Requires that the user owns the bookmark and
         *     is in session for the bookmark's collection if it is High Assurance.
         */
        patch: operations["bookmarks_patch_bookmarks__bookmark_id__patch"];
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** AbstractResourceIdentifier[Literal['Collection']] */
        AbstractResourceIdentifier_Literal__Collection___: {
            /**
             * Type
             * @constant
             */
            type: "Collection";
            /**
             * Id
             * Format: uuid
             */
            id: string;
        };
        /** AbstractResourceIdentifier[Literal['Endpoint']] */
        AbstractResourceIdentifier_Literal__Endpoint___: {
            /**
             * Type
             * @constant
             */
            type: "Endpoint";
            /**
             * Id
             * Format: uuid
             */
            id: string;
        };
        /** AbstractResourceIdentifier[Literal['Identity']] */
        AbstractResourceIdentifier_Literal__Identity___: {
            /**
             * Type
             * @constant
             */
            type: "Identity";
            /**
             * Id
             * Format: uuid
             */
            id: string;
        };
        /** AbstractResourceIdentifier[Literal['StreamAccessPoint']] */
        AbstractResourceIdentifier_Literal__StreamAccessPoint___: {
            /**
             * Type
             * @constant
             */
            type: "StreamAccessPoint";
            /**
             * Id
             * Format: uuid
             */
            id: string;
        };
        /** BookmarkAttributes[str] */
        BookmarkAttributes_str_: {
            /**
             * Name
             * @description Name of the bookmark. Unique per user.
             */
            name: string;
            /**
             * Path
             * @description Path to a directory on the collection.
             */
            path: string;
        };
        /**
         * BookmarkCreateRequest
         * @description Top-level POST request body for bookmark creation.
         */
        BookmarkCreateRequest: {
            data: components["schemas"]["BookmarkCreateResource"];
        };
        /**
         * BookmarkCreateResource
         * @description Bookmark resource for POST request bodies.
         */
        BookmarkCreateResource: {
            /**
             * Type
             * @default Bookmark
             * @constant
             */
            type: "Bookmark";
            attributes: components["schemas"]["BookmarkAttributes_str_"];
            relationships?: components["schemas"]["BookmarkRelationships"] | null;
        };
        /** BookmarkListAttributes */
        BookmarkListAttributes: {
            /**
             * Name
             * @description Name of the bookmark. Unique per user.
             */
            name: string;
            /**
             * Path
             * @description Path to a directory on the collection.
             */
            path?: string | null;
        };
        /**
         * BookmarkListResponse
         * @description Top-level response for a list of bookmarks.
         */
        BookmarkListResponse: {
            /** Included */
            included?: components["schemas"]["CollectionResponseResource"][] | null;
            /** Data */
            data: components["schemas"]["BookmarkListResponseResource"][];
            links?: components["schemas"]["PaginationLinks"] | null;
            meta: components["schemas"]["TopLevelMeta"];
        };
        /**
         * BookmarkListResponseResource
         * @description Bookmark resource returned in list responses. path may be None for HA collections.
         */
        BookmarkListResponseResource: {
            /**
             * Type
             * @default Bookmark
             * @constant
             */
            type: "Bookmark";
            /**
             * Id
             * Format: uuid
             */
            id: string;
            attributes: components["schemas"]["BookmarkListAttributes"];
            relationships?: components["schemas"]["BookmarkRelationships"] | null;
        };
        /**
         * BookmarkRelationships
         * @description Relationships for a bookmark resource.
         */
        BookmarkRelationships: {
            /** @description Collection the bookmark is on */
            collection: components["schemas"]["CollectionDataRelationship"];
        };
        /**
         * BookmarkResponse
         * @description Top-level response for a single bookmark.
         */
        BookmarkResponse: {
            /** Included */
            included?: components["schemas"]["CollectionResponseResource"][] | null;
            data: components["schemas"]["BookmarkResponseResource"];
            meta: components["schemas"]["TopLevelMeta"];
        };
        /**
         * BookmarkResponseResource
         * @description Bookmark resource returned in single-resource responses.
         */
        BookmarkResponseResource: {
            /**
             * Type
             * @default Bookmark
             * @constant
             */
            type: "Bookmark";
            /**
             * Id
             * Format: uuid
             */
            id: string;
            attributes: components["schemas"]["BookmarkAttributes_str_"];
            relationships?: components["schemas"]["BookmarkRelationships"] | null;
        };
        /** BookmarkUpdateAttributes */
        BookmarkUpdateAttributes: {
            /**
             * Name
             * @description Name of the bookmark. Unique per user.
             */
            name?: string | null;
            /**
             * Path
             * @description Path to a directory on the collection.
             */
            path?: string | null;
        };
        /**
         * BookmarkUpdateRequest
         * @description Top-level PATCH request body for bookmark update.
         */
        BookmarkUpdateRequest: {
            data: components["schemas"]["BookmarkUpdateResource"];
        };
        /**
         * BookmarkUpdateResource
         * @description Bookmark resource for PATCH request bodies.
         */
        BookmarkUpdateResource: {
            /** Id */
            id?: string | null;
            /**
             * Type
             * @default Bookmark
             * @constant
             */
            type: "Bookmark";
            attributes: components["schemas"]["BookmarkUpdateAttributes"];
        };
        /**
         * CollectionAttributes
         * @description Collection attributes. Note: only exposes fields relevant to including features.
         */
        CollectionAttributes: {
            /** Display Name */
            display_name: string;
            /** High Assurance */
            high_assurance: boolean;
        };
        /**
         * CollectionDataRelationship
         * @description Relationship to a Globus collection.
         */
        CollectionDataRelationship: {
            /** Data */
            data: components["schemas"]["AbstractResourceIdentifier_Literal__Collection___"] | components["schemas"]["AbstractResourceIdentifier_Literal__Collection___"][];
        };
        /**
         * CollectionResponseResource
         * @description Collection resource, used as an included resource in other feature responses.
         */
        CollectionResponseResource: {
            /**
             * Type
             * @constant
             */
            type: "Collection";
            /**
             * Id
             * Format: uuid
             */
            id: string;
            attributes: components["schemas"]["CollectionAttributes"];
            /** Relationships */
            relationships?: null;
        };
        /**
         * EndpointDataRelationship
         * @description Relationship to a Globus Connect Server endpoint.
         */
        EndpointDataRelationship: {
            /** Data */
            data: components["schemas"]["AbstractResourceIdentifier_Literal__Endpoint___"] | components["schemas"]["AbstractResourceIdentifier_Literal__Endpoint___"][];
        };
        /** HTTPValidationError */
        HTTPValidationError: {
            /** Detail */
            detail?: components["schemas"]["ValidationError"][];
        };
        /**
         * IdentityDataRelationship
         * @description Relationship to a Globus Auth identity.
         */
        IdentityDataRelationship: {
            /** Data */
            data: components["schemas"]["AbstractResourceIdentifier_Literal__Identity___"] | components["schemas"]["AbstractResourceIdentifier_Literal__Identity___"][];
        };
        /** Link */
        Link: {
            /**
             * Href
             * @description URI-reference pointing to link target
             */
            href: string;
        };
        /**
         * MetaDocument
         * @description Top-level JSONAPI response with no data, only meta.
         */
        MetaDocument: {
            meta: components["schemas"]["TopLevelMeta"];
        };
        /** PaginationLinks */
        PaginationLinks: {
            /** Next */
            next?: string | components["schemas"]["Link"] | null;
        };
        /**
         * StreamAccessPointAttributes
         * @description Attributes for SAP create and response.
         */
        StreamAccessPointAttributes: {
            /**
             * Advertised Owner
             * @description Globus Auth username for the advertised owner identity
             */
            advertised_owner?: string | null;
            /**
             * Contact Email
             * @description Stream access point support contact email address
             */
            contact_email?: string | null;
            /**
             * Contact Info
             * @description Other non-email contact information for the stream access point, e.g. phone and mailing address
             */
            contact_info?: string | null;
            /**
             * Department
             * @description Department which operates the stream access point
             */
            department?: string | null;
            /**
             * Description
             * @description Description of the stream access point
             */
            description?: string | null;
            /**
             * Info Link
             * @description Link to a web page about the stream access point
             */
            info_link?: string | null;
            /**
             * Keywords
             * @description Comma-separated list of keywords for searching
             */
            keywords?: string | null;
            /**
             * Organization
             * @description Organization which operates the stream access point
             */
            organization?: string | null;
            /**
             * Display Name
             * @description Friendly name to show in stream access point listings
             */
            display_name: string;
            /**
             * Tlsftp Server
             * @description URL for the tlsftp server used for tunnel access; must begin with tlsftp and end with a port number
             */
            tlsftp_server: string;
        };
        /**
         * StreamAccessPointDataRelationship
         * @description Relationship to a stream access point.
         */
        StreamAccessPointDataRelationship: {
            /** Data */
            data: components["schemas"]["AbstractResourceIdentifier_Literal__StreamAccessPoint___"] | components["schemas"]["AbstractResourceIdentifier_Literal__StreamAccessPoint___"][];
        };
        /**
         * StreamAccessPointListResponse
         * @description Top-level response for a list of stream access points.
         */
        StreamAccessPointListResponse: {
            /** Data */
            data: components["schemas"]["StreamAccessPointResponseResource"][];
            links?: components["schemas"]["PaginationLinks"] | null;
            meta: components["schemas"]["TopLevelMeta"];
        };
        /**
         * StreamAccessPointResponse
         * @description Top-level response for a single stream access point.
         */
        StreamAccessPointResponse: {
            data: components["schemas"]["StreamAccessPointResponseResource"];
            meta: components["schemas"]["TopLevelMeta"];
        };
        /**
         * StreamAccessPointResponseRelationships
         * @description Relationships returned on a stream access point response.
         */
        StreamAccessPointResponseRelationships: {
            /** @description Globus Connect Server endpoint that hosts the stream access point */
            host_endpoint: components["schemas"]["EndpointDataRelationship"];
        };
        /**
         * StreamAccessPointResponseResource
         * @description SAP resource returned in responses.
         */
        StreamAccessPointResponseResource: {
            /**
             * Type
             * @default StreamAccessPoint
             * @constant
             */
            type: "StreamAccessPoint";
            /**
             * Id
             * Format: uuid
             */
            id: string;
            attributes: components["schemas"]["StreamAccessPointAttributes"];
            relationships?: components["schemas"]["StreamAccessPointResponseRelationships"] | null;
        };
        /** TopLevelMeta */
        TopLevelMeta: {
            /** Request Id */
            request_id: string;
        };
        /**
         * TunnelCreateRequest
         * @description Top-level POST request body for tunnel creation.
         */
        TunnelCreateRequest: {
            data: components["schemas"]["TunnelCreateResource"];
        };
        /**
         * TunnelCreateResource
         * @description Tunnel resource for POST request bodies.
         */
        TunnelCreateResource: {
            /**
             * Type
             * @constant
             */
            type: "Tunnel";
            attributes: components["schemas"]["TunnelRequestAttributes"];
            relationships?: components["schemas"]["TunnelRequestRelationships"] | null;
        };
        /** TunnelEventAttributes */
        TunnelEventAttributes: {
            /**
             * Code
             * @description Code categorizing the type of event
             */
            code: string;
            /**
             * Is Error
             * @description Whether the event is an occurrence of an error
             */
            is_error: boolean;
            /**
             * Description
             * @description Friendly description of event
             */
            description: string;
            /**
             * Details
             * @description More extensive information about the event
             */
            details: string;
            /**
             * Time
             * Format: date-time
             * @description When the event occurred
             */
            time: string;
        };
        /**
         * TunnelEventListResponse
         * @description Top-level response for a list of tunnel events.
         */
        TunnelEventListResponse: {
            /** Data */
            data: components["schemas"]["TunnelEventResponseResource"][];
            links?: components["schemas"]["PaginationLinks"] | null;
            meta: components["schemas"]["TopLevelMeta"];
        };
        /**
         * TunnelEventResponseResource
         * @description Tunnel event resource returned in responses.
         */
        TunnelEventResponseResource: {
            /**
             * Type
             * @constant
             */
            type: "TunnelEvent";
            /**
             * Id
             * @description Unique identifier of the event
             */
            id: number;
            attributes: components["schemas"]["TunnelEventAttributes"];
            /** Relationships */
            relationships?: null;
        };
        /**
         * TunnelListResponse
         * @description Top-level response for a list of tunnels.
         */
        TunnelListResponse: {
            /** Data */
            data: components["schemas"]["TunnelResponseResource"][];
            links?: components["schemas"]["PaginationLinks"] | null;
            meta: components["schemas"]["TopLevelMeta"];
        };
        /**
         * TunnelPatchAttributes
         * @description Attributes settable on a tunnel patch.
         */
        TunnelPatchAttributes: {
            /**
             * Label
             * @description Updatable friendly identifier for the tunnel
             */
            label?: string | null;
            /**
             * Listener Port
             * @description Port number of listening LAN contact
             */
            listener_port?: number | null;
            /**
             * Listener Ip Address
             * @description IP address of listening LAN contact
             */
            listener_ip_address?: string | null;
            /**
             * State
             * @description Short description of tunnel state
             */
            state?: "STOPPING" | null;
        };
        /**
         * TunnelPatchResource
         * @description Tunnel resource for PATCH request bodies.
         */
        TunnelPatchResource: {
            /** Id */
            id?: string | null;
            /** Type */
            type?: "Tunnel" | null;
            attributes: components["schemas"]["TunnelPatchAttributes"];
        };
        /**
         * TunnelRequestAttributes
         * @description Attributes for tunnel creation.
         */
        TunnelRequestAttributes: {
            /**
             * Label
             * @description Updatable friendly identifier for the tunnel
             */
            label?: string | null;
            /**
             * Listener Port
             * @description Port number of listening LAN contact
             */
            listener_port?: number | null;
            /**
             * Listener Ip Address
             * @description IP address of listening LAN contact
             */
            listener_ip_address?: string | null;
            /**
             * Submission Id
             * Format: uuid
             * @description Client-generated UUID for tunnel creation request; use same value on retry to prevent duplicate requests
             */
            submission_id: string;
            /**
             * Lifetime Mins
             * @description Number of minutes the tunnel will exist once created
             * @default 360
             */
            lifetime_mins: number;
            /**
             * Restartable
             * @description Restart tunnel on failure
             * @default false
             */
            restartable: boolean;
        };
        /**
         * TunnelRequestRelationships
         * @description Relationships settable on tunnel creation.
         */
        TunnelRequestRelationships: {
            /** @description Stream access point for listener application */
            listener: components["schemas"]["StreamAccessPointDataRelationship"];
            /** @description Stream access point for initiator application */
            initiator: components["schemas"]["StreamAccessPointDataRelationship"];
        };
        /**
         * TunnelResponse
         * @description Top-level response for a single tunnel.
         */
        TunnelResponse: {
            data: components["schemas"]["TunnelResponseResource"];
            meta: components["schemas"]["TopLevelMeta"];
        };
        /**
         * TunnelResponseAttributes
         * @description Attributes returned in tunnel responses. Includes all request fields.
         */
        TunnelResponseAttributes: {
            /**
             * Label
             * @description Updatable friendly identifier for the tunnel
             */
            label?: string | null;
            /**
             * Listener Port
             * @description Port number of listening LAN contact
             */
            listener_port?: number | null;
            /**
             * Listener Ip Address
             * @description IP address of listening LAN contact
             */
            listener_ip_address?: string | null;
            /**
             * Submission Id
             * Format: uuid
             * @description Client-generated UUID for tunnel creation request; use same value on retry to prevent duplicate requests
             */
            submission_id: string;
            /**
             * Lifetime Mins
             * @description Number of minutes the tunnel will exist once created
             * @default 360
             */
            lifetime_mins: number;
            /**
             * Restartable
             * @description Restart tunnel on failure
             * @default false
             */
            restartable: boolean;
            /**
             * Initiator Ip Address
             * @description IP address of initiating LAN contact
             */
            initiator_ip_address?: string | null;
            /**
             * Initiator Port
             * @description Port number of initiating LAN contact
             */
            initiator_port?: number | null;
            /**
             * Created Time
             * Format: date-time
             * @description Date and time when the tunnel was created
             */
            created_time: string;
            /**
             * State
             * @description Short description of tunnel state
             * @default UNINITIALIZED
             */
            state: string;
            /** Status */
            readonly status: string;
        };
        /**
         * TunnelResponseRelationships
         * @description Relationships returned on a tunnel response.
         */
        TunnelResponseRelationships: {
            /** @description Stream access point for listener application */
            listener: components["schemas"]["StreamAccessPointDataRelationship"];
            /** @description Stream access point for initiator application */
            initiator: components["schemas"]["StreamAccessPointDataRelationship"];
            /** @description Globus Auth identity that created the tunnel */
            owner: components["schemas"]["IdentityDataRelationship"];
        };
        /**
         * TunnelResponseResource
         * @description Tunnel resource returned in responses.
         */
        TunnelResponseResource: {
            /**
             * Type
             * @default Tunnel
             * @constant
             */
            type: "Tunnel";
            /**
             * Id
             * Format: uuid
             */
            id: string;
            attributes: components["schemas"]["TunnelResponseAttributes"];
            relationships?: components["schemas"]["TunnelResponseRelationships"] | null;
        };
        /**
         * TunnelUpdateRequest
         * @description Top-level PATCH request body for tunnel update.
         */
        TunnelUpdateRequest: {
            data: components["schemas"]["TunnelPatchResource"];
        };
        /** ValidationError */
        ValidationError: {
            /** Location */
            loc: (string | number)[];
            /** Message */
            msg: string;
            /** Error Type */
            type: string;
            /** Input */
            input?: unknown;
            /** Context */
            ctx?: Record<string, unknown>;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    stream_access_points_list_stream_access_points_get: {
        parameters: {
            query?: {
                /** @description Pagination marker. */
                "page[marker]"?: string | null;
                /** @description Limit to page size. */
                "page[limit]"?: number;
                /** @description Limit results to stream access points on Globus Connect Server endpoints where the user has an `administrator` role */
                "filter[endpoint_admin]"?: boolean;
                /** @description Limit results to stream access points that match on an attribute; each attribute is weighted equally */
                "filter[fulltext]"?: string | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["StreamAccessPointListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    stream_access_points_get_stream_access_points__stream_access_point_uuid__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                stream_access_point_uuid: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["StreamAccessPointResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    tunnels_list_tunnels_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TunnelListResponse"];
                };
            };
        };
    };
    tunnels_post_tunnels_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TunnelCreateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TunnelResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    tunnels_get_tunnels__tunnel_uuid__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                tunnel_uuid: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TunnelResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    tunnels_delete_tunnels__tunnel_uuid__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                tunnel_uuid: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MetaDocument"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    tunnels_patch_tunnels__tunnel_uuid__patch: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                tunnel_uuid: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TunnelUpdateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TunnelResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_tunnel_events_by_tunnel_uuid_tunnels__tunnel_uuid__events_get: {
        parameters: {
            query?: {
                /** @description Pagination marker. */
                "page[marker]"?: string | null;
                /** @description Limit to page size. */
                "page[limit]"?: number;
                /** @description Filter events by a specific event code. Cannot be used with `is_error` */
                code_name?: string | null;
                /** @description Filter events to errors only. Cannot be used with `code_name` */
                is_error?: boolean | null;
            };
            header?: never;
            path: {
                tunnel_uuid: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TunnelEventListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    bookmarks_list_bookmarks_get: {
        parameters: {
            query?: {
                /** @description Pagination marker. */
                "page[marker]"?: string | null;
                /** @description Limit to page size. */
                "page[limit]"?: number;
                /** @description Set to 'collection' to include collection information in the response */
                include?: "collection" | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BookmarkListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    bookmarks_post_bookmarks_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["BookmarkCreateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BookmarkResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    bookmarks_get_bookmarks__bookmark_id__get: {
        parameters: {
            query?: {
                /** @description Set to 'collection' to include collection information in the response */
                include?: "collection" | null;
            };
            header?: never;
            path: {
                bookmark_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BookmarkResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    bookmarks_delete_bookmarks__bookmark_id__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                bookmark_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MetaDocument"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    bookmarks_patch_bookmarks__bookmark_id__patch: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                bookmark_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["BookmarkUpdateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BookmarkResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
}
