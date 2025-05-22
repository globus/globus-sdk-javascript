import { request } from '../index';
import { mirror } from '../__mocks__/handlers';

describe('request', () => {
  it('should be defined', () => {
    expect(request).toBeDefined();
  });

  it('should be a function', () => {
    expect(typeof request).toBe('function');
  });

  it('supports making requests to arbitrary service resources', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(
      await request({
        service: 'COMPUTE',
        path: '/some-resource',
      }),
    );
    expect({
      url,
      method,
      headers,
    }).toMatchInlineSnapshot(`
          {
            "headers": {
              "accept": "*/*",
              "accept-encoding": "gzip,deflate",
              "connection": "close",
              "host": "compute.api.globus.org",
              "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
            },
            "method": "GET",
            "url": "https://compute.api.globus.org/some-resource",
          }
        `);
  });

  it('supports query parameters', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(
      await request(
        {
          service: 'COMPUTE',
          path: '/some-resource',
        },
        {
          query: { foo: 'bar' },
        },
      ),
    );
    expect({
      url,
      method,
      headers,
    }).toMatchInlineSnapshot(`
          {
            "headers": {
              "accept": "*/*",
              "accept-encoding": "gzip,deflate",
              "connection": "close",
              "host": "compute.api.globus.org",
              "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
            },
            "method": "GET",
            "url": "https://compute.api.globus.org/some-resource?foo=bar",
          }
        `);
  });

  it('supports headers', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(
      await request(
        {
          service: 'COMPUTE',
          path: '/some-resource',
        },
        {
          query: { foo: 'bar' },
          headers: {
            Authorization: 'Bearer MY_ACCESS',
          },
        },
      ),
    );
    expect({
      url,
      method,
      headers,
    }).toMatchInlineSnapshot(`
          {
            "headers": {
              "accept": "*/*",
              "accept-encoding": "gzip,deflate",
              "authorization": "Bearer MY_ACCESS",
              "connection": "close",
              "host": "compute.api.globus.org",
              "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
            },
            "method": "GET",
            "url": "https://compute.api.globus.org/some-resource?foo=bar",
          }
        `);
  });
});
