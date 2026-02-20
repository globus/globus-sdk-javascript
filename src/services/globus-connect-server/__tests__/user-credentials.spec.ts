import { userCredentials } from '..';

import { mirror } from '../../../__mocks__/handlers';
import type { MirroredRequest } from '../../../__mocks__/handlers';

const GCS_HOST = 'https://fa5e.bd7c.data.globus.org';
const GCS_CONFIGURATION = {
  host: GCS_HOST,
  endpoint_id: 'ac9cb54b-fc48-4824-b801-1388baf0a909',
};

describe('gcs – user-credentials', () => {
  test('getAll', async () => {
    const result = await userCredentials.getAll(GCS_CONFIGURATION, {
      query: {
        include: ['all'],
        storage_gateway: 'some-gateway-uuid',
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
        "url": "https://fa5e.bd7c.data.globus.org/api/user_credentials?include=all&storage_gateway=some-gateway-uuid",
      }
    `);
  });

  test('get', async () => {
    const result = await userCredentials.get(GCS_CONFIGURATION, 'some-uuid');
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
        "url": "https://fa5e.bd7c.data.globus.org/api/user_credentials/some-uuid",
      }
    `);
  });

  test('remove', async () => {
    const result = await userCredentials.remove(GCS_CONFIGURATION, 'some-uuid', {
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
        "url": "https://fa5e.bd7c.data.globus.org/api/user_credentials/some-uuid",
      }
    `);
  });

  test('create', async () => {
    const result = await userCredentials.create(GCS_CONFIGURATION, {
      headers: {
        Authorization: 'Bearer an-example-token',
      },
      payload: {
        DATA_TYPE: 'user_credential#1.0.0',
        storage_gateway_id: 'some-gateway-uuid',
        identity_id: 'some-identity-uuid',
        username: 'some name',
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
          "content-length": "136",
          "content-type": "application/json",
          "host": "fa5e.bd7c.data.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "json": {
          "DATA_TYPE": "user_credential#1.0.0",
          "identity_id": "some-identity-uuid",
          "storage_gateway_id": "some-gateway-uuid",
          "username": "some name",
        },
        "method": "POST",
        "url": "https://fa5e.bd7c.data.globus.org/api/user_credentials",
      }
    `);
  });

  test('update', async () => {
    const result = await userCredentials.update(GCS_CONFIGURATION, 'some-uuid', {
      headers: {
        Authorization: 'Bearer an-example-token',
      },
      payload: {
        DATA_TYPE: 'user_credential#1.0.0',
        identity_id: 'some-identity-uuid',
        storage_gateway_id: 'some-gateway-uuid',
        username: 'some other name',
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
          "content-length": "142",
          "content-type": "application/json",
          "host": "fa5e.bd7c.data.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "json": {
          "DATA_TYPE": "user_credential#1.0.0",
          "identity_id": "some-identity-uuid",
          "storage_gateway_id": "some-gateway-uuid",
          "username": "some other name",
        },
        "method": "PUT",
        "url": "https://fa5e.bd7c.data.globus.org/api/user_credentials/some-uuid",
      }
    `);
  });

  test('patch', async () => {
    const result = await userCredentials.patch(GCS_CONFIGURATION, 'some-uuid', {
      headers: {
        Authorization: 'Bearer an-example-token',
      },
      payload: {
        username: 'some patched name',
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
          "content-length": "32",
          "content-type": "application/json",
          "host": "fa5e.bd7c.data.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "json": {
          "username": "some patched name",
        },
        "method": "PATCH",
        "url": "https://fa5e.bd7c.data.globus.org/api/user_credentials/some-uuid",
      }
    `);
  });

  describe('next', () => {
    test('getAll', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(await userCredentials.next.getAll(GCS_CONFIGURATION));
      expect({ url, method, headers }).toMatchSnapshot();
    });

    test('get', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(
        await userCredentials.next.get(GCS_CONFIGURATION, { user_credential_id: 'some-uuid' }),
      );
      expect({ url, method, headers }).toMatchSnapshot();
    });

    test('create', async () => {
      const {
        req: { url, method, headers, json },
      } = await mirror(
        await userCredentials.next.create(GCS_CONFIGURATION, {
          request: {
            data: {
              DATA_TYPE: 'user_credential#1.0.0',
              storage_gateway_id: 'some-gateway-uuid',
              identity_id: 'some-identity-uuid',
              username: 'some name',
            },
          },
        }),
      );
      expect({ url, method, headers, json }).toMatchSnapshot();
    });

    test('update', async () => {
      const {
        req: { url, method, headers, json },
      } = await mirror(
        await userCredentials.next.update(GCS_CONFIGURATION, {
          user_credential_id: 'some-uuid',
          request: {
            data: {
              DATA_TYPE: 'user_credential#1.0.0',
              identity_id: 'some-identity-uuid',
              storage_gateway_id: 'some-gateway-uuid',
              username: 'some other name',
            },
          },
        }),
      );
      expect({ url, method, headers, json }).toMatchSnapshot();
    });

    test('patch', async () => {
      const {
        req: { url, method, headers, json },
      } = await mirror(
        await userCredentials.next.patch(GCS_CONFIGURATION, {
          user_credential_id: 'some-uuid',
          request: { data: { username: 'some patched name' } },
        }),
      );
      expect({ url, method, headers, json }).toMatchSnapshot();
    });

    test('remove', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(
        await userCredentials.next.remove(GCS_CONFIGURATION, { user_credential_id: 'some-uuid' }),
      );
      expect({ url, method, headers }).toMatchSnapshot();
    });
  });
});
