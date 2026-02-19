import { access } from '../index';
import { mirror } from '../../../__mocks__/handlers';

describe('access', () => {
  test('getAll', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await access.getAll('example-endpoint-id'));
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
      await access.create('example-endpoint-id', {
        payload: {
          path: '/',
          permissions: 'r',
          principal_type: 'anonymous',
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

  test('get', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(
      await access.get({ endpoint_xid: 'example-endpoint-id', id: 'example-access-rule-id' }),
    );
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('update', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(
      await access.update(
        { endpoint_xid: 'example-endpoint-id', id: 'example-access-rule-id' },
        {
          payload: {
            permissions: 'rw',
          },
        },
      ),
    );
    expect({
      url,
      method,
      headers,
      json,
    }).toMatchSnapshot();
  });

  test('remove', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(
      await access.remove({ endpoint_xid: 'example-endpoint-id', id: 'example-access-rule-id' }),
    );
    expect({
      url,
      method,
      headers,
      json,
    }).toMatchSnapshot();
  });

  describe('next', () => {
    test('getAll', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(await access.next.getAll({ collection_id: 'example-endpoint-id' }));
      expect({ url, method, headers }).toMatchSnapshot();
    });

    test('create', async () => {
      const {
        req: { url, method, headers, json },
      } = await mirror(
        await access.next.create({
          collection_id: 'example-endpoint-id',
          request: {
            data: { path: '/', permissions: 'r', principal_type: 'anonymous' },
          },
        }),
      );
      expect({ url, method, headers, json }).toMatchSnapshot();
    });

    test('get', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(
        await access.next.get({
          collection_id: 'example-endpoint-id',
          permission_id: 'example-access-rule-id',
        }),
      );
      expect({ url, method, headers }).toMatchSnapshot();
    });

    test('update', async () => {
      const {
        req: { url, method, headers, json },
      } = await mirror(
        await access.next.update({
          collection_id: 'example-endpoint-id',
          permission_id: 'example-access-rule-id',
          request: { data: { permissions: 'rw' } },
        }),
      );
      expect({ url, method, headers, json }).toMatchSnapshot();
    });

    test('remove', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(
        await access.next.remove({
          collection_id: 'example-endpoint-id',
          permission_id: 'example-access-rule-id',
        }),
      );
      expect({ url, method, headers }).toMatchSnapshot();
    });
  });
});
