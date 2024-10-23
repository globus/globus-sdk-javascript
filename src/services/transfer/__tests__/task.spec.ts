import { task } from '../index';

import { mirror } from '../../../__mocks__/handlers';

describe('task', () => {
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

  test('update', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(
      await task.update('example-task-id', {
        payload: {
          label: 'A new label.',
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

  test('cancel', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(await task.cancel('example-task-id'));
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
    } = await mirror(await task.remove('example-task-id'));
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
          filters: 'iserror:1',
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
});
