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

export type HasRequiredServiceMethodPayload<TPayload extends ServiceMethodPayload> =
  Partial<TPayload> extends TPayload ? false : true;

export type ServiceMethod<TPayload extends ServiceMethodPayload, R extends Response = Response> =
  HasRequiredServiceMethodPayload<TPayload> extends true
    ? (payload: TPayload & ServiceMethodPayload) => Promise<R>
    : (payload?: TPayload & ServiceMethodPayload) => Promise<R>;

/**
 * Extracts parameter names from a parameterized template string.
 * @example
 * ExtractTemplateParams<'{host}'> // { host: string }
 * ExtractTemplateParams<'/v2/tunnels/{tunnel_uuid}'> // { tunnel_uuid: string }
 * ExtractTemplateParams<'/v2/tunnels'> // {}
 */
type ExtractTemplateParams<T extends string> = T extends `${string}{${infer Param}}${infer Rest}`
  ? { [K in Param]: string } & ExtractTemplateParams<Rest>
  : {};

/**
 * Derives the appropriate method signature based on the presence of template parameters.
 */
type DeriveMethodSignatureFromPath<
  TResourceServer extends string,
  TPath extends string,
  TPayload extends ServiceMethodPayload,
  TResponse extends Response,
> = [keyof ExtractTemplateParams<TResourceServer>, keyof ExtractTemplateParams<TPath>] extends [
  never,
  never,
]
  ? ServiceMethod<TPayload, TResponse>
  : (
      payload: ExtractTemplateParams<TResourceServer> &
        ExtractTemplateParams<TPath> &
        TPayload &
        ServiceMethodPayload,
    ) => Promise<TResponse>;

const TEMPLATE_REGEX = /\{(\w+)\}/g;

/**
 * Factory function to create service methods.
 */
export function createServiceMethodFactory<
  const TResourceServer extends string,
  const TPath extends string,
>(
  /**
   * Configuration for the service method.
   * @todo In next major release, `scope` will no longer be supported (by `serviceRequest`) and we can update this type.
   */
  config: Omit<ServiceRequestDSL, 'path' | 'scope'> & {
    /**
     * The resource_server for the service method.
     * - This can include path parameters using `{}` braces to create a template string.
     * @example '{endpoint_id}'
     * @example 'flows.globus.org'
     * @example 'fa5e.bd7c.data.globus.org'
     * @example '524230d7-ea86-4a52-8312-86065a9e0417'
     */
    resource_server?: TResourceServer;
    /**
     * The path template for the service method.
     * - This can include path parameters using `{}` braces to create a template string.
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
      const { path: originalPath, resource_server: originalResourceServer, ...rest } = config;
      /**
       * The actual service method function.
       * - `payload` is initially set as `any`, but will be properly typed in the return type (cast).
       */
      return ((payload?: any) => {
        let resourceServer: string | undefined = originalResourceServer;
        let path: string = originalPath;
        let processedPayload = payload;
        if (processedPayload && config.transform) {
          processedPayload = config.transform(payload);
        }
        if (processedPayload) {
          if (originalResourceServer) {
            resourceServer = originalResourceServer.replace(
              TEMPLATE_REGEX,
              (_: string, key: string) => processedPayload[key] ?? `{${key}}`,
            );
          }
          path = path.replace(
            TEMPLATE_REGEX,
            (_: string, key: string) => processedPayload[key] ?? `{${key}}`,
          );
        }

        if ((originalResourceServer && !resourceServer) || resourceServer?.match(TEMPLATE_REGEX)) {
          throw new Error(
            `Missing required parameters for method (resource_server): ${originalResourceServer}`,
          );
        }

        if (path.match(TEMPLATE_REGEX)) {
          throw new Error(`Missing required parameters for method (path): ${originalPath}`);
        }
        return serviceRequest({ ...rest, path, resource_server: resourceServer }, processedPayload);
      }) as DeriveMethodSignatureFromPath<TResourceServer, TPath, TPayload, TResponse>;
    },
  };
}
