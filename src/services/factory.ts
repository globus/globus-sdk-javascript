import { ServiceRequestDSL, serviceRequest as legacyServiceRequest } from './shared.js';
import { SDKOptions, ServiceMethodOptions } from './types.js';

type ServiceMethodPayload = {
  path?: string | Record<string, string>;
  request?: Omit<ServiceMethodOptions, 'payload'> & {
    /**
     * `payload` has been renamed to `data` to better reflect its purpose and avoid confusion with
     * the `ServiceMethodPayload`/object.
     */
    data?: Record<string, unknown>;
  };
  options?: SDKOptions;
};

function serviceRequest(
  this: unknown,
  config: ServiceRequestDSL,
  payload?: ServiceMethodPayload,
): Promise<Response> {
  /**
   * The legacy `serviceRequest` expects the new `data` property to be sent as the `payload`.
   */
  const rewritePayload = {
    ...payload,
    request: {
      ...payload?.request,
      payload: payload?.request?.data,
    },
  };
  return legacyServiceRequest.call(this, config, rewritePayload?.request, rewritePayload?.options);
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
    path: TPath;
    transform?: <TPayload extends ServiceMethodPayload>(payload: TPayload) => TPayload;
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
        if (payload) {
          path = path.replace(/\{(\w+)\}/g, (_: string, key: string) => payload[key] ?? `{${key}}`);
        }
        return serviceRequest(
          { ...rest, path },
          config.transform ? config.transform(payload) : payload,
        );
      }) as DeriveMethodSignatureFromPath<TPath, TPayload, TResponse>;
    },
  };
}
