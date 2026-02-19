import { developers } from '../../../index';

import { mirror } from '../../../../../__mocks__/handlers';

describe('client scopes', () => {
  test('get', async () => {
    const result = await developers.clients.scopes.get({
      client_id: 'mock-client-id',
      scope_id: 'mock-scope-id',
    });
    const {
      req: { url, method, headers },
    } = await mirror(result);

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
      await developers.clients.scopes.create('mock-client-id', {
        payload: {
          name: 'My New Scope',
          description: 'This is a scope',
          scope_suffix: 'some-suffix',
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

  describe('next', () => {
    test('get', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(
        await developers.clients.scopes.next.get({
          client_id: 'mock-client-id',
          scope_id: 'mock-scope-id',
        }),
      );
      expect({ url, method, headers }).toMatchSnapshot();
    });

    test('create', async () => {
      const {
        req: { url, method, headers, json },
      } = await mirror(
        await developers.clients.scopes.next.create({
          client_id: 'mock-client-id',
          request: {
            data: {
              name: 'My New Scope',
              description: 'This is a scope',
              scope_suffix: 'some-suffix',
            },
          },
        }),
      );
      expect({ url, method, headers, json }).toMatchSnapshot();
    });
  });
});
