import { createServiceMethodFactory, createGCSServiceMethodFactory } from '../factory';
import { HTTP_METHODS } from '../shared';

/**
 * Mock `serviceRequest` to test the factory-generated methods.
 */
jest.mock('../shared', () => ({
  ...jest.requireActual('../shared'),
  serviceRequest: jest.fn(() => Promise.resolve(new Response('ok'))),
}));

const { serviceRequest } = jest.requireMock('../shared');

describe('createServiceMethodFactory', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should generate a service method without segments', async () => {
    const factory = createServiceMethodFactory({
      service: 'TRANSFER',
      path: '/v2/tunnels',
      method: HTTP_METHODS.GET,
    });

    const method = factory.generate();

    await method();

    expect(serviceRequest).toHaveBeenCalledWith(
      expect.objectContaining({ path: '/v2/tunnels', method: HTTP_METHODS.GET }),
      { payload: undefined },
      undefined,
    );
  });

  it('should generate a service method with segments', async () => {
    const factory = createServiceMethodFactory({
      service: 'TRANSFER',
      path: '/v2/tunnels/{tunnel_uuid}',
      method: HTTP_METHODS.GET,
    });

    const method = factory.generate();

    await method({ tunnel_uuid: 'abc-123' });

    expect(serviceRequest).toHaveBeenCalledWith(
      expect.objectContaining({ path: '/v2/tunnels/abc-123', method: HTTP_METHODS.GET }),
      { payload: undefined },
      undefined,
    );
  });

  it('should replace multiple segments', async () => {
    const factory = createServiceMethodFactory({
      service: 'FLOWS',
      path: '/flows/{flow_id}/runs/{run_id}',
      method: HTTP_METHODS.GET,
    });

    const method = factory.generate();
    await method({
      flow_id: 'f1',
      run_id: 'r2',
      request: {
        query: { verbose: true },
      },
    });
    expect(serviceRequest).toHaveBeenCalledWith(
      expect.objectContaining({ path: '/flows/f1/runs/r2', method: HTTP_METHODS.GET }),
      { query: { verbose: true } },
      undefined,
    );
  });

  it('should call transform if provided', async () => {
    const transform = jest.fn((payload) => ({
      ...payload,
      flow_id: 'transformed',
    }));

    const factory = createServiceMethodFactory({
      service: 'FLOWS',
      path: '/flows/{flow_id}',
      method: HTTP_METHODS.GET,
      transform,
    });

    const method = factory.generate();

    await method({ flow_id: 'original' });

    expect(transform).toHaveBeenCalledWith({ flow_id: 'original' });
    expect(serviceRequest).toHaveBeenCalledWith(
      expect.objectContaining({ path: '/flows/transformed', method: HTTP_METHODS.GET }),
      { payload: undefined },
      undefined,
    );
  });

  it('BACKWARDS COMPATIBILITY: maps data to payload', async () => {
    const factory = createServiceMethodFactory({
      service: 'TRANSFER',
      path: '/v2/tunnels',
      method: HTTP_METHODS.POST,
    });

    const method = factory.generate();

    await method({
      request: {
        data: { foo: 'bar' },
      },
    });

    expect(serviceRequest).toHaveBeenCalledWith(
      expect.objectContaining({ path: '/v2/tunnels', method: HTTP_METHODS.POST }),
      { payload: { foo: 'bar' } },
      undefined,
    );
  });

  it('should support options in payload', async () => {
    const factory = createServiceMethodFactory({
      path: '/v2/tunnels',
      method: HTTP_METHODS.GET,
      service: 'TRANSFER',
    });

    const method = factory.generate();

    await method({
      options: {
        fetch: {
          options: {
            priority: 'low',
          },
        },
      },
    });

    expect(serviceRequest).toHaveBeenCalledWith(
      expect.objectContaining({ path: '/v2/tunnels', method: HTTP_METHODS.GET }),
      { payload: undefined },
      { fetch: { options: { priority: 'low' } } },
    );
  });

  test('should throw if the path template is missing required parameters', async () => {
    const factory = createServiceMethodFactory({
      service: 'FLOWS',
      path: '/v2/flows/{flow_id}/runs/{run_id}',
      method: HTTP_METHODS.GET,
    });
    const method = factory.generate();
    let error;
    try {
      // @ts-expect-error This test is to ensure runtime error is thrown for missing parameters.
      await method({
        flow_id: 'flow123',
      });
    } catch (e) {
      error = e;
      expect(error).toEqual(
        new Error('Missing required parameters for path: /v2/flows/{flow_id}/runs/{run_id}'),
      );
    }
    expect(error).toBeDefined();
  });

  describe('Typescript Types', () => {
    /* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention */
    /**
     * Compile-time type equality check.
     * If the two type arguments are not identical the assignment will fail to compile.
     */
    type Expect<T extends true> = T;
    type Equal<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;
    test('method with segments requires all segments', async () => {
      const method = createServiceMethodFactory({
        service: 'FLOWS',
        path: '/v2/flows/{flow_id}/runs/{run_id}',
      }).generate();
      type MethodPayload = Parameters<typeof method>[0];
      type _AssertFlowId = Expect<Equal<MethodPayload['flow_id'], string>>;
      type _AssertRunId = Expect<Equal<MethodPayload['run_id'], string>>;
      expect(typeof method).toBe('function');
    });

    test('ensure generate() generic enforces payload and response type', async () => {
      type CustomPayload = {
        request: {
          query: {
            state: number;
          };
        };
      };
      const method = createServiceMethodFactory({
        service: 'FLOWS',
        path: '/v2/flows/{flow_id}',
      }).generate<CustomPayload, Response & { json: Promise<{ data: string }> }>();
      type MethodPayload = Parameters<typeof method>[0];
      type _AssertFlowId = Expect<Equal<MethodPayload['flow_id'], string>>;
      type _AssertCustomField = Expect<Equal<MethodPayload['request']['query']['state'], number>>;
      const result = await method({
        flow_id: 'flow123',
        request: {
          query: {
            state: 42,
          },
        },
      });
      type JSONResponse = Awaited<Awaited<ReturnType<typeof method>>['json']>;
      type _AssertResponseData = Expect<Equal<JSONResponse, { data: string }>>;
    });
    /* eslint-enable @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention */
  });
});

describe('createGCSServiceMethodFactory', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const gcsConfig = { host: 'https://abc.data.globus.org', endpoint_id: 'ep-uuid-123' };

  it('derives service and resource_server from the GCSConfiguration argument', async () => {
    const method = createGCSServiceMethodFactory({
      path: '/api/v1/collections',
      method: HTTP_METHODS.GET,
    }).generate();

    await method(gcsConfig);

    expect(serviceRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        service: gcsConfig,
        resource_server: gcsConfig.endpoint_id,
        path: '/api/v1/collections',
      }),
      { payload: undefined },
      undefined,
    );
  });

  it('resolves path segments from params (second argument), not from the configuration', async () => {
    const method = createGCSServiceMethodFactory({
      path: '/api/v1/collections/{collection_id}',
      method: HTTP_METHODS.GET,
    }).generate();

    await method(gcsConfig, { collection_id: 'col-abc' });

    expect(serviceRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        service: gcsConfig,
        resource_server: 'ep-uuid-123',
        path: '/api/v1/collections/col-abc',
      }),
      { payload: undefined },
      undefined,
    );
  });

  it('calls transform with params, not with the GCSConfiguration', async () => {
    const transform = jest.fn((payload) => ({
      ...payload,
      collection_id: 'transformed',
    }));

    const method = createGCSServiceMethodFactory({
      path: '/api/v1/collections/{collection_id}',
      method: HTTP_METHODS.PATCH,
      transform,
    }).generate();

    await method(gcsConfig, { collection_id: 'original' });

    expect(transform).toHaveBeenCalledWith({ collection_id: 'original' });
    expect(transform).not.toHaveBeenCalledWith(expect.objectContaining({ host: gcsConfig.host }));
    expect(serviceRequest).toHaveBeenCalledWith(
      expect.objectContaining({ path: '/api/v1/collections/transformed' }),
      { payload: undefined },
      undefined,
    );
  });

  it('should throw if the path template is missing required parameters', async () => {
    const method = createGCSServiceMethodFactory({
      path: '/api/v1/collections/{collection_id}/items/{item_id}',
      method: HTTP_METHODS.GET,
    }).generate();

    let error;
    try {
      // @ts-expect-error This test is to ensure runtime error is thrown for missing parameters.
      await method(gcsConfig, { collection_id: 'col-abc' });
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(
      new Error(
        'Missing required parameters for path: /api/v1/collections/{collection_id}/items/{item_id}',
      ),
    );
  });

  describe('TypeScript Types', () => {
    /* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention */
    type Expect<T extends true> = T;
    type Equal<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;

    test('configuration is always required as the first argument', () => {
      const method = createGCSServiceMethodFactory({
        path: '/api/v1/collections',
        method: HTTP_METHODS.GET,
      }).generate();
      type FirstArg = Parameters<typeof method>[0];
      type _AssertHost = Expect<Equal<FirstArg['host'], string>>;
      type _AssertEndpointId = Expect<Equal<FirstArg['endpoint_id'], string>>;
      expect(typeof method).toBe('function');
    });

    test('method with path segments requires params as the second argument', () => {
      const method = createGCSServiceMethodFactory({
        path: '/api/v1/collections/{collection_id}',
        method: HTTP_METHODS.GET,
      }).generate();
      type SecondArg = Parameters<typeof method>[1];
      type _AssertCollectionId = Expect<Equal<SecondArg['collection_id'], string>>;
      expect(typeof method).toBe('function');
    });
    /* eslint-enable @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention */
  });
});
