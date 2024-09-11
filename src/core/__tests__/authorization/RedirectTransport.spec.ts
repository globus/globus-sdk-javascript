import { version } from 'node:process';

import '../../../__mocks__/sessionStorage';
import '../../../__mocks__/window-location';
import { RedirectTransport } from '../../authorization/RedirectTransport';
import { oauth2 } from '../../../services/auth';

const MOCK_CONFIG = {
  client: 'CLIENT_ID',
  redirect: 'https://redirect_uri/my-page',
  authorization_endpoint: 'AUTHORIZATION_ENDPOINT',
  token_endpoint: 'TOKEN_ENDPOINT',
  scopes: 'REQUIRED_SCOPES',
};

const MOCK_TOKEN = {
  access_token: 'ACCESS_TOKEN',
  expires_in: 12000,
  refresh_expires_in: 12000,
  refresh_token: 'REFRESH_TOKEN',
  scope: MOCK_CONFIG.scopes,
  token_type: 'Bearer',
};

describe('RedirectTransport', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  if (version.startsWith('v18')) {
    it('should error in unsupported environments', () => {
      expect(() => new RedirectTransport(MOCK_CONFIG)).toThrow(
        'RedirectTransport is not supported in this environment.',
      );
    });
  } else {
    it('should authorize using the window.location.assign method', async () => {
      const transport = new RedirectTransport(MOCK_CONFIG);
      transport.send();
      expect(window.location.assign).toHaveBeenCalled();
      expect(window.location.assign).toHaveBeenCalledWith(
        expect.stringContaining(
          'AUTHORIZATION_ENDPOINT?response_type=code&client_id=CLIENT_ID&state=&scope=REQUIRED_SCOPES&redirect_uri=https%3A%2F%2Fredirect_uri%2Fmy-page',
        ),
      );
    });

    describe('getToken', () => {
      it('returns `undefined` when called on location with missing required parameters (code)', async () => {
        window.location.href = MOCK_CONFIG.redirect;
        const transport = new RedirectTransport(MOCK_CONFIG);
        const response = await transport.getToken();
        expect(response).toBeUndefined();
      });

      it('removes code and state from location after processing (by default)', async () => {
        jest
          .spyOn(oauth2.token, 'token')
          .mockReturnValue(Promise.resolve(Response.json(MOCK_TOKEN)));

        const transport = new RedirectTransport(MOCK_CONFIG);
        window.location.href = `${MOCK_CONFIG.redirect}?code=CODE&state=SOME_STATE`;
        const response = await transport.getToken();
        expect(response).toBe(MOCK_TOKEN);
        expect(window.location.replace).toHaveBeenCalled();
        expect(window.location.replace).toHaveBeenCalledWith(new URL(MOCK_CONFIG.redirect));
      });

      it('it does not alter the URL if shouldReplace: true is passed', async () => {
        jest
          .spyOn(oauth2.token, 'token')
          .mockReturnValue(Promise.resolve(Response.json(MOCK_TOKEN)));

        const url = `${MOCK_CONFIG.redirect}?code=CODE&state=SOME_STATE`;
        const transport = new RedirectTransport(MOCK_CONFIG);
        window.location.href = `${MOCK_CONFIG.redirect}?code=CODE&state=SOME_STATE`;
        const response = await transport.getToken({ shouldReplace: false });
        expect(response).toBe(MOCK_TOKEN);
        expect(window.location.assign).not.toHaveBeenCalled();
        expect(window.location.assign).not.toHaveBeenCalledWith(new URL(MOCK_CONFIG.redirect));
        expect(window.location.href).toEqual(url);
      });
    });
  }
});
