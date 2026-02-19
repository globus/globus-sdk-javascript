import { endpointManager } from '../..';
import { mirror } from '../../../../__mocks__/handlers';

const { endpoint } = endpointManager;

const ENDPOINT = 'c591c905-2674-4227-9d31-1ff9485945a7';

describe('endpointManager.endpoint', () => {
  test('get', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await endpoint.get(ENDPOINT));
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('getHostedEndpoints', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await endpoint.getHostedEndpoints(ENDPOINT));
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('getMonitoredEndpoints', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await endpoint.getMonitoredEndpoints());
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('getAccessList', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await endpoint.getAccessList(ENDPOINT));
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
      } = await mirror(await endpoint.next.get({ endpoint_or_collection_id: ENDPOINT }));
      expect({ url, method, headers }).toMatchSnapshot();
    });

    test('getHostedEndpoints', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(
        await endpoint.next.getHostedEndpoints({ endpoint_or_collection_id: ENDPOINT }),
      );
      expect({ url, method, headers }).toMatchSnapshot();
    });

    test('getAccessList', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(await endpoint.next.getAccessList({ collection_id: ENDPOINT }));
      expect({ url, method, headers }).toMatchSnapshot();
    });

    test('getMonitoredEndpoints', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(await endpoint.next.getMonitoredEndpoints());
      expect({ url, method, headers }).toMatchSnapshot();
    });
  });
});
