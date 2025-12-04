import { developerResource } from '../../../index';

import { mirror } from '../../../../../__mocks__/handlers';

describe('clients', () => {
  test('get', async () => {
    const result = await developerResource.clients.get('6521a0c3-ffc9-4432-9cb6-41fa8fe2e4e9');
    const {
      req: { url, method, headers },
    } = await mirror(result);

    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('getAll', async () => {
    const result = await developerResource.clients.getAll({ query: { fqdn: 'www.test.com' } });
    const {
      req: { url, method, headers },
    } = await mirror(result);

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
      await developerResource.clients.create({
        payload: {
          name: 'My Test Client',
          public_client: true,
          visibility: 'private',
          redirect_uris: ['www.test.com'],
          links: {},
          project: 'test-project-id',
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

  test('createNativeApp', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(
      await developerResource.clients.createNativeApp({
        payload: {
          name: 'My Native App',
          template_id: 'test-native-template-id',
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
      await developerResource.clients.update('6521a0c3-ffc9-4432-9cb6-41fa8fe2e4e9', {
        payload: {
          name: 'Updated Client Name',
          visibility: 'public',
          links: {
            terms_and_conditions: 'www.test.com/terms',
            privacy_policy: 'www.test.com/privacy',
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
      req: { url, method, headers, json },
    } = await mirror(
      await developerResource.clients.remove('6521a0c3-ffc9-4432-9cb6-41fa8fe2e4e9'),
    );
    expect({
      url,
      method,
      headers,
      json,
    }).toMatchSnapshot();
  });
});
