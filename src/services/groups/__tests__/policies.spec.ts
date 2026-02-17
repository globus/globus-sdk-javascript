import { policies } from '..';

import { mirror } from '../../../__mocks__/handlers';

const GROUP_ID = '6521a0c3-ffc9-4432-9cb6-41fa8fe2e4e9';

test('get', async () => {
  const {
    req: { url, method, headers },
  } = await mirror(await policies.get(GROUP_ID));

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
    await policies.update(GROUP_ID, {
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

describe('next', () => {
  test('get', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await policies.next.get({ group_id: GROUP_ID }));
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
      await policies.next.update({
        group_id: GROUP_ID,
        request: {
          data: {
            is_high_assurance: true,
          },
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
});
