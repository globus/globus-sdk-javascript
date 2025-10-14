import { endpointSearch } from '..';
import { mirror } from '../../../__mocks__/handlers';

test('endpointSearch', async () => {
  const result = await endpointSearch({
    query: {
      filter_fulltext: 'my search string',
      limit: 10,
    },
    headers: {
      Authorization: 'Bearer an-example-token',
    },
  });
  const {
    req: { url, method, headers },
  } = await mirror(result);
  expect({
    url,
    method,
    headers,
  }).toMatchInlineSnapshot(`
    {
      "headers": {
        "accept": "*/*",
        "accept-encoding": "gzip,deflate",
        "authorization": "Bearer an-example-token",
        "connection": "close",
        "host": "transfer.api.globusonline.org",
        "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
      },
      "method": "GET",
      "url": "https://transfer.api.globusonline.org/v0.10/endpoint_search?filter_fulltext=my+search+string&limit=10",
    }
  `);
});
