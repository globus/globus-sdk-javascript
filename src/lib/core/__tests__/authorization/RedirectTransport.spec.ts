import '../../../../__mocks__/sessionStorage';
import '../../../../__mocks__/window-location';
import PKCE from 'js-pkce';
import { RedirectTransport } from '../../authorization/RedirectTransport';

const MOCK_CONFIG = {
  client_id: 'CLIENT_ID',
  redirect_uri: 'https://redirect_uri/my-page',
  authorization_endpoint: 'AUTHORIZATION_ENDPOINT',
  token_endpoint: 'TOKEN_ENDPOINT',
  requested_scopes: 'REQUIRED_SCOPES',
};

const MOCK_TOKEN = {
  access_token: 'ACCESS_TOKEN',
  expires_in: 12000,
  refresh_expires_in: 12000,
  refresh_token: 'REFRESH_TOKEN',
  scope: MOCK_CONFIG.requested_scopes,
  token_type: 'Bearer',
};

describe('RedirectTransport', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should authorize using the window.location.replace method', async () => {
    const transport = new RedirectTransport(MOCK_CONFIG);
    transport.send();
    expect(window.location.replace).toHaveBeenCalled();
    expect(window.location.replace).toHaveBeenCalledWith(
      expect.stringContaining(
        'AUTHORIZATION_ENDPOINT?response_type=code&client_id=CLIENT_ID&state=&scope=REQUIRED_SCOPES&redirect_uri=https%3A%2F%2Fredirect_uri%2Fmy-page',
      ),
    );
  });

  describe('getToken', () => {
    it('returns `undefined` when called on location with missing required parameters (code)', async () => {
      window.location.href = MOCK_CONFIG.redirect_uri;
      const transport = new RedirectTransport(MOCK_CONFIG);
      const response = await transport.getToken();
      expect(response).toBeUndefined();
    });

    it('removes code and state from location after processing', async () => {
      jest
        .spyOn(PKCE.prototype, 'exchangeForAccessToken')
        .mockImplementation(async () => MOCK_TOKEN);

      const transport = new RedirectTransport(MOCK_CONFIG);
      window.location.href = `${MOCK_CONFIG.redirect_uri}?code=CODE&state=SOME_STATE`;
      const response = await transport.getToken();
      expect(response).toBe(MOCK_TOKEN);
      expect(window.location.replace).toHaveBeenCalled();
      expect(window.location.replace).toHaveBeenCalledWith(new URL(MOCK_CONFIG.redirect_uri));
    });
  });
});
