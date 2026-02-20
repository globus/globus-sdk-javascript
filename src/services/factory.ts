import {
  HTTP_METHODS,
  ServiceRequestDSL,
  serviceRequest as legacyServiceRequest,
} from './shared.js';
import { SDKOptions, BaseServiceMethodOptions } from './types.js';

type RequestOptions = Omit<BaseServiceMethodOptions, 'payload'> & {
  /**
   * `payload` has been renamed to `data` to better reflect its purpose and avoid confusion with
   * the `ServiceMethodPayload`/object.
   */
  data?: Record<string, unknown>;
};

export type ServiceMethodPayload = {
  request?: RequestOptions;
  options?: SDKOptions;
};

function serviceRequest(
  this: unknown,
  config: ServiceRequestDSL,
  payload?: ServiceMethodPayload,
): Promise<Response> {
  const { data, ...rest } = payload?.request || {};
  const methodOptions = {
    ...rest,
    /**
     * The legacy `serviceRequest` expects the new `data` property to be sent as the `payload`.
     */
    payload: data,
  };

  const sdkOptions = payload?.options;

  return legacyServiceRequest.call(this, config, methodOptions, sdkOptions);
}

type HasRequiredServiceMethodPayload<TPayload extends ServiceMethodPayload> =
  Partial<TPayload> extends TPayload ? false : true;

export type ServiceMethod<TPayload extends ServiceMethodPayload, R extends Response = Response> =
  HasRequiredServiceMethodPayload<TPayload> extends true
    ? (payload: TPayload & ServiceMethodPayload) => Promise<R>
    : (payload?: TPayload & ServiceMethodPayload) => Promise<R>;

/**
 * Extracts path parameter names from a path template string.
 * @example
 * ExtractPathParams<'/v2/tunnels/{tunnel_uuid}'> // { tunnel_uuid: string }
 * ExtractPathParams<'/v2/tunnels'> // {}
 */
type ExtractPathParams<T extends string> = T extends `${string}{${infer Param}}${infer Rest}`
  ? { [K in Param]: string } & ExtractPathParams<Rest>
  : {};

/**
 * Derives the appropriate method signature based on the presence of path parameters.
 */
type DeriveMethodSignatureFromPath<
  TPath extends string,
  TPayload extends ServiceMethodPayload,
  TResponse extends Response,
> = [keyof ExtractPathParams<TPath>] extends [never]
  ? ServiceMethod<TPayload, TResponse>
  : (payload: ExtractPathParams<TPath> & TPayload & ServiceMethodPayload) => Promise<TResponse>;

/**
 * Structural type for a GCS configuration object.
 * Defined locally to avoid a circular import with `globus-connect-server/index.ts`,
 * which re-exports all GCS service files that will import from this module.
 */
type GCSConfiguration = {
  host: string;
  endpoint_id: string;
};

/**
 * Derives the appropriate GCS method signature based on the presence of path parameters.
 * The first argument is always a `GCSConfiguration` object (passed at call time, not factory creation).
 */
type DeriveGCSMethodSignatureFromPath<
  TPath extends string,
  TPayload extends ServiceMethodPayload,
  TResponse extends Response,
> = [keyof ExtractPathParams<TPath>] extends [never]
  ? HasRequiredServiceMethodPayload<TPayload> extends true
    ? (
        configuration: GCSConfiguration,
        params: TPayload & ServiceMethodPayload,
      ) => Promise<TResponse>
    : (
        configuration: GCSConfiguration,
        params?: TPayload & ServiceMethodPayload,
      ) => Promise<TResponse>
  : (
      configuration: GCSConfiguration,
      params: ExtractPathParams<TPath> & TPayload & ServiceMethodPayload,
    ) => Promise<TResponse>;

const PATH_TEMPLATE_REGEX = /\{(\w+)\}/g;

/**
 * Factory function to create service methods.
 */
export function createServiceMethodFactory<const TPath extends string>(
  /**
   * Configuration for the service method.
   * @todo In next major release, `scope` will no longer be supported (by `serviceRequest`) and we can update this type.
   */
  config: Omit<ServiceRequestDSL, 'path' | 'scope'> & {
    /**
     * The path template for the service method.
     * - This can include path parameters in `{}` braces.
     * @example '/v2/tunnels/{tunnel_uuid}'
     * @example '/jobs'
     * @example '/flows/{flow_id}/runs/{run_id}'
     */
    path: TPath;
    /**
     * Optional transform function to modify the incoming service method payload.
     * - This can be used to modify path parameters, query parameters, or the request body before
     *   the request is made.
     */
    transform?: <TPayload extends ServiceMethodPayload>(
      payload: TPayload,
    ) => TPayload | ServiceMethodPayload;
  },
) {
  return {
    /**
     * Generates a strongly-typed service method based on the provided configuration.
     */
    generate<
      TPayload extends ServiceMethodPayload = ServiceMethodPayload,
      TResponse extends Response = Response,
    >() {
      const { path: pathTemplate, ...rest } = config;
      /**
       * The actual service method function.
       * - `payload` is initially set as `any`, but will be properly typed in the return type (cast).
       */
      return ((payload?: any) => {
        let path: string = pathTemplate;
        let processedPayload = payload;
        if (processedPayload && config.transform) {
          processedPayload = config.transform(payload);
        }
        if (processedPayload) {
          path = path.replace(
            PATH_TEMPLATE_REGEX,
            (_: string, key: string) => processedPayload[key] ?? `{${key}}`,
          );
        }
        if (path.match(PATH_TEMPLATE_REGEX)) {
          throw new Error(`Missing required parameters for path: ${pathTemplate}`);
        }
        return serviceRequest({ ...rest, path }, processedPayload);
      }) as DeriveMethodSignatureFromPath<TPath, TPayload, TResponse>;
    },
  };
}

/**
 * Factory function to create GCS service methods.
 * Unlike `createServiceMethodFactory`, this factory does not accept `service` or `resource_server`
 * at creation time — those are derived from the `GCSConfiguration` passed at call time.
 */
export function createGCSServiceMethodFactory<const TPath extends string>(config: {
  path: TPath;
  method?: HTTP_METHODS;
  transform?: <TPayload extends ServiceMethodPayload>(
    payload: TPayload,
  ) => TPayload | ServiceMethodPayload;
}) {
  return {
    generate<
      TPayload extends ServiceMethodPayload = ServiceMethodPayload,
      TResponse extends Response = Response,
    >() {
      const { path: pathTemplate, ...rest } = config;
      return ((configuration: GCSConfiguration, params?: any) => {
        let path: string = pathTemplate;
        let processedPayload = params;
        if (processedPayload && config.transform) {
          processedPayload = config.transform(params);
        }
        if (processedPayload) {
          path = path.replace(
            PATH_TEMPLATE_REGEX,
            (_: string, key: string) => processedPayload[key] ?? `{${key}}`,
          );
        }
        if (path.match(PATH_TEMPLATE_REGEX)) {
          throw new Error(`Missing required parameters for path: ${pathTemplate}`);
        }
        return serviceRequest(
          { ...rest, service: configuration, resource_server: configuration.endpoint_id, path },
          processedPayload,
        );
      }) as DeriveGCSMethodSignatureFromPath<TPath, TPayload, TResponse>;
    },
  };
}
