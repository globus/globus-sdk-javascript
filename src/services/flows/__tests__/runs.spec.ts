import { mirror } from '../../../__mocks__/handlers';
import { runs } from '..';

describe('flows.runs', () => {
  test('getAll', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await runs.getAll());
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('cancel', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await runs.cancel('run-id'));
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  describe('getLog', () => {
    test('basic', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(await runs.getLog('run-id'));
      expect({
        url,
        method,
        headers,
      }).toMatchSnapshot();
    });

    test('query', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(
        await runs.getLog('run-id', {
          query: {
            limit: 4,
            pagination_token: 'abc',
          },
        }),
      );
      expect({
        url,
        method,
        headers,
      }).toMatchSnapshot();
    });
  });
});
