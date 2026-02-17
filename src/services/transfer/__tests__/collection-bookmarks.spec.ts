import { collectionBookmarks } from '../index';
import { mirror } from '../../../__mocks__/handlers';

describe('collectionBookmarks', () => {
  test('getAll', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await collectionBookmarks.getAll());
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
      await collectionBookmarks.create({
        payload: {
          name: 'My New Bookmark',
          endpoint_id: 'fake-endpoint-uuid',
          path: '/my/bookmark/path',
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

  test('get', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await collectionBookmarks.get('my-bookmark-id'));
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
      await collectionBookmarks.update('my-bookmark-id', {
        payload: {
          name: 'New Name',
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
    } = await mirror(await collectionBookmarks.remove('my-bookmark-id'));
    expect({
      url,
      method,
      headers,
      json,
    }).toMatchSnapshot();
  });

  describe('next', () => {
    test('getAll', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(await collectionBookmarks.next.getAll());
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
        await collectionBookmarks.next.create({
          request: {
            data: {
              name: 'My New Bookmark',
              endpoint_id: 'fake-endpoint-uuid',
              path: '/my/bookmark/path',
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

    test('get', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(
        await collectionBookmarks.next.get({ bookmark_id: 'my-bookmark-id' }),
      );
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
        await collectionBookmarks.next.update({
          bookmark_id: 'my-bookmark-id',
          request: {
            data: {
              name: 'New Name',
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
      } = await mirror(
        await collectionBookmarks.next.remove({ bookmark_id: 'my-bookmark-id' }),
      );
      expect({
        url,
        method,
        headers,
      }).toMatchSnapshot();
    });
  });
});
