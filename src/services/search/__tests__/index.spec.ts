import { index } from '..';

import { mirror } from '../../../__mocks__/handlers';

describe('search – index', () => {
  test('get', async () => {
    const request = await index.get('524de2f6-d1a6-4b49-9286-d8dccb4196ae');
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
        principal_type: 'identity',
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
});
