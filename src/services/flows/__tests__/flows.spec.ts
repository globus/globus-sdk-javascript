import { mirror } from '../../../__mocks__/handlers';
import { flows } from '..';

const FLOW_ID = 'flow-id';

describe('flows.flow', () => {
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

  test('run', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(
      await flows.run('flow-id', {
        payload: {
          body: {
            sleep_time: 5,
            echo_string: 'Hello, world!',
          },
          tags: ['tag1', 'tag2'],
        },
        headers: {
          Authorization: 'Bearer this-is-an-example-token',
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

  test('validate', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(
      await flows.validate({
        payload: {
          definition: {
            States: {},
            StartAt: 'FooBar',
          },
        },
        headers: {
          Authorization: 'Bearer this-is-an-example-token',
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

  test('deploy', async () => {
    await mirror(
      await flows.deploy({
        payload: {
          definition: {
            States: {},
            StartAt: 'FooBar',
          },
        },
        headers: {
          Authorization: 'Bearer this-is-an-example-token',
        },
      }),
    );
  });

  test('update', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(
      await flows.update('flow-id', {
        payload: {
          title: 'New title',
          subtitle: 'New subtitle',
        },
        headers: {
          Authorization: 'Bearer this-is-an-example-token',
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
});

describe('next', () => {
  test('getAll', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await flows.next.getAll());
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('get', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await flows.next.get({ flow_id: FLOW_ID }));
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('remove', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await flows.next.remove({ flow_id: FLOW_ID }));
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('run', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(
      await flows.next.run({
        flow_id: FLOW_ID,
        request: {
          data: {
            body: {
              sleep_time: 5,
              echo_string: 'Hello, world!',
            },
            tags: ['tag1', 'tag2'],
          },
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

  test('validate', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(
      await flows.next.validate({
        request: {
          data: {
            definition: {
              States: {},
              StartAt: 'FooBar',
            },
          },
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

  test('create', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(
      await flows.next.create({
        request: {
          data: {
            definition: {
              States: {},
              StartAt: 'FooBar',
            },
          },
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

  test('update', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(
      await flows.next.update({
        flow_id: FLOW_ID,
        request: {
          data: {
            title: 'New title',
            subtitle: 'New subtitle',
          },
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
});
