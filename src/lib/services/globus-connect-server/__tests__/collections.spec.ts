import { createStorage } from '../../../core/storage';
import { collections } from '..';

import type { MirroredRequest } from '../../../../__mocks__/handlers';

const GCS_CONFIGURATION = {
  host: 'https://fa5e.bd7c.data.globus.org',
  endpoint_id: 'ac9cb54b-fc48-4824-b801-1388baf0a909',
};

describe('gcs – collection', () => {
  createStorage('memory');
  test('get', async () => {
    const result = await collections.get(
      GCS_CONFIGURATION,
      '5e70cb38-90b4-4939-b5b7-2f502363004bs',
      {
        query: {
          include: ['private_policies'],
        },
        headers: {
          Authorization: 'Bearer an-example-token',
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
          "authorization": "Bearer an-example-token",
          "connection": "close",
          "host": "fa5e.bd7c.data.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "method": "GET",
        "url": "https://fa5e.bd7c.data.globus.org/api/collections/5e70cb38-90b4-4939-b5b7-2f502363004bs?include=private_policies",
      }
    `);
  });

  test('getAll', async () => {
    const result = await collections.getAll(GCS_CONFIGURATION, {
      query: {
        include: ['private_policies'],
        mapped_collection_id: '2b6072ed-41d9-4082-83ea-c9ea6e00a107',
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
          "connection": "close",
          "host": "fa5e.bd7c.data.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "method": "GET",
        "url": "https://fa5e.bd7c.data.globus.org/api/collections?include=private_policies&mapped_collection_id=2b6072ed-41d9-4082-83ea-c9ea6e00a107",
      }
    `);
  });

  test('remove', async () => {
    const result = await collections.remove(GCS_CONFIGURATION, 'some-uuid');
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
        "url": "https://fa5e.bd7c.data.globus.org/api/collections/some-uuid",
      }
    `);
  });

  test('remove – with headers', async () => {
    const result = await collections.remove(GCS_CONFIGURATION, 'some-uuid', {
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
        "url": "https://fa5e.bd7c.data.globus.org/api/collections/some-uuid",
      }
    `);
  });

  test('create', async () => {
    const result = await collections.create(GCS_CONFIGURATION, {
      headers: {
        Authorization: 'Bearer an-example-token',
      },
      payload: {
        DATA_TYPE: 'collection#1.8.0',
        collection_base_path: '/',
        collection_type: 'guest',
        display_name: 'some name',
        mapped_collection_id: '476a00e0-0255-4397-91cb-87d054aa494a',
        public: true,
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
          "content-length": "188",
          "content-type": "application/json",
          "host": "fa5e.bd7c.data.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "json": {
          "DATA_TYPE": "collection#1.8.0",
          "collection_base_path": "/",
          "collection_type": "guest",
          "display_name": "some name",
          "mapped_collection_id": "476a00e0-0255-4397-91cb-87d054aa494a",
          "public": true,
        },
        "method": "POST",
        "url": "https://fa5e.bd7c.data.globus.org/api/collections",
      }
    `);
  });

  test('update', async () => {
    const result = await collections.update(GCS_CONFIGURATION, 'some-uuid', {
      headers: {
        Authorization: 'Bearer an-example-token',
      },
      payload: {
        DATA_TYPE: 'collection#1.8.0',
        collection_base_path: '/',
        collection_type: 'guest',
        display_name: 'some other name',
        mapped_collection_id: '476a00e0-0255-4397-91cb-87d054aa494a',
        public: true,
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
          "content-length": "194",
          "content-type": "application/json",
          "host": "fa5e.bd7c.data.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "json": {
          "DATA_TYPE": "collection#1.8.0",
          "collection_base_path": "/",
          "collection_type": "guest",
          "display_name": "some other name",
          "mapped_collection_id": "476a00e0-0255-4397-91cb-87d054aa494a",
          "public": true,
        },
        "method": "PUT",
        "url": "https://fa5e.bd7c.data.globus.org/api/collections/some-uuid",
      }
    `);
  });

  test('patch', async () => {
    const result = await collections.patch(GCS_CONFIGURATION, 'some-uuid', {
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
        "url": "https://fa5e.bd7c.data.globus.org/api/collections/some-uuid",
      }
    `);
  });

  test('updateOwnerString', async () => {
    const result = await collections.updateOwnerString(GCS_CONFIGURATION, 'some-uuid', {
      headers: {
        Authorization: 'Bearer an-example-token',
      },
      payload: {
        DATA_TYPE: 'owner_string#1.0.0',
        identity_id: 'some-identity-id',
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
          "content-length": "67",
          "content-type": "application/json",
          "host": "fa5e.bd7c.data.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "json": {
          "DATA_TYPE": "owner_string#1.0.0",
          "identity_id": "some-identity-id",
        },
        "method": "PUT",
        "url": "https://fa5e.bd7c.data.globus.org/api/collections/some-uuid/owner_string",
      }
    `);
  });

  test('resetOwnerString', async () => {
    const result = await collections.resetOwnerString(GCS_CONFIGURATION, 'some-uuid', {
      headers: {
        Authorization: 'Bearer an-example-token',
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
          "authorization": "Bearer an-example-token",
          "connection": "close",
          "host": "fa5e.bd7c.data.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "method": "DELETE",
        "url": "https://fa5e.bd7c.data.globus.org/api/collections/some-uuid/owner_string",
      }
    `);
  });
});
