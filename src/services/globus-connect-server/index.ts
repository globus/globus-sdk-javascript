/**
 * @description A wrapper around the Globus Connect Server Manager API.
 * @group Service
 * @see [Globus Connect Server Manager API Documentation](https://docs.globus.org/globus-connect-server/v5.4/api/)
 * @module
 */
import type {
  Segment,
  ServiceMethodOptions,
  SDKOptions,
  ServiceMethod,
  ServiceMethodDynamicSegments,
  BaseServiceMethodOptions,
} from '../types.js';

export type * as OpenAPI from '../../open-api/types/gcs/v5.4.js';

/**
 * Service methods for the Globus Connect Server Manager API.
 */
export * as collections from './service/collections.js';
export * as endpoint from './service/endpoint.js';
export * as https from './service/https.js';
export * as nodes from './service/nodes.js';
export * as roles from './service/roles.js';
export * as storageGateways from './service/storage-gateways.js';
export * as userCredentials from './service/user-credentials.js';
export * as versioning from './service/versioning.js';

export * as utils from './utils.js';

const SCOPES = {
  HIGH_ASSURANCE: 'urn:globus:auth:scope:<ENDPOINT_ID>:manage_collections',
  NON_HIGH_ASSURANCE:
    'urn:globus:auth:scope:<ENDPOINT_ID>:manage_collections[*https://auth.globus.org/scopes/<MAPPED_COLLECTION_ID>/data_access]',
};

export function getScopes(configuration: GCSConfiguration, scope?: keyof typeof SCOPES) {
  const { endpoint_id: id } = configuration;
  if (!id) {
    throw new Error(`An 'endpoint_id' is required to determine the required scopes`);
  }
  /**
   * If a specific scope is requested, return the scope with the `<ENDPOINT_ID>` placeholder replaced
   */
  if (scope) {
    return SCOPES[scope].replace('<ENDPOINT_ID>', id);
  }
  /**
   * Otherwise, return all scopes with the `<ENDPOINT_ID>` placeholder replaced.
   */
  return Object.entries(SCOPES).reduce(
    (reduc, [key, value]) => ({
      ...reduc,
      [key]: value.replace('<ENDPOINT_ID>', id),
    }),
    {},
  );
}

/**
 * The configuration object used by all Globus Connect Server Manager API methods.
 */
export type GCSConfiguration = {
  /**
   * The host (base URL) for the Globus Connect Server Manager API.
   * @example https://fa5e.bd7c.data.globus.org
   */
  host: string;
  /**
   * The UUID of the endpoint the GCS API is associated with.
   */
  endpoint_id: string;
};

/**
 * In the case of a resource that allows unauthenticated access, the only property required is the `host`.
 */
export type UnauthenticatedGCSConfiguration = Pick<GCSConfiguration, 'host'>;

/**
 * The GCSServiceMethod type is similar to the core ServiceMethod type, but
 * the first parameter is always a GCSConfiguration object.
 */
export type GCSServiceMethod<
  O extends ServiceMethodOptions,
  R extends Response = Response,
  /**
   * If `true`, the service method allows unauthenticated access (will not attempt to send an `Authorization` header).
   */
  AllowUnauthenticated extends Boolean = false,
> = (
  configuration: AllowUnauthenticated extends false
    ? GCSConfiguration
    : UnauthenticatedGCSConfiguration,
  methodOptions?: O & {
    query?: BaseServiceMethodOptions['query'];
    headers?: BaseServiceMethodOptions['headers'];
  },
  sdkOptions?: SDKOptions,
) => ReturnType<ServiceMethod<O, R>>;

/**
 * The GCSServiceMethodDynamicSegments type is similar to the core ServiceMethodDynamicSegments type, but
 * the first parameter is always a GCSConfiguration object.
 */
export type GCSServiceMethodDynamicSegments<
  S extends Segment,
  O extends ServiceMethodOptions,
  R extends Response = Response,
> = (
  configuration: GCSConfiguration,
  segments: S,
  methodOptions?: O & {
    query?: BaseServiceMethodOptions['query'];
    headers?: BaseServiceMethodOptions['headers'];
  },
  sdkOptions?: SDKOptions,
) => ReturnType<ServiceMethodDynamicSegments<S, O, R>>;
