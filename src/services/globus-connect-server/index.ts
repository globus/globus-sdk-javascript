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

/**
 * Service methods for the Globus Connect Server Manager API.
 */
export * as collections from './service/collections.js';
export * as endpoint from './service/endpoint.js';
export * as https from './service/https.js';
export * as roles from './service/roles.js';
export * as storageGateways from './service/storage-gateways.js';
export * as userCredentials from './service/user-credentials.js';
export * as versioning from './service/versioning.js';

const SCOPES = {
  HIGH_ASSURANCE: 'urn:globus:auth:scope:<ENDPOINT_ID>:manage_collections',
  NON_HIGH_ASSURANCE:
    'urn:globus:auth:scope:<ENDPOINT_ID>:manage_collections[*https://auth.globus.org/scopes/<MAPPED_COLLECTION_ID>/data_access]',
};

export function getRequiredScopes(configuration: GCSConfiguration) {
  return SCOPES.HIGH_ASSURANCE.replace('<ENDPOINT_ID>', configuration.endpoint_id);
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
   * The UUID
   */
  endpoint_id: Globus.UUID;
};

/**
 * The GCSServiceMethod type is similar to the core ServiceMethod type, but
 * the first parameter is always a GCSConfiguration object.
 */
export type GCSServiceMethod<O extends ServiceMethodOptions, R extends Response = Response> = (
  configuration: GCSConfiguration,
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
