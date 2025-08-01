import { HttpResponse, http } from 'msw';

import { mockLocalStorage, setInitialLocalStorageState } from '../../../__mocks__/localStorage';
import { mockSessionStorage } from '../../../__mocks__/sessionStorage';
import server from '../../../__mocks__/server';
import '../../../__mocks__/window-location';

import { AuthorizationManager } from '../../authorization/AuthorizationManager';
import { Event } from '../../authorization/Event';
import { TRANSFER_CONSENT_REQUIRED_ERROR, TRANSFER_GENERIC_ERROR } from '../errors.spec';
import { TRANSFER_AUTHORIZATION_REQUIREMENTS_ERROR } from '../../../__mocks__/errors/authorization_parameters';
import { oauth2 } from '../../../services/auth';
import { RedirectTransport } from '../../authorization/RedirectTransport';
import { MemoryStorage } from '../../storage/memory';
import { store } from '../../authorization/pkce';

describe('AuthorizationManager', () => {
  beforeEach(() => {
    mockLocalStorage();
    mockSessionStorage();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(AuthorizationManager).toBeDefined();
  });

  it('should create an instance of the AuthorizationManager', () => {
    const instance = new AuthorizationManager({
      client: 'client_id',
      redirect: 'https://redirect_uri',
      scopes: 'foobar baz',
    });
    expect(instance).toBeDefined();
    expect(instance.authenticated).toBe(false);
  });

  describe('MemoryStorage', () => {
    let instance: AuthorizationManager;
    beforeAll(() => {
      instance = new AuthorizationManager({
        client: 'client_id',
        redirect: 'https://redirect_uri',
        scopes: 'foobar baz',
        // `storage` property is intentionally omitted.
      });
    });

    it('default storage should be MemoryStorage', () => {
      expect(instance.storage).toBeInstanceOf(MemoryStorage);
    });

    /**
     * @todo Expand to additional transports.
     */
    if (RedirectTransport.supported) {
      it('includes all configured "scopes" on prompt', async () => {
        await instance.prompt({
          scopes: 'some:scope:example',
        });
        expect(window.location.assign).toHaveBeenCalledWith(
          expect.stringContaining('scope=some%3Ascope%3Aexample+foobar+baz+openid+profile+email&'),
        );
      });
      it('includes all configured "scopes" on handleErrorResponse', async () => {
        await instance.handleErrorResponse(TRANSFER_CONSENT_REQUIRED_ERROR);
        expect(window.location.assign).toHaveBeenCalledWith(
          expect.stringContaining(
            'scope=urn%3Aglobus%3Aauth%3Ascope%3Atransfer.api.globus.org%3Aall%5B*https%3A%2F%2Fauth.globus.org%2Fscopes%2F6c54cade-bde5-45c1-bdea-f4bd71dba2cc%2Fdata_access%5D+foobar+baz+openid+profile+email',
          ),
        );
      });
    }
  });

  if (RedirectTransport.supported) {
    it('supports prompt', async () => {
      const instance = new AuthorizationManager({
        client: 'client_id',
        redirect: 'https://redirect_uri',
      });
      await instance.prompt({
        scopes: 'some:scope:example',
      });
      expect(window.location.assign).toHaveBeenCalledTimes(1);

      expect(window.location.assign).toHaveBeenCalledWith(
        /**
         * Ensure arbitrary `scope` parameters are passed.
         */
        expect.stringContaining('scope=some%3Ascope%3Aexample'),
      );
      expect(window.location.assign).toHaveBeenCalledWith(
        /**
         * Should contain the configured `client_id`
         */
        expect.stringContaining('client_id=client_id'),
      );
      expect(window.location.assign).toHaveBeenCalledWith(
        /**
         * Should contain the configured `redirect_uri`
         */
        expect.stringContaining('redirect_uri=https%3A%2F%2Fredirect_uri'),
      );
    });
    describe('RedirectTransport', () => {
      it('can be created without providing scopes', async () => {
        const instance = new AuthorizationManager({
          client: 'client_id',
          redirect: 'https://redirect_uri',
          storage: localStorage,
        });
        expect(instance).toBeDefined();
        expect(instance.authenticated).toBe(false);
        await instance.login();
        expect(window.location.assign).toHaveBeenCalledTimes(1);
        expect(window.location.assign).toHaveBeenCalledWith(
          expect.stringContaining('scope=openid+profile+email&'),
        );
      });

      it('supports login', async () => {
        const instance = new AuthorizationManager({
          client: 'client_id',
          redirect: 'https://redirect_uri',
          scopes: 'foobar baz',
          storage: localStorage,
        });
        await instance.login();
        expect(window.location.assign).toHaveBeenCalledTimes(1);
        expect(window.location.assign).toHaveBeenCalledWith(
          expect.stringContaining(
            'https://auth.globus.org/v2/oauth2/authorize?response_type=code&client_id=client_id&scope=foobar+baz+openid+profile+email&redirect_uri=https%3A%2F%2Fredirect_uri&state=',
          ),
        );
      });

      it('supports login with additionalParameters', async () => {
        const instance = new AuthorizationManager({
          client: 'client_id',
          redirect: 'https://redirect_uri',
          scopes: 'foobar baz',
        });
        await instance.login({
          additionalParams: {
            page: 'some.example.state',
          },
        });
        const url = new URL(window.location.href);
        expect(url.searchParams.get('page')).toBe('some.example.state');
      });

      describe('defaultScopes', () => {
        it('supports custom value', async () => {
          const instance = new AuthorizationManager({
            client: 'client_id',
            redirect: 'https://redirect_uri',
            scopes: 'foobar baz',
            defaultScopes: 'openid',
            storage: localStorage,
          });
          await instance.login();
          expect(window.location.assign).toHaveBeenCalledTimes(1);
          expect(window.location.assign).toHaveBeenCalledWith(
            expect.stringContaining(
              'https://auth.globus.org/v2/oauth2/authorize?response_type=code&client_id=client_id&scope=foobar+baz+openid&redirect_uri=https%3A%2F%2Fredirect_uri&state=',
            ),
          );
        });

        it('can be disabled', async () => {
          const instance = new AuthorizationManager({
            client: 'client_id',
            redirect: 'https://redirect_uri',
            scopes: 'foobar baz',
            defaultScopes: false,
            storage: localStorage,
          });
          await instance.login();
          expect(window.location.assign).toHaveBeenCalledTimes(1);
          expect(window.location.assign).toHaveBeenCalledWith(
            expect.stringContaining(
              'https://auth.globus.org/v2/oauth2/authorize?response_type=code&client_id=client_id&scope=foobar+baz&redirect_uri=https%3A%2F%2Fredirect_uri&state=',
            ),
          );
        });

        it('requests "offline_access" with useRefreshTokens', async () => {
          const instance = new AuthorizationManager({
            client: 'client_id',
            redirect: 'https://redirect_uri',
            scopes: 'foobar baz',
            useRefreshTokens: true,
            storage: localStorage,
          });
          await instance.login();
          expect(window.location.assign).toHaveBeenCalledTimes(1);
          expect(window.location.assign).toHaveBeenCalledWith(
            expect.stringContaining(
              'https://auth.globus.org/v2/oauth2/authorize?response_type=code&client_id=client_id&scope=foobar+baz+openid+profile+email+offline_access&redirect_uri=https%3A%2F%2Fredirect_uri&state=',
            ),
          );
        });
      });

      it('handleCodeRedirect', async () => {
        const MOCK_TOKEN = {
          access_token: 'ACCESS_TOKEN',
          expires_in: 12000,
          token_type: 'Bearer',
          resource_server: 'auth.globus.org',
          state: 'STATE',
          scope: 'openid profile email',
        };

        const CONFIG = {
          client: 'client_id',
          redirect: 'https://redirect_uri',
          scopes: '',
        };

        jest
          .spyOn(oauth2.token, 'exchange')
          .mockReturnValue(Promise.resolve(Response.json(MOCK_TOKEN)));

        /**
         * Set fake state to be used as part of the OAuth flow.
         */
        const state = 'SOME_STATE';
        store.set('state', state);
        store.set('code_verifier', 'CODE_VERIFIER');

        const instance = new AuthorizationManager(CONFIG);
        const spy = jest.spyOn(instance.events.authenticated, 'dispatch');

        window.location.href = `https://redirect_uri?code=CODE&state=${state}`;
        await instance.handleCodeRedirect();
        expect(instance.authenticated).toBe(true);

        const tokenAssertion = expect.objectContaining({
          ...MOCK_TOKEN,
          __metadata: expect.objectContaining({
            created: expect.any(Number),
            expires: expect.any(Number),
          }),
        });

        expect(instance.tokens.auth).toEqual(tokenAssertion);

        expect(spy).toHaveBeenCalledWith({
          isAuthenticated: true,
          token: tokenAssertion,
        });
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });
  }

  it('throws if no "client" is provided', () => {
    expect(() => {
      // @ts-ignore – For end-users using Typescript, this will be caught at compile time...
      const instance = new AuthorizationManager({
        redirect: 'https://redirect_uri',
        scopes: 'foobar baz',
      });
      expect(instance).toBeUndefined();
    }).toThrow();
  });

  it('allows binding events on instance creation', async () => {
    const TOKEN = {
      access_token: 'access-token',
      scope: 'profile email openid',
      expires_in: 172800,
      token_type: 'Bearer',
      resource_server: 'auth.globus.org',
      refresh_token: 'refresh-token',
      other_tokens: [],
    };
    setInitialLocalStorageState({
      'client_id:auth.globus.org': JSON.stringify(TOKEN),
    });
    const authenticatedHandler = jest.fn();
    const revokeHandler = jest.fn();
    const instance = new AuthorizationManager({
      client: 'client_id',
      redirect: 'https://redirect_uri',
      scopes: 'profile email openid',
      events: {
        authenticated: authenticatedHandler,
        revoke: revokeHandler,
      },
      storage: localStorage,
    });

    expect(instance.authenticated).toBe(true);
    expect(authenticatedHandler).toHaveBeenCalledTimes(1);
    expect(authenticatedHandler).toHaveBeenCalledWith({
      isAuthenticated: true,
      token: TOKEN,
    });
    await instance.revoke();
    expect(revokeHandler).toHaveBeenCalledTimes(1);
  });

  it('refreshTokens should refresh existing tokens', async () => {
    const TOKEN = {
      access_token: 'access-token',
      scope: 'profile email openid',
      expires_in: 172800,
      token_type: 'Bearer',
      resource_server: 'auth.globus.org',
      refresh_token: 'refresh-token',
      other_tokens: [],
    };

    setInitialLocalStorageState({
      'client_id:auth.globus.org': JSON.stringify(TOKEN),
      'client_id:transfer.api.globus.org': JSON.stringify({
        ...TOKEN,
        resource_server: 'transfer.api.globus.org',
        refresh_token: 'throw',
      }),
    });

    server.use(
      http.post('https://auth.globus.org/v2/oauth2/token', async ({ request }) => {
        const refresh = (await request.formData()).get('refresh_token');

        if (refresh === 'throw') {
          return HttpResponse.json(
            {
              errors: [
                {
                  title: 'An unexpected error occurred.',
                  detail: null,
                  id: 'aa0b3877-4c86-468b-8dd5-c076e9dd3cc1',
                  code: 'UNEXPECTED_ERROR',
                  status: '500',
                },
              ],
              error: 'unexpected_error',
              error_description: 'An unexpected error occurred.',
            },
            { status: 500 },
          );
        }

        return HttpResponse.json({
          ...TOKEN,
          access_token: `new-token`,
          refresh_token: `new-refresh-token`,
        });
      }),
    );

    const instance = new AuthorizationManager({
      client: 'client_id',
      redirect: 'https://redirect_uri',
      scopes: 'profile email openid',
      useRefreshTokens: true,
      storage: localStorage,
    });

    expect(instance.authenticated).toBe(true);
    expect(instance.tokens.auth?.access_token).toBe('access-token');
    expect(instance.tokens.transfer?.access_token).toBe('access-token');

    await instance.refreshTokens();

    expect(instance.tokens.auth?.access_token).toBe('new-token');
    expect(instance.tokens.auth?.refresh_token).toBe('new-refresh-token');
    /**
     * The transfer token should not be refreshed due to the thrown error.
     */
    expect(instance.tokens.transfer?.access_token).toBe('access-token');
  });

  it('calling refreshTokens should not throw if no refresh tokens are present', async () => {
    const TOKEN = {
      access_token: 'access-token',
      scope: 'profile email openid',
      expires_in: 172800,
      token_type: 'Bearer',
      resource_server: 'auth.globus.org',
      other_tokens: [],
    };
    setInitialLocalStorageState({
      'client_id:auth.globus.org': JSON.stringify(TOKEN),
    });
    const instance = new AuthorizationManager({
      client: 'client_id',
      redirect: 'https://redirect_uri',
      scopes: 'profile email openid',
      storage: localStorage,
    });

    expect(instance.authenticated).toBe(true);
    const result = await instance.refreshTokens();
    expect(result).toEqual([
      {
        status: 'fulfilled',
        value: null,
      },
    ]);
  });

  it('should bootstrap from an existing token', () => {
    setInitialLocalStorageState({
      'client_id:auth.globus.org': JSON.stringify({ resource_server: 'auth.globus.org' }),
      'client_id:foobar': JSON.stringify({ resource_server: 'foobar' }),
      'client_id:baz': JSON.stringify({ resource_server: 'baz' }),
    });
    const spy = jest.spyOn(Event.prototype, 'dispatch');
    const instance = new AuthorizationManager({
      client: 'client_id',
      redirect: 'https://redirect_uri',
      scopes: 'foobar baz',
      storage: localStorage,
    });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      isAuthenticated: true,
      token: { resource_server: 'auth.globus.org' },
    });
    expect(instance.authenticated).toBe(true);
  });

  describe('user', () => {
    it('returns null when no Globus Auth token is present', () => {
      const instance = new AuthorizationManager({
        client: 'client_id',
        redirect: 'https://redirect_uri',
        scopes: 'foobar baz',
      });
      expect(instance.user).toBeNull();
    });
    it('parses the id_token', () => {
      const AUTH_TOKEN_FIXTURE = {
        access_token: 'AUTH_TOKEN',
        scope: 'email profile openid',
        expires_in: 172800,
        token_type: 'Bearer',
        resource_server: 'auth.globus.org',
        state: 'SOME_STATE',
        id_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      };
      setInitialLocalStorageState({
        'client_id:auth.globus.org': JSON.stringify(AUTH_TOKEN_FIXTURE),
      });
      const instance = new AuthorizationManager({
        client: 'client_id',
        redirect: 'https://redirect_uri',
        scopes: 'foobar baz',
        storage: localStorage,
      });
      expect(instance.user).toMatchObject({
        sub: '1234567890',
        name: 'John Doe',
        iat: 1516239022,
      });
    });
  });

  describe('reset', () => {
    it('resets the AuthenticationManager dispatching expected events', () => {
      setInitialLocalStorageState({
        'client_id:auth.globus.org': JSON.stringify({ resource_server: 'auth.globus.org' }),
        'client_id:foobar': JSON.stringify({ resource_server: 'foobar' }),
        'client_id:baz': JSON.stringify({ resource_server: 'baz' }),
      });

      const spy = jest.spyOn(Event.prototype, 'dispatch');

      const instance = new AuthorizationManager({
        client: 'client_id',
        redirect: 'https://redirect_uri',
        scopes: 'foobar baz',
        storage: localStorage,
      });

      expect(instance.authenticated).toBe(true);

      instance.reset();
      /**
       * `authenticated` should dispatch once with the initial state and again after reset.
       */
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenNthCalledWith(1, {
        isAuthenticated: true,
        token: { resource_server: 'auth.globus.org' },
      });
      expect(spy).toHaveBeenNthCalledWith(2, {
        isAuthenticated: false,
        token: undefined,
      });
      expect(instance.authenticated).toBe(false);
    });

    it('does not interfere (clear) items in storage it did not set', () => {
      const state = {
        'some-entry': 'some-value',
        'client_id:auth.globus.org': JSON.stringify({ resource_server: 'auth.globus.org' }),
        'client_id:foobar': JSON.stringify({ resource_server: 'foobar' }),
        'client_id:baz': JSON.stringify({ resource_server: 'baz' }),
      };

      setInitialLocalStorageState(state);

      const instance = new AuthorizationManager({
        client: 'client_id',
        redirect: 'https://redirect_uri',
        scopes: 'foobar baz',
        storage: localStorage,
      });
      /**
       * Check values before `reset` to ensure they are present.
       */
      expect(localStorage.getItem('some-entry')).toBe(state['some-entry']);
      expect(localStorage.getItem('client_id:foobar')).toBe(state['client_id:foobar']);
      expect(localStorage.getItem('client_id:baz')).toBe(state['client_id:baz']);
      instance.reset();
      /**
       * Check values after `reset`...
       */
      expect(localStorage.getItem('some-entry')).toBe(state['some-entry']);
      expect(localStorage.getItem('client_id:foobar')).toBe(undefined);
      expect(localStorage.getItem('client_id:baz')).toBe(undefined);
    });
  });

  it('revoke', async () => {
    setInitialLocalStorageState({
      'client_id:auth.globus.org': JSON.stringify({
        resource_server: 'auth.globus.org',
        access_token: 'AUTH',
      }),
      'client_id:transfer.api.globus.org': JSON.stringify({
        access_token: 'TRANSFER',
        resource_server: 'transfer.api.globus.org',
      }),
      'client_id:groups.api.globus.org': JSON.stringify({
        access_token: 'GROUPS',
        resource_server: 'groups.api.globus.org',
      }),
    });
    const instance = new AuthorizationManager({
      client: 'client_id',
      redirect: 'https://redirect_uri',
      scopes:
        'urn:globus:auth:scope:transfer.api.globus.org:all urn:globus:auth:scope:groups.api.globus.org:all',
      storage: localStorage,
    });
    const spy = jest.spyOn(instance.events.revoke, 'dispatch');
    expect(instance.authenticated).toBe(true);
    expect(instance.tokens.auth).not.toBe(null);
    expect(instance.tokens.transfer).not.toBe(null);
    expect(instance.tokens.groups).not.toBe(null);
    await instance.revoke();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(instance.authenticated).toBe(false);
    expect(instance.tokens.auth).toBe(null);
    expect(instance.tokens.transfer).toBe(null);
    expect(instance.tokens.groups).toBe(null);
  });

  it('supports adding an existing token', () => {
    const AUTH_TOKEN_FIXTURE = {
      access_token: 'AUTH_TOKEN',
      scope: 'email profile openid',
      expires_in: 172800,
      token_type: 'Bearer',
      resource_server: 'auth.globus.org',
      state: 'SOME_STATE',
      other_tokens: [
        {
          access_token: 'TRANSFER_TOKEN',
          scope: 'urn:globus:auth:scope:transfer.api.globus.org:all',
          expires_in: 172800,
          token_type: 'Bearer',
          resource_server: 'transfer.api.globus.org',
          state: 'SOME_STATE',
        },
      ],
      id_token: 'ID.TOKEN',
    };
    const instance = new AuthorizationManager({
      client: 'client_id',
      redirect: 'https://redirect_uri',
      scopes: 'transfer.api.globus.org',
    });
    instance.addTokenResponse(AUTH_TOKEN_FIXTURE);
    expect(instance.authenticated).toBe(true);
    expect(instance.tokens.auth?.access_token).toBeDefined();
    expect(instance.tokens.transfer?.access_token).toBeDefined();
  });
});

/**
 * @todo This test suite should **not** be dependent on the transport, but since the
 * `RedirectTransport` is the only transport available, we can only run these tests
 * when it is supported.
 */
if (RedirectTransport.supported) {
  describe('AuthorizationManager - Error Utilities', () => {
    let instance: AuthorizationManager;

    beforeEach(() => {
      jest.restoreAllMocks();
      instance = new AuthorizationManager({
        client: 'CLIENT_ID',
        redirect: 'https://globus.github.io/example-data-portal/authenticate',
        scopes: 'urn:globus:auth:scope:transfer.api.globus.org:all',
        storage: localStorage,
      });
    });

    describe('handleErrorResponse', () => {
      it('should no-op on an unknown error', async () => {
        const location = window.location.href;
        await instance.handleErrorResponse(TRANSFER_GENERIC_ERROR);
        expect(window.location.href).toBe(location);
      });

      it('should handle Authorization Requirements errors', async () => {
        await instance.handleErrorResponse(TRANSFER_AUTHORIZATION_REQUIREMENTS_ERROR);

        const url = new URL(window.location.href);
        expect(url.searchParams.get('session_message')).toBe(
          TRANSFER_AUTHORIZATION_REQUIREMENTS_ERROR.authorization_parameters.session_message,
        );
        expect(url.searchParams.get('session_required_identities')).toBe('');
        expect(url.searchParams.get('session_required_mfa')).toBe('false');
        expect(url.searchParams.get('session_required_single_domain')).toBe('globus.org');
        expect(url.searchParams.get('prompt')).toBe('login');
      });
      it('should handle Consent Required errors', async () => {
        await instance.handleErrorResponse(TRANSFER_CONSENT_REQUIRED_ERROR);
        const url = new URL(window.location.href);
        expect(url.searchParams.get('scope')).toBe(
          TRANSFER_CONSENT_REQUIRED_ERROR.required_scopes.join(' '),
        );
      });
      it('should handle AuthenticationFailed errors', async () => {
        const spy = jest.spyOn(instance, 'revoke');
        await instance.handleErrorResponse({
          code: 'AuthenticationFailed',
          message: '...',
        });
        expect(spy).toHaveBeenCalledTimes(1);
      });

      it('should return the handler when told not to execute', async () => {
        const location = window.location.href;
        const handler = await instance.handleErrorResponse(
          {
            code: 'SomethingHappend',
            message: '...',
            authorization_parameters: {
              session_message: 'This is a session message',
              session_required_identities: [],
              session_required_mfa: false,
              session_required_single_domain: [],
            },
          },
          false,
        );
        expect(window.location.href).toBe(location);
        expect(handler).toBeDefined();
        expect(handler).toBeInstanceOf(Function);
        await handler();

        const url = new URL(window.location.href);
        expect(url.searchParams.get('session_message')).toBe('This is a session message');
        expect(url.searchParams.get('session_required_identities')).toBe('');
        expect(url.searchParams.get('session_required_mfa')).toBe('false');
        expect(url.searchParams.get('session_required_single_domain')).toBe('');
        expect(url.searchParams.get('prompt')).toBe('login');
      });

      describe('additionalParameters', () => {
        it('should preserve passed in query parameters for "authorization_requirements" error', async () => {
          await instance.handleErrorResponse(TRANSFER_AUTHORIZATION_REQUIREMENTS_ERROR, {
            additionalParams: {
              foo: 'bar',
            },
          });
          const url = new URL(window.location.href);
          expect(url.searchParams.get('foo')).toBe('bar');
        });

        it('should preserve passed in query parameters for "ConsentRequired" error', async () => {
          await instance.handleErrorResponse(TRANSFER_CONSENT_REQUIRED_ERROR, {
            additionalParams: {
              retained_state: 'example-state',
              retained_route: 'example.route',
            },
          });
          const url = new URL(window.location.href);
          expect(url.searchParams.get('retained_state')).toBe('example-state');
          expect(url.searchParams.get('retained_route')).toBe('example.route');
          expect(url.searchParams.get('scope')).toBe(
            TRANSFER_CONSENT_REQUIRED_ERROR.required_scopes.join(' '),
          );
        });
      });
    });
  });
}
