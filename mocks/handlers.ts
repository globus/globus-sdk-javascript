import { RestContext, RestRequest, rest } from "msw";

/**
 * A mirrored request from MSW. This can be used to easilty validate the shape
 * of a request that was dispatched to the server.
 */
export type MirroredRequest = {
  __msw: "FALLBACK";
  req: Pick<RestRequest, "url" | "method"> & {
    /**
     * MSW returns a `Headers` object, which is not JSON serializable. We
     * mirror as a plain object.
     */
    headers: {
      [key: string]: string;
    };
    /**
     * JSON payload provided with the request, if any.
     */
    json?: unknown;
  };
  ctx: RestContext;
};

export const handlers = [
  /**
   * For the majority of tests, we simply want to validate the shape of the
   * request object that was dispatched to the server. By returning the request
   * object, here, assertions can be run against it in individual tests.
   */
  rest.all("*", async (req, res, ctx) => {
    const headers: MirroredRequest["req"]["headers"] = {};
    req.headers.forEach((value, key) => {
      headers[key] = value;
    });
    const mirror: MirroredRequest = {
      __msw: "FALLBACK",
      req: {
        url: req.url,
        method: req.method,
        headers,
      },
      ctx,
    };

    try {
      mirror.req.json = await req.json();
    } catch (_e) {
      // ignore error
    }

    return res(ctx.json(mirror));
  }),
];
