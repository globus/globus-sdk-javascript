import PKCE from 'js-pkce';
import { setup } from '../../../../__mocks__/localStorage';
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

  it('should startSilentRenew on creation', () => {
    const spy = jest.spyOn(AuthorizationManager.prototype, 'startSilentRenew');
    const instance = new AuthorizationManager({
      client: 'client_id',
      redirect: 'https://redirect_uri',
      scopes: 'foobar baz',
    });
    expect(instance).toBeDefined();
    expect(spy).toHaveBeenCalledTimes(1);
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

  it('reset', () => {
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

  it('revoke', async () => {
    setup({
      'client_id:auth.globus.org': JSON.stringify({ resource_server: 'auth.globus.org' }),
      'client_id:foobar': JSON.stringify({ resource_server: 'foobar' }),
      'client_id:baz': JSON.stringify({ resource_server: 'baz' }),
    });

    const instance = new AuthorizationManager({
      client: 'client_id',
      redirect: 'https://redirect_uri',
      scopes: 'foobar baz',
    });
    const spy = jest.spyOn(instance.events.revoke, 'dispatch');
    expect(instance.authenticated).toBe(true);
    await instance.revoke();
    expect(spy).toHaveBeenCalledTimes(1);
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
  });
});
