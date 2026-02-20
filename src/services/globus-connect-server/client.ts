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
import { type GCSConfiguration } from './index.js';

import * as collections from './service/collections.js';
import * as endpoint from './service/endpoint.js';
import * as https from './service/https.js';
import * as nodes from './service/nodes.js';
import * as roles from './service/roles.js';
import * as storageGateways from './service/storage-gateways.js';
import * as userCredentials from './service/user-credentials.js';
import * as versioning from './service/versioning.js';

type TailOfTuple<T extends unknown[], Head extends unknown[]> = T extends [...Head, ...infer Tail]
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
      updateSubscriptionId: bind(endpoint.updateSubscriptionId, configuration),
      updateOwner: bind(endpoint.updateOwner, configuration),
      updateOwnerString: bind(endpoint.updateOwnerString, configuration),
      resetOwnerString: bind(endpoint.resetOwnerString, configuration),
      next: {
        get: bind(endpoint.next.get, configuration),
        update: bind(endpoint.next.update, configuration),
        patch: bind(endpoint.next.patch, configuration),
        updateSubscriptionId: bind(endpoint.next.updateSubscriptionId, configuration),
        updateOwner: bind(endpoint.next.updateOwner, configuration),
        updateOwnerString: bind(endpoint.next.updateOwnerString, configuration),
        resetOwnerString: bind(endpoint.next.resetOwnerString, configuration),
      },
    },
    versioning: {
      info: bind(versioning.info, configuration),
    },
    collections: {
      get: bind(collections.get, configuration),
      getAll: bind(collections.getAll, configuration),
      create: bind(collections.create, configuration),
      remove: bind(collections.remove, configuration),
      update: bind(collections.update, configuration),
      patch: bind(collections.patch, configuration),
      updateOwnerString: bind(collections.updateOwnerString, configuration),
      resetOwnerString: bind(collections.resetOwnerString, configuration),
      next: {
        getAll: bind(collections.next.getAll, configuration),
        get: bind(collections.next.get, configuration),
        create: bind(collections.next.create, configuration),
        update: bind(collections.next.update, configuration),
        patch: bind(collections.next.patch, configuration),
        remove: bind(collections.next.remove, configuration),
        updateOwnerString: bind(collections.next.updateOwnerString, configuration),
        resetOwnerString: bind(collections.next.resetOwnerString, configuration),
      },
    },
    nodes: {
      get: bind(nodes.get, configuration),
      getAll: bind(nodes.getAll, configuration),
      create: bind(nodes.create, configuration),
      remove: bind(nodes.remove, configuration),
      update: bind(nodes.update, configuration),
      patch: bind(nodes.patch, configuration),
      next: {
        getAll: bind(nodes.next.getAll, configuration),
        get: bind(nodes.next.get, configuration),
        create: bind(nodes.next.create, configuration),
        update: bind(nodes.next.update, configuration),
        patch: bind(nodes.next.patch, configuration),
        remove: bind(nodes.next.remove, configuration),
      },
    },
    userCredentials: {
      get: bind(userCredentials.get, configuration),
      getAll: bind(userCredentials.getAll, configuration),
      create: bind(userCredentials.create, configuration),
      remove: bind(userCredentials.remove, configuration),
      update: bind(userCredentials.update, configuration),
      patch: bind(userCredentials.patch, configuration),
      next: {
        getAll: bind(userCredentials.next.getAll, configuration),
        get: bind(userCredentials.next.get, configuration),
        create: bind(userCredentials.next.create, configuration),
        update: bind(userCredentials.next.update, configuration),
        patch: bind(userCredentials.next.patch, configuration),
        remove: bind(userCredentials.next.remove, configuration),
      },
    },
    storageGateways: {
      get: bind(storageGateways.get, configuration),
      getAll: bind(storageGateways.getAll, configuration),
      create: bind(storageGateways.create, configuration),
      remove: bind(storageGateways.remove, configuration),
      update: bind(storageGateways.update, configuration),
      patch: bind(storageGateways.patch, configuration),
      next: {
        getAll: bind(storageGateways.next.getAll, configuration),
        get: bind(storageGateways.next.get, configuration),
        create: bind(storageGateways.next.create, configuration),
        update: bind(storageGateways.next.update, configuration),
        patch: bind(storageGateways.next.patch, configuration),
        remove: bind(storageGateways.next.remove, configuration),
      },
    },
    roles: {
      get: bind(roles.get, configuration),
      getAll: bind(roles.getAll, configuration),
      create: bind(roles.create, configuration),
      remove: bind(roles.remove, configuration),
      next: {
        getAll: bind(roles.next.getAll, configuration),
        get: bind(roles.next.get, configuration),
        create: bind(roles.next.create, configuration),
        remove: bind(roles.next.remove, configuration),
      },
    },
    https: {
      get: bind(https.get, configuration),
      remove: bind(https.remove, configuration),
      update: bind(https.update, configuration),
    },
  };
}
