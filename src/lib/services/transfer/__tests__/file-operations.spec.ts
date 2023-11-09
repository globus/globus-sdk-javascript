import serviceTestSuite from '../../../../__utils__/service-test-suite';
import { fileOperations } from '..';

/**
 * random endpoint-like identifier (uuid)
 */
const ENDPOINT = 'c591c905-2674-4227-9d31-1ff9485945a7';

serviceTestSuite('transfer', 'file-operations', (fetch) => {
  test('mkdir', async () => {
    await fileOperations.mkdir(ENDPOINT, {
      payload: {
        path: '/~/new-directory',
      },
    });
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(
      `https://transfer.api.globusonline.org/v0.10/operation/endpoint/${ENDPOINT}/mkdir`,
      expect.objectContaining({
        body: expect.stringMatching('{"DATA_TYPE":"mkdir","path":"/~/new-directory"}') as unknown,
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      }),
    );
  });

  test('rename', async () => {
    await fileOperations.rename(ENDPOINT, {
      payload: {
        old_path: '/~/old-directory',
        new_path: '/new-path',
      },
    });
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(
      `https://transfer.api.globusonline.org/v0.10/operation/endpoint/${ENDPOINT}/rename`,
      expect.objectContaining({
        body: expect.stringMatching(
          '{"DATA_TYPE":"rename","old_path":"/~/old-directory","new_path":"/new-path"}',
        ) as unknown,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }),
    );
  });

  test('symlink', async () => {
    await fileOperations.symlink(ENDPOINT, {
      payload: {
        symlink_target: '/~/some/project/myfile.txt',
        path: '/~/quick_link.txt',
      },
    });
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(
      `https://transfer.api.globusonline.org/v0.10/operation/endpoint/${ENDPOINT}/symlink`,
      expect.objectContaining({
        body: expect.stringMatching(
          '{"DATA_TYPE":"symlink","symlink_target":"/~/some/project/myfile.txt","path":"/~/quick_link.txt"}',
        ) as unknown,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }),
    );
  });

  test('ls', async () => {
    await fileOperations.ls(ENDPOINT, {
      query: {
        path: '/~/',
      },
    });
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(
      `https://transfer.api.globusonline.org/v0.10/operation/endpoint/${ENDPOINT}/ls?path=%2F%7E%2F`,
      {
        headers: {},
      },
    );
  });
});
