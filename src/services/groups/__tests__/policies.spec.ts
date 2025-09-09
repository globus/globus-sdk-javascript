import { policies } from '..';

import { mirror } from '../../../__mocks__/handlers';

test('get', async () => {
  const {
    req: { url, method, headers },
  } = await mirror(await policies.get('6521a0c3-ffc9-4432-9cb6-41fa8fe2e4e9'));

  expect({
    url,
    method,
    headers,
  }).toMatchSnapshot();
});

test('update', async () => {
  const {
    req: { url, method, headers, json },
  } = await mirror(
    await policies.update('6521a0c3-ffc9-4432-9cb6-41fa8fe2e4e9', {
      payload: {
        is_high_assurance: true,
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
