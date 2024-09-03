import { isGlobusAuthTokenResponse, getAuthorizationEndpoint, getTokenEndpoint } from '../index';

describe('auth', () => {
  test('isGlobusAuthTokenResponse', async () => {
    expect(isGlobusAuthTokenResponse({})).toBe(false);

    expect(
      isGlobusAuthTokenResponse({
        access_token: 'some-token',
      }),
    ).toBe(false);

    expect(
      isGlobusAuthTokenResponse({
        access_token: 'some-token',
        resource_server: 'auth.globus.org',
      }),
    ).toBe(true);
  });

  test('getAuthorizationEndpoint', () => {
    expect(getAuthorizationEndpoint()).toEqual('https://auth.globus.org/v2/oauth2/authorize');
  });

  test('getTokenEndpoint', () => {
    expect(getTokenEndpoint()).toEqual('https://auth.globus.org/v2/oauth2/token');
  });
});
