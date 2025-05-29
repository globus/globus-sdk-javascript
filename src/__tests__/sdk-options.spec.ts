import { timer } from '../index';
import type { MirroredRequest } from '../__mocks__/handlers';

describe('sdk-options', () => {
  test('environment', async () => {
    const payload = {
      timer: {
        schedule: {
          type: 'once' as const,
          datetime: '2025-08-24T14:15:22Z',
        },
        timer_type: 'transfer' as const,
        body: {
          DATA_TYPE: 'transfer' as const,
          source_endpoint: 'endpoint-1',
          destination_endpoint: 'endpoint-2',
          DATA: [
            {
              DATA_TYPE: 'transfer_item' as const,
              source_path: 'string',
              destination_path: 'string',
              recursive: true,
              external_checksum: 'string',
              checksum_algorithm: 'string',
            },
          ],
        },
        resource_server: 'transfer.api.globus.org' as const,
      },
    };

    const withEnvironment = await timer.create(
      {
        headers: {
          Authorization: 'Bearer example',
        },
        payload,
      },
      {
        environment: 'sandbox',
      },
    );

    const {
      req: { headers: withEnvironmentHeaders },
    } = (await withEnvironment.json()) as MirroredRequest;

    expect(withEnvironmentHeaders['host']).toEqual('sandbox.timer.automate.globus.org');

    const withoutEnvironment = await timer.create({
      headers: {
        Authorization: 'Bearer example',
      },
      payload,
    });

    const {
      req: { headers: withoutEnvironmentHeaders },
    } = (await withoutEnvironment.json()) as MirroredRequest;

    expect(withoutEnvironmentHeaders['host']).toEqual('timer.automate.globus.org');
  });
});
