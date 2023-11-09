import { serviceRequest } from '../shared';
import { mirror } from '../../../__mocks__/handlers';

describe('serviceRequest', () => {
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
});
