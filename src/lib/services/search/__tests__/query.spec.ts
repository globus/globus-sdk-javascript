import { createStorage } from '../../../core/storage';
import { query } from '..';

import { MirroredRequest, mirror } from '../../../../__mocks__/handlers';

describe('search – query', () => {
  test('get', async () => {
    createStorage('memory');
    const result = await query.get('524de2f6-d1a6-4b49-9286-d8dccb4196ae', {
      query: {
        q: 'test',
      },
    });
    const {
      req: { url, method, headers },
    } = (await result.json()) as MirroredRequest;
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
          "host": "search.api.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "method": "GET",
        "url": "https://search.api.globus.org/v1/index/524de2f6-d1a6-4b49-9286-d8dccb4196ae/search?q=test",
      }
    `);
  });

  /**
   * @see https://github.com/globus/globus-sdk-javascript/issues/76
   */
  test('allows get without Authorization header', async () => {
    expect(() => {
      query.get('foobar', {
        query: {
          q: 'test',
        },
      });
    }).not.toThrow();
    const {
      req: { url, method, headers },
    } = await mirror(
      await query.get('524de2f6-d1a6-4b49-9286-d8dccb4196ae', {
        query: {
          q: 'hello+world',
        },
      }),
    );
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('post', async () => {
    createStorage('memory');
    const result = await query.post('524de2f6-d1a6-4b49-9286-d8dccb4196ae', {
      payload: { q: 'test' },
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
          "connection": "close",
          "content-length": "12",
          "content-type": "application/json",
          "host": "search.api.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "json": {
          "q": "test",
        },
        "method": "POST",
        "url": "https://search.api.globus.org/v1/index/524de2f6-d1a6-4b49-9286-d8dccb4196ae/search",
      }
    `);
  });
});
