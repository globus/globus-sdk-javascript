import { roles } from '..';

import type { MirroredRequest } from '../../../__mocks__/handlers';

const GCS_HOST = 'https://fa5e.bd7c.data.globus.org';

describe('gcs – roles', () => {
  test('getAll', async () => {
    const result = await roles.getAll(
      {
        host: GCS_HOST,
        endpoint_id: 'ac9cb54b-fc48-4824-b801-1388baf0a909',
      },
      {
        query: {
          include: ['all_roles'],
        },
      },
    );
    const {
      req: { url, method, headers },
    } = (await result.json()) as unknown as MirroredRequest;
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
        "url": "https://fa5e.bd7c.data.globus.org/api/roles?include=all_roles",
      }
    `);
  });

  test('get', async () => {
    const result = await roles.get(
      {
        host: GCS_HOST,
        endpoint_id: 'ac9cb54b-fc48-4824-b801-1388baf0a909',
      },
      'some-uuid',
    );
    const {
      req: { url, method, headers },
    } = (await result.json()) as unknown as MirroredRequest;
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
        "url": "https://fa5e.bd7c.data.globus.org/api/roles/some-uuid",
      }
    `);
  });

  test('remove', async () => {
    const result = await roles.remove(
      {
        host: GCS_HOST,
        endpoint_id: 'ac9cb54b-fc48-4824-b801-1388baf0a909',
      },
      'some-uuid',
    );
    const {
      req: { url, method, headers },
    } = (await result.json()) as unknown as MirroredRequest;
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
        "method": "DELETE",
        "url": "https://fa5e.bd7c.data.globus.org/api/roles/some-uuid",
      }
    `);
  });

  test('remove – with headers', async () => {
    const result = await roles.remove(
      {
        host: GCS_HOST,
        endpoint_id: 'ac9cb54b-fc48-4824-b801-1388baf0a909',
      },
      'some-uuid',
      {
        headers: {
          Authorization: 'some-token',
        },
      },
    );
    const {
      req: { url, method, headers },
    } = (await result.json()) as unknown as MirroredRequest;
    expect({
      url,
      method,
      headers,
    }).toMatchInlineSnapshot(`
      {
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip,deflate",
          "authorization": "some-token",
          "connection": "close",
          "host": "fa5e.bd7c.data.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "method": "DELETE",
        "url": "https://fa5e.bd7c.data.globus.org/api/roles/some-uuid",
      }
    `);
  });

  test('create', async () => {
    const result = await roles.create(
      {
        host: GCS_HOST,
        endpoint_id: 'ac9cb54b-fc48-4824-b801-1388baf0a909',
      },
      {
        payload: {
          DATA_TYPE: 'role#1.0.0',
          principal: 'urn:globus:auth:identity:dd7b1118-8fb0-4d92-9e28-7a3bc9cbfdf7',
          collection: '476a00e0-0255-4397-91cb-87d054aa494a',
          role: 'activity_manager',
        },
      },
    );
    const {
      req: { url, method, headers, json },
    } = (await result.json()) as unknown as MirroredRequest;
    expect({
      url,
      method,
      headers,
      json,
    }).toMatchInlineSnapshot(`
      {
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip,deflate",
          "connection": "close",
          "content-length": "180",
          "content-type": "application/json",
          "host": "fa5e.bd7c.data.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "json": {
          "DATA_TYPE": "role#1.0.0",
          "collection": "476a00e0-0255-4397-91cb-87d054aa494a",
          "principal": "urn:globus:auth:identity:dd7b1118-8fb0-4d92-9e28-7a3bc9cbfdf7",
          "role": "activity_manager",
        },
        "method": "POST",
        "url": "https://fa5e.bd7c.data.globus.org/api/roles",
      }
    `);
  });
});
