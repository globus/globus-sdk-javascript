import { createStorage } from '../../../core/storage';
import { mirror } from '../../../../__mocks__/handlers';
import { runs } from '..';

describe('flows.runs', () => {
  beforeEach(() => {
    createStorage('memory');
  });

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
});
