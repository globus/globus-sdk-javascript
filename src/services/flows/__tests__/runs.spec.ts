import { mirror } from '../../../__mocks__/handlers';
import { runs } from '..';

const RUN_ID = 'run-id';

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

  test('get', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await runs.get('run-id'));
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

  test('update', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(
      await runs.update('run-id', {
        payload: {
          label: 'abc',
          run_managers: ['urn:globus:auth:identity:uuid'],
          run_monitors: ['urn:globus:auth:identity:uuid'],
          tags: ['tag1', 'tag2'],
        },
      }),
    );
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('remove', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await runs.remove('run-id'));
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('getDefinition', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await runs.getDefinition('run-id'));
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });
});

describe('next', () => {
  test('getAll', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await runs.next.getAll());
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('get', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await runs.next.get({ run_id: RUN_ID }));
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('cancel', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await runs.next.cancel({ run_id: RUN_ID }));
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
      } = await mirror(await runs.next.getLog({ run_id: RUN_ID }));
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
        await runs.next.getLog({
          run_id: RUN_ID,
          request: {
            query: {
              limit: 4,
              pagination_token: 'abc',
            },
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

  test('update', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(
      await runs.next.update({
        run_id: RUN_ID,
        request: {
          data: {
            label: 'abc',
            run_managers: ['urn:globus:auth:identity:uuid'],
            run_monitors: ['urn:globus:auth:identity:uuid'],
            tags: ['tag1', 'tag2'],
          },
        },
      }),
    );
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('remove', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await runs.next.remove({ run_id: RUN_ID }));
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('getDefinition', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await runs.next.getDefinition({ run_id: RUN_ID }));
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });
});
