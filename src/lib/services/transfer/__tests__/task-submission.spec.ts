import { createStorage } from '../../../core/storage';
import { mirror } from '../../../../__mocks__/handlers';
import { taskSubmission } from '..';

describe('transfer.task-submission', () => {
  beforeEach(() => {
    createStorage('memory');
  });

  test('submissionId', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await taskSubmission.submissionId());
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('submitDelete', async () => {
    const payload = {
      endpoint: 'e434fe90-591f-40d9-8d34-3016b6237046',
      submission_id: '65d1dc8c-5ebb-487e-8990-e5a25e3cf1d4',
      DATA: [{ DATA_TYPE: 'delete_item', path: '/' }],
    };

    const {
      req: { url, method, headers, json },
    } = await mirror(
      await taskSubmission.submitDelete({
        payload,
      }),
    );

    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();

    expect(json).toMatchObject({
      DATA_TYPE: 'delete',
    });
  });

  test('submitTransfer', async () => {
    const {
      req: { url, method, headers, json },
    } = await mirror(
      await taskSubmission.submitTransfer({
        payload: {},
      }),
    );

    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();

    expect(json).toMatchObject({
      DATA_TYPE: 'transfer',
    });
  });
});
