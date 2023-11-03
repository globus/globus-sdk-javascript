/**
 * @module Client - Globus Connect Server Manager API
 * @category Client
 * @description A wrapper around the Globus Connect Server Manager API that binds various Globus Connect Server resources
 * to a single configuration object (GCSConfiguration).
 *
 * @example
 * import { getClient } from "@globus/sdk/lib/services/globus-connect-server/client";
 *
 * const client = getClient({
 *   host: "https://fa5e.bd7c.data.globus.org",
 *   endpoint_id: "ac9cb54b-fc48-4824-b801-1388baf0a909",
 * });
 *
 * const result = await client.endpoint.get();
 */
import { type GCSConfiguration } from ".";

import * as collections from "./service/collections";
import * as endpoint from "./service/endpoint";
import * as roles from "./service/roles";
import * as storageGateways from "./service/storage-gateways";
import * as userCredentials from "./service/user-credentials";
import * as versioning from "./service/versioning";

type TailOfTuple<T extends unknown[], Head extends unknown[]> = T extends [
  ...Head,
  ...infer Tail
]
  ? Tail
  : never;

/**
 * Bind arguments to a method (partial application).
 * @param method The method arguments will be bound to.
 * @param bound The arguments to bind to the method.
 */
function bind<M extends (...args: any[]) => ReturnType<M>, Args extends any[]>(
  method: M,
  ...bound: Args
) {
  return function (...args: TailOfTuple<Parameters<M>, Args>) {
    return method(...bound, ...args);
  };
}

/**
 * Create a Globus Connect Server Manager client. This client is used to
 * create a SDK context that is bound to a specific Globus Connect Server.
 */
export function getClient(configuration: GCSConfiguration) {
  return {
    configuration,
    endpoint: {
      get: bind(endpoint.get, configuration),
      update: bind(endpoint.update, configuration),
      patch: bind(endpoint.patch, configuration),
    },
    versioning: {
      info: bind(versioning.info, configuration),
    },
    collections: {
      get: bind(collections.get, configuration),
      getAll: bind(collections.getAll, configuration),
    },
    userCredentials: {
      get: bind(userCredentials.get, configuration),
      getAll: bind(userCredentials.getAll, configuration),
    },
    storageGateways: {
      get: bind(storageGateways.get, configuration),
      getAll: bind(storageGateways.getAll, configuration),
    },
    roles: {
      get: bind(roles.get, configuration),
      getAll: bind(roles.getAll, configuration),
      create: bind(roles.create, configuration),
      remove: bind(roles.remove, configuration),
    },
  };
}
