import { index } from '..';

import { mirror } from '../../../__mocks__/handlers';

const INDEX_ID = '524de2f6-d1a6-4b49-9286-d8dccb4196ae';

describe('search – index', () => {
  test('get', async () => {
    const request = await index.get(INDEX_ID);
    const {
      req: { url, method, headers },
    } = await mirror(request);
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('getAll', async () => {
    const request = await index.getAll();
    const {
      req: { url, method, headers },
    } = await mirror(request);
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('create', async () => {
    const request = await index.create({
      payload: { display_name: 'foobar', description: 'example description' },
    });
    const {
      req: { url, method, headers, json },
    } = await mirror(request);
    expect({
      url,
      method,
      headers,
      json,
    }).toMatchSnapshot();
  });

  test('remove', async () => {
    const request = await index.remove('some-uuid');
    const {
      req: { url, method, headers },
    } = await mirror(request);
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('reopen', async () => {
    const request = await index.reopen('some-uuid');
    const {
      req: { url, method, headers },
    } = await mirror(request);
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('ingest', async () => {
    const request = await index.ingest('some-uuid', {
      payload: {
        ingest_type: 'GMetaEntry',
        ingest_data: {
          subject: 'test',
          content: {
            foo: 'bar',
          },
        },
      },
    });
    const {
      req: { url, method, headers },
    } = await mirror(request);
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('get roles', async () => {
    const request = await index.roles.getAll('some-uuid');
    const {
      req: { url, method, headers },
    } = await mirror(request);
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('create role', async () => {
    const request = await index.roles.create('some-uuid', {
      payload: {
        role_name: 'admin',
        principal: 'some-principal-urn',
      },
    });

    const {
      req: { url, method, headers, json },
    } = await mirror(request);
    expect({
      url,
      method,
      headers,
      json,
    }).toMatchSnapshot();
  });

  test('delete role', async () => {
    const request = await index.roles.remove({ index_id: 'some-uuid', role_id: 'some-role-id' });
    const {
      req: { url, method, headers },
    } = await mirror(request);
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  describe('next', () => {
    test('get', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(await index.next.get({ index_id: INDEX_ID }));
      expect({
        url,
        method,
        headers,
      }).toMatchSnapshot();
    });

    test('getAll', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(await index.next.getAll());
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
        await index.next.create({
          request: {
            data: { display_name: 'foobar', description: 'example description' },
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
      } = await mirror(await index.next.remove({ index_id: 'some-uuid' }));
      expect({
        url,
        method,
        headers,
      }).toMatchSnapshot();
    });

    test('reopen', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(await index.next.reopen({ index_id: 'some-uuid' }));
      expect({
        url,
        method,
        headers,
      }).toMatchSnapshot();
    });

    test('ingest', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(
        await index.next.ingest({
          index_id: 'some-uuid',
          request: {
            data: {
              ingest_type: 'GMetaEntry',
              ingest_data: {
                subject: 'test',
                content: {
                  foo: 'bar',
                },
              },
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

    test('get roles', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(await index.roles.next.getAll({ index_id: 'some-uuid' }));
      expect({
        url,
        method,
        headers,
      }).toMatchSnapshot();
    });

    test('create role', async () => {
      const {
        req: { url, method, headers, json },
      } = await mirror(
        await index.roles.next.create({
          index_id: 'some-uuid',
          request: {
            data: {
              role_name: 'admin',
              principal: 'some-principal-urn',
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

    test('delete role', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(
        await index.roles.next.remove({ index_id: 'some-uuid', role_id: 'some-role-id' }),
      );
      expect({
        url,
        method,
        headers,
      }).toMatchSnapshot();
    });
  });
});
