import { access } from '../index';
import { createStorage } from '../../../core/storage';

import { mirror } from '../../../../__mocks__/handlers';

describe('task', () => {
  beforeEach(() => {
    createStorage('memory');
  });

  test('getAll', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await access.getAll('example-endpoint-id'));
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('get', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(
      await access.get({ endpoint_xid: 'example-task-id', id: 'example-access-rule-id' }),
    );
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
      await access.update(
        { endpoint_xid: 'example-task-id', id: 'example-access-rule-id' },
        {
          payload: {
            permissions: 'rw',
          },
        },
      ),
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
    } = await mirror(
      await access.remove({ endpoint_xid: 'example-task-id', id: 'example-access-rule-id' }),
    );
    expect({
      url,
      method,
      headers,
      json,
    }).toMatchSnapshot();
  });
});
