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
         * @description Get a list of all stream access points
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
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
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
             * @description Unique identifier for Globus Connect Server endpoint
             */
            id?: string | null;
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
             * @description Unique identifier for a Globus Auth identity
             */
            id?: string | null;
        };
        /** JsonAPIPaginationLinks */
        JsonAPIPaginationLinks: {
            /** Next */
            next: string;
        };
        /** JsonApiAbstractResourceIdentifier */
        JsonApiAbstractResourceIdentifier: {
            /** Type */
            type: string;
            /** Id */
            id?: string | null;
        };
        /** JsonApiAbstractResourceResponseTopLevel */
        JsonApiAbstractResourceResponseTopLevel: {
            data?: components["schemas"]["JsonApiAbstractResourceIdentifier"] | null;
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
            links?: components["schemas"]["JsonAPIPaginationLinks"] | null;
            meta: components["schemas"]["JsonApiTopLevelMetaInformation"];
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
            id?: string;
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
            id?: string;
            /** @description Attributes belonging to a stream access point */
            attributes: components["schemas"]["StreamAccessPointAttributes"];
            /** @description Entities related to a stream access point */
            relationships: components["schemas"]["StreamAccessPointResponseRelationships"];
        };
        /** StreamAccessPointResponseTopLevel */
        StreamAccessPointResponseTopLevel: {
            data: components["schemas"]["StreamAccessPointResponseResource"];
            meta: components["schemas"]["JsonApiTopLevelMetaInformation"];
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
            links?: components["schemas"]["JsonAPIPaginationLinks"] | null;
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
            id?: number;
            /** @description Attributes of the event */
            attributes: components["schemas"]["TunnelEventAttributes"] | null;
        };
        /** TunnelListingTopLevel */
        TunnelListingTopLevel: {
            /** Data */
            data: components["schemas"]["TunnelResponseResource"][];
            links?: components["schemas"]["JsonAPIPaginationLinks"] | null;
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
             * Listener Ip Address
             * @description IP address of listening LAN contact
             */
            listener_ip_address?: string | null;
            /**
             * Listener Port
             * @description Port number of listening LAN contact
             */
            listener_port?: number | null;
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
             * Submission Id
             * Format: uuid
             * @description Client-generated UUID for tunnel creation request; use same value on retry to prevent duplicate requests
             */
            submission_id: string;
            /**
             * Label
             * @description Updatable friendly identifier for the tunnel
             */
            label?: string | null;
            /**
             * Lifetime Mins
             * @description Number of minutes the tunnel will exist once created
             * @default 360
             */
            lifetime_mins: number | null;
            /**
             * Restartable
             * @description Restart tunnel on failure
             * @default false
             */
            restartable: boolean;
            /**
             * Listener Ip Address
             * @description IP address of listening LAN contact
             */
            listener_ip_address?: string | null;
            /**
             * Listener Port
             * @description Port number of listening LAN contact
             */
            listener_port?: number | null;
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
             * Submission Id
             * Format: uuid
             * @description Client-generated UUID for tunnel creation request; use same value on retry to prevent duplicate requests
             */
            submission_id: string;
            /**
             * Label
             * @description Updatable friendly identifier for the tunnel
             */
            label?: string | null;
            /**
             * Lifetime Mins
             * @description Number of minutes the tunnel will exist once created
             * @default 360
             */
            lifetime_mins: number | null;
            /**
             * Restartable
             * @description Restart tunnel on failure
             * @default false
             */
            restartable: boolean;
            /**
             * Listener Ip Address
             * @description IP address of listening LAN contact
             */
            listener_ip_address?: string | null;
            /**
             * Listener Port
             * @description Port number of listening LAN contact
             */
            listener_port?: number | null;
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
             * @description Date and time when the tunnel was created
             */
            created_time?: string | null;
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
            owner?: components["schemas"]["IdentityDataRelationship"] | null;
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
            id?: string;
            /** @description Attributes of the tunnel */
            attributes: components["schemas"]["TunnelResponseAttributes"];
            /** @description Entities related to the tunnel */
            relationships?: components["schemas"]["TunnelResponseRelationships"];
        };
        /** TunnelResponseTopLevel */
        TunnelResponseTopLevel: {
            data: components["schemas"]["TunnelResponseResource"];
            meta: components["schemas"]["JsonApiTopLevelMetaInformation"];
        };
        /** ValidationError */
        ValidationError: {
            /** Location */
            loc: (string | number)[];
            /** Message */
            msg: string;
            /** Error Type */
            type: string;
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
                /** @description [
                 *       "Limit results to stream access points that match on an attribute; each attribute is weighted equally"
                 *     ] */
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
                    "application/json": components["schemas"]["JsonApiAbstractResourceResponseTopLevel"];
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
}
