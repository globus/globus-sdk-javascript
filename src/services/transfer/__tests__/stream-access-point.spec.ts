import { streamAccessPoint } from '..';
import { mirror } from '../../../__mocks__/handlers';

describe('streamAccessPoint', () => {
  test('getAll', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(
      await streamAccessPoint.getAll({
        query: { 'filter[endpoint_admin]': true, 'filter[fulltext]': 'example' },
      }),
    );
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('get', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await streamAccessPoint.get('example-stream-access-point-id'));
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });
});
