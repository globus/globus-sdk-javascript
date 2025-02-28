import { timer } from '../index';
import { mirror } from '../__mocks__/handlers';

describe('sdk-options', () => {
  test('environment', async () => {
    const payload = {
      timer: {
        schedule: {
          type: 'once' as const,
        },
        resource_server: 'transfer.api.globus.org' as const,
        timer_type: 'transfer' as const,
        body: {
          source_endpoint: 'endpoint-1',
          destination_endpoint: 'endpoint-2',
          delete_destination_extra: false,
          encrypt_data: false,
          fail_on_quota_errors: false,
          notify_on_failed: false,
          notify_on_inactive: false,
          notify_on_succeeded: false,
          preserve_timestamp: false,
          skip_source_errors: false,
          store_base_path_info: false,
          verify_checksum: false,
          DATA_TYPE: 'transfer' as const,
          DATA: [],
        },
      },
    };

    const {
      req: { headers: withEnvironmentHeaders },
    } = await mirror(
      await timer.create(
        {
          headers: {
            Authorization: 'Bearer example',
          },
          payload,
        },
        {
          environment: 'sandbox',
        },
      ),
    );

    expect(withEnvironmentHeaders['host']).toEqual('sandbox.timer.automate.globus.org');

    const {
      req: { headers: withoutEnvironmentHeaders },
    } = await mirror(
      await timer.create({
        headers: {
          Authorization: 'Bearer example',
        },
        payload,
      }),
    );

    expect(withoutEnvironmentHeaders['host']).toEqual('timer.automate.globus.org');
  });
});
