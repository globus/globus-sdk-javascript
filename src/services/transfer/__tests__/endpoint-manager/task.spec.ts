import { endpointManager } from '../../index';
import { mirror } from '../../../../__mocks__/handlers';

const { task } = endpointManager;

describe('endpointManager.task', () => {
  test('getAll', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await task.getAll());
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('get', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await task.get('example-task-id'));
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('cancel', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(
      await task.cancel({
        payload: {
          DATA_TYPE: 'admin_cancel',
          task_id_list: ['example-task-id'],
          message: 'a test message',
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

  test('getAdminCancel', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(await task.getAdminCancel('example-admin-cancel-id'));
    expect({
      url,
      method,
      headers,
      json,
    }).toMatchSnapshot();
  });

  test('getEventList', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(
      await task.getEventList('example-task-id', {
        query: {
          filter_is_error: 1,
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

  test('getSuccessfulTransfers', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(
      await task.getSuccessfulTransfers('example-task-id', {
        query: {
          marker: '1',
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

  test('getSkippedErrors', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(
      await task.getSkippedErrors('example-task-id', {
        query: {
          marker: '10',
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

  test('getPauseInfo', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(await task.getPauseInfo('example-task-id'));
    expect({
      url,
      method,
      headers,
      json,
    }).toMatchSnapshot();
  });

  test('pause', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(
      await task.pause({
        payload: {
          DATA_TYPE: 'admin_pause',
          message: 'a test message',
          task_id_list: ['example-task-id'],
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

  test('resume', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(await task.resume({ payload: { task_id_list: ['example-task-id'] } }));
    expect({
      url,
      method,
      headers,
      json,
    }).toMatchSnapshot();
  });

  describe('next', () => {
    test('getAll', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(await task.next.getAll());
      expect({ url, method, headers }).toMatchSnapshot();
    });

    test('get', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(await task.next.get({ task_id: 'example-task-id' }));
      expect({ url, method, headers }).toMatchSnapshot();
    });

    test('cancel', async () => {
      const {
        req: { url, method, headers, json },
      } = await mirror(
        await task.next.cancel({
          request: {
            data: {
              DATA_TYPE: 'admin_cancel',
              task_id_list: ['example-task-id'],
              message: 'a test message',
            },
          },
        }),
      );
      expect({ url, method, headers, json }).toMatchSnapshot();
    });

    test('getAdminCancel', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(
        await task.next.getAdminCancel({ admin_cancel_id: 'example-admin-cancel-id' }),
      );
      expect({ url, method, headers }).toMatchSnapshot();
    });

    test('getEventList', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(
        await task.next.getEventList({
          task_id: 'example-task-id',
          request: { query: { filter_is_error: 1 } },
        }),
      );
      expect({ url, method, headers }).toMatchSnapshot();
    });

    test('getSuccessfulTransfers', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(
        await task.next.getSuccessfulTransfers({
          task_id: 'example-task-id',
          request: { query: { marker: '1' } },
        }),
      );
      expect({ url, method, headers }).toMatchSnapshot();
    });

    test('getSkippedErrors', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(
        await task.next.getSkippedErrors({
          task_id: 'example-task-id',
          request: { query: { marker: '10' } },
        }),
      );
      expect({ url, method, headers }).toMatchSnapshot();
    });

    test('pause', async () => {
      const {
        req: { url, method, headers, json },
      } = await mirror(
        await task.next.pause({
          request: {
            data: {
              DATA_TYPE: 'admin_pause',
              message: 'a test message',
              task_id_list: ['example-task-id'],
            },
          },
        }),
      );
      expect({ url, method, headers, json }).toMatchSnapshot();
    });

    test('resume', async () => {
      const {
        req: { url, method, headers, json },
      } = await mirror(
        await task.next.resume({ request: { data: { task_id_list: ['example-task-id'] } } }),
      );
      expect({ url, method, headers, json }).toMatchSnapshot();
    });

    test('getPauseInfo', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(await task.next.getPauseInfo({ task_id: 'example-task-id' }));
      expect({ url, method, headers }).toMatchSnapshot();
    });
  });
});
