import { createStorage } from '../../../core/storage';
import { mirror } from '../../../../__mocks__/handlers';
import { oauth2 } from '../index';

describe('oauth2', () => {
  beforeEach(() => {
    createStorage('memory');
  });

  test('introspect', async () => {
    const {
      req: { url, method, headers, formData },
    } = await mirror(
      await oauth2.token.introspect({
        payload: {
          token: 'abc-def-ghi',
          include: 'session_info,identity_set',
        },
      }),
    );
    expect({
      url,
      method,
      headers,
      formData,
    }).toMatchSnapshot();
  });

  test('revoke', async () => {
    const {
      req: { url, method, headers, formData },
    } = await mirror(
      await oauth2.token.revoke({
        payload: {
          token: 'abc-def-ghi',
        },
      }),
    );
    expect({
      url,
      method,
      headers,
      formData,
    }).toMatchSnapshot();
  });

  test('validate', async () => {
    const {
      req: { url, method, headers, formData },
    } = await mirror(
      await oauth2.token.validate({
        payload: {
          token: 'abc-def-ghi',
          client_id: 'my-client-id',
        },
      }),
    );
    expect({
      url,
      method,
      headers,
      formData,
    }).toMatchSnapshot();
  });
});
