/**
 * @module @globus/sdk
 * @description `@globus/sdk` provides modules for interacting with the various APIs that make up the Globus platform.
 *
 * ### Key Concepts
 * - All service methods return a `Promise` that resolves to a [Fetch API Response object](https://developer.mozilla.org/en-US/docs/Web/API/Response).
 *    - Under the hood, we are returning the result of a composed [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/fetch).
 * - All service methods accept a `ServiceMethodOptions` object to pass query parameters, a payload, and headers.
 * - All service methods support a tail argument to pass options to the SDK, including the composed `fetch` call.
 *
 * @example <caption>Using the SDK to search for endpoints via Transfer API.</caption>
 * import { transfer } from "@globus/sdk";
 *
 * const result = await (
 *   await globus.transfer.endpointSearch(
 *     {
 *        query: { filter_fulltext: "Globus Tutorial" }
 *        headers: {
 *          Authorization: "Bearer MY_ACCESS_TOKEN",
 *        },
 *     },
 *     {
 *       fetch: {
 *         // Provide parameters to the underlying `fetch` call.
 *         // https://developer.mozilla.org/en-US/docs/Web/API/fetch#parameters
 *         options: {
 *           priority: "high"
 *         },
 *       },
 *     }
 *   )
 * ).json();
 *
 * @example <caption>Using the SDK to fetch a single flow from the Flows API.</caption>
 * import { flows } from "@globus/sdk";
 *
 * const result = await (await flows.flows.get("452bbea3-5e3b-45a5-af08-50179839a4e8")).json();
 */

/// <reference types="@globus/types" />
/// <reference types="@globus/types/auth" />
/// <reference types="@globus/types/transfer" />
/// <reference types="@globus/types/search" />

export * as authorization from "./lib/core/authorization";
export * as auth from "./lib/services/auth";
export * as transfer from "./lib/services/transfer";
export * as search from "./lib/services/search";
export * as groups from "./lib/services/groups";
export * as flows from "./lib/services/flows";
export * as gcs from "./lib/services/globus-connect-server";
export * as timer from "./lib/services/timer";
