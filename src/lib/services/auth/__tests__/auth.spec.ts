import { isGlobusAuthTokenResponse, getAuthorizationEndpoint, getTokenEndpoint } from '../index';

describe('auth', () => {
  test('isGlobusAuthTokenResponse', async () => {
    expect(isGlobusAuthTokenResponse({})).toBe(false);

    expect(
      isGlobusAuthTokenResponse({
        state: 'state',
      }),
    ).toBe(false);

    expect(
      isGlobusAuthTokenResponse({
        resource_server: 'auth.globus.org',
        state: 'state',
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
