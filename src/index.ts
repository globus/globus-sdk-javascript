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
 * #### Service Method Names
 *
 * Basic CRUD operations provided by services are exposed as the following:
 *
 * | Service Method Name | HTTP Method | Description                  | Example |
 * | --------------------| ----------- | ---------------------------- | ------- |
 * | `get`               | `GET`       | Fetch a single resource.     | `transfer.endpoint.get()` |
 * | `getAll`            | `GET`       | Fetch a list of resources.   | `flows.flows.getAll()`    |
 * | `create`            | `POST`      | Create a new resource.       | `gcs.roles.create()`      |
 * | `update`            | `PUT`       | Update an existing resource. | `gcs.endpoint.update()`   |
 * | `patch`             | `PATCH`     | Update an existing resource. | `gcs.endpoint.patch()`    |
 * | `remove`            | `DELETE`    | Delete an existing resource. | `gcs.collections.remove()`|
 *
 * Methods that do not map to obvious CRUD operations are named according to the resource. i.e., `groups.groups.getMyGroups()`, `transfer.endpointSearch()`, `search.query.post()`
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

/**
 * Core
 */
export * as info from './core/info/index.js';
export * as logger from './core/logger.js';
export * as authorization from './core/authorization/index.js';
export * as errors from './core/errors.js';

/**
 * Services
 */
export * as auth from './services/auth/index.js';
export * as transfer from './services/transfer/index.js';
export * as search from './services/search/index.js';
export * as groups from './services/groups/index.js';
export * as flows from './services/flows/index.js';
export * as gcs from './services/globus-connect-server/index.js';
export * as timers from './services/timers/index.js';
export * as compute from './services/compute/index.js';

export { serviceRequest as request } from './services/shared.js';

/**
 * Applications
 */
export * as webapp from './apps/web.js';
