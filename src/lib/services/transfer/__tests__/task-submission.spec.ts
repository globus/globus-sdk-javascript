import serviceTestSuite from '../../../../__utils__/service-test-suite';
import { taskSubmission } from '..';

serviceTestSuite('transfer', 'task-submission', (fetch) => {
  test('submissionId', async () => {
    await taskSubmission.submissionId();
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(
      `https://transfer.api.globusonline.org/v0.10/submission_id`,
      {
        headers: {},
      },
    );
  });

  test('submitDelete', async () => {
    const payload = {
      endpoint: 'e434fe90-591f-40d9-8d34-3016b6237046',
      submission_id: '65d1dc8c-5ebb-487e-8990-e5a25e3cf1d4',
      DATA: [{ DATA_TYPE: 'delete_item', path: '/' }],
    };

    await taskSubmission.submitDelete({
      payload,
    });
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(
      `https://transfer.api.globusonline.org/v0.10/delete`,
      expect.objectContaining({
        body: expect.stringContaining(`"DATA_TYPE":"delete"`) as unknown,
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }) as unknown,
        method: 'POST',
      }),
    );
  });

  test('submitTransfer', async () => {
    await taskSubmission.submitTransfer({
      payload: {},
    });
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(
      `https://transfer.api.globusonline.org/v0.10/transfer`,
      expect.objectContaining({
        body: expect.stringContaining(`"DATA_TYPE":"transfer"`) as unknown,
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }) as unknown,
        method: 'POST',
      }),
    );
  });
});
