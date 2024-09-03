import { createStorage } from '../../../core/storage';
import { mirror } from '../../../__mocks__/handlers';

import { fileOperations } from '..';

/**
 * random endpoint-like identifier (uuid)
 */
const ENDPOINT = 'c591c905-2674-4227-9d31-1ff9485945a7';

describe('transfer.file-operations', () => {
  beforeEach(() => {
    createStorage('memory');
  });

  test('mkdir', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(
      await fileOperations.mkdir(ENDPOINT, {
        payload: {
          path: '/~/new-directory',
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

  test('rename', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(
      await fileOperations.rename(ENDPOINT, {
        payload: {
          old_path: '/~/old-directory',
          new_path: '/new-path',
        },
      }),
    );

    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();

    expect(json).toMatchObject({
      DATA_TYPE: 'rename',
      old_path: '/~/old-directory',
      new_path: '/new-path',
    });
  });

  test('symlink', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(
      await fileOperations.symlink(ENDPOINT, {
        payload: {
          symlink_target: '/~/some/project/myfile.txt',
          path: '/~/quick_link.txt',
        },
      }),
    );

    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();

    expect(json).toMatchObject({
      DATA_TYPE: 'symlink',
      symlink_target: '/~/some/project/myfile.txt',
      path: '/~/quick_link.txt',
    });
  });

  test('ls', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(
      await fileOperations.ls(ENDPOINT, {
        query: {
          path: '/~/',
        },
      }),
    );
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('stat', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(
      await fileOperations.stat(ENDPOINT, {
        query: {
          path: '/~/my-file',
        },
      }),
    );
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });
});
