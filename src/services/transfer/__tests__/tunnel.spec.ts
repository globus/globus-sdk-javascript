import { tunnel } from '../index';

import { mirror } from '../../../__mocks__/handlers';

describe('tunnel', () => {
  test('getAll', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await tunnel.getAll());
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('get', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await tunnel.get('example-tunnel-id'));
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('create', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(
      await tunnel.create({
        payload: {
          data: {
            type: 'Tunnel',
            attributes: {
              label: 'A new label',
              restartable: true,
              lifetime_mins: 60,
              submission_id: 'example-submission-id',
            },
            relationships: {
              initiator: {
                data: {
                  type: 'StreamAccessPoint',
                  id: 'example-access-point-id',
                },
              },
              listener: {
                data: {
                  type: 'StreamAccessPoint',
                  id: 'example-access-point-id',
                },
              },
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

  test('remove', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(await tunnel.remove('example-tunnel-id'));
    expect({
      url,
      method,
      headers,
      json,
    }).toMatchSnapshot();
  });

  test('start', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(
      await tunnel.start('example-tunnel-id', {
        payload: {
          listener_ip_address: '1.1.1.1',
          listener_port: 8080,
          label: 'Started Tunnel',
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

  test('stop', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(
      await tunnel.stop('example-tunnel-id', { payload: { label: 'Stopped Tunnel' } }),
    );
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
    } = await mirror(await tunnel.getEventList('example-tunnel-id'));
    expect({
      url,
      method,
      headers,
      json,
    }).toMatchSnapshot();
  });
});
