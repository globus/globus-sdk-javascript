import { developerResource } from '../../index';

import { mirror } from '../../../../__mocks__/handlers';

describe('policies', () => {
  test('get', async () => {
    const result = await developerResource.policies.get('6521a0c3-ffc9-4432-9cb6-41fa8fe2e4e9');
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
    const result = await developerResource.policies.getAll();
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
      await developerResource.policies.create({
        payload: {
          project_id: 'my-fake-project-uuid',
          high_assurance: true,
          authentication_assurance_timeout: 3600,
          display_name: 'My New Policy',
          description: 'testing',
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
      await developerResource.policies.update('6521a0c3-ffc9-4432-9cb6-41fa8fe2e4e9', {
        payload: {
          display_name: 'Updated Policy Name',
          description: 'new description',
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
      await developerResource.policies.remove('6521a0c3-ffc9-4432-9cb6-41fa8fe2e4e9'),
    );
    expect({
      url,
      method,
      headers,
      json,
    }).toMatchSnapshot();
  });
});
