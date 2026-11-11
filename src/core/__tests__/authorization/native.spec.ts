/**
 * Tests for using the `AuthorizationManager` outside of a browser (e.g., Node.js CLIs, MCP servers).
 */
import { HttpResponse, http } from 'msw';

import server from '../../../__mocks__/server';
import { MapStorage } from '../../../__mocks__/map-storage';
import * as authorization from '../../authorization';
import { AuthorizationManager } from '../../authorization/AuthorizationManager';
import { generateCodeChallenge } from '../../authorization/pkce';

const TOKEN_RESPONSE = {
  access_token: 'auth-access-token',
  refresh_token: 'auth-refresh-token',
  resource_server: 'auth.globus.org',
  token_type: 'Bearer',
  scope: 'openid profile email',
  expires_in: 172800,
  state: 'state',
  other_tokens: [
    {
      access_token: 'transfer-access-token',
      resource_server: 'transfer.api.globus.org',
      token_type: 'Bearer',
      scope: 'urn:globus:auth:scope:transfer.api.globus.org:all',
      expires_in: 172800,
    },
  ],
};

/**
 * Register a token endpoint handler, returning the form data of the exchange requests received.
 */
function mockExchange(respond: () => Response = () => HttpResponse.json(TOKEN_RESPONSE)) {
  const requests: { form: Record<string, string>; search: string }[] = [];
  server.use(
    http.post('https://auth.globus.org/v2/oauth2/token', async ({ request }) => {
      const form: Record<string, string> = {};
      (await request.formData()).forEach((v, k) => {
        form[k] = `${v}`;
      });
      requests.push({ form, search: new URL(request.url).search });
      return respond();
    }),
  );
  return requests;
}

describe('AuthorizationManager without a browser', () => {
  describe('redirect', () => {
    it('is not required to create an instance and manage tokens', async () => {
      const manager = authorization.create({ client: 'client_id', storage: new MapStorage() });
      manager.addTokenResponse(TOKEN_RESPONSE);
      expect(manager.authenticated).toBe(true);
      await expect(manager.getToken('transfer.api.globus.org')).resolves.toMatchObject({
        access_token: 'transfer-access-token',
      });
    });

    it('is required by the browser transports', async () => {
      const manager = authorization.create({ client: 'client_id' });
      await expect(manager.login()).rejects.toThrow(/`redirect` must be configured/);
      await expect(manager.prompt()).rejects.toThrow(/`redirect` must be configured/);
    });
  });

  describe('startAuthorization', () => {
    it('builds a PKCE authorization request', async () => {
      const manager = authorization.create({
        client: 'client_id',
        scopes: 'urn:globus:auth:scope:transfer.api.globus.org:all',
        useRefreshTokens: true,
      });
      const request = await manager.startAuthorization();
      const url = new URL(request.url);
      expect(`${url.origin}${url.pathname}`).toBe('https://auth.globus.org/v2/oauth2/authorize');
      expect(Object.fromEntries(url.searchParams)).toEqual({
        response_type: 'code',
        client_id: 'client_id',
        scope:
          'urn:globus:auth:scope:transfer.api.globus.org:all openid profile email offline_access',
        redirect_uri: 'https://auth.globus.org/v2/web/auth-code',
        state: request.state,
        code_challenge: await generateCodeChallenge(request.code_verifier),
        code_challenge_method: 'S256',
      });
      expect(request.redirect_uri).toBe('https://auth.globus.org/v2/web/auth-code');
      expect(request.scope).toBe(url.searchParams.get('scope'));
      expect(request.state).toMatch(/^[A-Za-z0-9_-]{22}$/);
      expect(request.code_verifier).toHaveLength(43);
    });

    it('supports a custom redirect, scopes, and additional parameters', async () => {
      const manager = authorization.create({ client: 'client_id', defaultScopes: false });
      const request = await manager.startAuthorization({
        redirect: 'http://127.0.0.1:8080/callback',
        scopes: 'some:scope',
        params: { prompt: 'login', state: 'my-state', access_type: 'offline' },
      });
      const params = new URL(request.url).searchParams;
      expect(params.get('redirect_uri')).toBe('http://127.0.0.1:8080/callback');
      expect(params.get('scope')).toBe('some:scope');
      expect(params.get('prompt')).toBe('login');
      expect(params.get('access_type')).toBe('offline');
      expect(params.get('state')).toBe('my-state');
      expect(request.state).toBe('my-state');
      expect(request.redirect_uri).toBe('http://127.0.0.1:8080/callback');
    });

    it('uses the configured `redirect` when provided', async () => {
      const manager = authorization.create({ client: 'client_id', redirect: 'https://example' });
      const request = await manager.startAuthorization();
      expect(request.redirect_uri).toBe('https://example');
    });

    it('does not modify the instance state', async () => {
      const manager = authorization.create({ client: 'client_id' });
      manager.addTokenResponse(TOKEN_RESPONSE);
      await manager.startAuthorization();
      expect(manager.authenticated).toBe(true);
      expect(manager.tokens.getAll()).toHaveLength(2);
    });
  });

  describe('completeAuthorization', () => {
    it('exchanges the code and stores the tokens', async () => {
      const requests = mockExchange();
      const manager = authorization.create({ client: 'client_id' });
      const request = await manager.startAuthorization({ redirect: 'http://127.0.0.1/cb' });

      const response = await manager.completeAuthorization(request, {
        code: 'the-code',
        state: request.state,
      });

      expect(response).toEqual(TOKEN_RESPONSE);
      expect(requests).toEqual([
        {
          search: '',
          form: {
            grant_type: 'authorization_code',
            code: 'the-code',
            client_id: 'client_id',
            code_verifier: request.code_verifier,
            redirect_uri: 'http://127.0.0.1/cb',
          },
        },
      ]);
      expect(manager.authenticated).toBe(true);
      expect(manager.tokens.auth?.access_token).toBe('auth-access-token');
      expect(manager.tokens.transfer?.access_token).toBe('transfer-access-token');
    });

    it('accepts the redirect URL (loopback)', async () => {
      const requests = mockExchange();
      const manager = authorization.create({ client: 'client_id' });
      const request = await manager.startAuthorization({ redirect: 'http://127.0.0.1/cb' });
      await manager.completeAuthorization(
        request,
        new URL(`http://127.0.0.1/cb?code=url-code&state=${request.state}`),
      );
      expect(requests[0]?.form['code']).toBe('url-code');
    });

    it('accepts a code without `state` (copied from the "auth code" page)', async () => {
      const requests = mockExchange();
      const manager = authorization.create({ client: 'client_id' });
      const request = await manager.startAuthorization();
      await manager.completeAuthorization(request, { code: 'pasted-code' });
      expect(requests[0]?.form).toMatchObject({
        code: 'pasted-code',
        redirect_uri: 'https://auth.globus.org/v2/web/auth-code',
      });
    });

    it('supports `includeConsentedScopes`', async () => {
      const requests = mockExchange();
      const manager = authorization.create({ client: 'client_id' });
      const request = await manager.startAuthorization();
      await manager.completeAuthorization(
        request,
        { code: 'code' },
        { includeConsentedScopes: true },
      );
      expect(requests[0]?.search).toBe('?include_consented_scopes=true');
    });

    it('adds tokens without resetting existing tokens (additional consent)', async () => {
      mockExchange(() =>
        HttpResponse.json({
          ...TOKEN_RESPONSE,
          access_token: 'new-auth-access-token',
          other_tokens: [
            {
              access_token: 'groups-access-token',
              resource_server: 'groups.api.globus.org',
              token_type: 'Bearer',
              scope: 'urn:globus:auth:scope:groups.api.globus.org:all',
              expires_in: 172800,
            },
          ],
        }),
      );
      const manager = authorization.create({ client: 'client_id' });
      manager.addTokenResponse(TOKEN_RESPONSE);
      const request = await manager.startAuthorization({
        scopes: 'urn:globus:auth:scope:groups.api.globus.org:all',
      });
      await manager.completeAuthorization(request, { code: 'code' });
      expect(manager.tokens.auth?.access_token).toBe('new-auth-access-token');
      expect(manager.tokens.transfer?.access_token).toBe('transfer-access-token');
      expect(manager.tokens.groups?.access_token).toBe('groups-access-token');
    });

    it('rejects a mismatched `state` without exchanging the code', async () => {
      const requests = mockExchange();
      const manager = authorization.create({ client: 'client_id' });
      const request = await manager.startAuthorization();
      await expect(
        manager.completeAuthorization(request, { code: 'code', state: 'forged' }),
      ).rejects.toThrow(/Invalid State/);
      expect(requests).toHaveLength(0);
    });

    it('rejects a redirect without `state` without exchanging the code', async () => {
      const requests = mockExchange();
      const manager = authorization.create({ client: 'client_id' });
      const request = await manager.startAuthorization({ redirect: 'http://127.0.0.1/cb' });
      await expect(
        manager.completeAuthorization(request, new URL('http://127.0.0.1/cb?code=injected')),
      ).rejects.toThrow(/Invalid State/);
      await expect(
        manager.completeAuthorization(request, new URLSearchParams({ code: 'injected' })),
      ).rejects.toThrow(/Invalid State/);
      expect(requests).toHaveLength(0);
    });

    it('rejects an error redirect', async () => {
      const manager = authorization.create({ client: 'client_id' });
      const request = await manager.startAuthorization();
      await expect(
        manager.completeAuthorization(
          request,
          new URLSearchParams({ error: 'access_denied', error_description: 'User denied' }),
        ),
      ).rejects.toThrow('User denied');
      await expect(manager.completeAuthorization(request, new URLSearchParams())).rejects.toThrow(
        /Missing authorization code/,
      );
    });

    it('throws an OAuthTokenError when the exchange fails', async () => {
      mockExchange(() => HttpResponse.json({ error: 'invalid_grant' }, { status: 400 }));
      const manager = authorization.create({ client: 'client_id' });
      const request = await manager.startAuthorization();
      const error = await manager.completeAuthorization(request, { code: 'code' }).catch((e) => e);
      expect(authorization.isOAuthTokenError(error)).toBe(true);
      expect(error).toMatchObject({
        grant_type: 'authorization_code',
        status: 400,
        error: 'invalid_grant',
      });
      expect(manager.authenticated).toBe(false);
    });
  });

  describe('storageKeyPrefix', () => {
    it('defaults to the client ID followed by a colon', () => {
      expect(authorization.create({ client: 'client_id' }).storageKeyPrefix).toBe('client_id:');
    });

    it('isolates instances that share a storage', async () => {
      const storage = new MapStorage();
      const sandbox = authorization.create({
        client: 'client_id',
        storage,
        storageKeyPrefix: 'sandbox:client_id:',
      });
      const production = authorization.create({
        client: 'client_id',
        storage,
        storageKeyPrefix: 'production:client_id:',
      });
      sandbox.addTokenResponse(TOKEN_RESPONSE);

      expect(storage.getItem('sandbox:client_id:auth.globus.org')).not.toBeNull();
      expect(production.tokens.auth).toBeNull();
      expect(production.tokens.getAll()).toEqual([]);

      production.reset();
      expect(sandbox.tokens.getAll()).toHaveLength(2);
    });
  });

  it('exports types and helpers for consumers', () => {
    expect(authorization.AuthorizationManager).toBe(AuthorizationManager);
    expect(authorization.TokenManager).toBeDefined();
    expect(authorization.MemoryStorage).toBeDefined();
    expect(authorization.OAuthTokenError).toBeDefined();
    expect(authorization.isTokenExpired(null)).toBeUndefined();
    expect(authorization.TokenManager.isTokenExpired(null)).toBeUndefined();
    /**
     * Type-only exports; this will fail to compile if they are not exported.
     */
    const token: authorization.StoredToken = {
      ...TOKEN_RESPONSE,
      __metadata: { created: 0, expires: null },
    };
    const response: authorization.TokenResponse = TOKEN_RESPONSE;
    const types: [
      authorization.Token,
      authorization.TokenWithRefresh,
      authorization.JwtUserInfo | null,
      authorization.TokenMetadata | undefined,
    ] = [token, TOKEN_RESPONSE, null, undefined];
    expect(response).toBeDefined();
    expect(types).toHaveLength(4);
  });
});
