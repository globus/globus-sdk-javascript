import { readdir } from 'node:fs/promises';

import { createStorage } from '../../../core/storage';
import { getClient } from '../client';
import { mirror } from '../../../../__mocks__/handlers';

const GCS_CONFIGURATION = {
  host: 'https://fa5e.bd7c.data.globus.org',
  endpoint_id: 'ac9cb54b-fc48-4824-b801-1388baf0a909',
};

/**
 * Basic string transformation to convert kebab-case to camelCase.
 */
function camelCase(str: string) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

describe('gcs client', () => {
  test('service methods', async () => {
    /**
     * Build an object of all of the expected service methods.
     */
    const expected: Record<string, string[]> = {};
    const serviceFiles = await readdir(`${__dirname}/../service`);
    await Promise.all(
      serviceFiles.map(async (file) => {
        const resource = await import(`${__dirname}/../service/${file}`);
        const resourceName = camelCase(file.split('.')[0]);
        /**
         * The resource name is appended to the method name to better identify
         * missing members in Jest assersions.
         */
        expected[resourceName] = Object.keys(resource).map((method) => `${resourceName}.${method}`);
      }),
    );
    /**
     * Create a client instance and compare the methods to the expected methods.
     */
    const client = getClient(GCS_CONFIGURATION);
    Object.keys(expected).forEach((resource) => {
      /**
       * The service is a member of the client.
       */
      expect(client).toHaveProperty(resource);
      /**
       * The methods are members of the service.
       */
      const methods = Object.keys(client[resource as keyof typeof client]).map(
        (method) => `${resource}.${method}`,
      );
      expect(methods).toEqual(expect.arrayContaining(expected[resource]));
    });
  });

  test('can be created WITHOUT storage', async () => {
    const client = getClient(GCS_CONFIGURATION);

    const result = await mirror(
      await client.endpoint.get(undefined, {
        fetch: {
          options: {
            headers: {
              Authorization: `Bearer SOME_TOKEN`,
            },
          },
        },
      }),
    );

    const {
      req: { url, method, headers },
    } = result;

    expect({
      url,
      method,
      headers,
    }).toMatchInlineSnapshot(`
      {
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip,deflate",
          "authorization": "Bearer SOME_TOKEN",
          "connection": "close",
          "host": "fa5e.bd7c.data.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "method": "GET",
        "url": "https://fa5e.bd7c.data.globus.org/api/endpoint",
      }
    `);

    const result2 = await mirror(
      await client.collections.get(
        'a-b-c-d',
        {
          query: {
            include: ['private_policies'],
          },
        },
        {
          fetch: {
            options: {
              headers: {
                Authorization: `Bearer SOME_OTHER_TOKEN`,
              },
            },
          },
        },
      ),
    );

    const {
      req: { url: url2, method: method2, headers: headers2 },
    } = result2;

    expect({
      url: url2,
      method: method2,
      headers: headers2,
    }).toMatchInlineSnapshot(`
      {
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip,deflate",
          "authorization": "Bearer SOME_OTHER_TOKEN",
          "connection": "close",
          "host": "fa5e.bd7c.data.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "method": "GET",
        "url": "https://fa5e.bd7c.data.globus.org/api/collections/a-b-c-d?include=private_policies",
      }
    `);
  });

  test('obtain client and call endpoint.get', async () => {
    createStorage('memory');
    const client = getClient(GCS_CONFIGURATION);
    const {
      req: { url, method, headers },
    } = await mirror(await client.endpoint.get());
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
          "host": "fa5e.bd7c.data.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "method": "GET",
        "url": "https://fa5e.bd7c.data.globus.org/api/endpoint",
      }
    `);
  });

  test('obtain client and call collections.get', async () => {
    createStorage('memory');
    const client = getClient(GCS_CONFIGURATION);
    const {
      req: { url, method, headers },
    } = await mirror(
      await client.collections.get('5e70cb38-90b4-4939-b5b7-2f502363004bs', {
        query: {
          include: ['private_policies'],
        },
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
          "host": "fa5e.bd7c.data.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "method": "GET",
        "url": "https://fa5e.bd7c.data.globus.org/api/collections/5e70cb38-90b4-4939-b5b7-2f502363004bs?include=private_policies",
      }
    `);
  });
});
