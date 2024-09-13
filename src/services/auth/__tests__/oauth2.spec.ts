import { createStorage } from '../../../core/storage';
import { mirror } from '../../../__mocks__/handlers';
import { oauth2 } from '../index';

describe('oauth2', () => {
  beforeEach(() => {
    createStorage('memory');
  });

  test('userinfo', async () => {
    const {
      req: { url, method, headers, formData },
    } = await mirror(await oauth2.userinfo());
    expect({
      url,
      method,
      headers,
      formData,
    }).toMatchSnapshot();
  });
  test('introspect', async () => {
    expect(() => {
      // @ts-expect-error This intentionally does not have a payload to test the error case.
      oauth2.token.introspect();
    }).toThrow();

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
    expect(() => {
      // @ts-expect-error This intentionally does not have a payload to test the error case.
      oauth2.token.revoke();
    }).toThrow();

    const {
      req: { url, method, headers, formData },
    } = await mirror(
      await oauth2.token.revoke({
        payload: {
          token: 'abc-def-ghi',
          client_id: 'some-client-id',
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

  test('token', async () => {
    const {
      req: { url, method, headers, formData },
    } = await mirror(
      await oauth2.token.token({
        payload: {
          grant_type: 'authorization_code',
          code: 'CODE',
          client_id: 'my-client-id',
          code_verifier: 'CODE_VERIFIER',
          redirect_uri: 'https://redirect-uri',
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

  test('exchange (alias)', () => {
    expect(oauth2.token.exchange).toBe(oauth2.token.token);
  });

  test('refresh', async () => {
    expect(() => {
      // @ts-expect-error This intentionally does not have a payload to test the error case.
      oauth2.token.refresh();
    }).toThrow();

    const {
      req: { url, method, headers, formData },
    } = await mirror(
      await oauth2.token.refresh({
        payload: {
          refresh_token: 'abc-def-ghi',
          client_id: 'some-client-id',
          grant_type: 'refresh_token',
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
    expect(() => {
      // @ts-expect-error This intentionally does not have a payload to test the error case.
      oauth2.token.validate();
    }).toThrow();

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
