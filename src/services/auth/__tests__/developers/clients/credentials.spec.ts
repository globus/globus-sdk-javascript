import { developers } from '../../../index';

import { mirror } from '../../../../../__mocks__/handlers';

describe('client credentials', () => {
  test('getAll', async () => {
    const result = await developers.clients.credentials.getAll('mock-client-id');
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
      await developers.clients.credentials.create('mock-client-id', {
        payload: {
          name: 'New Credential',
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
      await developers.clients.credentials.remove({
        client_id: 'mock-client-id',
        credential_id: 'mock-credential-id',
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
