import { createStorage } from '../../../core/storage';
import { mirror } from '../../../../__mocks__/handlers';
import { https } from '..';

const GCS_CONFIGURATION = {
  host: 'https://fa5e.bd7c.data.globus.org',
  endpoint_id: 'ac9cb54b-fc48-4824-b801-1388baf0a909',
};

describe('gcs – https', () => {
  createStorage('memory');
  test('get', async () => {
    const request = await https.get(GCS_CONFIGURATION, '/my-file.txt', {
      headers: {
        Authorization: 'Bearer an-example-token',
      },
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
          "authorization": "Bearer an-example-token",
          "connection": "close",
          "host": "fa5e.bd7c.data.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "method": "GET",
        "url": "https://fa5e.bd7c.data.globus.org/my-file.txt",
      }
    `);
  });

  test('remove', async () => {
    const request = await https.remove(GCS_CONFIGURATION, '/my-file.txt');
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
          "connection": "close",
          "host": "fa5e.bd7c.data.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "method": "DELETE",
        "url": "https://fa5e.bd7c.data.globus.org/my-file.txt",
      }
    `);
  });

  test('update', async () => {
    const request = await https.update(
      GCS_CONFIGURATION,
      '/my-file.txt',
      {
        headers: {
          Authorization: 'Bearer an-example-token',
        },
      },
      {
        fetch: {
          options: {
            body: 'hello world',
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
          "authorization": "Bearer an-example-token",
          "connection": "close",
          "content-length": "11",
          "content-type": "text/plain;charset=UTF-8",
          "host": "fa5e.bd7c.data.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "method": "PUT",
        "url": "https://fa5e.bd7c.data.globus.org/my-file.txt",
      }
    `);
  });
});
