import { createStorage } from '../../../core/storage';
import { mirror } from '../../../../__mocks__/handlers';
import { flows } from '..';

describe('flows.flow', () => {
  beforeEach(() => {
    createStorage('memory');
  });

  test('getAll', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await flows.getAll());
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('getAll - with headers', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(
      await flows.getAll({
        headers: {
          Authorization: 'Bearer this-is-an-example-token',
        },
      }),
    );
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('getAll - with headers and fetch overriders', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(
      await flows.getAll(
        {
          headers: {
            Authorization: 'Bearer this-is-an-example-token',
          },
        },
        {
          fetch: {
            options: {
              headers: {
                'X-Test-Header': 'test',
              },
            },
          },
        },
      ),
    );

    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();

    expect(headers['authorization']).toEqual('Bearer this-is-an-example-token');
    expect(headers['x-test-header']).toEqual('test');
  });
});
