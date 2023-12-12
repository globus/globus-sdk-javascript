import { createStorage } from '../../../core/storage';
import { mirror } from '../../../../__mocks__/handlers';
import { oauth2 } from '../index';

describe('oauth2', () => {
  beforeEach(() => {
    createStorage('memory');
  });

  test('introspect', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(
      await oauth2.token.introspect({
        query: {
          token: 'abc-def-ghi',
          include: ['session_info', 'identity_set'],
        },
      }),
    );
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('revoke', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(
      await oauth2.token.revoke({
        query: {
          token: 'abc-def-ghi',
        },
      }),
    );
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('validate', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(
      await oauth2.token.validate({
        query: {
          token: 'abc-def-ghi',
          client_id: 'my-client-id',
          token_type_hint: 'access_token',
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
