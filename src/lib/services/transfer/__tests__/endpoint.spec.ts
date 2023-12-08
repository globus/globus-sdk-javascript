import { createStorage } from '../../../core/storage';
import { endpoint } from '..';
import { mirror } from '../../../../__mocks__/handlers';

const ENDPOINT = 'c591c905-2674-4227-9d31-1ff9485945a7';

describe('endpoint', () => {
  beforeEach(() => {
    createStorage('memory');
  });

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
});
