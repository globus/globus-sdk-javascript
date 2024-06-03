import PKCE from 'js-pkce';
import { HttpResponse, http } from 'msw';
import { setup } from '../../../../__mocks__/localStorage';
import server from '../../../../__mocks__/server';
import '../../../../__mocks__/sessionStorage';
import '../../../../__mocks__/window-location';
import { AuthorizationManager } from '../../authorization/AuthorizationManager';
import { Event } from '../../authorization/Event';
import {
  TRANSFER_AUTHORIZATION_REQUIREMENTS_ERROR,
  TRANSFER_CONSENT_REQUIRED_ERROR,
  TRANSFER_GENERIC_ERROR,
} from '../errors.spec';

describe('AuthorizationManager', () => {
  beforeEach(() => {
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

  it('can be created without providing scopes', () => {
    const instance = new AuthorizationManager({
      client: 'client_id',
      redirect: 'https://redirect_uri',
    });
    expect(instance).toBeDefined();
    expect(instance.authenticated).toBe(false);
    instance.login();
    expect(window.location.replace).toHaveBeenCalledTimes(1);
    expect(window.location.replace).toHaveBeenCalledWith(
      expect.stringContaining('scope=openid+profile+email&'),
    );
  });

  it('throws if no "client_id" is provided', () => {
    expect(() => {
      // @ts-ignore – For end-users using Typescript, this will be caught at compile time...
      const instance = new AuthorizationManager({
        redirect: 'https://redirect_uri',
        scopes: 'foobar baz',
      });
      expect(instance).toBeUndefined();
    }).toThrow();
  });

  it('should startSilentRefresh on creation', () => {
    const spy = jest.spyOn(AuthorizationManager.prototype, 'startSilentRefresh');
    const instance = new AuthorizationManager({
      client: 'client_id',
      redirect: 'https://redirect_uri',
      scopes: 'foobar baz',
    });
    expect(instance).toBeDefined();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should refresh existing tokens on bootstrap', async () => {
    const TOKEN = {
      access_token: 'access-token',
      scope: 'profile email openid',
      expires_in: 172800,
      token_type: 'Bearer',
      resource_server: 'auth.globus.org',
      refresh_token: 'refresh-token',
      other_tokens: [],
    };

    setup({
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

    const spy = jest.spyOn(AuthorizationManager.prototype, 'refreshToken');

    const instance = new AuthorizationManager({
      client: 'client_id',
      redirect: 'https://redirect_uri',
      scopes: 'profile email openid',
      useRefreshTokens: true,
    });

    expect(instance.authenticated).toBe(true);
    expect(instance.tokens.auth?.access_token).toBe('access-token');
    expect(instance.tokens.transfer?.access_token).toBe('access-token');

    expect(spy).toHaveBeenCalledTimes(2);
    /**
     * This effectively waits for the next tick to allow the refresh promise to resolve.
     */
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
    expect(instance.tokens.auth?.access_token).toBe('new-token');
    expect(instance.tokens.auth?.refresh_token).toBe('new-refresh-token');
    /**
     * The transfer token should not be refreshed due to the thrown error.
     */
    expect(instance.tokens.transfer?.access_token).toBe('access-token');
  });

  it('should bootstrap from an existing token', () => {
    setup({
      'client_id:auth.globus.org': JSON.stringify({ resource_server: 'auth.globus.org' }),
      'client_id:foobar': JSON.stringify({ resource_server: 'foobar' }),
      'client_id:baz': JSON.stringify({ resource_server: 'baz' }),
    });
    const spy = jest.spyOn(Event.prototype, 'dispatch');
    const instance = new AuthorizationManager({
      client: 'client_id',
      redirect: 'https://redirect_uri',
      scopes: 'foobar baz',
    });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      isAuthenticated: true,
      token: { resource_server: 'auth.globus.org' },
    });
    expect(instance.authenticated).toBe(true);
  });

  it('supports login', () => {
    const instance = new AuthorizationManager({
      client: 'client_id',
      redirect: 'https://redirect_uri',
      scopes: 'foobar baz',
    });
    instance.login();
    expect(window.location.replace).toHaveBeenCalledTimes(1);
    expect(window.location.replace).toHaveBeenCalledWith(
      expect.stringContaining(
        'https://auth.globus.org/v2/oauth2/authorize?response_type=code&client_id=client_id&state=&scope=foobar+baz+openid+profile+email&redirect_uri=https%3A%2F%2Fredirect_uri',
      ),
    );
  });

  it.only('supports login with additionalParameters', () => {
    const instance = new AuthorizationManager({
      client: 'client_id',
      redirect: 'https://redirect_uri',
      scopes: 'foobar baz',
    });
    instance.login({
      additionalParams: {
        page: 'some.example.state',
      },
    });
    const url = new URL(window.location.href);
    expect(url.searchParams.get('page')).toBe('some.example.state');
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
      setup({
        'client_id:auth.globus.org': JSON.stringify(AUTH_TOKEN_FIXTURE),
      });
      const instance = new AuthorizationManager({
        client: 'client_id',
        redirect: 'https://redirect_uri',
        scopes: 'foobar baz',
      });
      expect(instance.user).toMatchObject({
        sub: '1234567890',
        name: 'John Doe',
        iat: 1516239022,
      });
    });
  });

  describe('defaultScopes', () => {
    it('supports custom value', () => {
      const instance = new AuthorizationManager({
        client: 'client_id',
        redirect: 'https://redirect_uri',
        scopes: 'foobar baz',
        defaultScopes: 'openid',
      });
      instance.login();
      expect(window.location.replace).toHaveBeenCalledTimes(1);
      expect(window.location.replace).toHaveBeenCalledWith(
        expect.stringContaining(
          'https://auth.globus.org/v2/oauth2/authorize?response_type=code&client_id=client_id&state=&scope=foobar+baz+openid&redirect_uri=https%3A%2F%2Fredirect_uri',
        ),
      );
    });

    it('can be disabled', () => {
      const instance = new AuthorizationManager({
        client: 'client_id',
        redirect: 'https://redirect_uri',
        scopes: 'foobar baz',
        defaultScopes: false,
      });
      instance.login();
      expect(window.location.replace).toHaveBeenCalledTimes(1);
      expect(window.location.replace).toHaveBeenCalledWith(
        expect.stringContaining(
          'https://auth.globus.org/v2/oauth2/authorize?response_type=code&client_id=client_id&state=&scope=foobar+baz&redirect_uri=https%3A%2F%2Fredirect_uri',
        ),
      );
    });
  });

  it('requests "offline_access" with useRefreshTokens', () => {
    const instance = new AuthorizationManager({
      client: 'client_id',
      redirect: 'https://redirect_uri',
      scopes: 'foobar baz',
      useRefreshTokens: true,
    });
    instance.login();
    expect(window.location.replace).toHaveBeenCalledTimes(1);
    expect(window.location.replace).toHaveBeenCalledWith(
      expect.stringContaining(
        'https://auth.globus.org/v2/oauth2/authorize?response_type=code&client_id=client_id&state=&scope=foobar+baz+openid+profile+email+offline_access&redirect_uri=https%3A%2F%2Fredirect_uri',
      ),
    );
  });

  it('handleCodeRedirect', async () => {
    const MOCK_TOKEN = {
      access_token: 'ACCESS_TOKEN',
      expires_in: 12000,
      token_type: 'Bearer',
      resource_server: 'auth.globus.org',
      state: 'STATE',
      scope: 'openid profile email',
      /**
       * @todo These are actually NOT part of the token response, unless requesting `offline_access`, but
       * js-pkce enforces the presence of these properties.
       * @see https://github.com/bpedroza/js-pkce/pull/48
       */
      refresh_expires_in: 0,
      refresh_token: 'REFRESH_TOKEN',
    };

    const CONFIG = {
      client: 'client_id',
      redirect: 'https://redirect_uri',
      scopes: '',
    };
    jest.spyOn(PKCE.prototype, 'exchangeForAccessToken').mockImplementation(async () => MOCK_TOKEN);

    const instance = new AuthorizationManager(CONFIG);
    const spy = jest.spyOn(instance.events.authenticated, 'dispatch');

    window.location.href = 'https://redirect_uri?code=CODE';
    await instance.handleCodeRedirect();
    expect(instance.authenticated).toBe(true);
    expect(spy).toHaveBeenCalledWith({
      isAuthenticated: true,
      token: MOCK_TOKEN,
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  describe('reset', () => {
    it('resets the AuthenticationManager dispatching expected events', () => {
      setup({
        'client_id:auth.globus.org': JSON.stringify({ resource_server: 'auth.globus.org' }),
        'client_id:foobar': JSON.stringify({ resource_server: 'foobar' }),
        'client_id:baz': JSON.stringify({ resource_server: 'baz' }),
      });

      const spy = jest.spyOn(Event.prototype, 'dispatch');

      const instance = new AuthorizationManager({
        client: 'client_id',
        redirect: 'https://redirect_uri',
        scopes: 'foobar baz',
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
      const store = {
        'some-entry': 'some-value',
        'client_id:auth.globus.org': JSON.stringify({ resource_server: 'auth.globus.org' }),
        'client_id:foobar': JSON.stringify({ resource_server: 'foobar' }),
        'client_id:baz': JSON.stringify({ resource_server: 'baz' }),
      };

      setup(store);

      const instance = new AuthorizationManager({
        client: 'client_id',
        redirect: 'https://redirect_uri',
        scopes: 'foobar baz',
      });
      /**
       * Check values before `reset` to ensure they are present.
       */
      expect(localStorage.getItem('some-entry')).toBe(store['some-entry']);
      expect(localStorage.getItem('client_id:foobar')).toBe(store['client_id:foobar']);
      expect(localStorage.getItem('client_id:baz')).toBe(store['client_id:baz']);
      instance.reset();
      /**
       * Check values after `reset`...
       */
      expect(localStorage.getItem('some-entry')).toBe(store['some-entry']);
      expect(localStorage.getItem('client_id:foobar')).toBe(null);
      expect(localStorage.getItem('client_id:baz')).toBe(null);
    });
  });

  it('revoke', async () => {
    setup({
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

describe('AuthorizationManager - Error Utilities', () => {
  let instance: AuthorizationManager;

  beforeEach(() => {
    jest.restoreAllMocks();
    instance = new AuthorizationManager({
      client: 'CLIENT_ID',
      redirect: 'https://globus.github.io/example-data-portal/authenticate',
      scopes: 'urn:globus:auth:scope:transfer.api.globus.org:all',
    });
  });

  describe('handleErrorResponse', () => {
    it('should no-op on an unknown error', () => {
      const location = window.location.href;
      instance.handleErrorResponse(TRANSFER_GENERIC_ERROR);
      expect(window.location.href).toBe(location);
    });

    it('should handle Authorization Requirements errors', () => {
      instance.handleErrorResponse(TRANSFER_AUTHORIZATION_REQUIREMENTS_ERROR);
      const url = new URL(window.location.href);
      expect(url.searchParams.get('session_message')).toBe(
        TRANSFER_AUTHORIZATION_REQUIREMENTS_ERROR.authorization_parameters.session_message,
      );
      expect(url.searchParams.get('session_required_identities')).toBe('');
      expect(url.searchParams.get('session_required_mfa')).toBe('false');
      expect(url.searchParams.get('session_required_single_domain')).toBe('globus.org');
      expect(url.searchParams.get('prompt')).toBe('login');
    });
    it('should handle Consent Required errors', () => {
      instance.handleErrorResponse(TRANSFER_CONSENT_REQUIRED_ERROR);
      const url = new URL(window.location.href);
      expect(url.searchParams.get('scope')).toBe(
        TRANSFER_CONSENT_REQUIRED_ERROR.required_scopes.join(' '),
      );
    });
    it('should handle AuthenticationFailed errors', () => {
      const spy = jest.spyOn(instance, 'revoke');
      instance.handleErrorResponse({
        code: 'AuthenticationFailed',
        message: '...',
      });
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should return the handler when told not to execute', () => {
      const location = window.location.href;
      const handler = instance.handleErrorResponse(
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
      handler();

      const url = new URL(window.location.href);
      expect(url.searchParams.get('session_message')).toBe('This is a session message');
      expect(url.searchParams.get('session_required_identities')).toBe('');
      expect(url.searchParams.get('session_required_mfa')).toBe('false');
      expect(url.searchParams.get('session_required_single_domain')).toBe('');
      expect(url.searchParams.get('prompt')).toBe('login');
    });

    describe('additionalParameters', () => {
      it('should preserve passed in query parameters for "authorization_requirements" error', () => {
        instance.handleErrorResponse(TRANSFER_AUTHORIZATION_REQUIREMENTS_ERROR, {
          additionalParams: {
            foo: 'bar',
          },
        });
        const url = new URL(window.location.href);
        expect(url.searchParams.get('foo')).toBe('bar');
      });

      it('should preserve passed in query parameters for "ConsentRequired" error', () => {
        instance.handleErrorResponse(TRANSFER_CONSENT_REQUIRED_ERROR, {
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
