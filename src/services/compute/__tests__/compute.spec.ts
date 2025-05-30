import { endpoints } from '../index';

import { mirror } from '../../../__mocks__/handlers';

describe('compute.endpoints', () => {
  test('getAll', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await endpoints.getAll());
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('get', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await endpoints.get('some-uuid'));
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('getStatus', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await endpoints.getStatus('some-uuid'));
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('update', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(
      await endpoints.update('some-uuid', {
        payload: {
          display_name: 'New Display Name',
        },
      }),
    );
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('delete', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await endpoints.remove('some-uuid'));
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });
});
