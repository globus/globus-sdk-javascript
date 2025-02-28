import { create } from '../index';

import { mirror } from '../../../__mocks__/handlers';

test('create', async () => {
  const {
    req: { url, method, headers, json },
  } = await mirror(
    await create({
      payload: {
        timer: {
          name: 'SDK testing',
          resource_server: 'transfer.api.globus.org',
          schedule: {
            type: 'once',
          },
          timer_type: 'transfer',
          body: {
            source_endpoint: 'ddb59aef-6d04-11e5-ba46-22000b92c6ec',
            destination_endpoint: 'ddb59af0-6d04-11e5-ba46-22000b92c6ec',
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
            DATA_TYPE: 'transfer',
            DATA: [
              {
                DATA_TYPE: 'transfer_item',
                source_path: '/share/godata',
                destination_path: '/~/godata',
                recursive: true,
              },
            ],
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
  }).toMatchInlineSnapshot(`
    {
      "headers": {
        "accept": "*/*",
        "accept-encoding": "gzip,deflate",
        "connection": "close",
        "content-length": "665",
        "content-type": "application/json",
        "host": "timer.automate.globus.org",
        "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
      },
      "json": {
        "timer": {
          "body": {
            "DATA": [
              {
                "DATA_TYPE": "transfer_item",
                "destination_path": "/~/godata",
                "recursive": true,
                "source_path": "/share/godata",
              },
            ],
            "DATA_TYPE": "transfer",
            "delete_destination_extra": false,
            "destination_endpoint": "ddb59af0-6d04-11e5-ba46-22000b92c6ec",
            "encrypt_data": false,
            "fail_on_quota_errors": false,
            "notify_on_failed": false,
            "notify_on_inactive": false,
            "notify_on_succeeded": false,
            "preserve_timestamp": false,
            "skip_source_errors": false,
            "source_endpoint": "ddb59aef-6d04-11e5-ba46-22000b92c6ec",
            "store_base_path_info": false,
            "verify_checksum": false,
          },
          "name": "SDK testing",
          "resource_server": "transfer.api.globus.org",
          "schedule": {
            "type": "once",
          },
          "timer_type": "transfer",
        },
      },
      "method": "POST",
      "url": "https://timer.automate.globus.org/v2/timer",
    }
  `);
});
