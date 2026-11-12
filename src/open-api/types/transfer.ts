export interface paths {
    "/tunnels": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Tunnels List
         * @description List the caller's own tunnels, unredacted. Endpoint role holders list
         *     other users' tunnels with GET /monitored/tunnels.
         */
        get: operations["tunnels_list_tunnels_get"];
        put?: never;
        /**
         * Tunnels Post
         * @description Create a tunnel owned by the caller. Retrying with the same submission_id
         *     returns the caller's existing tunnel.
         */
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
        /**
         * Tunnels Get
         * @description Get a tunnel.
         *
         *     Information is redacted as follows:
         *     - Only the owner sees submission_id
         *     - A listener role can see the listener IP address and port
         *     - An initiator role can see the initiator IP address and port
         *
         *     Redacted values are null.
         */
        get: operations["tunnels_get_tunnels__tunnel_uuid__get"];
        put?: never;
        post?: never;
        /**
         * Tunnels Delete
         * @description Delete a STOPPED tunnel. The owner may delete it, as may anyone with an
         *     administrator or activity_manager role on the host endpoint of either of
         *     its stream access points.
         */
        delete: operations["tunnels_delete_tunnels__tunnel_uuid__delete"];
        options?: never;
        head?: never;
        /**
         * Tunnels Patch
         * @description Update a tunnel in the AWAITING_LISTENER, ACTIVATING or ACTIVE state.
         *
         *     The owner may change label and state, and the listener contact details
         *     while the tunnel is AWAITING_LISTENER.
         *
         *     Anyone else with an administrator or activity_manager role on the host
         *     endpoint of either of the tunnel's stream access points may only stop it:
         *     they must send state STOPPING with a stopped_by_admin_message of at most
         *     256 characters, which is shown on the tunnel. The response is redacted as
         *     GET's is.
         */
        patch: operations["tunnels_patch_tunnels__tunnel_uuid__patch"];
        trace?: never;
    };
    "/monitored/tunnels": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Monitored Tunnels List
         * @description List tunnels with a stream access point on a Globus Connect Server endpoint
         *     where the caller has an administrator, activity_manager or activity_monitor
         *     role, whoever owns them.
         *
         *     Tunnels are redacted the same way that GET /tunnels/{tunnel_uuid} redacts it.
         *
         *     Fails with 403 if the caller has no such role on any endpoint.
         */
        get: operations["monitored_tunnels_list_monitored_tunnels_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
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
    "/tunnels/{tunnel_uuid}/events": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Tunnel Events By Tunnel Uuid
         * @description Return events associated with a particular tunnel, oldest first. Anyone who
         *     may get the tunnel may list its events.
         *
         *     Event details are "Details redacted" unless the caller owns the tunnel or
         *     has a role on the host endpoints of both its stream access points.
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
            data: components["schemas"]["AbstractResourceIdentifier_Literal__Collection___"];
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
            data: components["schemas"]["AbstractResourceIdentifier_Literal__Endpoint___"];
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
            data: components["schemas"]["AbstractResourceIdentifier_Literal__Identity___"];
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
            data: components["schemas"]["AbstractResourceIdentifier_Literal__StreamAccessPoint___"];
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
             * @description More extensive information about the event; "Details redacted" unless the caller owns the tunnel or holds an endpoint role on the host endpoints of both its stream access points
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
         * TunnelMeta
         * @description Meta on a tunnel resource, specific to the caller.
         */
        TunnelMeta: {
            /** @description What the caller may do to this resource. Says only whether the caller is allowed, not whether the resource's current state permits it. Subject to change */
            permissions: components["schemas"]["TunnelPermissions"];
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
            /**
             * Stopped By Admin Message
             * @description Why the tunnel is being stopped, at most 256 characters. Required when an endpoint role holder stops another user's tunnel, and not allowed for the tunnel owner. Shown on the tunnel
             */
            stopped_by_admin_message?: string | null;
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
         * TunnelPermissions
         * @description What the caller may do to a tunnel.
         */
        TunnelPermissions: {
            /**
             * Update
             * @description Whether the caller may change the label and listener contact
             */
            update: boolean;
            /**
             * Stop
             * @description Whether the caller may stop the tunnel
             */
            stop: boolean;
            /**
             * Delete
             * @description Whether the caller may delete the tunnel
             */
            delete: boolean;
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
             * @description Port number of listening LAN contact; null when not yet known or withheld from the caller
             */
            listener_port?: number | null;
            /**
             * Listener Ip Address
             * @description IP address of listening LAN contact; null when not yet known or withheld from the caller
             */
            listener_ip_address?: string | null;
            /**
             * Submission Id
             * @description Client-generated UUID for the tunnel creation request; null unless the caller owns the tunnel
             */
            submission_id?: string | null;
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
             * @description IP address of initiating LAN contact; null when not yet known or withheld from the caller
             */
            initiator_ip_address?: string | null;
            /**
             * Initiator Port
             * @description Port number of initiating LAN contact; null when not yet known or withheld from the caller
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
             * @enum {string}
             */
            state: "UNINITIALIZED" | "AWAITING_LISTENER" | "ACTIVATING" | "ACTIVE" | "STOPPING" | "STOPPED" | "DELETING" | "DELETED";
            /**
             * Stopped By Admin
             * @description Which side's endpoint role was used when someone other than the owner stopped the tunnel; null otherwise
             */
            stopped_by_admin?: ("LISTENER" | "INITIATOR" | "BOTH") | null;
            /**
             * Stopped By Admin Message
             * @description Why an endpoint role holder stopped the tunnel; null unless stopped_by_admin is set
             */
            stopped_by_admin_message?: string | null;
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
            meta: components["schemas"]["TunnelMeta"];
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
    tunnels_list_tunnels_get: {
        parameters: {
            query?: {
                /** @description AND-ed with other filters on `id`. */
                "filter[id][eq]"?: string;
                /** @description AND-ed with other filters on `id`. */
                "filter[id][in]"?: string[];
                /** @description AND-ed with other filters on `state`. */
                "filter[state][eq]"?: "UNINITIALIZED" | "AWAITING_LISTENER" | "ACTIVATING" | "ACTIVE" | "STOPPING" | "STOPPED" | "DELETING" | "DELETED";
                /** @description AND-ed with other filters on `state`. */
                "filter[state][in]"?: ("UNINITIALIZED" | "AWAITING_LISTENER" | "ACTIVATING" | "ACTIVE" | "STOPPING" | "STOPPED" | "DELETING" | "DELETED")[];
                /** @description AND-ed with other filters on `listener`. */
                "filter[listener][eq]"?: string;
                /** @description AND-ed with other filters on `listener`. */
                "filter[listener][in]"?: string[];
                /** @description AND-ed with other filters on `initiator`. */
                "filter[initiator][eq]"?: string;
                /** @description AND-ed with other filters on `initiator`. */
                "filter[initiator][in]"?: string[];
                /** @description AND-ed with other filters on `stream_access_point`. */
                "filter[stream_access_point][eq]"?: string;
                /** @description AND-ed with other filters on `stream_access_point`. */
                "filter[stream_access_point][in]"?: string[];
                /** @description Comma-separated sort fields (prefix with `-` for descending) */
                sort?: ("created_time" | "-created_time")[];
                /** @description Maximum results per page */
                "page[limit]"?: number;
                /** @description Opaque pagination cursor from the previous response's links.next */
                "page[marker]"?: string;
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
    monitored_tunnels_list_monitored_tunnels_get: {
        parameters: {
            query?: {
                /** @description AND-ed with other filters on `id`. */
                "filter[id][eq]"?: string;
                /** @description AND-ed with other filters on `id`. */
                "filter[id][in]"?: string[];
                /** @description AND-ed with other filters on `state`. */
                "filter[state][eq]"?: "UNINITIALIZED" | "AWAITING_LISTENER" | "ACTIVATING" | "ACTIVE" | "STOPPING" | "STOPPED" | "DELETING" | "DELETED";
                /** @description AND-ed with other filters on `state`. */
                "filter[state][in]"?: ("UNINITIALIZED" | "AWAITING_LISTENER" | "ACTIVATING" | "ACTIVE" | "STOPPING" | "STOPPED" | "DELETING" | "DELETED")[];
                /** @description AND-ed with other filters on `listener`. */
                "filter[listener][eq]"?: string;
                /** @description AND-ed with other filters on `listener`. */
                "filter[listener][in]"?: string[];
                /** @description AND-ed with other filters on `initiator`. */
                "filter[initiator][eq]"?: string;
                /** @description AND-ed with other filters on `initiator`. */
                "filter[initiator][in]"?: string[];
                /** @description AND-ed with other filters on `stream_access_point`. */
                "filter[stream_access_point][eq]"?: string;
                /** @description AND-ed with other filters on `stream_access_point`. */
                "filter[stream_access_point][in]"?: string[];
                /** @description AND-ed with other filters on `owner`. */
                "filter[owner][eq]"?: string;
                /** @description AND-ed with other filters on `owner`. */
                "filter[owner][in]"?: string[];
                /** @description Comma-separated sort fields (prefix with `-` for descending) */
                sort?: ("created_time" | "-created_time")[];
                /** @description Maximum results per page */
                "page[limit]"?: number;
                /** @description Opaque pagination cursor from the previous response's links.next */
                "page[marker]"?: string;
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
                    "application/json": components["schemas"]["TunnelListResponse"];
                };
            };
        };
    };
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
    get_tunnel_events_by_tunnel_uuid_tunnels__tunnel_uuid__events_get: {
        parameters: {
            query?: {
                /** @description AND-ed with other filters on `code`. */
                "filter[code][eq]"?: string;
                /** @description AND-ed with other filters on `code`. */
                "filter[code][in]"?: string[];
                /** @description AND-ed with other filters on `is_error`. */
                "filter[is_error][eq]"?: boolean;
                /** @description Maximum results per page */
                "page[limit]"?: number;
                /** @description Opaque pagination cursor from the previous response's links.next */
                "page[marker]"?: string;
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
                /** @description AND-ed with other filters on `id`. */
                "filter[id][eq]"?: string;
                /** @description AND-ed with other filters on `id`. */
                "filter[id][in]"?: string[];
                /** @description AND-ed with other filters on `name`. */
                "filter[name][eq]"?: string;
                /** @description AND-ed with other filters on `name`. */
                "filter[name][ne]"?: string;
                /** @description AND-ed with other filters on `name`. */
                "filter[name][in]"?: string[];
                /** @description AND-ed with other filters on `name`. */
                "filter[name][nin]"?: string[];
                /** @description AND-ed with other filters on `collection`. */
                "filter[collection][eq]"?: string;
                /** @description AND-ed with other filters on `collection`. */
                "filter[collection][in]"?: string[];
                /** @description Comma-separated sort fields (prefix with `-` for descending) */
                sort?: ("id" | "-id" | "name" | "-name")[];
                /** @description Comma-separated related resources to include */
                include?: "collection"[];
                /** @description Maximum results per page */
                "page[limit]"?: number;
                /** @description Opaque pagination cursor from the previous response's links.next */
                "page[marker]"?: string;
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
