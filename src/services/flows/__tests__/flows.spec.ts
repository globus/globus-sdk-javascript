import { mirror } from '../../../__mocks__/handlers';
import { flows } from '..';

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
