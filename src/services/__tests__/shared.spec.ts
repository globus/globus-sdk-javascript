import { HttpResponse, http } from 'msw';
import { serviceRequest } from '../shared';
import { mirror } from '../../__mocks__/handlers';
import server from '../../__mocks__/server';
import { AuthorizationManager } from '../../core/authorization/AuthorizationManager';
import { getScopes } from '../globus-connect-server';
import { enable } from '../../core/info/private';
import pkg from '../../../package.json';
import { mockLocalStorage, setInitialLocalStorageState } from '../../__mocks__/localStorage';

describe.only('serviceRequest', () => {
  beforeEach(() => {
    mockLocalStorage();
  });

  afterEach(() => {
    delete process.env['GLOBUS_SDK_OPTIONS'];
    jest.restoreAllMocks();
  });

  it('generates a service request', async () => {
    const request = await serviceRequest(
      {
        service: 'AUTH',
        scope: 'a:required:scope',
        path: '/some-path',
      },
      {
        query: {
          foo: 'bar',
        },
      },
      {
        environment: 'test',
        fetch: {
          options: {
            headers: {
              Authorization: 'Bearer example-token',
            },
          },
        },
      },
    );

    const {
      req: { url, method, headers },
    } = await mirror(request);

    expect({
      url,
      method,
      headers,
    }).toMatchInlineSnapshot(`
      {
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip,deflate",
          "authorization": "Bearer example-token",
          "connection": "close",
          "host": "auth.test.globuscs.info",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "method": "GET",
        "url": "https://auth.test.globuscs.info/some-path?foo=bar",
      }
    `);
  });

  it('merges passed SDKOptions with (global) GLOBUS_SDK_OPTIONS', async () => {
    process.env['GLOBUS_SDK_OPTIONS'] = JSON.stringify({
      fetch: {
        options: {
          headers: {
            'User-Agent': 'globus-sdk',
          },
        },
      },
    });

    const request = await serviceRequest(
      {
        service: 'AUTH',
        scope: 'a:required:scope',
        path: '/some-path',
      },
      {
        query: {
          foo: 'bar',
        },
      },
      {
        environment: 'test',
        fetch: {
          options: {
            headers: {
              Authorization: 'Bearer example-token',
            },
          },
        },
      },
    );

    const {
      req: { url, method, headers },
    } = await mirror(request);

    expect({
      url,
      method,
      headers,
    }).toMatchInlineSnapshot(`
      {
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip,deflate",
          "authorization": "Bearer example-token",
          "connection": "close",
          "host": "auth.test.globuscs.info",
          "user-agent": "globus-sdk",
        },
        "method": "GET",
        "url": "https://auth.test.globuscs.info/some-path?foo=bar",
      }
    `);
  });

  it('uses (global) GLOBUS_SDK_OPTIONS', async () => {
    process.env['GLOBUS_SDK_OPTIONS'] = JSON.stringify({
      environment: 'test',
      fetch: {
        options: {
          headers: {
            'User-Agent': 'globus-sdk',
            Authorization: 'Bearer APPLICATION_TOKEN',
          },
        },
      },
    });

    const request = await serviceRequest({
      service: 'AUTH',
      scope: 'a:required:scope',
      path: '/some-path',
    });

    const {
      req: { url, method, headers },
    } = await mirror(request);

    expect({
      url,
      method,
      headers,
    }).toMatchInlineSnapshot(`
      {
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip,deflate",
          "authorization": "Bearer APPLICATION_TOKEN",
          "connection": "close",
          "host": "auth.test.globuscs.info",
          "user-agent": "globus-sdk",
        },
        "method": "GET",
        "url": "https://auth.test.globuscs.info/some-path",
      }
    `);
  });

  it('supports fetch.options.__callable', async () => {
    const fetch = jest.fn().mockResolvedValue({});

    const request = await serviceRequest(
      {
        service: 'AUTH',
        scope: 'a:required:scope',
        path: '/some-path',
      },
      {
        query: {
          foo: 'bar',
        },
      },
      {
        environment: 'test',
        fetch: {
          options: {
            __callable: fetch,
            headers: {
              Authorization: 'Bearer example-token',
            },
          },
        },
      },
    );

    await request;

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith('https://auth.test.globuscs.info/some-path?foo=bar', {
      body: undefined,
      headers: {
        Authorization: 'Bearer example-token',
      },
      method: undefined,
    });
  });

  it('reads tokens from manager instance when `scope` is configured', async () => {
    const TOKEN = {
      access_token: 'access-token',
      scope: 'profile email openid',
      expires_in: 172800,
      token_type: 'Bearer',
      resource_server: 'auth.globus.org',
      refresh_token: 'refresh-token',
      other_tokens: [],
    };

    setInitialLocalStorageState({
      'client_id:auth.globus.org': JSON.stringify(TOKEN),
      'client_id:transfer.api.globus.org': JSON.stringify({
        ...TOKEN,
        resource_server: 'transfer.api.globus.org',
      }),
    });

    const manager = new AuthorizationManager({
      client: 'client_id',
      redirect: 'https://redirect_uri',
      storage: localStorage,
    });

    const request = await serviceRequest(
      {
        service: 'TRANSFER',
        scope: 'some:required:scope',
        path: '/some-path',
      },
      {
        query: {
          foo: 'bar',
        },
      },
      {
        manager,
      },
    );

    const {
      req: { headers },
    } = await mirror(request);

    expect(headers['authorization']).toEqual(`Bearer ${TOKEN.access_token}`);
  });

  it('reads tokens from manager instance when `resource_server` is configured', async () => {
    const TOKEN = {
      access_token: 'access-token',
      scope: 'profile email openid',
      expires_in: 172800,
      token_type: 'Bearer',
      resource_server: 'auth.globus.org',
      refresh_token: 'refresh-token',
      other_tokens: [],
    };

    setInitialLocalStorageState({
      'client_id:auth.globus.org': JSON.stringify(TOKEN),
      'client_id:transfer.api.globus.org': JSON.stringify({
        ...TOKEN,
        resource_server: 'transfer.api.globus.org',
      }),
    });

    const manager = new AuthorizationManager({
      client: 'client_id',
      redirect: 'https://redirect_uri',
      storage: localStorage,
    });

    /**
     * Create a request that configures the resource_server.
     */
    const request = await serviceRequest(
      {
        service: 'TRANSFER',
        resource_server: 'transfer.api.globus.org',
        path: '/some-path',
      },
      {
        query: {
          foo: 'bar',
        },
      },
      {
        manager,
      },
    );

    const {
      req: { headers },
    } = await mirror(request);

    expect(headers['authorization']).toEqual(`Bearer ${TOKEN.access_token}`);
  });

  it('reads tokens from manager instance for GCS', async () => {
    const GCS_CONFIGURATION = {
      host: 'https://fa5e.bd7c.data.globus.org',
      endpoint_id: 'ac9cb54b-fc48-4824-b801-1388baf0a909',
    };

    const TOKEN = {
      access_token: 'access-token',
      scope: 'profile email openid',
      expires_in: 172800,
      token_type: 'Bearer',
      resource_server: 'auth.globus.org',
      refresh_token: 'refresh-token',
    };

    setInitialLocalStorageState({
      'client_id:auth.globus.org': JSON.stringify({
        ...TOKEN,
        other_tokens: [],
      }),
      [`client_id:${GCS_CONFIGURATION.endpoint_id}`]: JSON.stringify({
        ...TOKEN,
        scope: getScopes(GCS_CONFIGURATION, 'HIGH_ASSURANCE'),
        resource_server: GCS_CONFIGURATION.endpoint_id,
      }),
    });

    const manager = new AuthorizationManager({
      client: 'client_id',
      redirect: 'https://redirect_uri',
      storage: localStorage,
    });

    /**
     * Create a request that configures the resource_server.
     */
    const request = await serviceRequest(
      {
        service: GCS_CONFIGURATION,
        resource_server: GCS_CONFIGURATION.endpoint_id,
        path: '/some-path',
      },
      {
        query: {
          foo: 'bar',
        },
      },
      {
        manager,
      },
    );

    const {
      req: { headers },
    } = await mirror(request);

    expect(headers['authorization']).toEqual(`Bearer ${TOKEN.access_token}`);
  });

  it('includes X-Globus-Client-Info header', async () => {
    // Enable the `X-Globus-Client-Info` header for this test.
    enable();

    const request = await serviceRequest(
      {
        service: 'AUTH',
        scope: 'a:required:scope',
        path: '/some-path',
      },
      {
        query: {
          foo: 'bar',
        },
      },
      {
        environment: 'test',
        fetch: {
          options: {
            headers: {
              Authorization: 'Bearer example-token',
            },
          },
        },
      },
    );

    const {
      req: { headers },
    } = await mirror(request);

    expect(headers).toMatchObject({
      'x-globus-client-info': `product=javascript-sdk,version=${pkg.version}`,
    });
  });

  describe('automatic retries', () => {
    let manager: AuthorizationManager;

    const TOKEN = {
      access_token: 'access-token',
      scope: 'profile email openid',
      expires_in: 172800,
      token_type: 'Bearer',
      resource_server: 'auth.globus.org',
      refresh_token: 'refresh-token',
      other_tokens: [],
    };

    const TRANSFER_TOKEN = {
      ...TOKEN,
      resource_server: 'transfer.api.globus.org',
    };

    beforeEach(() => {
      mockLocalStorage({
        'client_id:auth.globus.org': JSON.stringify(TOKEN),
        'client_id:transfer.api.globus.org': JSON.stringify(TRANSFER_TOKEN),
      });

      manager = new AuthorizationManager({
        client: 'client_id',
        redirect: 'https://redirect_uri',
        storage: localStorage,
      });
    });

    it('does not retry when an `AuthorizationRequirementsError` is encountered', async () => {
      const spy = jest.spyOn(manager, 'refreshToken');
      server.use(
        http.get('https://transfer.api.globusonline.org/fake-resource', () =>
          HttpResponse.json(
            {
              authorization_parameters: {},
            },
            { status: 401 },
          ),
        ),
      );
      const response = await serviceRequest(
        {
          service: 'TRANSFER',
          scope: 'some:required:scope',
          path: '/fake-resource',
        },
        {},
        { manager },
      );
      expect(response.status).toEqual(401);
      expect(spy).not.toHaveBeenCalled();
    });

    it('does not retry a request that is configured to prevent retries', async () => {
      const spy = jest.spyOn(manager, 'refreshToken');
      server.use(
        http.get('https://transfer.api.globusonline.org/fake-resource', () =>
          HttpResponse.json({}, { status: 401 }),
        ),
      );
      const response = await serviceRequest(
        {
          service: 'TRANSFER',
          scope: 'some:required:scope',
          path: '/fake-resource',
          preventRetry: true,
        },
        {},
        { manager },
      );
      expect(response.status).toEqual(401);
      expect(spy).not.toHaveBeenCalled();
    });

    it('does not retry a request that is "ok"', async () => {
      const spy = jest.spyOn(manager, 'refreshToken');
      const response = await serviceRequest(
        {
          service: 'TRANSFER',
          scope: 'some:required:scope',
          path: '/fake-resource',
        },
        {},
        { manager },
      );
      expect(response.status).toEqual(200);
      expect(spy).not.toHaveBeenCalled();
    });

    it('does not retry a request that is not "ok", but not a 401', async () => {
      const spy = jest.spyOn(manager, 'refreshToken');
      server.use(
        http.get('https://transfer.api.globusonline.org/fake-resource', () =>
          HttpResponse.json({}, { status: 500 }),
        ),
      );
      const response = await serviceRequest(
        {
          service: 'TRANSFER',
          scope: 'some:required:scope',
          path: '/fake-resource',
        },
        {},
        { manager },
      );
      expect(response.status).toEqual(500);
      expect(spy).not.toHaveBeenCalled();
    });

    it('attempts to refresh a token when a 401 is encountered', async () => {
      server.use(
        /**
         * The first request will return a 401, which should trigger a token refresh.
         */
        http.get(
          'https://transfer.api.globusonline.org/fake-resource',
          () =>
            HttpResponse.json(
              {
                code: 'AuthenticationFailed',
                message: 'Token is not active',
                request_id: 'UhP7t1wh2',
                resource: '/fake-resource',
              },
              {
                status: 401,
              },
            ),
          { once: true },
        ),
        /**
         * Return a token refresh response, with a new access token we can assert
         * for on the second request...
         */
        http.post('https://auth.globus.org/v2/oauth2/token', () =>
          HttpResponse.json({
            ...TRANSFER_TOKEN,
            access_token: 'refreshed-access-token',
          }),
        ),
      );

      const response = await serviceRequest(
        {
          service: 'TRANSFER',
          scope: 'some:required:scope',
          path: '/fake-resource',
        },
        {},
        { manager },
      );
      /**
       * The returned response should just be the mirrored `/fake-resource` request,
       * with the new token swapped out in the background.
       */
      expect(response.status).toEqual(200);
      const {
        req: { headers },
      } = await response.json();
      expect(headers).toMatchObject({
        authorization: 'Bearer refreshed-access-token',
      });
    });

    it('returns the initial response when refresh fails', async () => {
      server.use(
        http.get(
          'https://transfer.api.globusonline.org/fake-resource',
          () =>
            HttpResponse.json(
              {
                code: 'AuthenticationFailed',
                message: 'Token is not active',
                request_id: '1',
                resource: '/fake-resource',
              },
              {
                status: 401,
              },
            ),
          { once: true },
        ),
        http.post('https://auth.globus.org/v2/oauth2/token', () =>
          HttpResponse.json(
            { error: 'invalid_grant' },
            {
              status: 401,
            },
          ),
        ),
        http.get('https://transfer.api.globusonline.org/fake-resource', () =>
          HttpResponse.json(null, {
            status: 500,
          }),
        ),
      );

      const response = await serviceRequest(
        {
          service: 'TRANSFER',
          scope: 'some:required:scope',
          path: '/fake-resource',
        },
        {},
        { manager },
      );
      expect(response.status).toEqual(401);
      expect(await response.json()).toMatchObject({
        request_id: '1',
      });
    });
  });
});
