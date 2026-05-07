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
         *     Filter events with the code or is_error query params.
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
    "/private/gcs/stream_access_points": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Stream Access Points Post
         * @description Create a stream access point
         */
        post: operations["stream_access_points_post_private_gcs_stream_access_points_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/private/gcs/stream_access_points/{stream_access_point_uuid}": {
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
         * Stream Access Points Delete
         * @description Delete a stream access point by UUID
         */
        delete: operations["stream_access_points_delete_private_gcs_stream_access_points__stream_access_point_uuid__delete"];
        options?: never;
        head?: never;
        /**
         * Stream Access Points Patch
         * @description Update a stream access point by UUID
         */
        patch: operations["stream_access_points_patch_private_gcs_stream_access_points__stream_access_point_uuid__patch"];
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** BookmarkCreateAttributes */
        BookmarkCreateAttributes: {
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
            /**
             * Pinned
             * @description Flag for if the bookmark is pinned as a favorite.
             * @default false
             */
            pinned: boolean;
        };
        /** BookmarkCreateResource */
        BookmarkCreateResource: {
            /**
             * Type
             * @default Bookmark
             * @constant
             */
            type: "Bookmark";
            /** @description Attributes belonging to a bookmark */
            attributes: components["schemas"]["BookmarkCreateAttributes"];
            /** @description Entities related to a bookmark */
            relationships: components["schemas"]["BookmarkRelationships-Input"];
        };
        /** BookmarkCreateTopLevel */
        BookmarkCreateTopLevel: {
            data: components["schemas"]["BookmarkCreateResource"];
        };
        /** BookmarkListResponseAttributes */
        BookmarkListResponseAttributes: {
            /**
             * Name
             * @description Name of the bookmark. Unique per user.
             */
            name: string;
            /**
             * Path
             * @description Path to a directory on the collection.
             */
            path: string | null;
            /**
             * Pinned
             * @description Flag for if the bookmark is pinned as a favorite.
             * @default false
             */
            pinned: boolean;
        };
        /** BookmarkListResponseResource */
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
             * @description Unique identifier of the bookmark
             */
            id?: string;
            /** @description Attributes belonging to a bookmark */
            attributes: components["schemas"]["BookmarkListResponseAttributes"];
            /** @description Entities related to a bookmark */
            relationships: components["schemas"]["BookmarkRelationships-Output"];
        };
        /** BookmarkListResponseTopLevel */
        BookmarkListResponseTopLevel: {
            /** Data */
            data: components["schemas"]["BookmarkListResponseResource"][];
            links?: components["schemas"]["JsonAPIPaginationLinks"];
            meta: components["schemas"]["JsonApiTopLevelMetaInformation"];
            /** Included */
            included?: components["schemas"]["CollectionResponseResource"][];
        };
        /** BookmarkPatchAttributes */
        BookmarkPatchAttributes: {
            /**
             * Name
             * @description Name of the bookmark. Unique per user.
             */
            name: string | null;
            /**
             * Path
             * @description Path to a directory on the collection.
             */
            path: string;
            /**
             * Pinned
             * @description Flag for if the bookmark is pinned as a favorite.
             * @default false
             */
            pinned: boolean | null;
        };
        /** BookmarkPatchResource */
        BookmarkPatchResource: {
            /**
             * Type
             * @default Bookmark
             * @constant
             */
            type: "Bookmark";
            /**
             * Id
             * Format: uuid
             * @description Unique identifier of the bookmark
             */
            id?: string;
            /** @description Attributes settable on a stream access point update */
            attributes: components["schemas"]["BookmarkPatchAttributes"];
        };
        /** BookmarkPatchTopLevel */
        BookmarkPatchTopLevel: {
            data: components["schemas"]["BookmarkPatchResource"];
        };
        /** BookmarkRelationships */
        "BookmarkRelationships-Input": {
            /** @description Collection the bookmark is on */
            collection: components["schemas"]["CollectionDataRelationship"];
        };
        /** BookmarkRelationships */
        "BookmarkRelationships-Output": {
            /** @description Collection the bookmark is on */
            collection: components["schemas"]["CollectionDataRelationship"];
        };
        /** BookmarkResponseAttributes */
        BookmarkResponseAttributes: {
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
            /**
             * Pinned
             * @description Flag for if the bookmark is pinned as a favorite.
             * @default false
             */
            pinned: boolean;
        };
        /** BookmarkResponseResource */
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
             * @description Unique identifier of the bookmark
             */
            id?: string;
            /** @description Attributes belonging to a bookmark */
            attributes: components["schemas"]["BookmarkResponseAttributes"];
            /** @description Entities related to a bookmark */
            relationships: components["schemas"]["BookmarkRelationships-Output"];
        };
        /** BookmarkResponseTopLevel */
        BookmarkResponseTopLevel: {
            meta: components["schemas"]["JsonApiTopLevelMetaInformation"];
            data: components["schemas"]["BookmarkResponseResource"];
            /** Included */
            included?: components["schemas"]["CollectionResponseResource"][];
        };
        /** CollectionAttributes */
        CollectionAttributes: {
            /** Display Name */
            display_name: string;
            /** High Assurance */
            high_assurance: boolean;
        };
        /** CollectionDataRelationship */
        CollectionDataRelationship: {
            data: components["schemas"]["CollectionResourceIdentifier"];
        };
        /** CollectionResourceIdentifier */
        CollectionResourceIdentifier: {
            /**
             * Type
             * @default Collection
             * @constant
             */
            type: "Collection";
            /**
             * Id
             * Format: uuid
             * @description Unique identifier of the collection
             */
            id?: string;
        };
        /** CollectionResponseResource */
        CollectionResponseResource: {
            /**
             * Type
             * @default Collection
             * @constant
             */
            type: "Collection";
            /**
             * Id
             * Format: uuid
             * @description Unique identifier of the collection
             */
            id?: string;
            /** @description Attributes belonging to a collection */
            attributes: components["schemas"]["CollectionAttributes"];
        };
        /** EndpointDataRelationship */
        EndpointDataRelationship: {
            data?: components["schemas"]["EndpointResourceIdentifier"] | null;
        };
        /** EndpointResourceIdentifier */
        EndpointResourceIdentifier: {
            /**
             * Type
             * @default Endpoint
             */
            type: string;
            /**
             * Id
             * Format: uuid
             * @description Unique identifier for Globus Connect Server endpoint
             */
            id: string;
        };
        /** HTTPValidationError */
        HTTPValidationError: {
            /** Detail */
            detail?: components["schemas"]["ValidationError"][];
        };
        /** IdentityDataRelationship */
        IdentityDataRelationship: {
            data?: components["schemas"]["IdentityResourceIdentifier"] | null;
        };
        /** IdentityResourceIdentifier */
        IdentityResourceIdentifier: {
            /**
             * Type
             * @default Identity
             */
            type: string;
            /**
             * Id
             * Format: uuid
             * @description Unique identifier for a Globus Auth identity
             */
            id: string;
        };
        /** JsonAPIPaginationLinks */
        JsonAPIPaginationLinks: {
            /** Next */
            next: string;
        };
        /** JsonApiAbstractResponseTopLevel */
        JsonApiAbstractResponseTopLevel: {
            meta: components["schemas"]["JsonApiTopLevelMetaInformation"];
        };
        /** JsonApiTopLevelMetaInformation */
        JsonApiTopLevelMetaInformation: {
            /** Request Id */
            request_id: string;
        };
        /** StreamAccessPointAttributes */
        StreamAccessPointAttributes: {
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
        };
        /** StreamAccessPointDataRelationship */
        StreamAccessPointDataRelationship: {
            data?: components["schemas"]["StreamAccessPointResourceIdentifier"] | null;
        };
        /** StreamAccessPointListingTopLevel */
        StreamAccessPointListingTopLevel: {
            /** Data */
            data: components["schemas"]["StreamAccessPointResponseResource"][];
            links?: components["schemas"]["JsonAPIPaginationLinks"];
            meta: components["schemas"]["JsonApiTopLevelMetaInformation"];
        };
        /** StreamAccessPointPatchAttributes */
        StreamAccessPointPatchAttributes: {
            /**
             * Display Name
             * @description Friendly name to show in stream access point listings
             */
            display_name?: string | null;
            /**
             * Tlsftp Server
             * @description URL for the tlsftp server used for tunnel access; must begin with tlsftp and end with a port number
             */
            tlsftp_server?: string | null;
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
        };
        /** StreamAccessPointPatchResource */
        StreamAccessPointPatchResource: {
            /**
             * Type
             * @default StreamAccessPoint
             * @constant
             */
            type: "StreamAccessPoint";
            /** @description Attributes settable on a stream access point update */
            attributes: components["schemas"]["StreamAccessPointPatchAttributes"];
        };
        /** StreamAccessPointPatchTopLevel */
        StreamAccessPointPatchTopLevel: {
            data: components["schemas"]["StreamAccessPointPatchResource"];
        };
        /** StreamAccessPointRequestResource */
        StreamAccessPointRequestResource: {
            /**
             * Type
             * @default StreamAccessPoint
             * @constant
             */
            type: "StreamAccessPoint";
            /**
             * Id
             * Format: uuid
             * @description Unique identifier of the stream access point
             */
            id: string;
            /** @description Attributes belonging to a stream access point */
            attributes: components["schemas"]["StreamAccessPointAttributes"];
        };
        /** StreamAccessPointRequestTopLevel */
        StreamAccessPointRequestTopLevel: {
            data: components["schemas"]["StreamAccessPointRequestResource"];
        };
        /** StreamAccessPointResourceIdentifier */
        StreamAccessPointResourceIdentifier: {
            /**
             * Type
             * @default StreamAccessPoint
             * @constant
             */
            type: "StreamAccessPoint";
            /**
             * Id
             * Format: uuid
             * @description Unique identifier of the stream access point
             */
            id: string;
        };
        /** StreamAccessPointResponseRelationships */
        StreamAccessPointResponseRelationships: {
            /** @description Globus Connect Server endpoint that hosts the stream access point */
            host_endpoint: components["schemas"]["EndpointDataRelationship"];
        };
        /** StreamAccessPointResponseResource */
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
             * @description Unique identifier of the stream access point
             */
            id: string;
            /** @description Attributes belonging to a stream access point */
            attributes: components["schemas"]["StreamAccessPointAttributes"];
            /** @description Entities related to a stream access point */
            relationships: components["schemas"]["StreamAccessPointResponseRelationships"];
        };
        /** StreamAccessPointResponseTopLevel */
        StreamAccessPointResponseTopLevel: {
            meta: components["schemas"]["JsonApiTopLevelMetaInformation"];
            data: components["schemas"]["StreamAccessPointResponseResource"];
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
        /** TunnelEventListingTopLevel */
        TunnelEventListingTopLevel: {
            /** Data */
            data: components["schemas"]["TunnelEventResponseResource"][];
            links?: components["schemas"]["JsonAPIPaginationLinks"];
            meta: components["schemas"]["JsonApiTopLevelMetaInformation"];
        };
        /** TunnelEventResponseResource */
        TunnelEventResponseResource: {
            /**
             * Type
             * @default TunnelEvent
             * @constant
             */
            type: "TunnelEvent";
            /**
             * Id
             * @description Unique identifier of the event
             */
            id: number;
            /** @description Attributes of the event */
            attributes: components["schemas"]["TunnelEventAttributes"] | null;
        };
        /** TunnelListingTopLevel */
        TunnelListingTopLevel: {
            /** Data */
            data: components["schemas"]["TunnelResponseResource"][];
            links?: components["schemas"]["JsonAPIPaginationLinks"];
            meta: components["schemas"]["JsonApiTopLevelMetaInformation"];
        };
        /** TunnelPatchAttributes */
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
        /** TunnelPatchResource */
        TunnelPatchResource: {
            /**
             * Type
             * @default Tunnel
             * @constant
             */
            type: "Tunnel";
            /** @description Attributes settable on a tunnel update */
            attributes: components["schemas"]["TunnelPatchAttributes"];
        };
        /** TunnelPatchTopLevel */
        TunnelPatchTopLevel: {
            data: components["schemas"]["TunnelPatchResource"];
        };
        /** TunnelRequestAttributes */
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
        /** TunnelRequestRelationships */
        TunnelRequestRelationships: {
            /** @description Stream access point for listener application */
            listener: components["schemas"]["StreamAccessPointDataRelationship"];
            /** @description Stream access point for initiator application */
            initiator: components["schemas"]["StreamAccessPointDataRelationship"];
        };
        /** TunnelRequestResource */
        TunnelRequestResource: {
            /**
             * Type
             * @default Tunnel
             * @constant
             */
            type: "Tunnel";
            /** @description Attributes settable on a tunnel request */
            attributes: components["schemas"]["TunnelRequestAttributes"];
            /** @description Request-settable entities related to a tunnel */
            relationships: components["schemas"]["TunnelRequestRelationships"];
        };
        /** TunnelRequestTopLevel */
        TunnelRequestTopLevel: {
            data: components["schemas"]["TunnelRequestResource"];
        };
        /** TunnelResponseAttributes */
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
        /** TunnelResponseRelationships */
        TunnelResponseRelationships: {
            /** @description Stream access point for listener application */
            listener: components["schemas"]["StreamAccessPointDataRelationship"];
            /** @description Stream access point for initiator application */
            initiator: components["schemas"]["StreamAccessPointDataRelationship"];
            /** @description Globus Auth identity that created the tunnel */
            owner: components["schemas"]["IdentityDataRelationship"];
        };
        /** TunnelResponseResource */
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
             * @description Unique identifier of the tunnel
             */
            id: string;
            /** @description Attributes of the tunnel */
            attributes: components["schemas"]["TunnelResponseAttributes"];
            /** @description Entities related to the tunnel */
            relationships: components["schemas"]["TunnelResponseRelationships"];
        };
        /** TunnelResponseTopLevel */
        TunnelResponseTopLevel: {
            meta: components["schemas"]["JsonApiTopLevelMetaInformation"];
            data: components["schemas"]["TunnelResponseResource"];
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
                /**
                 * @description [
                 *       "Limit results to stream access points that match on an attribute; each attribute is weighted equally"
                 *     ]
                 */
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
                    "application/json": components["schemas"]["StreamAccessPointListingTopLevel"];
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
                    "application/json": components["schemas"]["StreamAccessPointResponseTopLevel"];
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
                    "application/json": components["schemas"]["TunnelListingTopLevel"];
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
                "application/json": components["schemas"]["TunnelRequestTopLevel"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TunnelResponseTopLevel"];
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
                    "application/json": components["schemas"]["TunnelResponseTopLevel"];
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
                    "application/json": components["schemas"]["JsonApiAbstractResponseTopLevel"];
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
                "application/json": components["schemas"]["TunnelPatchTopLevel"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TunnelResponseTopLevel"];
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
                code_name?: string | null;
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
                    "application/json": components["schemas"]["TunnelEventListingTopLevel"];
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
                    "application/json": components["schemas"]["BookmarkListResponseTopLevel"];
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
                "application/json": components["schemas"]["BookmarkCreateTopLevel"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BookmarkResponseTopLevel"];
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
                    "application/json": components["schemas"]["BookmarkResponseTopLevel"];
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
                    "application/json": components["schemas"]["JsonApiAbstractResponseTopLevel"];
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
                "application/json": components["schemas"]["BookmarkPatchTopLevel"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BookmarkResponseTopLevel"];
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
    stream_access_points_post_private_gcs_stream_access_points_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["StreamAccessPointRequestTopLevel"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["StreamAccessPointResponseTopLevel"];
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
    stream_access_points_delete_private_gcs_stream_access_points__stream_access_point_uuid__delete: {
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
                    "application/json": components["schemas"]["JsonApiAbstractResponseTopLevel"];
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
    stream_access_points_patch_private_gcs_stream_access_points__stream_access_point_uuid__patch: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                stream_access_point_uuid: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["StreamAccessPointPatchTopLevel"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["StreamAccessPointResponseTopLevel"];
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
