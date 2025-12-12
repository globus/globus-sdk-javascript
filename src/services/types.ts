import { stringifyParameters } from '../core/url.js';
import { ENVIRONMENTS } from '../core/global.js';
import type { AuthorizationManager } from '../core/authorization/AuthorizationManager.js';

export interface JSONFetchResponse<Res> extends Response {
  json(): Promise<Res>;
}

/**
 * Properties that will be passed to underlying `fetch` calls to override behavior.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/fetch#parameters
 */
type FetchOverrides =
  | (Omit<RequestInit, 'headers'> & {
      headers?: Record<string, string>;
      /**
       * Provide an implementation of `fetch` to be used.
       * This is currently **not** advertised since we do not dynamically import `cross-fetch` yet.
       * @experimental
       * @private
       */
      __callable?: typeof fetch;
    })
  | undefined;

export type SDKOptions = {
  environment?: (typeof ENVIRONMENTS)[keyof typeof ENVIRONMENTS];
  manager?: AuthorizationManager;
  fetch?: {
    options: FetchOverrides;
  };
};

/**
 * This isn't used yet, but might be one day.
 * @private
 * @experimental
 */
export type ServiceMethodResponse = {
  /**
   * The raw response from the upstream service.
   */
  _raw: Record<string, Record<string, unknown>>;
  /**
   * Information we deem worthwhile to augment responses with.
   * - Timing information, debug information, etc.
   */
  _metadata: Record<string, unknown>;
  data: Record<string, unknown>;
};

/**
 * Our `stringifyParameters` function defines what types of query parameters
 * can actually be serialized as part of the URL.
 */
type UnknownQueryParameters = Parameters<typeof stringifyParameters>[0];

export type Headers = Record<string, string>;

export type BaseServiceMethodOptions = {
  /**
   * Query parmeters to send with the request.
   */
  query?: UnknownQueryParameters;
  /**
   * The payload of the request that will be serialized to the body.
   */
  payload?: Record<string, unknown>;
  /**
   * Used to send an unmodified body as part of the request.
   */
  body?: any;
  /**
   * The headers to send with the request.
   */
  headers?: Headers;
  /**
   * `AuthorizationManager` instance to use for this request.
   */
  manager?: AuthorizationManager;
};

/**
 * Our standard options type for service methods.
 */
export type ServiceMethodOptions = BaseServiceMethodOptions | undefined | never;

export type Segment = string | Record<string, string>;

type HasRequiredMethodOptions<O extends ServiceMethodOptions> = Partial<O> extends O ? false : true;

export type ServiceMethod<O extends ServiceMethodOptions, R extends Response = Response> =
  HasRequiredMethodOptions<O> extends true
    ? (methodOptions: O & BaseServiceMethodOptions, sdkOptions?: SDKOptions) => Promise<R>
    : (methodOptions?: O & BaseServiceMethodOptions, sdkOptions?: SDKOptions) => Promise<R>;

export type ServiceMethodDynamicSegments<
  S extends Segment,
  O extends ServiceMethodOptions,
  R extends Response = Response,
> =
  HasRequiredMethodOptions<O> extends true
    ? (
        segments: S,
        methodOptions: O & {
          query?: BaseServiceMethodOptions['query'];
          headers?: BaseServiceMethodOptions['headers'];
        },
        sdkOptions?: SDKOptions,
      ) => Promise<R>
    : (
        segments: S,
        methodOptions?: O & {
          query?: BaseServiceMethodOptions['query'];
          headers?: BaseServiceMethodOptions['headers'];
        },
        sdkOptions?: SDKOptions,
      ) => Promise<R>;

/**
 * Provides a type-safe union of a subset of object keys.
 */
export type ExtractKeys<O extends object, K extends keyof O> = K;
