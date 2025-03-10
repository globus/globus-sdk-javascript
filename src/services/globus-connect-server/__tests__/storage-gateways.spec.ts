import { storageGateways } from '..';

import type { MirroredRequest } from '../../../__mocks__/handlers';

const GCS_HOST = 'https://fa5e.bd7c.data.globus.org';
const GCS_CONFIGURATION = {
  host: GCS_HOST,
  endpoint_id: 'ac9cb54b-fc48-4824-b801-1388baf0a909',
};

describe('gcs – storageGateways', () => {
  test('getAll', async () => {
    const result = await storageGateways.getAll(GCS_CONFIGURATION, {
      query: { include: ['accounts', 'private_policies'] },
    });
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
        "url": "https://fa5e.bd7c.data.globus.org/api/storage_gateways?include=accounts%2Cprivate_policies",
      }
    `);
  });

  test('get', async () => {
    const result = await storageGateways.get(GCS_CONFIGURATION, 'some-uuid');
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
        "url": "https://fa5e.bd7c.data.globus.org/api/storage_gateways/some-uuid",
      }
    `);
  });

  test('remove', async () => {
    const result = await storageGateways.remove(GCS_CONFIGURATION, 'some-uuid', {
      headers: {
        Authorization: 'some-token',
      },
    });
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
        "url": "https://fa5e.bd7c.data.globus.org/api/storage_gateways/some-uuid",
      }
    `);
  });

  test('create', async () => {
    const result = await storageGateways.create(GCS_CONFIGURATION, {
      headers: {
        Authorization: 'Bearer an-example-token',
      },
      payload: {
        DATA_TYPE: 'storage_gateway#1.2.0',
        high_assurance: false,
        allowed_domains: ['example.com'],
        display_name: 'some name',
        connector_id: 'some-connector-id',
        admin_managed_credentials: false,
        require_mfa: false,
      },
    });
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
          "authorization": "Bearer an-example-token",
          "connection": "close",
          "content-length": "210",
          "content-type": "application/json",
          "host": "fa5e.bd7c.data.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "json": {
          "DATA_TYPE": "storage_gateway#1.2.0",
          "admin_managed_credentials": false,
          "allowed_domains": [
            "example.com",
          ],
          "connector_id": "some-connector-id",
          "display_name": "some name",
          "high_assurance": false,
          "require_mfa": false,
        },
        "method": "POST",
        "url": "https://fa5e.bd7c.data.globus.org/api/storage_gateways",
      }
    `);
  });

  test('update', async () => {
    const result = await storageGateways.update(GCS_CONFIGURATION, 'some-uuid', {
      headers: {
        Authorization: 'Bearer an-example-token',
      },
      payload: {
        DATA_TYPE: 'storage_gateway#1.2.0',
        allowed_domains: ['example.com'],
        connector_id: 'some-connector-id',
        display_name: 'some updated name',
        high_assurance: false,
        admin_managed_credentials: false,
        require_mfa: false,
      },
    });
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
          "authorization": "Bearer an-example-token",
          "connection": "close",
          "content-length": "218",
          "content-type": "application/json",
          "host": "fa5e.bd7c.data.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "json": {
          "DATA_TYPE": "storage_gateway#1.2.0",
          "admin_managed_credentials": false,
          "allowed_domains": [
            "example.com",
          ],
          "connector_id": "some-connector-id",
          "display_name": "some updated name",
          "high_assurance": false,
          "require_mfa": false,
        },
        "method": "PUT",
        "url": "https://fa5e.bd7c.data.globus.org/api/storage_gateways/some-uuid",
      }
    `);
  });

  test('patch', async () => {
    const result = await storageGateways.patch(GCS_CONFIGURATION, 'some-uuid', {
      headers: {
        Authorization: 'Bearer an-example-token',
      },
      payload: {
        display_name: 'some patched name',
      },
    });
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
          "authorization": "Bearer an-example-token",
          "connection": "close",
          "content-length": "36",
          "content-type": "application/json",
          "host": "fa5e.bd7c.data.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "json": {
          "display_name": "some patched name",
        },
        "method": "PATCH",
        "url": "https://fa5e.bd7c.data.globus.org/api/storage_gateways/some-uuid",
      }
    `);
  });
});
