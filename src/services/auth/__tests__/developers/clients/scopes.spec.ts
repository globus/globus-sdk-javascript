import { developerResource } from '../../../index';

import { mirror } from '../../../../../__mocks__/handlers';

describe('client scopes', () => {
  test('get', async () => {
    const result = await developerResource.clients.scopes.get({
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
      await developerResource.clients.scopes.create('mock-client-id', {
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
});
