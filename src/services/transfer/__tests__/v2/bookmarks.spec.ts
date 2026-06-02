import { v2 } from '../../index';
import { mirror } from '../../../../__mocks__/handlers';

describe('bookmarks', () => {
  test('getAll', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await v2.bookmarks.getAll());
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
      await v2.bookmarks.create({
        request: {
          data: {
            data: {
              type: 'Bookmark',
              attributes: {
                name: "35-KS&aIO(Fcdm%Y:2-c\\fp>(>[]i+R3*G'%imO1VoV;y-@QogK`.;xr:3<`B\\?kNH*$]_Lup",
                path: 'XQE%qoM~mcP)TI f]RJ*#r-GDy~c\\N/',
              },
              relationships: {
                collection: {
                  data: {
                    type: 'Collection',
                    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                  },
                },
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
      json,
    }).toMatchSnapshot();
  });

  test('get', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await v2.bookmarks.get({ bookmark_id: 'my-bookmark-id' }));
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
      await v2.bookmarks.update({
        bookmark_id: 'my-bookmark-id',
        request: {
          data: {
            data: {
              type: 'Bookmark',
              attributes: {
                name: 'New Name',
                path: 'new/path',
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
      json,
    }).toMatchSnapshot();
  });

  test('remove', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await v2.bookmarks.remove({ bookmark_id: 'my-bookmark-id' }));
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });
});
