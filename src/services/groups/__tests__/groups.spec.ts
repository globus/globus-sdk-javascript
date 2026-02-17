import { groups } from '..';
import { mirror } from '../../../__mocks__/handlers';

const GROUP_ID = '6521a0c3-ffc9-4432-9cb6-41fa8fe2e4e9';

test('get', async () => {
  const {
    req: { url, method, headers },
  } = await mirror(await groups.get(GROUP_ID));

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
    await groups.update(GROUP_ID, {
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
  } = await mirror(await groups.remove(GROUP_ID));

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

describe('next', () => {
  test('getMyGroups', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(
      await groups.next.getMyGroups({
        request: {
          query: {
            statuses: ['active'],
          },
        },
      }),
    );
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('get', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await groups.next.get({ group_id: GROUP_ID }));
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('create', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(
      await groups.next.create({
        request: {
          data: {
            name: 'My New Group',
            description: 'This is my new group.',
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

  test('update', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(
      await groups.next.update({
        group_id: GROUP_ID,
        request: {
          data: {
            name: 'My Updated Group',
            description: 'This is my updated group.',
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

  test('remove', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await groups.next.remove({ group_id: GROUP_ID }));
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('getStatuses', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await groups.next.getStatuses());
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });
});
