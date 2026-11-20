import { streamGateways, type OpenAPI } from '..';
import { mirror } from '../../../__mocks__/handlers';

const GCS_HOST = 'https://fa5e.bd7c.data.globus.org';
const GCS_CONFIGURATION = {
  host: GCS_HOST,
  endpoint_id: 'ac9cb54b-fc48-4824-b801-1388baf0a909',
};

const GATEWAY_1_1_0: OpenAPI.components['schemas']['StreamGateway_1_1_0'] = {
  DATA_TYPE: 'stream_gateway#1.1.0',
  allowed_domains: ['example.allowed.domain'],
  authentication_timeout_mins: 5,
  contact_email: 'email@email.com',
  description: 'Example stream gateway',
  contact_info: 'Contact information for the stream gateway',
  department: 'Example department',
  display_name: 'Example display name',
  domain_name: 'example.domain.com',
  info_link: 'https://example.info.link',
  keywords: ['example', 'keywords'],
};

describe('gcs – streamGateways', () => {
  test('getAll', async () => {
    const { req } = await mirror(await streamGateways.getAll(GCS_CONFIGURATION));
    expect(req).toMatchSnapshot();
  });

  test('get', async () => {
    const streamGatewayId = 'example-stream-gateway-id';
    const { req } = await mirror(await streamGateways.get(GCS_CONFIGURATION, streamGatewayId));
    expect(req).toMatchSnapshot();
  });

  test('create', async () => {
    const { req } = await mirror(
      await streamGateways.create(GCS_CONFIGURATION, {
        payload: GATEWAY_1_1_0,
      }),
    );
    expect(req).toMatchSnapshot();
  });

  test('remove', async () => {
    const streamGatewayId = 'example-stream-gateway-id';
    const { req } = await mirror(await streamGateways.remove(GCS_CONFIGURATION, streamGatewayId));
    expect(req).toMatchSnapshot();
  });

  test('update', async () => {
    const streamGatewayId = 'example-stream-gateway-id';
    const { req } = await mirror(
      await streamGateways.update(GCS_CONFIGURATION, streamGatewayId, {
        payload: GATEWAY_1_1_0,
      }),
    );
    expect(req).toMatchSnapshot();
  });

  describe('next', () => {
    test('getAll', async () => {
      const { req } = await mirror(await streamGateways.next.getAll(GCS_CONFIGURATION));
      expect(req).toMatchSnapshot();
    });

    test('get', async () => {
      const { req } = await mirror(
        await streamGateways.next.get(GCS_CONFIGURATION, {
          stream_gateway_id: 'example-stream-gateway-id',
        }),
      );
      expect(req).toMatchSnapshot();
    });

    test('create', async () => {
      const { req } = await mirror(
        await streamGateways.next.create(GCS_CONFIGURATION, {
          request: {
            data: GATEWAY_1_1_0,
          },
        }),
      );
      expect(req).toMatchSnapshot();
    });

    test('update', async () => {
      const { req } = await mirror(
        await streamGateways.next.update(GCS_CONFIGURATION, {
          stream_gateway_id: 'example-stream-gateway-id',
          ...GATEWAY_1_1_0,
        }),
      );
      expect(req).toMatchSnapshot();
    });

    test('remove', async () => {
      const { req } = await mirror(
        await streamGateways.next.remove(GCS_CONFIGURATION, {
          stream_gateway_id: 'example-stream-gateway-id',
        }),
      );
      expect(req).toMatchSnapshot();
    });
  });
});
