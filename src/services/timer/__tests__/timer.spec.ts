import { timer } from '../index';

import { mirror } from '../../../__mocks__/handlers';

test('create', async () => {
  const result = await timer.create({
    payload: {
      timer: {
        name: 'SDK testing',
        schedule: {
          type: 'once',
        },
        timer_type: 'transfer',
        body: {
          source_endpoint: 'ddb59aef-6d04-11e5-ba46-22000b92c6ec',
          destination_endpoint: 'ddb59af0-6d04-11e5-ba46-22000b92c6ec',
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
  });

  const {
    req: { url, method, headers, json },
  } = await mirror(result);

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
        "content-length": "351",
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
            "destination_endpoint": "ddb59af0-6d04-11e5-ba46-22000b92c6ec",
            "source_endpoint": "ddb59aef-6d04-11e5-ba46-22000b92c6ec",
          },
          "name": "SDK testing",
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
