import { tunnel } from '../index';

import { mirror } from '../../../__mocks__/handlers';

const TUNNEL_UUID = 'example-tunnel-id';

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
    } = await mirror(await tunnel.get(TUNNEL_UUID));
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

  const START_PAYLOAD = {
    listener_ip_address: '1.1.1.1',
    listener_port: 8080,
    label: 'Started Tunnel',
  };

  test('start', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(
      await tunnel.start(TUNNEL_UUID, {
        payload: START_PAYLOAD,
      }),
    );
    expect({
      url,
      method,
      headers,
      json,
    }).toMatchSnapshot();
  });

  const STOP_PAYLOAD = {
    label: 'Stopped Tunnel',
  };

  test('stop', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(await tunnel.stop(TUNNEL_UUID, { payload: STOP_PAYLOAD }));
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

  describe('next', () => {
    test('getAll', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(await tunnel.next.getAll());
      expect({
        url,
        method,
        headers,
      }).toMatchSnapshot();
    });

    test('get', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(await tunnel.next.get({ id: TUNNEL_UUID }));
      expect({
        url,
        method,
        headers,
      }).toMatchSnapshot();
    });

    test('start', async () => {
      const {
        req: { url, method, headers, json },
      } = await mirror(
        await tunnel.next.start({
          id: TUNNEL_UUID,
          request: {
            data: START_PAYLOAD,
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
        await tunnel.next.stop({
          id: TUNNEL_UUID,
          request: { data: STOP_PAYLOAD },
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
});
