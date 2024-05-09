import { serviceRequest } from '../shared';
import { mirror } from '../../../__mocks__/handlers';
import { setup } from '../../../__mocks__/localStorage';
import { AuthorizationManager } from '../../core/authorization/AuthorizationManager';

describe('serviceRequest', () => {
  afterEach(() => {
    delete process.env['GLOBUS_SDK_OPTIONS'];
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

    setup({
      'client_id:auth.globus.org': JSON.stringify(TOKEN),
      'client_id:transfer.api.globus.org': JSON.stringify({
        ...TOKEN,
        resource_server: 'transfer.api.globus.org',
      }),
    });

    const manager = new AuthorizationManager({
      client: 'client_id',
      redirect: 'https://redirect_uri',
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

    setup({
      'client_id:auth.globus.org': JSON.stringify(TOKEN),
      'client_id:transfer.api.globus.org': JSON.stringify({
        ...TOKEN,
        resource_server: 'transfer.api.globus.org',
      }),
    });

    const manager = new AuthorizationManager({
      client: 'client_id',
      redirect: 'https://redirect_uri',
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
});
