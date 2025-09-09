import { groups } from '..';
import { mirror } from '../../../__mocks__/handlers';

test('get', async () => {
  const {
    req: { url, method, headers },
  } = await mirror(await groups.get('6521a0c3-ffc9-4432-9cb6-41fa8fe2e4e9'));

  expect({
    url,
    method,
    headers,
  }).toMatchSnapshot();
});

test('getMyGroups', async () => {
  const {
    req: { url, method, headers },
  } = await mirror(
    await groups.getMyGroups({
      query: {
        statuses: ['active'],
      },
    }),
  );

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
        "host": "groups.api.globus.org",
        "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
      },
      "method": "GET",
      "url": "https://groups.api.globus.org/v2/groups/my_groups?statuses=active",
    }
  `);
});

test('create', async () => {
  const {
    req: { url, method, headers, json },
  } = await mirror(
    await groups.create({
      payload: {
        name: 'My New Group',
        description: 'This is my new group.',
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

test('update', async () => {
  const {
    req: { url, method, headers, json },
  } = await mirror(
    await groups.update('6521a0c3-ffc9-4432-9cb6-41fa8fe2e4e9', {
      payload: {
        name: 'My Updated Group',
        description: 'This is my updated group.',
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

test('remove', async () => {
  const {
    req: { url, method, headers },
  } = await mirror(await groups.remove('6521a0c3-ffc9-4432-9cb6-41fa8fe2e4e9'));

  expect({
    url,
    method,
    headers,
  }).toMatchSnapshot();
});

test('getStatuses', async () => {
  const {
    req: { url, method, headers },
  } = await mirror(await groups.getStatuses());

  expect({
    url,
    method,
    headers,
  }).toMatchSnapshot();
});
