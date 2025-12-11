import { developers } from '../../index';

import { mirror } from '../../../../__mocks__/handlers';

describe('scopes', () => {
  test('get', async () => {
    const result = await developers.scopes.get('6521a0c3-ffc9-4432-9cb6-41fa8fe2e4e9');
    const {
      req: { url, method, headers },
    } = await mirror(result);

    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('getAll', async () => {
    const result = await developers.scopes.getAll();
    const {
      req: { url, method, headers },
    } = await mirror(result);

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
      await developers.scopes.update('6521a0c3-ffc9-4432-9cb6-41fa8fe2e4e9', {
        payload: {
          name: 'Updated Scope Name',
          description: 'new description',
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

  test('remove', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(await developers.scopes.remove('6521a0c3-ffc9-4432-9cb6-41fa8fe2e4e9'));
    expect({
      url,
      method,
      headers,
      json,
    }).toMatchSnapshot();
  });
});
