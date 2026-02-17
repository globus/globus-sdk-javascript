import { endpoint } from '..';
import { mirror } from '../../../__mocks__/handlers';

const ENDPOINT = 'c591c905-2674-4227-9d31-1ff9485945a7';

describe('endpoint', () => {
  test('get', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await endpoint.get(ENDPOINT));
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('create', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(
      await endpoint.create({
        payload: {
          display_name: 'my GCP guest collection',
          host_endpoint_id: ENDPOINT,
          host_path: '/',
        },
      }),
    );
    expect({
      url,
      method,
      headers,
      json,
    }).toMatchSnapshot();
  });

  test('update', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(
      await endpoint.update(ENDPOINT, {
        payload: {
          description: 'This is my GCP collection.',
        },
      }),
    );
    expect({
      url,
      method,
      headers,
      json,
    }).toMatchSnapshot();
  });

  test('delete', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await endpoint.remove(ENDPOINT));
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  describe('next', () => {
    test('get', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(await endpoint.next.get({ endpoint_xid: ENDPOINT }));
      expect({
        url,
        method,
        headers,
      }).toMatchSnapshot();
    });

    test('create', async () => {
      const {
        req: { url, method, headers, json },
      } = await mirror(
        await endpoint.next.create({
          request: {
            data: {
              display_name: 'my GCP guest collection',
              host_endpoint_id: ENDPOINT,
              host_path: '/',
            },
          },
        }),
      );
      expect({
        url,
        method,
        headers,
        json,
      }).toMatchSnapshot();
    });

    test('update', async () => {
      const {
        req: { url, method, headers, json },
      } = await mirror(
        await endpoint.next.update({
          endpoint_xid: ENDPOINT,
          request: {
            data: {
              description: 'This is my GCP collection.',
            },
          },
        }),
      );
      expect({
        url,
        method,
        headers,
        json,
      }).toMatchSnapshot();
    });

    test('delete', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(await endpoint.next.remove({ endpoint_xid: ENDPOINT }));
      expect({
        url,
        method,
        headers,
      }).toMatchSnapshot();
    });
  });
});
