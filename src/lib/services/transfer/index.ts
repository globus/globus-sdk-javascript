/**
 * @description A wrapper around the Globus Transfer service.
 * @group Service
 * @see [Globus Transfer API Documentation](https://docs.globus.org/api/transfer/)
 * @module
 */
import * as TRANSFER from "./config";

/**
 * @private
 * @internal
 */
export const CONFIG = TRANSFER;

import { endpointSearch } from "./service/endpoint-search";
export { endpointSearch };
export * as fileOperations from "./service/file-operations";
export * as taskSubmission from "./service/task-submission";
export * as endpoint from "./service/endpoint";
