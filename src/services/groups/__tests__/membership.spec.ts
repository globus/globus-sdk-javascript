import { membership } from '..';

import { mirror } from '../../../__mocks__/handlers';

test('membership - act', async () => {
  const {
    req: { url, method, headers, json },
  } = await mirror(
    await membership.act('6521a0c3-ffc9-4432-9cb6-41fa8fe2e4e9', {
      payload: {
        reject: [
          {
            identity_id: 'f13c9c26-223d-41cf-b6d7-971f3d3b5dfa',
          },
        ],
        decline: [
          {
            identity_id: 'c237bf3e-ff0b-4d7f-9abc-5355040c49da',
          },
          {
            identity_id: '3d9cbcd8-beed-4f37-85ab-75d725623da8',
          },
        ],
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

test('getStatuses', async () => {
  const {
    req: { url, method, headers },
  } = await mirror(await membership.getStatuses());

  expect({
    url,
    method,
    headers,
  }).toMatchSnapshot();
});
