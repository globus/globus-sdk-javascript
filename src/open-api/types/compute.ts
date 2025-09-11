export interface paths {
    "/v2/version": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Version
         * @description Get the version of the API and other services.
         */
        get: operations["get_version_v2_version_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        /**
         * Get Version
         * @description Get the version of the API and other services.
         */
        head: operations["get_version_v2_version_head"];
        patch?: never;
        trace?: never;
    };
    "/v2/authenticate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Check Authentication
         * @description Check if the user is authenticated.
         */
        get: operations["check_authentication_v2_authenticate_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/stats": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Funcx Stats
         * @description Get various usage stats.
         */
        get: operations["get_funcx_stats_v2_stats_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/get_amqp_result_connection_url": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get User Specific Result Amqp Url
         * @description Generate new credentials (in the form of a connection URL) for connecting to
         *     the AMQP service.  A new password is generated afresh every invocation, but
         *     the existing RMQ user, if any, is not deleted -- any existing connections will
         *     not be dropped.  The RMQ user will have the vhost permissions set to only be
         *     allowed to read from queues with names prefixed by the ``user_uuid``.
         */
        get: operations["get_user_specific_result_amqp_url_v2_get_amqp_result_connection_url_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/batch_status": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Get Batch Status
         * @description Get the status of one or more tasks.
         *
         *     The body of a request contains a list one or more task IDs; the response
         *     will contain a dictionary of objects with a set of relevant data for
         *     each passed ID.
         */
        post: operations["get_batch_status_v2_batch_status_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/submit": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Submit Batch
         * @description Entry point for submitting tasks to Globus Compute Endpoints
         *
         *     This route takes a list of tasks (specified as a tuple of a function id, an
         *     endpoint id, and a serialized string of arguments to that function); for each
         *     task, it will generate an AMQP packet with the task information, and route it
         *     to the endpoint-appropriate AMQP queue.  This route will then return a list
         *     of task ids that may be utilized to track each task's progress.
         *
         *     Crucially, the order of the task id list returned corresponds to the order of
         *     the tasks submitted to this route.  In pseudo-code,
         *     `ids[0]`&nbsp;&rArr;&nbsp;`tasks[0]`, `ids[1]`&nbsp;&rArr;&nbsp;`tasks[1]`, ...,
         *     `ids[N]`&nbsp;&rArr;&nbsp;`tasks[N]`.
         */
        post: operations["submit_batch_v2_submit_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/containers": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Register Container
         * @description Register a new container
         */
        post: operations["register_container_v2_containers_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/containers/build": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Build Container
         * @description Build a new container
         */
        post: operations["build_container_v2_containers_build_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/containers/build/{container_uuid}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Container Build Status
         * @description Get the status of a container build
         */
        get: operations["get_container_build_status_v2_containers_build__container_uuid__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/containers/{container_uuid}/{container_type}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Container Status
         * @description Get the details of a container
         */
        get: operations["get_container_status_v2_containers__container_uuid___container_type__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/endpoints": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Endpoints
         * @description Get a list of endpoints associated with the authenticated user.
         */
        get: operations["get_endpoints_v2_endpoints_get"];
        put?: never;
        /**
         * Register Endpoint
         * @deprecated
         * @description Register a Compute endpoint.
         *
         *     Deprecated; POST to `/v3/endpoints` instead.
         */
        post: operations["register_endpoint_v2_endpoints_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/endpoints/{endpoint_uuid}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Endpoint
         * @description Retrieve the metadata for a given endpoint.
         */
        get: operations["get_endpoint_v2_endpoints__endpoint_uuid__get"];
        put?: never;
        post?: never;
        /**
         * Delete Endpoint
         * @description Delete the endpoint.
         */
        delete: operations["delete_endpoint_v2_endpoints__endpoint_uuid__delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/endpoints/{endpoint_uuid}/status": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Endpoint Status
         * @description Get the status of an endpoint.
         */
        get: operations["get_endpoint_status_v2_endpoints__endpoint_uuid__status_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/endpoints/{endpoint_uuid}/lock": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Lock Endpoint
         * @description Add a temporary lock to the endpoint to block registration requests
         *     and deletes the current RabbitMQ user/session such that existing
         *     endpoints, local or remote, shuts down upon losing credentials
         *
         *     The POST body is ignored, as the URL and token contain the necessary info.
         */
        post: operations["lock_endpoint_v2_endpoints__endpoint_uuid__lock_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/functions/{function_uuid}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Function
         * @description Get information about a registered function by providing its UUID.
         */
        get: operations["get_function_v2_functions__function_uuid__get"];
        put?: never;
        post?: never;
        /**
         * Delete Function
         * @description Delete a function.
         */
        delete: operations["delete_function_v2_functions__function_uuid__delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/functions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Register Function
         * @description Register a function.
         */
        post: operations["register_function_v2_functions_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/tasks/{task_uuid}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Task Status And Result
         * @description Check the status of a task.
         */
        get: operations["get_task_status_and_result_v2_tasks__task_uuid__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/taskgroup/{task_group_uuid}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Task Group Tasks
         * @description Retrieve all task UUIDs associated with a Task Group
         */
        get: operations["get_task_group_tasks_v2_taskgroup__task_group_uuid__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v3/endpoints": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Register Endpoint
         * @description Register a new endpoint
         */
        post: operations["register_endpoint_v3_endpoints_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v3/endpoints/{endpoint_uuid}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Update Endpoint
         * @description Check immutable flags against existing endpoint
         */
        put: operations["update_endpoint_v3_endpoints__endpoint_uuid__put"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v3/endpoints/{endpoint_uuid}/lock": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Lock Endpoint
         * @description Temporarily block registration requests for the endpoint.
         *
         *     The current AMQP user is also deleted, dropping any open connection.
         */
        post: operations["lock_endpoint_v3_endpoints__endpoint_uuid__lock_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v3/endpoints/{endpoint_uuid}/submit": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Submit Batch
         * @description Entry point for submitting tasks to a Globus Compute Endpoint
         *
         *     This route takes a dictionary of function ids mapped to a list of serialized
         *     arguments destined for invocation at request&#8209;specified (single) endpoint.
         *     The returned data structure is similar, containing a mapping of the requested
         *     function ids to the associated list of task ids.  Of note is that the order of
         *     the returned task ids associated with each function id _is the same order_ as
         *     specified in the request.
         *
         *     The `task_group_id` may be optionally specified if a set of tasks should be
         *     associated with a Task Group that was created in a previous interaction.
         *     However, if set and no task group already exists, the route will return an
         *     HTTP 404.
         */
        post: operations["submit_batch_v3_endpoints__endpoint_uuid__submit_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v3/endpoints/{endpoint_uuid}/allowed_functions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Endpoint Allowlist
         * @description Retrieve the UUIDs of the functions allowed to run on this endpoint
         */
        get: operations["get_endpoint_allowlist_v3_endpoints__endpoint_uuid__allowed_functions_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v3/endpoints/{endpoint_uuid}/console": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Endpoint Console Info
         * @description Get operational information about a running templating endpoint.
         *
         *     This route can only be accessed by the owner of the templating endpoint,
         *     which must have an associated Globus subscription.
         */
        get: operations["get_endpoint_console_info_v3_endpoints__endpoint_uuid__console_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v3/functions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Register Function
         * @description Register a function
         */
        post: operations["register_function_v3_functions_post"];
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
         * AllowedFunctionsResponse
         * @example {
         *       "endpoint_id": "7348422a-1074-427b-a08a-0771068afccc",
         *       "restricted": true,
         *       "functions": [
         *         "063a3a9d-f40e-4b46-950a-fb24f75a345c",
         *         "e4b534c3-d9d0-47b0-8334-f52932ad3d9a",
         *         "ebe03b69-c966-42fb-ae3f-4a8c9e5b909e"
         *       ]
         *     }
         */
        AllowedFunctionsResponse: {
            /**
             * Endpoint Id
             * Format: uuid
             * @description Endpoint UUID
             */
            endpoint_id: string;
            /**
             * Restricted
             * @description False if the endpoint allows execution of any function. True if the endpoint will only execute functions from it's allowed list; see the functions field.
             */
            restricted: boolean;
            /**
             * Functions
             * @description The functions this endpoint is allowed to execute
             */
            functions?: string[];
        };
        /**
         * BatchStatusRequest
         * @example {
         *       "task_ids": [
         *         "7dac44aa-c480-4460-b453-a47b03b031f4",
         *         "4b35645f-0c5b-465d-aaec-fee87f74ff5b"
         *       ]
         *     }
         */
        BatchStatusRequest: {
            /**
             * Task Ids
             * @description Task UUIDs
             */
            task_ids: string[];
        };
        /**
         * BatchStatusResponse
         * @example {
         *       "response": "batch",
         *       "results": {
         *         "7dac44aa-c480-4460-b453-a47b03b031f4": {
         *           "task_id": "7dac44aa-c480-4460-b453-a47b03b031f4",
         *           "status": "success",
         *           "result": "10000",
         *           "completion_t": "1677183605.212898"
         *         },
         *         "4b35645f-0c5b-465d-aaec-fee87f74ff5b": {
         *           "task_id": "4b35645f-0c5b-465d-aaec-fee87f74ff5b",
         *           "status": "failed",
         *           "reason": "Task failed"
         *         }
         *       }
         *     }
         */
        BatchStatusResponse: {
            /**
             * Response
             * @description Response
             */
            response: string;
            /**
             * Results
             * @description Task results
             */
            results: {
                [key: string]: components["schemas"]["BatchStatusResponseResults"];
            };
        };
        /** BatchStatusResponseResults */
        BatchStatusResponseResults: {
            /**
             * Task Id
             * Format: uuid
             * @description Task UUID
             */
            task_id: string;
            /**
             * Status
             * @description Task status
             */
            status?: unknown;
            /**
             * Result
             * @description Task result
             */
            result?: string;
            /**
             * Completion T
             * @description Task completion Unix time
             */
            completion_t?: string;
            /**
             * Exception
             * @description Exception
             */
            exception?: string;
            /**
             * Reason
             * @description Reason for exception
             */
            reason?: string;
        };
        /** BatchSubmitResponseTask */
        BatchSubmitResponseTask: {
            /**
             * Status
             * @description Task status
             */
            status: string;
            /**
             * Task Uuid
             * Format: uuid
             * @description Task UUID
             */
            task_uuid: string;
            /**
             * Http Status Code
             * @description HTTP status code
             */
            http_status_code: number;
            /**
             * Reason
             * @description Reason for exception
             */
            reason?: string;
        };
        /**
         * BuildStatus
         * @description An enumeration.
         * @enum {string}
         */
        BuildStatus: "provided" | "submitted" | "initialized" | "queued" | "building" | "ready" | "failed";
        /** ConsoleNodeInfo */
        ConsoleNodeInfo: {
            /**
             * Total Worker Count
             * @description Total number of provisioned workers on the node
             */
            total_worker_count?: number;
            /**
             * Idle Duration Seconds
             * @description Idle duration in seconds
             */
            idle_duration_seconds?: number;
            /**
             * Python Version
             * @description Node Python version
             */
            python_version?: string;
            /**
             * Endpoint Version
             * @description Version of `globus-compute-endpoint` running on the node
             */
            endpoint_version?: string;
            /**
             * Sdk Version
             * @description Version of `globus-compute-sdk` running on the node
             */
            sdk_version?: string;
        };
        /**
         * ConsoleResponse
         * @example {
         *       "user_endpoints": [
         *         {
         *           "user_endpoint_id": "7348422a-1074-427b-a08a-0771068afccc",
         *           "active": true,
         *           "python_version": "3.12.7",
         *           "endpoint_version": "3.1.1",
         *           "posix_pid": 12345,
         *           "posix_username": "test_user",
         *           "start_time_iso": "2025-01-02T21:20:19.123456-05:00",
         *           "start_time_unix": 1735870819.123456,
         *           "last_heartbeat_unix": 1735884207.498273,
         *           "running_task_count": 3,
         *           "queued_task_count": 0,
         *           "executed_task_count": 15,
         *           "total_worker_count": 2,
         *           "idle_worker_count": 0,
         *           "total_node_count": 1,
         *           "node_info": {
         *             "some_job_id": [
         *               {
         *                 "total_worker_count": 2,
         *                 "idle_duration_seconds": 0,
         *                 "python_version": "3.12.7",
         *                 "endpoint_version": "3.1.1",
         *                 "sdk_version": "3.1.1"
         *               }
         *             ]
         *           },
         *           "engine_type": "GlobusComputeEngine",
         *           "provider_type": "SlurmProvider",
         *           "account": "my-slurm-account",
         *           "queue": "caslake",
         *           "config": "engine:\n  type: GlobusComputeEngine\n  max_workers_per_node: 2\n  provider:\n    type: SlurmProvider\n    account: my-slurm-account\n    partition: caslake\n    worker_init: 'module load Anaconda; source activate compute-env'\n    nodes_per_block: 1\n    max_blocks: 1\n  address:\n    type: address_by_interface\n    ifname: bond0\n"
         *         }
         *       ]
         *     }
         */
        ConsoleResponse: {
            /**
             * User Endpoints
             * @description List of information about each running user endpoint process
             */
            user_endpoints: components["schemas"]["ConsoleUserEndpointInfo"][];
        };
        /** ConsoleUserEndpointInfo */
        ConsoleUserEndpointInfo: {
            /**
             * User Endpoint Id
             * Format: uuid
             * @description User endpoint UUID (key identifier)
             */
            user_endpoint_id: string;
            /**
             * Active
             * @description Whether the user endpoint is active
             * @default true
             */
            active: boolean;
            /**
             * Python Version
             * @description User endpoint Python version
             */
            python_version?: string;
            /**
             * Endpoint Version
             * @description User endpoint version
             */
            endpoint_version?: string;
            /**
             * Client Sdk Versions
             * @description SDK versions used to submit tasks to the user endpoint
             */
            client_sdk_versions?: string[];
            /**
             * Posix Pid
             * @description User endpoint process ID
             */
            posix_pid?: number;
            /**
             * Posix Username
             * @description Local POSIX user running the user endpoint
             */
            posix_username?: string;
            /**
             * Start Time Iso
             * Format: date-time
             * @description User endpoint start time in ISO format including timezone offset
             */
            start_time_iso?: string;
            /**
             * Start Time Unix
             * @description UNIX timestamp indicating when the user endpoint was started
             */
            start_time_unix?: number;
            /**
             * Last Heartbeat Unix
             * @description UNIX timestamp indicating when the services last processed a heartbeat for the user endpoint
             */
            last_heartbeat_unix?: number;
            /**
             * Total Worker Count
             * @description Total number of provisioned workers
             */
            total_worker_count?: number;
            /**
             * Idle Worker Count
             * @description Number of idle workers
             */
            idle_worker_count?: number;
            /**
             * Total Node Count
             * @description Total number of provisioned nodes
             */
            total_node_count?: number;
            /**
             * Node Info
             * @description Details for each provisioned node, indexed by job ID
             */
            node_info?: {
                [key: string]: components["schemas"]["ConsoleNodeInfo"][];
            };
            /**
             * Running Task Count
             * @description Number of running tasks
             */
            running_task_count?: number;
            /**
             * Queued Task Count
             * @description Number of queued tasks
             */
            queued_task_count?: number;
            /**
             * Executed Task Count
             * @description Number of executed tasks
             */
            executed_task_count?: number;
            /**
             * Engine Type
             * @description User endpoint engine type. See our documentation for more information: https://globus-compute.readthedocs.io/en/latest/endpoints/config_reference.html#user-endpoint-configuration
             */
            engine_type?: string;
            /**
             * Provider Type
             * @description User endpoint provider type. See our documentation for more information: https://globus-compute.readthedocs.io/en/latest/endpoints/config_reference.html#user-endpoint-configuration
             */
            provider_type?: string;
            /**
             * Account
             * @description The account against which the scheduler charges resources that are consumed by the user endpoint
             */
            account?: string;
            /**
             * Queue
             * @description The scheduler queue to which the user endpoint will submit jobs
             */
            queue?: string;
            /**
             * Config
             * @description User endpoint configuration YAML content. We do not include this field by default because it may be quite large. Users must explicitly request it using the `include_fields` query parameter.
             */
            config?: string;
        };
        /**
         * ContainerBuildRequest
         * @example {
         *       "name": "My Container",
         *       "description": "Container with vim and git installed using apt and numpy and pandas installed using pip.",
         *       "apt": [
         *         "vim",
         *         "git"
         *       ],
         *       "pip": [
         *         "numpy",
         *         "pandas"
         *       ],
         *       "conda": [],
         *       "payload_url": "https://github.com/my-container"
         *     }
         */
        ContainerBuildRequest: {
            /**
             * Name
             * @description Container name
             */
            name: string;
            /**
             * Description
             * @description Long container description
             */
            description?: string;
            /**
             * Apt
             * @description Optional list of package names to be installed via apt-get
             */
            apt: string[];
            /**
             * Pip
             * @description Optional list of pip requirements (name and optional version specifier)
             */
            pip: string[];
            /**
             * Conda
             * @description Optional list of conda requirements (name and optional version specifier)
             */
            conda: string[];
            /**
             * Payload Url
             * Format: uri
             * @description URL to GitHub repo or publicly readable zip file
             */
            payload_url?: string;
        };
        /**
         * ContainerBuildResponse
         * @example {
         *       "container_id": "b7a42fa2-e97f-4061-9e64-2ede22ae7f5e"
         *     }
         */
        ContainerBuildResponse: {
            /**
             * Container Id
             * Format: uuid
             * @description Container UUID
             */
            container_id: string;
        };
        /**
         * ContainerBuildStatusResponse
         * @example {
         *       "status": "ready"
         *     }
         */
        ContainerBuildStatusResponse: {
            /** @description Container build status */
            status: components["schemas"]["BuildStatus"];
        };
        /**
         * ContainerRegisterRequest
         * @example {
         *       "name": "My Container",
         *       "description": "My container description",
         *       "type": "docker",
         *       "location": "docker://my-container:latest"
         *     }
         */
        ContainerRegisterRequest: {
            /**
             * Name
             * @description Container name
             */
            name: string;
            /**
             * Description
             * @description Long container description
             */
            description?: string;
            type: components["schemas"]["ContainerRuntime"];
            /**
             * Location
             * @description The location of the container (e.g., its docker url)
             */
            location: string;
        };
        /**
         * ContainerRegisterResponse
         * @example {
         *       "container_id": "b7a42fa2-e97f-4061-9e64-2ede22ae7f5e"
         *     }
         */
        ContainerRegisterResponse: {
            /**
             * Container Id
             * Format: uuid
             * @description Container UUID
             */
            container_id: string;
        };
        /**
         * ContainerRuntime
         * @description Runtime to be used to execute the container.
         * @enum {string}
         */
        ContainerRuntime: "docker" | "singularity";
        /** ContainerStatus */
        ContainerStatus: {
            /**
             * Container Uuid
             * Format: uuid
             * @description Container UUID
             */
            container_uuid: string;
            /**
             * Name
             * @description Container name
             */
            name: string;
            /** @description Container build status */
            build_status: components["schemas"]["BuildStatus"];
            type?: components["schemas"]["ContainerRuntime"];
            /**
             * Location
             * @description Container location
             */
            location?: string;
            /**
             * Build Stderr
             * @description Container build stderr
             */
            build_stderr?: string;
            /**
             * Err Message
             * @description Container error message
             */
            err_message?: string;
        };
        /**
         * ContainerStatusResponse
         * @example {
         *       "container": {
         *         "container_uuid": "b7a42fa2-e97f-4061-9e64-2ede22ae7f5e",
         *         "name": "My Container",
         *         "build_status": "ready",
         *         "type": "docker",
         *         "location": "docker://my-container:latest"
         *       }
         *     }
         */
        ContainerStatusResponse: {
            container: components["schemas"]["ContainerStatus"];
        };
        /**
         * DeleteFunctionResponse
         * @example {
         *       "result": 302
         *     }
         */
        DeleteFunctionResponse: {
            /**
             * Result
             * @description The result as a status code integer
             */
            result: number;
        };
        /**
         * Endpoint
         * @example {
         *       "uuid": "7348422a-1074-427b-a08a-0771068afccc",
         *       "name": "My Endpoint",
         *       "display_name": "My Endpoint's display name",
         *       "multi_user": false,
         *       "high_assurance": false,
         *       "public": false,
         *       "endpoint_config": "",
         *       "user_config_template": {},
         *       "user_config_schema": {},
         *       "description": "My endpoint description",
         *       "hostname": "my-endpoint",
         *       "local_user": "user",
         *       "ip_address": "140.221.112.13",
         *       "endpoint_version": "1.0.10",
         *       "sdk_version": "1.0.10",
         *       "python_version": "3.12.7",
         *       "subscription_uuid": "b0b7b089-707a-4d90-a036-05b7964d6b60"
         *     }
         */
        Endpoint: {
            /**
             * Uuid
             * Format: uuid
             * @description Endpoint UUID
             */
            uuid: string;
            /**
             * Name
             * @description Endpoint name
             */
            name: string;
            /**
             * Display Name
             * @description Display name
             */
            display_name: string;
            /**
             * Multi User
             * @description Endpoint multi-user mode
             */
            multi_user: boolean;
            /**
             * High Assurance
             * @description Endpoint supports high-assurance protocols
             */
            high_assurance: boolean;
            /**
             * Public
             * @description Indicates if all users can discover the multi-user endpoint.
             */
            public: boolean;
            /**
             * Config
             * @deprecated
             * @description This field is deprecated. Please use endpoint_config instead.
             */
            config?: Record<string, unknown>;
            /**
             * Endpoint Config
             * @description The contents of the endpoint's configuration file (config.yaml).
             */
            endpoint_config?: string;
            /**
             * User Config Template
             * @description Multi-user endpoints will render this Jinja template with user-provided variables to generate a user-specific endpoint configuration.
             */
            user_config_template?: string;
            /**
             * User Config Schema
             * @description User endpoint configuration schema
             */
            user_config_schema?: Record<string, unknown>;
            /**
             * Description
             * @description Endpoint description
             */
            description?: string;
            /**
             * Hostname
             * @description Endpoint hostname
             */
            hostname?: string;
            /**
             * Local User
             * @description Endpoint local user
             */
            local_user?: string;
            /**
             * Ip Address
             * Format: ipvanyaddress
             * @description Endpoint IP address
             */
            ip_address?: string;
            /**
             * Endpoint Version
             * @description Endpoint version
             */
            endpoint_version?: string;
            /**
             * Sdk Version
             * @description Endpoint SDK version
             */
            sdk_version?: string;
            /**
             * Python Version
             * @description Endpoint Python version
             */
            python_version?: string;
            /**
             * Subscription Uuid
             * Format: uuid
             * @description Globus subscription UUID
             */
            subscription_uuid?: string;
        };
        /**
         * EndpointConfig
         * @example {
         *       "endpoint_id": "7348422a-1074-427b-a08a-0771068afccc",
         *       "task_queue_info": {
         *         "connection_url": "amqps://user:password@mq.fqdn",
         *         "exchange": "some_exchange",
         *         "queue": "some_queue"
         *       },
         *       "result_queue_info": {
         *         "connection_url": "amqps://user:password@mq.fqdn",
         *         "exchange": "some_exchange",
         *         "queue": "some_queue",
         *         "queue_publish_kwargs": {
         *           "exchange": "some_exchange",
         *           "routing_key": "some_key",
         *           "mandatory": true,
         *           "properties": {
         *             "delivery_mode": 2
         *           }
         *         }
         *       },
         *       "warnings": []
         *     }
         */
        EndpointConfig: {
            /**
             * Endpoint Id
             * Format: uuid
             * @description Endpoint UUID
             */
            endpoint_id: string;
            task_queue_info: components["schemas"]["EndpointConfigQueueInfo"];
            result_queue_info: components["schemas"]["EndpointConfigResultQueue"];
            /**
             * Warnings
             * @description Warnings
             */
            warnings?: string[];
        };
        /** EndpointConfigQueueInfo */
        EndpointConfigQueueInfo: {
            /**
             * Connection Url
             * @description Connection URL
             */
            connection_url: string;
            /**
             * Exchange
             * @description Exchange
             */
            exchange: string;
            /**
             * Queue
             * @description Queue
             */
            queue: string;
        };
        /** EndpointConfigResultQueue */
        EndpointConfigResultQueue: {
            /**
             * Connection Url
             * @description Connection URL
             */
            connection_url: string;
            /**
             * Exchange
             * @description Exchange
             */
            exchange: string;
            /**
             * Queue
             * @description Queue
             */
            queue: string;
            queue_publish_kwargs: components["schemas"]["EndpointConfigResultQueuePublish"];
        };
        /** EndpointConfigResultQueuePublish */
        EndpointConfigResultQueuePublish: {
            /**
             * Exchange
             * @description Exchange
             */
            exchange: string;
            /**
             * Routing Key
             * @description Routing key
             */
            routing_key: string;
            /**
             * Mandatory
             * @description Mandatory
             */
            mandatory: boolean;
            properties: components["schemas"]["EndpointConfigResultQueuePublishProperties"];
        };
        /** EndpointConfigResultQueuePublishProperties */
        EndpointConfigResultQueuePublishProperties: {
            /**
             * Delivery Mode
             * @description Delivery mode
             */
            delivery_mode: number;
        };
        /**
         * EndpointDeleteResponse
         * @example {
         *       "result": 302
         *     }
         */
        EndpointDeleteResponse: {
            /**
             * Result
             * @description The result as a status code integer
             */
            result: number;
        };
        /**
         * EndpointListResponseEntry
         * @example {
         *       "uuid": "7348422a-1074-427b-a08a-0771068afccc",
         *       "name": "My Endpoint",
         *       "display_name": "My Endpoint's display name",
         *       "owner": "0b3390f4-ca5f-496d-a7b9-9e4faed46bff"
         *     }
         */
        EndpointListResponseEntry: {
            /**
             * Uuid
             * Format: uuid
             * @description Endpoint UUID
             */
            uuid: string;
            /**
             * Name
             * @description Endpoint name
             */
            name: string;
            /**
             * Display Name
             * @description Display name
             */
            display_name: string;
            /**
             * Owner
             * Format: uuid
             * @description Endpoint owner's identity ID
             */
            owner: string;
        };
        /** EndpointMetadata */
        EndpointMetadata: {
            /**
             * Config
             * @deprecated
             * @description This field is deprecated. Please use endpoint_config instead.
             */
            config?: Record<string, unknown>;
            /**
             * Endpoint Config
             * @description The contents of the endpoint's configuration file (config.yaml).
             */
            endpoint_config?: string;
            /**
             * User Config Template
             * @description Multi-user endpoints will render this Jinja template with user-provided variables to generate a user-specific endpoint configuration.
             */
            user_config_template?: string;
            /**
             * User Config Schema
             * @description User endpoint configuration schema
             */
            user_config_schema?: Record<string, unknown>;
            /**
             * Description
             * @description Endpoint description
             */
            description?: string;
            /**
             * Ip Address
             * Format: ipvanyaddress
             * @description Endpoint IP address
             */
            ip_address?: string;
            /**
             * Hostname
             * @description Endpoint hostname
             */
            hostname?: string;
            /**
             * Local User
             * @description Endpoint local user
             */
            local_user?: string;
            /**
             * Sdk Version
             * @description Endpoint SDK version
             */
            sdk_version?: string;
            /**
             * Endpoint Version
             * @description Endpoint version
             */
            endpoint_version?: string;
            /**
             * Python Version
             * @description Endpoint Python version
             */
            python_version?: string;
        };
        /** EndpointRegisterMetadata */
        EndpointRegisterMetadata: {
            /**
             * Config
             * @deprecated
             * @description This field is deprecated. Please use endpoint_config instead.
             */
            config?: Record<string, unknown>;
            /**
             * Endpoint Config
             * @description The contents of the endpoint's configuration file (config.yaml).
             */
            endpoint_config?: string;
            /**
             * User Config Template
             * @description Multi-user endpoints will render this Jinja template with user-provided variables to generate a user-specific endpoint configuration.
             */
            user_config_template?: string;
            /**
             * User Config Schema
             * @description User endpoint configuration schema
             */
            user_config_schema?: Record<string, unknown>;
            /**
             * Description
             * @description Endpoint description
             */
            description?: string;
            /**
             * Ip Address
             * @description Endpoint IP address
             */
            ip_address?: string;
            /**
             * Hostname
             * @description Endpoint hostname
             */
            hostname?: string;
            /**
             * Local User
             * @description Endpoint local user
             */
            local_user?: string;
            /**
             * Sdk Version
             * @description Endpoint SDK version
             */
            sdk_version?: string;
            /**
             * Endpoint Version
             * @description Endpoint version
             */
            endpoint_version?: string;
            /**
             * Python Version
             * @description Endpoint Python version
             */
            python_version?: string;
        };
        /**
         * EndpointRegisterResponse
         * @example {
         *       "endpoint_id": "7348422a-1074-427b-a08a-0771068afccc",
         *       "task_queue_info": {
         *         "connection_url": "amqps://user:password@mq.fqdn",
         *         "exchange": "some_exchange",
         *         "queue": "some_queue"
         *       },
         *       "result_queue_info": {
         *         "connection_url": "amqps://user:password@mq.fqdn",
         *         "exchange": "some_exchange",
         *         "queue": "some_queue",
         *         "queue_publish_kwargs": {
         *           "exchange": "some_exchange",
         *           "routing_key": "some_key",
         *           "mandatory": true,
         *           "properties": {
         *             "delivery_mode": 2
         *           }
         *         }
         *       },
         *       "heartbeat_queue_info": {
         *         "connection_url": "amqps://user:password@mq.fqdn",
         *         "exchange": "some_exchange",
         *         "queue": "some_queue",
         *         "queue_publish_kwargs": {
         *           "exchange": "some_exchange",
         *           "routing_key": "some_key",
         *           "mandatory": true,
         *           "properties": {
         *             "delivery_mode": 2
         *           }
         *         }
         *       }
         *     }
         */
        EndpointRegisterResponse: {
            /**
             * Endpoint Id
             * Format: uuid
             * @description Endpoint UUID
             */
            endpoint_id: string;
            task_queue_info: components["schemas"]["ReadQueueInfo"];
            result_queue_info: components["schemas"]["WriteQueueInfo"];
            heartbeat_queue_info: components["schemas"]["WriteQueueInfo"];
            /**
             * Warnings
             * @description Warnings
             */
            warnings?: string[];
        };
        /** EndpointStatusDetails */
        EndpointStatusDetails: {
            /**
             * Total Workers
             * @description Total number of workers
             */
            total_workers: number;
            /**
             * Idle Workers
             * @description Number of idle workers
             */
            idle_workers: number;
            /**
             * Pending Tasks
             * @description Number of pending tasks
             */
            pending_tasks: number;
            /**
             * Outstanding Tasks
             * @description Number of outstanding tasks
             */
            outstanding_tasks: number;
            /**
             * Managers
             * @description Number of managers
             */
            managers?: number;
        };
        /**
         * EndpointStatusResponse
         * @example {
         *       "details": {
         *         "total_workers": 1,
         *         "idle_workers": 0,
         *         "pending_tasks": 0,
         *         "outstanding_tasks": 0,
         *         "managers": 1
         *       },
         *       "status": "online"
         *     }
         */
        EndpointStatusResponse: {
            details?: components["schemas"]["EndpointStatusDetails"];
            /**
             * Status
             * @description Endpoint status
             */
            status: string;
        };
        /** ErrorResponse */
        ErrorResponse: {
            /** Status */
            status: string;
            /** Code */
            code: string;
            /** Error Args */
            error_args: unknown[];
            /** Http Status Code */
            http_status_code: number;
            /** Detail */
            detail: string;
            /**
             * Reason
             * @deprecated
             * @description Deprecated; use `detail` instead
             */
            reason: string;
        };
        /**
         * Function
         * @example {
         *       "function_uuid": "11291b86-4f9c-47cb-848e-d3c06285951c",
         *       "function_name": "My Function",
         *       "function_code": "wuX2RpbGyUjBBfY3JlYXRlX2Z1bmN0 ...",
         *       "description": "My first function",
         *       "metadata": {
         *         "python_version": "3.11.3",
         *         "sdk_version": "2.3.3"
         *       }
         *     }
         */
        Function: {
            /**
             * Function Uuid
             * Format: uuid
             * @description Function UUID
             */
            function_uuid: string;
            /**
             * Function Name
             * @description Function name
             */
            function_name?: string;
            /**
             * Description
             * @description Function description
             */
            description?: string;
            /**
             * Function Code
             * @description Serialized function source code
             */
            function_code: string;
            /**
             * Metadata
             * @description Function metadata
             */
            metadata: components["schemas"]["FunctionMetadata"];
        };
        /** FunctionMetadata */
        FunctionMetadata: {
            /**
             * Python Version
             * @description Python version used to serialize function.
             */
            python_version?: string;
            /**
             * Sdk Version
             * @description SDK version used to serialize function.
             */
            sdk_version?: string;
        };
        /**
         * FuncxStatsResponse
         * @example {
         *       "total_function_invocations": 100
         *     }
         */
        FuncxStatsResponse: {
            /**
             * Total Function Invocations
             * @description Total function invocations
             */
            total_function_invocations: number;
        };
        /**
         * FuncxVersionResponse
         * @example {
         *       "api": "1.0.9",
         *       "min_sdk_version": "1.0.10",
         *       "min_ep_version": "1.0.10",
         *       "git_sha": "3ae0ff6bc42b6d5f9d92f3c426fe9e535a841hb6",
         *       "container_service": "0.0.1"
         *     }
         */
        FuncxVersionResponse: {
            /**
             * Api
             * @description API version
             */
            api: string;
            /**
             * Min Sdk Version
             * @description Minimum SDK version
             */
            min_sdk_version?: string;
            /**
             * Min Ep Version
             * @description Minimum endpoint version
             */
            min_ep_version?: string;
            /**
             * Git Sha
             * @description Git SHA of the latest commit
             */
            git_sha?: string;
            /**
             * Container Service
             * @description Container service version
             */
            container_service?: string;
        };
        /** HTTPValidationError */
        HTTPValidationError: {
            /** Detail */
            detail?: components["schemas"]["ValidationError"][];
        };
        /** MultiUserEndpointConfig */
        MultiUserEndpointConfig: {
            /**
             * Endpoint Id
             * Format: uuid
             * @description Endpoint UUID
             */
            endpoint_id: string;
            command_queue_info: components["schemas"]["EndpointConfigQueueInfo"];
            /**
             * Warnings
             * @description Warnings
             */
            warnings?: string[];
        };
        /**
         * MultiUserEndpointRegisterResponse
         * @example {
         *       "endpoint_id": "7348422a-1074-427b-a08a-0771068afccc",
         *       "command_queue_info": {
         *         "connection_url": "amqps://user:password@mq.fqdn",
         *         "exchange": "some_exchange",
         *         "queue": "some_queue"
         *       },
         *       "result_queue_info": {
         *         "connection_url": "amqps://user:password@mq.fqdn",
         *         "exchange": "some_exchange",
         *         "queue": "some_queue",
         *         "queue_publish_kwargs": {
         *           "exchange": "some_exchange",
         *           "routing_key": "some_key",
         *           "mandatory": true,
         *           "properties": {
         *             "delivery_mode": 2
         *           }
         *         }
         *       },
         *       "heartbeat_queue_info": {
         *         "connection_url": "amqps://user:password@mq.fqdn",
         *         "exchange": "some_exchange",
         *         "queue": "some_queue",
         *         "queue_publish_kwargs": {
         *           "exchange": "some_exchange",
         *           "routing_key": "some_key",
         *           "mandatory": true,
         *           "properties": {
         *             "delivery_mode": 2
         *           }
         *         }
         *       }
         *     }
         */
        MultiUserEndpointRegisterResponse: {
            /**
             * Endpoint Id
             * Format: uuid
             * @description Endpoint UUID
             */
            endpoint_id: string;
            command_queue_info: components["schemas"]["ReadQueueInfo"];
            result_queue_info: components["schemas"]["WriteQueueInfo"];
            heartbeat_queue_info: components["schemas"]["WriteQueueInfo"];
            /**
             * Warnings
             * @description Warnings
             */
            warnings?: string[];
        };
        /** ReadQueueInfo */
        ReadQueueInfo: {
            /**
             * Connection Url
             * @description Connection URL
             */
            connection_url: string;
            /**
             * Exchange
             * @description Exchange
             */
            exchange: string;
            /**
             * Queue
             * @description Queue
             */
            queue: string;
        };
        /** ResourceSpecification */
        ResourceSpecification: {
            /**
             * Num Nodes
             * @description Number of nodes required for an MPI application
             */
            num_nodes: number;
            /**
             * Ranks Per Node
             * @description Number of MPI ranks to launch per node.
             */
            ranks_per_node?: number;
            /**
             * Num Ranks
             * @description Total number of MPI ranks to launch across all nodes.
             */
            num_ranks?: number;
            /**
             * Launcher Options
             * @description Options passed through to the MPI launcher command line prefix.
             */
            launcher_options?: string;
        };
        /**
         * ResultAmqpUrlResponse
         * @example {
         *       "queue_prefix": "some_prefix",
         *       "connection_url": "amqps://user:password@amq.fqdn"
         *     }
         */
        ResultAmqpUrlResponse: {
            /**
             * Queue Prefix
             * @description Queue prefix
             */
            queue_prefix: string;
            /**
             * Connection Url
             * Format: uri
             * @description Connection URL
             */
            connection_url: string;
        };
        /**
         * TaskGroupResponse
         * @example {
         *       "taskgroup_id": "4defbef8-0a1a-4c7b-9c83-b59174fca395",
         *       "create_websockets_queue": true,
         *       "tasks": [
         *         {
         *           "id": "9e38ed49-7d05-45c4-9ad0-bfa3bc92d6a1",
         *           "created_at": "2021-05-05T15:00:00.000000"
         *         }
         *       ]
         *     }
         */
        TaskGroupResponse: {
            /**
             * Taskgroup Id
             * Format: uuid
             * @description Task Group UUID
             */
            taskgroup_id: string;
            /**
             * Create Websockets Queue
             * @description Create websockets queue
             */
            create_websockets_queue?: boolean;
            /** Tasks */
            tasks: components["schemas"]["TaskGroupResponseTask"][];
        };
        /** TaskGroupResponseTask */
        TaskGroupResponseTask: {
            /**
             * Id
             * Format: uuid
             * @description Task UUID
             */
            id: string;
            /**
             * Created At
             * Format: date-time
             * @description Task creation time
             */
            created_at: string;
        };
        /**
         * TaskStatusResponse
         * @example {
         *       "task_id": "7dac44aa-c480-4460-b453-a47b03b031f4",
         *       "status": "success",
         *       "result": "10000",
         *       "completion_t": "1677183605.212898",
         *       "details": {
         *         "os": "Linux-5.19.0-1025-aws-x86_64-with-glibc2.35",
         *         "python_version": "3.10.4",
         *         "dill_version": "0.3.5.1",
         *         "globus_compute_sdk_version": "2.3.2",
         *         "task_transitions": {
         *           "execution-start": 1692742841.843334,
         *           "execution-end": 1692742846.123456
         *         }
         *       }
         *     }
         */
        TaskStatusResponse: {
            /**
             * Task Id
             * Format: uuid
             * @description Task UUID
             */
            task_id: string;
            /**
             * Status
             * @description Task status
             */
            status?: unknown;
            /**
             * Result
             * @description Task result
             */
            result?: string;
            /**
             * Completion T
             * @description Task completion Unix time
             */
            completion_t?: string;
            /**
             * Exception
             * @description Exception
             */
            exception?: string;
            /**
             * Details
             * @description Task execution details
             */
            details?: Record<string, unknown>;
        };
        /** UserRuntime */
        UserRuntime: {
            /**
             * Globus Compute Sdk Version
             * @description Version of the Globus Compute SDK used to submit this batch.
             */
            globus_compute_sdk_version?: string;
            /**
             * Globus Sdk Version
             * @description Version of the Globus SDK used to submit this batch.
             */
            globus_sdk_version?: string;
            /**
             * Python Version
             * @description Python version that ran the SDK and submitted this batch.
             */
            python_version?: string;
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
        /** ValidationErrorResponse */
        ValidationErrorResponse: {
            /** Status */
            status: string;
            /** Code */
            code: string;
            /** Error Args */
            error_args: unknown[];
            /** Http Status Code */
            http_status_code: number;
            /** Detail */
            detail: components["schemas"]["ValidationError"][];
            /**
             * Reason
             * @deprecated
             * @description Deprecated; use `detail` instead
             */
            reason: components["schemas"]["ValidationError"][];
        };
        /**
         * VersionService
         * @description An enumeration.
         * @enum {string}
         */
        VersionService: "api" | "all";
        /** WriteQueueInfo */
        WriteQueueInfo: {
            /**
             * Connection Url
             * @description Connection URL
             */
            connection_url: string;
            /**
             * Exchange
             * @description Exchange
             */
            exchange: string;
            /**
             * Queue
             * @description Queue
             */
            queue: string;
            queue_publish_kwargs: components["schemas"]["WriteQueuePublishKwargs"];
        };
        /** WriteQueuePublishKwargs */
        WriteQueuePublishKwargs: {
            /**
             * Exchange
             * @description Exchange
             */
            exchange: string;
            /**
             * Routing Key
             * @description Routing key
             */
            routing_key: string;
            /**
             * Mandatory
             * @description Mandatory
             */
            mandatory: boolean;
            properties: components["schemas"]["WriteQueuePublishProperties"];
        };
        /** WriteQueuePublishProperties */
        WriteQueuePublishProperties: {
            /**
             * Delivery Mode
             * @description Delivery mode
             */
            delivery_mode: number;
        };
        /**
         * EndpointLockResponse
         * @example {
         *       "endpoint_id": "7348422a-1074-427b-a08a-0771068afccc",
         *       "lock_expiration_timestamp": "2021-07-01T00:00:00.000000"
         *     }
         */
        funcx_web_service__schemas__v2__endpoint__EndpointLockResponse: {
            /**
             * Endpoint Id
             * Format: uuid
             * @description Endpoint UUID
             */
            endpoint_id: string;
            /**
             * Lock Expiration Timestamp
             * Format: date-time
             * @description Lock expiration timestamp
             */
            lock_expiration_timestamp: string;
        };
        /**
         * EndpointRegisterRequest
         * @example {
         *       "endpoint_name": "My Endpoint",
         *       "display_name": "My Endpoint's display name",
         *       "endpoint_uuid": "7348422a-1074-427b-a08a-0771068afccc",
         *       "version": "1.0.10",
         *       "multi_user": false,
         *       "allowed_functions": [
         *         "11291b86-4f9c-47cb-848e-d3c06285951c"
         *       ],
         *       "authentication_policy": "67b4e120-2638-4771-86bb-6ac2a0f69e0b",
         *       "metadata": {
         *         "endpoint_config": "",
         *         "user_config_template": {},
         *         "user_config_schema": {},
         *         "description": "My endpoint description",
         *         "ip_address": "140.221.112.13",
         *         "hostname": "my-endpoint",
         *         "local_user": "user",
         *         "sdk_version": "1.0.10",
         *         "endpoint_version": "1.0.10",
         *         "python_version": "3.12.7"
         *       }
         *     }
         */
        funcx_web_service__schemas__v2__endpoint__EndpointRegisterRequest: {
            /**
             * Endpoint Name
             * @description Endpoint name
             */
            endpoint_name: string;
            /**
             * Display Name
             * @description Endpoint display name
             */
            display_name?: string;
            /**
             * Endpoint Uuid
             * Format: uuid
             * @description Endpoint UUID
             */
            endpoint_uuid: string;
            /**
             * Version
             * @description Endpoint version
             */
            version?: string;
            /**
             * Multi User
             * @description Endpoint multi-user mode
             * @default false
             */
            multi_user: boolean;
            /**
             * Allowed Functions
             * @description Functions that are allowed to be run on the endpoint
             */
            allowed_functions?: string[];
            /**
             * Authentication Policy
             * Format: uuid
             * @description Endpoint users are evaluated against this Globus authentication policy. For more information on Globus authentication policies, visit https://docs.globus.org/api/auth/developer-guide/#authentication-policies.
             */
            authentication_policy?: string;
            metadata?: components["schemas"]["EndpointRegisterMetadata"];
        };
        /** RegisterFunctionMetadata */
        funcx_web_service__schemas__v2__function__RegisterFunctionMetadata: {
            /**
             * Python Version
             * @description Python version used to serialize function.
             */
            python_version?: string;
            /**
             * Sdk Version
             * @description SDK version used to serialize function.
             */
            sdk_version?: string;
        };
        /**
         * RegisterFunctionRequest
         * @example {
         *       "function_name": "My Function",
         *       "function_code": "wuX2RpbGyUjBBfY3JlYXRlX2Z1bmN0 ...",
         *       "description": "My first function",
         *       "metadata": {
         *         "python_version": "3.11.3",
         *         "sdk_version": "2.3.3"
         *       },
         *       "container_uuid": "b7a42fa2-e97f-4061-9e64-2ede22ae7f5e",
         *       "group": "a2d6feb6-5386-4a06-8a22-99ea5ad7e651",
         *       "public": false
         *     }
         */
        funcx_web_service__schemas__v2__function__RegisterFunctionRequest: {
            /**
             * Function Name
             * @description Function name
             */
            function_name: string;
            /**
             * Entry Point
             * @description (DEPRECATED) Entry point
             */
            entry_point?: string;
            /**
             * Function Code
             * @description Serialized function source code
             */
            function_code: string;
            /**
             * Description
             * @description Function description
             */
            description?: string;
            metadata?: components["schemas"]["funcx_web_service__schemas__v2__function__RegisterFunctionMetadata"];
            /**
             * Container Uuid
             * Format: uuid
             * @description Container UUID
             */
            container_uuid?: string;
            /**
             * Group
             * Format: uuid
             * @description Globus group UUID
             */
            group?: string;
            /**
             * Public
             * @description Public function
             * @default false
             */
            public: boolean;
        };
        /**
         * RegisterFunctionResponse
         * @example {
         *       "function_uuid": "11291b86-4f9c-47cb-848e-d3c06285951c"
         *     }
         */
        funcx_web_service__schemas__v2__function__RegisterFunctionResponse: {
            /**
             * Function Uuid
             * Format: uuid
             * @description Function UUID
             */
            function_uuid: string;
        };
        /**
         * BatchSubmitRequest
         * @example {
         *       "task_group_id": "97241626-8ff4-4550-9938-5909bd221869",
         *       "create_websocket_queue": false,
         *       "tasks": [
         *         [
         *           "116f1b48-0aab-4228-92f0-021c2ab14b5e",
         *           "ff960aba-fa23-43d5-9cbe-3f4f91a066e1",
         *           "... <serialized_arguments> ..."
         *         ],
         *         [
         *           "116f1b48-0aab-4228-92f0-021c2ab14b5e",
         *           "ff960aba-fa23-43d5-9cbe-3f4f91a066e1",
         *           "... <serialized_arguments> ..."
         *         ]
         *       ]
         *     }
         */
        funcx_web_service__schemas__v2__task__BatchSubmitRequest: {
            /**
             * Task Group Id
             * Format: uuid
             * @description Task group UUID
             */
            task_group_id?: string;
            /**
             * Create Websocket Queue
             * @description Create websocket queue
             * @default true
             */
            create_websocket_queue: boolean;
            /**
             * Tasks
             * @description List of tasks to invoke, each referencing function and endpoint UUIDs.
             */
            tasks: [
                string,
                string,
                string
            ][];
        };
        /**
         * BatchSubmitResponse
         * @example {
         *       "response": "success",
         *       "task_group_id": "97241626-8ff4-4550-9938-5909bd221869",
         *       "results": [
         *         {
         *           "status": "success",
         *           "task_uuid": "7dac44aa-c480-4460-b453-a47b03b031f4",
         *           "http_status_code": 200
         *         },
         *         {
         *           "status": "success",
         *           "task_uuid": "4b35645f-0c5b-465d-aaec-fee87f74ff5b",
         *           "http_status_code": 200
         *         }
         *       ]
         *     }
         */
        funcx_web_service__schemas__v2__task__BatchSubmitResponse: {
            /**
             * Response
             * @description Response
             */
            response: string;
            /**
             * Task Group Id
             * Format: uuid
             * @description Task group UUID
             */
            task_group_id?: string;
            /**
             * Results
             * @description Task results
             */
            results: (components["schemas"]["BatchSubmitResponseTask"] | string)[];
        };
        /**
         * EndpointLockResponse
         * @example {
         *       "endpoint_id": "7348422a-1074-427b-a08a-0771068afccc",
         *       "lock_expiration_timestamp": "1687531403.0434475"
         *     }
         */
        funcx_web_service__schemas__v3__endpoints__EndpointLockResponse: {
            /**
             * Endpoint Id
             * Format: uuid
             * @description Endpoint UUID
             */
            endpoint_id: string;
            /**
             * Lock Expiration Timestamp
             * @description Lock expiration UNIX timestamp
             */
            lock_expiration_timestamp: number;
        };
        /**
         * EndpointRegisterRequest
         * @example {
         *       "endpoint_name": "my_endpoint",
         *       "display_name": "My Endpoint's Display Name",
         *       "version": "2.2.0",
         *       "multi_user": false,
         *       "public": false,
         *       "high_assurance": false,
         *       "allowed_functions": [
         *         "11291b86-4f9c-47cb-848e-d3c06285951c"
         *       ],
         *       "authentication_policy": "67b4e120-2638-4771-86bb-6ac2a0f69e0b",
         *       "subscription_uuid": "59b63c41-a765-4971-ac9a-41742059ade3",
         *       "metadata": {
         *         "endpoint_config": "",
         *         "user_config_template": {},
         *         "user_config_schema": {},
         *         "description": "My endpoint description",
         *         "ip_address": "140.221.112.13",
         *         "hostname": "my-endpoint",
         *         "local_user": "user",
         *         "sdk_version": "2.2.0",
         *         "endpoint_version": "2.2.0",
         *         "python_version": "3.12.7"
         *       }
         *     }
         */
        funcx_web_service__schemas__v3__endpoints__EndpointRegisterRequest: {
            /**
             * Endpoint Name
             * @description Endpoint name
             */
            endpoint_name: string;
            /**
             * Display Name
             * @description Endpoint display name
             */
            display_name?: string;
            /**
             * Version
             * @description Endpoint version
             */
            version?: string;
            /**
             * Multi User
             * @description Endpoint multi-user mode
             * @default false
             */
            multi_user: boolean;
            /**
             * High Assurance
             * @description Endpoint supports high-assurance protocols
             * @default false
             */
            high_assurance: boolean;
            /**
             * Allowed Functions
             * @description Functions that are allowed to be run on the endpoint
             */
            allowed_functions?: string[];
            /**
             * Authentication Policy
             * Format: uuid
             * @description Endpoint users are evaluated against this Globus authentication policy. For more information on Globus authentication policies, visit https://docs.globus.org/api/auth/developer-guide/#authentication-policies.
             */
            authentication_policy?: string;
            /**
             * Subscription Uuid
             * Format: uuid
             * @description Associates an endpoint with a subscription.
             */
            subscription_uuid?: string;
            /**
             * Admins
             * @description A set of Globus Auth identity IDs that, in addition to the owner, have administrative access to the endpoint. This field requires an active Globus subscription (i.e., `subscription_uuid` field).
             */
            admins?: string[];
            /**
             * Public
             * @description Indicates if all users can discover the multi-user endpoint. Please note that this field does not control access to the endpoint, so it should not be used as a security feature.
             * @default false
             */
            public: boolean;
            /**
             * Metadata
             * @description Endpoint metadata
             */
            metadata: components["schemas"]["EndpointMetadata"];
        };
        /** RegisterFunctionMetadata */
        funcx_web_service__schemas__v3__function__RegisterFunctionMetadata: {
            /**
             * Python Version
             * @description version used to serialize function
             */
            python_version: string;
            /**
             * Globus Compute SDK version
             * @description version used to serialize function
             */
            sdk_version: string;
            /**
             * Serde Identifier
             * @description Identifier of SDK method used to serialize the function; the identifiers are not currently specifically documented, but may be found in the [Globus Compute SDK repository](https://github.com/globus/globus-compute) as the `identifier` class variable of the respective [serializers](https://github.com/globus/globus-compute/tree/main/compute_sdk/globus_compute_sdk/serialize)
             */
            serde_identifier: string;
        };
        /**
         * RegisterFunctionRequest
         * @example {
         *       "function_name": "dot_product",
         *       "function_code": "850\n01\ngASVZwIAAAAAAACMCmRpbGwuX2RpbGyUjBB...",
         *       "description": "Dot product of two vectors (unchecked length)",
         *       "meta": {
         *         "python_version": "3.13.3",
         *         "sdk_version": "3.1.1",
         *         "serde_identifier": "01"
         *       },
         *       "public": true
         *     }
         */
        funcx_web_service__schemas__v3__function__RegisterFunctionRequest: {
            /**
             * Function Name
             * @description Function name
             */
            function_name: string;
            /**
             * Function Code
             * @description Serialized function source code
             */
            function_code: string;
            /**
             * Description
             * @description Function description
             */
            description?: string;
            /**
             * Meta
             * @description Function metadata
             */
            meta: components["schemas"]["funcx_web_service__schemas__v3__function__RegisterFunctionMetadata"];
            /**
             * Group
             * Format: uuid
             * @description If specified, this function will be accessible to members of the [Globus Group](https://docs.globus.org/api/groups/) specified by this identifier
             */
            group?: string;
            /**
             * Public
             * @description If true, this function will be accessible to any registered user
             * @default false
             */
            public: boolean;
            /**
             * Ha Endpoint Id
             * Format: uuid
             * @description Users will only be able to run this function on the specified HA endpoint. Since HA functions cannot be shared, this field is mutually exclusive with the `group` and `public` fields.
             */
            ha_endpoint_id?: string;
        };
        /**
         * RegisterFunctionResponse
         * @example {
         *       "function_uuid": "11291b86-4f9c-47cb-848e-d3c06285951c"
         *     }
         */
        funcx_web_service__schemas__v3__function__RegisterFunctionResponse: {
            /**
             * Function Uuid
             * Format: uuid
             * @description Function UUID
             */
            function_uuid: string;
            /**
             * Ha Warning
             * @description Populated when a function is registered to an HA endpoint.  If present, the SDK will emit the text to the user as a warning.
             */
            ha_warning?: string;
        };
        /**
         * BatchSubmitRequest
         * @example {
         *       "task_group_id": "97241626-8ff4-4550-9938-5909bd221869",
         *       "user_endpoint_config": {
         *         "min_blocks": 0,
         *         "max_blocks": 1,
         *         "scheduler_options": "#SBATCH --constraint=knl,quad,cache"
         *       },
         *       "resource_specification": {
         *         "num_nodes": 2,
         *         "ranks_per_node": 2,
         *         "num_ranks": 4,
         *         "launcher_options": "--cpu-bind quiet --mem 3072"
         *       },
         *       "result_serializers": [
         *         "globus_compute_sdk.serialize.JSONData",
         *         "globus_compute_sdk.serialize.DillDataBase64"
         *       ],
         *       "create_queue": true,
         *       "tasks": {
         *         "ff960aba-fa23-43d5-9cbe-3f4f91a066e1": [
         *           "... <serialized_arguments> ...",
         *           "... <serialized_arguments> ...",
         *           "..."
         *         ],
         *         "0a98fd06-edbd-11ed-abcd-0d705ebb4c49": [
         *           "... <serialized_arguments> ...",
         *           "..."
         *         ]
         *       }
         *     }
         */
        funcx_web_service__schemas__v3__tasks__BatchSubmitRequest: {
            /**
             * Task Group Id
             * Format: uuid
             * @description Associate the request tasks with specified Task Group identifier; if not specified or invalid, a new identifier will be generated and returned in the response
             */
            task_group_id?: string;
            /**
             * User Endpoint Config
             * @description Specify user endpoint configuration values as described and allowed by endpoint administrators.
             */
            user_endpoint_config?: Record<string, unknown>;
            /**
             * Resource Specification
             * @description Specify resource requirements for individual task execution.
             */
            resource_specification?: components["schemas"]["ResourceSpecification"];
            /**
             * Create Queue
             * @description If `true`, create a Task Group specific AMQP queue for the results.  In addition to the usual longer-term storage, results will also be copied to this AMQP queue, enabling consumers to get event-driven (instant) results.  (See the [Globus Compute SDK Executor](https://globus-compute.readthedocs.io/en/stable/executor.html) for an implementation that uses this feature.)
             * @default false
             */
            create_queue: boolean;
            /**
             * Tasks
             * @description Lists of serialized task arguments (strings), grouped by function identifiers
             */
            tasks: {
                [key: string]: string[];
            };
            /**
             * User Runtime
             * @description Information about the runtime that submitted this batch, such as Python and Globus Compute SDK versions.
             */
            user_runtime?: components["schemas"]["UserRuntime"];
            /**
             * Result Serializers
             * @description A list of import paths to [SerializationStrategy](https://globus-compute.readthedocs.io/en/stable/reference/serialization_strategies.html#globus_compute_sdk.serialize.SerializationStrategy) subclasses that the endpoint is allowed to use when serializing results.
             */
            result_serializers?: string[];
        };
        /**
         * BatchSubmitResponse
         * @example {
         *       "request_id": "5158de19-10b5-4deb-9d87-a86c1dec3460",
         *       "task_group_id": "97241626-8ff4-4550-9938-5909bd221869",
         *       "endpoint_id": "116f1b48-0aab-4228-92f0-021c2ab14b5e",
         *       "tasks": {
         *         "ff960aba-fa23-43d5-9cbe-3f4f91a066e1": [
         *           "89bde6c3-85e9-4834-b0e8-5cb51955eaf5",
         *           "1e900b37-7a80-424b-aeac-56dd2860f59a",
         *           "9f12a732-3aa6-4878-9d58-b290837ab096"
         *         ],
         *         "0a98fd06-edbd-11ed-abcd-0d705ebb4c49": [
         *           "022151bf-7b2d-4240-b4d0-9ac5b7077314",
         *           "1f6f5f1e-15b0-4916-85ff-471511bd35d6"
         *         ]
         *       }
         *     }
         */
        funcx_web_service__schemas__v3__tasks__BatchSubmitResponse: {
            /**
             * Request Id
             * @description A unique string to identify the request; currently this is mainly to aid debugging efforts&nbsp;&mdash;&nbsp;such as if a user needs to verify an interaction with Globus Support&nbsp;&mdash;&nbsp;and has no automated API hookup or use elsewhere in the Compute ecosystem
             */
            request_id: string;
            /**
             * Task Group Id
             * Format: uuid
             * @description The Task Group identifier to which the submitted tasks were associated
             */
            task_group_id: string;
            /**
             * Endpoint Id
             * Format: uuid
             * @description The endpoint to which the request's tasks were sent for invocation
             */
            endpoint_id: string;
            /**
             * Tasks
             * @description The task identifiers, grouped by the identifier of the function IDs that will execute them.  Note that the order of the identifiers within each list exactly matches the order of serialized arguments in the request.
             */
            tasks: {
                [key: string]: string[];
            };
            /**
             * Ha Warning
             * @description Populated when a task is submitted to an HA endpoint.  If present, the SDK will emit the text to the user as a warning.
             */
            ha_warning?: string;
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
    get_version_v2_version_get: {
        parameters: {
            query?: {
                /** @description Service to get version for */
                service?: components["schemas"]["VersionService"];
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
                    "application/json": string | components["schemas"]["FuncxVersionResponse"];
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
    get_version_v2_version_head: {
        parameters: {
            query?: {
                /** @description Service to get version for */
                service?: components["schemas"]["VersionService"];
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
                    "application/json": unknown;
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
    check_authentication_v2_authenticate_get: {
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
                    "application/json": string;
                };
            };
        };
    };
    get_funcx_stats_v2_stats_get: {
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
                    "application/json": components["schemas"]["FuncxStatsResponse"];
                };
            };
        };
    };
    get_user_specific_result_amqp_url_v2_get_amqp_result_connection_url_get: {
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
                    "application/json": components["schemas"]["ResultAmqpUrlResponse"];
                };
            };
        };
    };
    get_batch_status_v2_batch_status_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["BatchStatusRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BatchStatusResponse"];
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
    submit_batch_v2_submit_post: {
        parameters: {
            query?: never;
            header: {
                "content-length": number;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["funcx_web_service__schemas__v2__task__BatchSubmitRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["funcx_web_service__schemas__v2__task__BatchSubmitResponse"];
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
    register_container_v2_containers_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ContainerRegisterRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ContainerRegisterResponse"];
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
    build_container_v2_containers_build_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ContainerBuildRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ContainerBuildResponse"];
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
    get_container_build_status_v2_containers_build__container_uuid__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Container UUID */
                container_uuid: string;
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
                    "application/json": components["schemas"]["ContainerBuildStatusResponse"];
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
    get_container_status_v2_containers__container_uuid___container_type__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Container UUID */
                container_uuid: string;
                /** @description Type of containers to return (Docker, Singularity) */
                container_type: string;
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
                    "application/json": components["schemas"]["ContainerStatusResponse"];
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
    get_endpoints_v2_endpoints_get: {
        parameters: {
            query?: {
                /** @description Role of user in relation to desired endpoints */
                role?: "owner" | "any";
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
                    "application/json": components["schemas"]["EndpointListResponseEntry"][];
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
    register_endpoint_v2_endpoints_post: {
        parameters: {
            query?: never;
            header: {
                "user-agent": string;
                "x-forwarded-for"?: string;
                "remote-addr"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["funcx_web_service__schemas__v2__endpoint__EndpointRegisterRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EndpointConfig"] | components["schemas"]["MultiUserEndpointConfig"];
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
    get_endpoint_v2_endpoints__endpoint_uuid__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Endpoint UUID */
                endpoint_uuid: string;
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
                    "application/json": components["schemas"]["Endpoint"];
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
    delete_endpoint_v2_endpoints__endpoint_uuid__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Endpoint UUID */
                endpoint_uuid: string;
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
                    "application/json": components["schemas"]["EndpointDeleteResponse"];
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
    get_endpoint_status_v2_endpoints__endpoint_uuid__status_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Endpoint UUID */
                endpoint_uuid: string;
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
                    "application/json": components["schemas"]["EndpointStatusResponse"];
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
    lock_endpoint_v2_endpoints__endpoint_uuid__lock_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Endpoint UUID */
                endpoint_uuid: string;
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
                    "application/json": components["schemas"]["funcx_web_service__schemas__v2__endpoint__EndpointLockResponse"];
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
    get_function_v2_functions__function_uuid__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Function UUID */
                function_uuid: string;
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
                    "application/json": components["schemas"]["Function"];
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
    delete_function_v2_functions__function_uuid__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Function UUID */
                function_uuid: string;
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
                    "application/json": components["schemas"]["DeleteFunctionResponse"];
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
    register_function_v2_functions_post: {
        parameters: {
            query?: never;
            header: {
                "user-agent": string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["funcx_web_service__schemas__v2__function__RegisterFunctionRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["funcx_web_service__schemas__v2__function__RegisterFunctionResponse"];
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
    get_task_status_and_result_v2_tasks__task_uuid__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Task UUID */
                task_uuid: string;
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
                    "application/json": components["schemas"]["TaskStatusResponse"];
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
    get_task_group_tasks_v2_taskgroup__task_group_uuid__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Task Group UUID */
                task_group_uuid: string;
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
                    "application/json": components["schemas"]["TaskGroupResponse"];
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
    register_endpoint_v3_endpoints_post: {
        parameters: {
            query?: never;
            header: {
                "user-agent": string;
                "x-forwarded-for"?: string;
                "remote-addr"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["funcx_web_service__schemas__v3__endpoints__EndpointRegisterRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EndpointRegisterResponse"] | components["schemas"]["MultiUserEndpointRegisterResponse"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Unprocessable Entity */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ValidationErrorResponse"];
                };
            };
            /** @description Locked */
            423: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    update_endpoint_v3_endpoints__endpoint_uuid__put: {
        parameters: {
            query?: never;
            header: {
                "user-agent": string;
                "x-forwarded-for"?: string;
                "remote-addr"?: string;
            };
            path: {
                endpoint_uuid: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["funcx_web_service__schemas__v3__endpoints__EndpointRegisterRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EndpointRegisterResponse"] | components["schemas"]["MultiUserEndpointRegisterResponse"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Unprocessable Entity */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ValidationErrorResponse"];
                };
            };
            /** @description Locked */
            423: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    lock_endpoint_v3_endpoints__endpoint_uuid__lock_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Endpoint UUID */
                endpoint_uuid: string;
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
                    "application/json": components["schemas"]["funcx_web_service__schemas__v3__endpoints__EndpointLockResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Unprocessable Entity */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ValidationErrorResponse"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    submit_batch_v3_endpoints__endpoint_uuid__submit_post: {
        parameters: {
            query?: never;
            header: {
                "user-agent": string;
                "content-length": number;
            };
            path: {
                /** @description Endpoint UUID */
                endpoint_uuid: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["funcx_web_service__schemas__v3__tasks__BatchSubmitRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["funcx_web_service__schemas__v3__tasks__BatchSubmitResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Request Entity Too Large */
            413: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Unprocessable Entity */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ValidationErrorResponse"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    get_endpoint_allowlist_v3_endpoints__endpoint_uuid__allowed_functions_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Endpoint UUID */
                endpoint_uuid: string;
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
                    "application/json": components["schemas"]["AllowedFunctionsResponse"];
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
    get_endpoint_console_info_v3_endpoints__endpoint_uuid__console_get: {
        parameters: {
            query?: {
                /**
                 * @description Provide the UUID of a specific user endpoint to return.
                 * @example 99418dfd-2bcd-473c-a0b5-3aaedd855d82
                 */
                user_endpoint_id?: string;
                /**
                 * @description Comma separated list of user endpoint fields to include in the response. If left blank, all fields except 'config' are included. Invalid field names will result in a 400 error.
                 * @example user_endpoint_id,node_info,config
                 */
                include_fields?: string;
            };
            header?: never;
            path: {
                /** @description Multi-user endpoint UUID */
                endpoint_uuid: string;
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
                    "application/json": components["schemas"]["ConsoleResponse"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Unprocessable Entity */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ValidationErrorResponse"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    register_function_v3_functions_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["funcx_web_service__schemas__v3__function__RegisterFunctionRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["funcx_web_service__schemas__v3__function__RegisterFunctionResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Request Entity Too Large */
            413: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Unprocessable Entity */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"] | components["schemas"]["ValidationErrorResponse"];
                };
            };
        };
    };
}
