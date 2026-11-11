import { version } from 'node:process';

import { mockSessionStorage } from '../../../__mocks__/sessionStorage';
import '../../../__mocks__/window-location';
import { RedirectTransport } from '../../authorization/RedirectTransport';
import { oauth2 } from '../../../services/auth';
import { store } from '../../authorization/pkce';
import { MemoryStorage } from '../../storage/memory';

const MOCK_CONFIG = {
  client: 'CLIENT_ID',
  redirect: 'https://redirect_uri/my-page',
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
    jest.clearAllMocks();
    mockSessionStorage();
  });

  afterEach(() => {
    jest.restoreAllMocks();
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
      await transport.send();
      expect(window.location.assign).toHaveBeenCalled();
      expect(window.location.assign).toHaveBeenCalledWith(
        expect.stringContaining(
          'https://auth.globus.org/v2/oauth2/authorize?response_type=code&client_id=CLIENT_ID&scope=REQUIRED_SCOPES&redirect_uri=https%3A%2F%2Fredirect_uri%2Fmy-page&state=',
        ),
      );
    });

    it('should accept caller-provided "state"', async () => {
      const transport = new RedirectTransport({
        ...MOCK_CONFIG,
        params: {
          state: 'CUSTOM_STATE',
        },
      });
      await transport.send();
      expect(window.location.assign).toHaveBeenCalled();
      expect(window.location.assign).toHaveBeenCalledWith(
        expect.stringContaining(
          'https://auth.globus.org/v2/oauth2/authorize?response_type=code&client_id=CLIENT_ID&scope=REQUIRED_SCOPES&redirect_uri=https%3A%2F%2Fredirect_uri%2Fmy-page&state=CUSTOM_STATE',
        ),
      );
      /**
       * Ensure that the state is stored in sessionStorage.
       */
      expect(store.get('state')).toBe('CUSTOM_STATE');
    });

    it('should not allow "params" to override parameters that secure the PKCE flow', async () => {
      const transport = new RedirectTransport({
        ...MOCK_CONFIG,
        params: {
          response_type: 'token',
          client_id: 'OTHER_CLIENT',
          code_challenge: 'OTHER_CHALLENGE',
          code_challenge_method: 'plain',
          foo: 'bar',
        },
      });
      await transport.send();
      const url = new URL((window.location.assign as jest.Mock).mock.lastCall[0]);
      expect(url.searchParams.get('response_type')).toBe('code');
      expect(url.searchParams.get('client_id')).toBe(MOCK_CONFIG.client);
      expect(url.searchParams.get('code_challenge')).not.toBe('OTHER_CHALLENGE');
      expect(url.searchParams.get('code_challenge_method')).toBe('S256');
      expect(url.searchParams.get('foo')).toBe('bar');
    });

    describe('getToken', () => {
      it('returns `undefined` when called on location with missing required parameters (code)', async () => {
        window.location.href = MOCK_CONFIG.redirect;
        const transport = new RedirectTransport(MOCK_CONFIG);
        const response = await transport.getToken();
        expect(response).toBeUndefined();
      });

      it('throws when "error" parameter is present', async () => {
        window.location.href = `${MOCK_CONFIG.redirect}?error=access_denied`;
        const transport = new RedirectTransport(MOCK_CONFIG);
        await expect(async () => {
          await transport.getToken();
        }).rejects.toThrow();
      });

      it('throws and includes "error_description"', async () => {
        window.location.href = `${MOCK_CONFIG.redirect}?error=access_denied&error_description=Access+denied+by+user`;
        const transport = new RedirectTransport(MOCK_CONFIG);
        await expect(async () => {
          await transport.getToken();
        }).rejects.toThrow('Access denied by user');
      });

      it('throws on "state" mismatch', async () => {
        store.set('state', 'ACTUAL_STATE');
        window.location.href = `${MOCK_CONFIG.redirect}?code=CODE&state=INVALID_STATE`;
        const transport = new RedirectTransport(MOCK_CONFIG);
        await expect(async () => {
          await transport.getToken();
        }).rejects.toThrow('Invalid State');
      });

      it('throws on missing verifier', async () => {
        store.set('state', 'ACTUAL_STATE');
        window.location.href = `${MOCK_CONFIG.redirect}?code=CODE&state=ACTUAL_STATE`;
        const transport = new RedirectTransport(MOCK_CONFIG);
        await expect(async () => {
          await transport.getToken();
        }).rejects.toThrow('Invalid Code Verifier');
      });

      it('throws when there is no stored "state" (e.g., the flow was not started in this session)', async () => {
        /**
         * Use a `Storage` with real semantics (`getItem` returns `null` for missing items).
         */
        Object.defineProperty(globalThis, 'sessionStorage', {
          value: new MemoryStorage(),
          writable: true,
        });
        store.set('code_verifier', 'CODE_VERIFIER');
        window.location.href = `${MOCK_CONFIG.redirect}?code=CODE`;
        const transport = new RedirectTransport(MOCK_CONFIG);
        await expect(transport.getToken()).rejects.toThrow('Invalid State');
      });

      it('exchanges the code using the "redirect_uri" sent with the authorization request', async () => {
        const spy = jest
          .spyOn(oauth2.token, 'exchange')
          .mockReturnValue(Promise.resolve(Response.json(MOCK_TOKEN)));
        const OVERRIDE = 'https://redirect_uri/runtime-override';
        /**
         * The authorization request overrides the configured `redirect` with `params.redirect_uri`...
         */
        await new RedirectTransport({
          ...MOCK_CONFIG,
          params: { redirect_uri: OVERRIDE },
        }).send();
        expect(store.get('redirect_uri')).toBe(OVERRIDE);
        /**
         * ...and the redirect is processed by a transport created with the default configuration.
         */
        window.location.href = `${OVERRIDE}?code=CODE&state=${store.get('state')}`;
        await new RedirectTransport(MOCK_CONFIG).getToken({ shouldReplace: false });
        expect(spy).toHaveBeenCalledWith(
          expect.objectContaining({
            payload: expect.objectContaining({ redirect_uri: OVERRIDE }),
          }),
        );
        expect(store.get('redirect_uri') ?? null).toBeNull();
      });

      it('removes code and state from location after processing (by default)', async () => {
        jest
          .spyOn(oauth2.token, 'exchange')
          .mockReturnValue(Promise.resolve(Response.json(MOCK_TOKEN)));

        /**
         * Set fake state to be used as part of the OAuth flow.
         */
        const state = 'SOME_STATE';
        store.set('state', state);
        store.set('code_verifier', 'CODE_VERIFIER');

        const transport = new RedirectTransport(MOCK_CONFIG);

        window.location.href = `${MOCK_CONFIG.redirect}?code=CODE&state=${state}`;
        const response = await transport.getToken();
        expect(response).toEqual(MOCK_TOKEN);
        expect(window.location.replace).toHaveBeenCalled();
        expect(window.location.replace).toHaveBeenCalledWith(new URL(MOCK_CONFIG.redirect));
      });

      it('it does not alter the URL if shouldReplace: true is passed', async () => {
        jest
          .spyOn(oauth2.token, 'exchange')
          .mockReturnValue(Promise.resolve(Response.json(MOCK_TOKEN)));

        /**
         * Set fake state to be used as part of the OAuth flow.
         */
        const state = 'SOME_STATE';
        store.set('state', state);
        store.set('code_verifier', 'CODE_VERIFIER');

        const url = `${MOCK_CONFIG.redirect}?code=CODE&state=${state}`;
        const transport = new RedirectTransport(MOCK_CONFIG);
        window.location.href = url;
        const response = await transport.getToken({ shouldReplace: false });
        expect(response).toEqual(MOCK_TOKEN);
        expect(window.location.assign).not.toHaveBeenCalled();
        expect(window.location.assign).not.toHaveBeenCalledWith(new URL(MOCK_CONFIG.redirect));
        expect(window.location.href).toEqual(url);
      });
    });
  }
});
