import { identities } from '..';
import { createStorage } from '../../../core/storage';

import type { MirroredRequest } from '../../../__mocks__/handlers';

test('get', async () => {
  createStorage('memory');
  const result = await identities.get('6521a0c3-ffc9-4432-9cb6-41fa8fe2e4e9');
  const {
    req: { url, method, headers },
  } = (await result.json()) as unknown as MirroredRequest;

  expect({
    url,
    method,
    headers,
  }).toMatchInlineSnapshot(`
{
  "headers": {
    "accept": "*/*",
    "accept-encoding": "gzip,deflate",
    "connection": "close",
    "host": "auth.globus.org",
    "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
  },
  "method": "GET",
  "url": "https://auth.globus.org/identities/6521a0c3-ffc9-4432-9cb6-41fa8fe2e4e9",
}
`);
});

test('getAll', async () => {
  createStorage('memory');
  const result = await identities.getAll({
    query: {
      ids: '538e096f-0468-4d54-8463-50af72c01f95,1e1cac10-b303-48d8-aa81-3b3a592a2564',
    },
  });
  const {
    req: { url, method, headers },
  } = (await result.json()) as unknown as MirroredRequest;

  expect({
    url,
    method,
    headers,
  }).toMatchInlineSnapshot(`
{
  "headers": {
    "accept": "*/*",
    "accept-encoding": "gzip,deflate",
    "connection": "close",
    "host": "auth.globus.org",
    "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
  },
  "method": "GET",
  "url": "https://auth.globus.org/identities?ids=538e096f-0468-4d54-8463-50af72c01f95%2C1e1cac10-b303-48d8-aa81-3b3a592a2564",
}
`);
});

test("getAll – with 'include'", async () => {
  createStorage('memory');
  const result = await identities.getAll({
    query: {
      ids: ['538e096f-0468-4d54-8463-50af72c01f95', '1e1cac10-b303-48d8-aa81-3b3a592a2564'],
      include: 'identity_provider',
    },
  });
  const {
    req: { url, method, headers },
  } = (await result.json()) as unknown as MirroredRequest;

  expect({
    url,
    method,
    headers,
  }).toMatchInlineSnapshot(`
{
  "headers": {
    "accept": "*/*",
    "accept-encoding": "gzip,deflate",
    "connection": "close",
    "host": "auth.globus.org",
    "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
  },
  "method": "GET",
  "url": "https://auth.globus.org/identities?ids=538e096f-0468-4d54-8463-50af72c01f95%2C1e1cac10-b303-48d8-aa81-3b3a592a2564&include=identity_provider",
}
`);
});
