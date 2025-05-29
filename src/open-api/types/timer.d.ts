export interface paths {
    "/jobs/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List Jobs
         * @description List the current user's timers.
         *
         *     By default, this includes all of the user's timers, even those which have ended.
         */
        get: operations["list_jobs_jobs__get"];
        put?: never;
        /**
         * Submit Job
         * @description Submit a new job (timer).
         *
         *     Some aspects to note for job submissions:
         *     - Intervals are rounded down to the nearest second
         *     - Jobs must be scheduled to start after 1970-01-01
         *       and within one year of when it is submitted.
         *     - If the job is set to stop after exactly 1 run then the interval must be null.
         *       Otherwise, the job interval must be between 60 seconds and 365 days.
         */
        post: operations["submit_job_jobs__post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/jobs/{job_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Read Job
         * @description Get the information for a specific job.
         *
         *     Because re-running the job over time can accumulate a large number of results, the
         *     results are only available in individual pages. A "default" request to this URL
         *     returns the first page within the `results` field, along with a `page_next` field
         *     you pass as the query argument `results_pt` to obtain the next page.
         */
        get: operations["read_job_jobs__job_id__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /**
         * Update Job
         * @description Modify an existing job.
         *
         *     This can only be used to update a subset of fields.
         */
        patch: operations["update_job_jobs__job_id__patch"];
        trace?: never;
    };
    "/jobs/{job_id}/pause": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Pause Job
         * @description Pause a job.
         *
         *     This will set the job's status to inactive, preventing execution
         *     until it is resumed.
         */
        post: operations["pause_job_jobs__job_id__pause_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/jobs/{job_id}/resume": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Resume Job
         * @description Resume an inactive job.
         *
         *     This will set the job's status to 'active', allowing
         *     execution on its schedule. If a run was missed, it will run once
         *     immediately upon resuming.
         *
         *     If the `update_credentials` query parameter is set to `true`, the timer's
         *     refresh token will be replaced with a new one.
         */
        post: operations["resume_job_jobs__job_id__resume_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/jobs/{timer_id}": {
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
         * Delete Timer
         * @description Remove a previously-submitted timer.
         *
         *     Timers are not deleted from the database, but are instead marked for deletion.
         *     They are marked here as "delete_in_progress".
         *
         *     For transfer timers, results' action IDs must be deleted from the Transfer AP.
         *     A background worker will do the cleanup work for both types of timers
         *     to delete the results and mark the timers as "deleted".
         */
        delete: operations["delete_timer_jobs__timer_id__delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/timer": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create Timer
         * @description Create a new Timer.
         *
         *     If the job is set to stop after exactly 1 run then the interval must be null.
         *     Otherwise, the job interval must be between 60 seconds and 365 days.
         *
         *     The timer must specify a type.
         *     Currently, only the "transfer" type is supported.
         */
        post: operations["create_timer_v2_timer_post"];
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
         * EndConditionIterations
         * @description The condition for a timer which stops running after a number of calls.
         */
        EndConditionIterations: {
            /**
             * Condition
             * @default iterations
             * @enum {string}
             */
            condition: "iterations";
            /** Count */
            count: number;
        };
        /**
         * EndConditionTime
         * @description The end condition for a timer which stops running after a time.
         */
        EndConditionTime: {
            /**
             * Condition
             * @default time
             * @enum {string}
             */
            condition: "time";
            /**
             * Datetime
             * Format: date-time
             */
            datetime: string;
        };
        /** FilterRule */
        FilterRule: {
            /**
             * Data Type
             * @default filter_rule
             * @enum {string}
             */
            DATA_TYPE: "filter_rule";
            /** Name */
            name: string;
            /**
             * Method
             * @default exclude
             * @enum {string}
             */
            method: "include" | "exclude";
            /**
             * Type
             * @enum {string}
             */
            type?: "file" | "dir";
        };
        /** HTTPValidationError */
        HTTPValidationError: {
            /** Detail */
            detail?: components["schemas"]["ValidationError"][];
        };
        /** JobCreate */
        JobCreate: {
            /** Name */
            name?: string;
            stop_after?: components["schemas"]["StopAfter"];
            /**
             * Interval
             * Format: time-delta
             */
            interval?: number;
            /**
             * Scope
             * @example https://auth.globus.org/scopes/actions.globus.org/transfer/transfer
             */
            scope?: string;
            /** Refresh Token */
            refresh_token?: string;
            /**
             * Callback Url
             * Format: uri
             * @example [
             *       "https://actions.automate.globus.org/transfer/transfer/run"
             *     ]
             */
            callback_url: string;
            /**
             * Callback Body
             * @example {
             *       "request_id": "a403b459-376e-47a2-a55d-30e7ddbcc3d2",
             *       "body": {
             *         "source_endpoint_id": "just_an_example"
             *       }
             *     }
             */
            callback_body: Record<string, unknown>;
            /**
             * Start
             * Format: date-time
             */
            start: string;
        };
        /** JobInactiveReason */
        JobInactiveReason: {
            /**
             * Cause
             * @enum {string}
             */
            cause: "user" | "globus_auth_requirements";
            /** Detail */
            detail?: Record<string, unknown>;
        };
        /** JobRead */
        JobRead: {
            /** Name */
            name?: string;
            stop_after?: components["schemas"]["StopAfter"];
            /**
             * Interval
             * Format: time-delta
             */
            interval?: number;
            /**
             * Scope
             * @example https://auth.globus.org/scopes/actions.globus.org/transfer/transfer
             */
            scope?: string;
            /**
             * Callback Url
             * Format: uri
             * @example [
             *       "https://actions.automate.globus.org/transfer/transfer/run"
             *     ]
             */
            callback_url: string;
            /**
             * Callback Body
             * @example {
             *       "request_id": "a403b459-376e-47a2-a55d-30e7ddbcc3d2",
             *       "body": {
             *         "source_endpoint_id": "just_an_example"
             *       }
             *     }
             */
            callback_body: Record<string, unknown>;
            /**
             * Start
             * Format: date-time
             */
            start: string;
            inactive_reason?: components["schemas"]["JobInactiveReason"];
            /**
             * Job Id
             * Format: uuid
             */
            job_id: string;
            /** Status */
            status: string;
            /**
             * Submitted At
             * Format: date-time
             */
            submitted_at: string;
            /**
             * Last Ran At
             * Format: date-time
             */
            last_ran_at?: string;
            /**
             * Next Run
             * Format: date-time
             */
            next_run?: string;
            /** N Runs */
            n_runs: number;
            /** N Errors */
            n_errors: number;
            results: components["schemas"]["JobResultPage"];
            /** Schedule */
            schedule: components["schemas"]["OnceSchedule"] | components["schemas"]["RecurringSchedule"];
        };
        /** JobResult */
        JobResult: {
            /** Data */
            data?: Record<string, unknown>;
            /** Errors */
            errors?: Record<string, unknown>;
            /** Status */
            status?: number;
            /**
             * Ran At
             * Format: date-time
             */
            ran_at: string;
            /** Run Status */
            run_status: string;
            /** Resource Id */
            resource_id?: string;
            /**
             * Next Check Timestamp
             * Format: date-time
             */
            next_check_timestamp?: string;
            /**
             * Start Timestamp
             * Format: date-time
             */
            start_timestamp: string;
            /**
             * Last Check Timestamp
             * Format: date-time
             */
            last_check_timestamp?: string;
            /**
             * End Timestamp
             * Format: date-time
             */
            end_timestamp?: string;
            /** Http Status Polled */
            http_status_polled?: number;
            /** Http Status Submission */
            http_status_submission?: number;
        };
        /** JobResultPage */
        JobResultPage: {
            /** Data */
            data: components["schemas"]["JobResult"][];
            /** Page Next */
            page_next?: string;
        };
        /** JobResumeBehavior */
        JobResumeBehavior: {
            /**
             * Action
             * @enum {string}
             */
            action: "run_once_immediately" | "wait_for_next_scheduled";
        };
        /** JobUpdate */
        JobUpdate: {
            /** Name */
            name?: string;
        };
        /** MessageResponse */
        MessageResponse: {
            /** Message */
            message: string;
        };
        /**
         * OnceSchedule
         * @description The schedule for a timer which runs once at a specific time.
         */
        OnceSchedule: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "once";
            /**
             * When to run the timer
             * Format: date-time
             * @description The time at which the timer should run. This must be provided as a time in the future or close to the current time.
             */
            datetime?: string;
        };
        /**
         * RecurringSchedule
         * @description The schedule for a timer which repeats until an end condition is met,
         *     or indefinitely if there is no end condition.
         */
        RecurringSchedule: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            type: "recurring";
            /**
             * The interval on which the timer runs.
             * @description The number of seconds between runs of the timer.
             */
            interval_seconds: number;
            /**
             * When to start the timer
             * Format: date-time
             * @description The time at which the timer should start running. This must be provided as a time in the future or close to the current time.
             */
            start?: string;
            /** End */
            end?: components["schemas"]["EndConditionTime"] | components["schemas"]["EndConditionIterations"];
        };
        /** StopAfter */
        StopAfter: {
            /**
             * Date
             * Format: date-time
             */
            date?: string;
            /** N Runs */
            n_runs?: number;
        };
        /** TransferTaskDocument */
        TransferTaskDocument: {
            /**
             * Data Type
             * @default transfer
             * @enum {string}
             */
            DATA_TYPE: "transfer";
            /** Source Endpoint */
            source_endpoint: string;
            /** Destination Endpoint */
            destination_endpoint: string;
            /** Data */
            DATA: components["schemas"]["TransferTaskItem"][];
            /** Deadline */
            deadline?: string;
            /**
             * Delete Destination Extra
             * @default false
             */
            delete_destination_extra: boolean;
            /** Destination Local User */
            destination_local_user?: string;
            /**
             * Encrypt Data
             * @default false
             */
            encrypt_data: boolean;
            /**
             * Fail On Quota Errors
             * @default false
             */
            fail_on_quota_errors: boolean;
            /** Filter Rules */
            filter_rules?: components["schemas"]["FilterRule"][];
            /** Label */
            label?: string;
            /**
             * Notify On Failed
             * @default true
             */
            notify_on_failed: boolean;
            /**
             * Notify On Inactive
             * @default true
             */
            notify_on_inactive: boolean;
            /**
             * Notify On Succeeded
             * @default true
             */
            notify_on_succeeded: boolean;
            /**
             * Preserve Timestamp
             * @default false
             */
            preserve_timestamp: boolean;
            /**
             * Skip Source Errors
             * @default false
             */
            skip_source_errors: boolean;
            /** Source Local User */
            source_local_user?: string;
            /**
             * Store Base Path Info
             * @default false
             */
            store_base_path_info: boolean;
            /**
             * Sync Level
             * @enum {integer}
             */
            sync_level?: 0 | 1 | 2 | 3;
            /**
             * Verify Checksum
             * @default false
             */
            verify_checksum: boolean;
        };
        /** TransferTaskItem */
        TransferTaskItem: {
            /**
             * Data Type
             * @default transfer_item
             * @enum {string}
             */
            DATA_TYPE: "transfer_item";
            /** Source Path */
            source_path: string;
            /** Destination Path */
            destination_path: string;
            /** Recursive */
            recursive?: boolean;
            /** External Checksum */
            external_checksum?: string;
            /** Checksum Algorithm */
            checksum_algorithm?: string;
        };
        /** V2TimerCreate */
        V2TimerCreate: {
            timer: components["schemas"]["V2TransferTimerCreate"];
        };
        /** V2TimerRead */
        V2TimerRead: {
            timer: components["schemas"]["V2TransferTimerRead"];
        };
        /** V2TransferTimerCreate */
        V2TransferTimerCreate: {
            /** Name */
            name?: string;
            /** Schedule */
            schedule: components["schemas"]["OnceSchedule"] | components["schemas"]["RecurringSchedule"];
            /**
             * Timer Type
             * @enum {string}
             */
            timer_type: "transfer";
            /**
             * Resource Server
             * @default transfer.api.globus.org
             * @enum {string}
             */
            resource_server: "transfer.api.globus.org";
            body: components["schemas"]["TransferTaskDocument"];
        };
        /** V2TransferTimerRead */
        V2TransferTimerRead: {
            /** Name */
            name?: string;
            /** Schedule */
            schedule: components["schemas"]["OnceSchedule"] | components["schemas"]["RecurringSchedule"];
            inactive_reason?: components["schemas"]["JobInactiveReason"];
            /**
             * Job Id
             * Format: uuid
             */
            job_id: string;
            /** Status */
            status: string;
            /**
             * Submitted At
             * Format: date-time
             */
            submitted_at: string;
            /**
             * Last Ran At
             * Format: date-time
             */
            last_ran_at?: string;
            /**
             * Next Run
             * Format: date-time
             */
            next_run?: string;
            /** Number Of Runs */
            number_of_runs: number;
            /** Number Of Errors */
            number_of_errors: number;
            /**
             * Timer Type
             * @default transfer
             * @enum {string}
             */
            timer_type: "transfer";
            body: components["schemas"]["TransferTaskDocument"];
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
    list_jobs_jobs__get: {
        parameters: {
            query?: {
                /** @description List only jobs with names containing the argument as a substring
                 *             (case-insensitive). */
                filter_name?: string;
                /** @description Filter listed jobs to only those submitted after the specified date. */
                submitted_after?: string;
                /** @description Filter listed jobs to only those submitted before the specified date. */
                submitted_before?: string;
                /** @description [DEPRECATED] Equivalent to 'filter_status=active'. */
                filter_active?: boolean;
                /** @description [DEPRECATED] Equivalent to 'filter_status=ended'. */
                filter_stopped?: boolean;
                /** @description Only return timers with the provided statuses, specified as a comma-separated
                 *             list. Valid statuses are 'active', 'inactive', and 'ended'.
                 *             Defaults to 'active,inactive,ended'. */
                filter_status?: string;
                /** @description Limit the number of results returned per job. */
                result_count?: number;
                /** @description Specify the order of the returned job list. The argument provided has the format
                 *             `FIELD [asc|desc]` where `FIELD` is any orderable field on the job model. `asc`
                 *             or `desc` is separated with a space from the field name. If neither is provided,
                 *             the ordering always defaults to ascending. For example, `name desc` would list
                 *             jobs in reverse alphabetical order on name; `submitted_at` (with no ordering
                 *             specified) would list oldest jobs first. */
                order?: string;
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
                    "application/json": {
                        jobs?: components["schemas"]["JobRead"][];
                    };
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
    submit_job_jobs__post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["JobCreate"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["JobRead"];
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
    read_job_jobs__job_id__get: {
        parameters: {
            query?: {
                results_pt?: string;
                page_size?: number;
            };
            header?: never;
            path: {
                job_id: string;
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
                    "application/json": components["schemas"]["JobRead"];
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
    update_job_jobs__job_id__patch: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                job_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["JobUpdate"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["JobRead"];
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
    pause_job_jobs__job_id__pause_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                job_id: string;
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
                    "application/json": components["schemas"]["MessageResponse"];
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
    resume_job_jobs__job_id__resume_post: {
        parameters: {
            query?: {
                update_credentials?: boolean;
            };
            header?: never;
            path: {
                job_id: string;
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
                    "application/json": components["schemas"]["MessageResponse"];
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
    delete_timer_jobs__timer_id__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                timer_id: string;
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
                    "application/json": components["schemas"]["JobRead"];
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
    create_timer_v2_timer_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["V2TimerCreate"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V2TimerRead"];
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
