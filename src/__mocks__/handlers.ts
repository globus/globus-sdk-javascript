import { HttpResponse, http } from 'msw';

/**
 * A mirrored request from MSW. This can be used to easilty validate the shape
 * of a request that was dispatched to the server.
 *
 * @deprecated Use the `mirror` method instead; `export` will be removed in a future release.
 */
export type MirroredRequest = {
  __msw: 'FALLBACK';
  req: Pick<Request, 'url' | 'method'> & {
    /**
     * MSW returns a `Headers` object, which is not JSON serializable. We
     * mirror as a plain object.
     */
    headers: Record<string, string>;
    /**
     * JSON payload provided with the request, if any.
     */
    json?: unknown;
    /**
     * Form data provided with the request, if any.
     */
    formData?: object;
  };
};

export const handlers = [
  /**
   * For the majority of tests, we simply want to validate the shape of the
   * request object that was dispatched to the server. By returning the request
   * object, here, assertions can be run against it in individual tests.
   */
  http.all('*', async ({ request }) => {
    const headers: MirroredRequest['req']['headers'] = {};

    Array.from(request.headers.entries()).forEach(([key, value]) => {
      headers[key] = value;
    });

    const formData: Record<any, any> = {};
    if (request.headers.get('content-type')?.includes('application/x-www-form-urlencoded')) {
      const rawFormData = await request.formData();
      rawFormData.forEach((value, key) => {
        formData[key] = value;
      });
    }

    const mirroredRequest: MirroredRequest = {
      __msw: 'FALLBACK',
      req: {
        url: request.url,
        method: request.method,
        headers,
        formData,
      },
    };

    try {
      mirroredRequest.req.json = await request.json();
    } catch {
      // ignore error
    }

    return HttpResponse.json(mirroredRequest);
  }),
];

/**
 * When `msw` is used in a test, the `mirror` method can be used
 * on the Response of a `fetch` to provide prope type information.
 *
 * @param response The `Response` object from a `fetch` call that `msw` intercepted.
 */
export async function mirror(response: Response): Promise<MirroredRequest> {
  return response.json();
}
