import { roles } from '../index';
import { mirror } from '../../../__mocks__/handlers';

describe('roles', () => {
  test('getAll', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await roles.getAll('example-endpoint-id'));
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
      await roles.create('example-collection-id', {
        payload: {
          DATA_TYPE: 'role',
          principal_type: 'identity',
          principal: 'example-identity-id',
          role: 'activity_manager',
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
      await roles.get({ endpoint_id: 'example-endpoint-id', role_id: 'example-role-id' }),
    );
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('remove', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(
      await roles.remove({ collection_id: 'example-collection-id', role_id: 'example-role-id' }),
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
      } = await mirror(
        await roles.next.getAll({ endpoint_or_collection_id: 'example-endpoint-id' }),
      );
      expect({ url, method, headers }).toMatchSnapshot();
    });

    test('get', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(
        await roles.next.get({
          endpoint_or_collection_id: 'example-endpoint-id',
          role_id: 'example-role-id',
        }),
      );
      expect({ url, method, headers }).toMatchSnapshot();
    });

    test('create', async () => {
      const {
        req: { url, method, headers, json },
      } = await mirror(
        await roles.next.create({
          collection_id: 'example-collection-id',
          request: {
            data: {
              DATA_TYPE: 'role',
              principal_type: 'identity',
              principal: 'example-identity-id',
              role: 'activity_manager',
            },
          },
        }),
      );
      expect({ url, method, headers, json }).toMatchSnapshot();
    });

    test('remove', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(
        await roles.next.remove({
          collection_id: 'example-collection-id',
          role_id: 'example-role-id',
        }),
      );
      expect({ url, method, headers }).toMatchSnapshot();
    });
  });
});
