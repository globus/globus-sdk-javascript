import { ServiceRequestDSL, serviceRequest as legacyServiceRequest } from './shared.js';
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
 * Factory function to create service methods.
 */
export function createServiceMethodFactory<const TPath extends string>(
  config: Omit<ServiceRequestDSL, 'path'> & {
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
            /\{(\w+)\}/g,
            (_: string, key: string) => processedPayload[key] ?? `{${key}}`,
          );
        }
        return serviceRequest({ ...rest, path }, processedPayload);
      }) as DeriveMethodSignatureFromPath<TPath, TPayload, TResponse>;
    },
  };
}
