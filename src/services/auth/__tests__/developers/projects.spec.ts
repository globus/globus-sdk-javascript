import { developers } from '../../index';

import { mirror } from '../../../../__mocks__/handlers';

describe('projects', () => {
  test('get', async () => {
    const result = await developers.projects.get('6521a0c3-ffc9-4432-9cb6-41fa8fe2e4e9');
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
    const result = await developers.projects.getAll();
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
      await developers.projects.create({
        payload: {
          display_name: 'My New Project',
          contact_email: 'contact@test.com',
          admin_ids: ['admin-id-1', 'admin-id-2'],
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
      await developers.projects.update('6521a0c3-ffc9-4432-9cb6-41fa8fe2e4e9', {
        payload: {
          display_name: 'Updated Project Name',
          contact_email: 'new_email@test.com',
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
    } = await mirror(await developers.projects.remove('6521a0c3-ffc9-4432-9cb6-41fa8fe2e4e9'));
    expect({
      url,
      method,
      headers,
      json,
    }).toMatchSnapshot();
  });
  describe('next', () => {
    test('get', async () => {
      const result = await developers.projects.next.get({
        project_id: '6521a0c3-ffc9-4432-9cb6-41fa8fe2e4e9',
      });
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
      const result = await developers.projects.next.getAll();
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
        await developers.projects.next.create({
          request: {
            data: {
              display_name: 'My New Project',
              contact_email: 'contact@test.com',
              admin_ids: ['admin-id-1', 'admin-id-2'],
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
        await developers.projects.next.update({
          project_id: '6521a0c3-ffc9-4432-9cb6-41fa8fe2e4e9',
          request: {
            data: {
              display_name: 'Updated Project Name',
              contact_email: 'new_email@test.com',
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
        await developers.projects.next.remove({
          project_id: '6521a0c3-ffc9-4432-9cb6-41fa8fe2e4e9',
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
});
