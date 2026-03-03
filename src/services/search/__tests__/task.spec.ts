import { task } from '..';
import { mirror } from '../../../__mocks__/handlers';

const INDEX_ID = '524de2f6-d1a6-4b49-9286-d8dccb4196ae';
const TASK_ID = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

describe('search – task', () => {
  test('get', async () => {
    const request = await task.get(TASK_ID);
    const {
      req: { url, method, headers },
    } = await mirror(request);
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('getAll', async () => {
    const request = await task.getAll(INDEX_ID);
    const {
      req: { url, method, headers },
    } = await mirror(request);
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  describe('next', () => {
    test('get', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(
        await task.next.get({
          task_id: TASK_ID,
        }),
      );
      expect({
        url,
        method,
        headers,
      }).toMatchSnapshot();
    });

    test('getAll', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(
        await task.next.getAll({
          index_id: INDEX_ID,
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
