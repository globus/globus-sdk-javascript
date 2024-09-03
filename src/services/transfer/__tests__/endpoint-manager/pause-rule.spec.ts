import { endpointManager } from '../../index';
import { mirror } from '../../../../__mocks__/handlers';

const { pauseRule } = endpointManager;

describe('endpointManager.pauseRule', () => {
  test('getAll', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await pauseRule.getAll());
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('get', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await pauseRule.get('example-pause-rule-id'));
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
      await pauseRule.create({
        payload: {
          DATA_TYPE: 'pause_rule',
          message: 'a test message',
          start_time: null,
          endpoint_id: 'example-endpoint-id',
          endpoint_display_name: 'example-endpoint-display-name',
          identity_id: 'example-identity-id',
          created_by_host_manager: true,
          editable: true,
          pause_ls: true,
          pause_mkdir: true,
          pause_symlink: true,
          pause_rename: true,
          pause_task_delete: true,
          pause_task_transfer_delete: true,
          pause_task_transfer_read: true,
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
      await pauseRule.update('example-pause-rule-id', {
        payload: { message: 'an example message' },
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
    } = await mirror(await pauseRule.remove('example-pause-rule-id'));
    expect({
      url,
      method,
      headers,
      json,
    }).toMatchSnapshot();
  });
});
