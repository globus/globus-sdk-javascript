import { createStorage } from '../../../core/storage';
import { mirror } from '../../../__mocks__/handlers';
import { nodes } from '..';

const GCS_HOST = 'https://fa5e.bd7c.data.globus.org';
const GCS_CONFIGURATION = {
  host: GCS_HOST,
  endpoint_id: 'ac9cb54b-fc48-4824-b801-1388baf0a909',
};

describe('gcs – nodes', () => {
  createStorage('memory');

  test('getAll', async () => {
    const result = await nodes.getAll(GCS_CONFIGURATION);
    const {
      req: { url, method, headers },
    } = await mirror(result);
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
        "url": "https://fa5e.bd7c.data.globus.org/api/nodes",
      }
    `);
  });

  test('get', async () => {
    const result = await nodes.get(GCS_CONFIGURATION, 'some-uuid');
    const {
      req: { url, method, headers },
    } = await mirror(result);
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
        "url": "https://fa5e.bd7c.data.globus.org/api/nodes/some-uuid",
      }
    `);
  });

  test('remove', async () => {
    const result = await nodes.remove(GCS_CONFIGURATION, 'some-uuid', {
      headers: {
        Authorization: 'some-token',
      },
    });
    const {
      req: { url, method, headers },
    } = await mirror(result);
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
        "url": "https://fa5e.bd7c.data.globus.org/api/nodes/some-uuid",
      }
    `);
  });

  test('create', async () => {
    const result = await nodes.create(GCS_CONFIGURATION, {
      headers: {
        Authorization: 'Bearer an-example-token',
      },
      payload: {
        DATA_TYPE: 'node#1.2.0',
        ip_addresses: ['1.1.1.1'],
        status: 'inactive',
      },
    });
    const {
      req: { url, method, headers, json },
    } = await mirror(result);
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
          "authorization": "Bearer an-example-token",
          "connection": "close",
          "content-length": "73",
          "content-type": "application/json",
          "host": "fa5e.bd7c.data.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "json": {
          "DATA_TYPE": "node#1.2.0",
          "ip_addresses": [
            "1.1.1.1",
          ],
          "status": "inactive",
        },
        "method": "POST",
        "url": "https://fa5e.bd7c.data.globus.org/api/nodes",
      }
    `);
  });

  test('update', async () => {
    const result = await nodes.update(GCS_CONFIGURATION, 'some-uuid', {
      headers: {
        Authorization: 'Bearer an-example-token',
      },
      payload: {
        DATA_TYPE: 'node#1.2.0',
        ip_addresses: ['1.1.1.1'],
        status: 'active',
      },
    });
    const {
      req: { url, method, headers, json },
    } = await mirror(result);
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
          "authorization": "Bearer an-example-token",
          "connection": "close",
          "content-length": "71",
          "content-type": "application/json",
          "host": "fa5e.bd7c.data.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "json": {
          "DATA_TYPE": "node#1.2.0",
          "ip_addresses": [
            "1.1.1.1",
          ],
          "status": "active",
        },
        "method": "PUT",
        "url": "https://fa5e.bd7c.data.globus.org/api/nodes/some-uuid",
      }
    `);
  });

  test('patch', async () => {
    const result = await nodes.patch(GCS_CONFIGURATION, 'some-uuid', {
      headers: {
        Authorization: 'Bearer an-example-token',
      },
      payload: {
        status: 'inactive',
      },
    });
    const {
      req: { url, method, headers, json },
    } = await mirror(result);
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
          "authorization": "Bearer an-example-token",
          "connection": "close",
          "content-length": "21",
          "content-type": "application/json",
          "host": "fa5e.bd7c.data.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "json": {
          "status": "inactive",
        },
        "method": "PATCH",
        "url": "https://fa5e.bd7c.data.globus.org/api/nodes/some-uuid",
      }
    `);
  });
});
