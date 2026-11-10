import { HttpResponse, delay, http } from 'msw';

import server from '../../../__mocks__/server';
import { AuthorizationManager } from '../../authorization/AuthorizationManager';
import { OAuthTokenError, isOAuthTokenError } from '../../authorization/OAuthTokenError';

import type { Token } from '../../../services/auth/types';

const TOKEN_ENDPOINT = 'https://auth.globus.org/v2/oauth2/token';

const TOKEN = {
  access_token: 'access-token',
  refresh_token: 'refresh-token',
  resource_server: 'transfer.api.globus.org',
  token_type: 'Bearer',
  scope: 'urn:globus:auth:scope:transfer.api.globus.org:all',
  expires_in: 172800,
};

/**
 * Register a token endpoint handler, returning the `refresh_token` values received.
 */
function mockTokenEndpoint(
  respond: (refreshToken: string) => Response | Promise<Response> = () =>
    HttpResponse.json({ ...TOKEN, access_token: 'refreshed-access-token' }),
) {
  const requests: string[] = [];
  server.use(
    http.post(TOKEN_ENDPOINT, async ({ request }) => {
      const refreshToken = `${(await request.formData()).get('refresh_token')}`;
      requests.push(refreshToken);
      return respond(refreshToken);
    }),
  );
  return requests;
}

function createManager(token?: Token) {
  const manager = new AuthorizationManager({ client: 'client_id' });
  if (token) {
    manager.addTokenResponse(token);
  }
  return manager;
}

async function catchError(promise: Promise<unknown>) {
  try {
    await promise;
  } catch (e) {
    return e;
  }
  throw new Error('Expected promise to reject.');
}

describe('AuthorizationManager.refreshToken', () => {
  it('resolves `null` on failure by default', async () => {
    mockTokenEndpoint(() => HttpResponse.json({ error: 'invalid_grant' }, { status: 400 }));
    const manager = createManager(TOKEN);
    await expect(manager.refreshToken(TOKEN)).resolves.toBeNull();
    expect(manager.tokens.transfer?.access_token).toBe('access-token');
  });

  describe('throwOnError', () => {
    it('throws an OAuthTokenError for a refused refresh (invalid_grant)', async () => {
      mockTokenEndpoint(() =>
        HttpResponse.json(
          { error: 'invalid_grant', error_description: 'Refresh token is invalid.' },
          { status: 400 },
        ),
      );
      const manager = createManager(TOKEN);
      const error = await catchError(manager.refreshToken(TOKEN, { throwOnError: true }));
      expect(isOAuthTokenError(error)).toBe(true);
      expect(error).toBeInstanceOf(Error);
      expect(error).toMatchObject({
        name: 'OAuthTokenError',
        grant_type: 'refresh_token',
        resource_server: 'transfer.api.globus.org',
        status: 400,
        error: 'invalid_grant',
        error_description: 'Refresh token is invalid.',
        requiresReauthentication: true,
      });
    });

    it('throws an OAuthTokenError with the HTTP status for an outage', async () => {
      mockTokenEndpoint(() => HttpResponse.json({ error: 'unexpected_error' }, { status: 503 }));
      const manager = createManager(TOKEN);
      const error = await catchError(manager.refreshToken(TOKEN, { throwOnError: true }));
      expect(error).toMatchObject({ status: 503, requiresReauthentication: false });
    });

    it('throws an OAuthTokenError without a status for a network error', async () => {
      mockTokenEndpoint(() => HttpResponse.error());
      const manager = createManager(TOKEN);
      const error = (await catchError(
        manager.refreshToken(TOKEN, { throwOnError: true }),
      )) as OAuthTokenError;
      expect(error).toBeInstanceOf(OAuthTokenError);
      expect(error.status).toBeUndefined();
      expect((error as Error & { cause?: unknown }).cause).toBeDefined();
      expect(error.requiresReauthentication).toBe(false);
    });

    it('throws when a successful response is not a token response', async () => {
      mockTokenEndpoint(() => HttpResponse.json({ unexpected: true }));
      const manager = createManager(TOKEN);
      const error = await catchError(manager.refreshToken(TOKEN, { throwOnError: true }));
      expect(error).toMatchObject({ status: 200, body: { unexpected: true } });
    });
  });

  describe('single-flight', () => {
    it('makes one request for concurrent refreshes of the same resource server', async () => {
      const requests = mockTokenEndpoint(async () => {
        await delay(20);
        return HttpResponse.json({ ...TOKEN, access_token: 'refreshed-access-token' });
      });
      const manager = createManager(TOKEN);
      const results = await Promise.all([
        manager.refreshToken(TOKEN),
        manager.refreshToken(TOKEN),
        manager.refreshToken(TOKEN, { throwOnError: true }),
      ]);
      expect(requests).toHaveLength(1);
      results.forEach((r) => expect(r?.access_token).toBe('refreshed-access-token'));
    });

    it('shares failures with concurrent callers, honoring each caller’s `throwOnError`', async () => {
      const requests = mockTokenEndpoint(async () => {
        await delay(20);
        return HttpResponse.json({ error: 'invalid_grant' }, { status: 400 });
      });
      const manager = createManager(TOKEN);
      const [a, b] = await Promise.allSettled([
        manager.refreshToken(TOKEN),
        manager.refreshToken(TOKEN, { throwOnError: true }),
      ]);
      expect(requests).toHaveLength(1);
      expect(a).toEqual({ status: 'fulfilled', value: null });
      expect(b).toMatchObject({ status: 'rejected', reason: { error: 'invalid_grant' } });
    });

    it('allows a new refresh once the previous one has settled', async () => {
      const requests = mockTokenEndpoint();
      const manager = createManager(TOKEN);
      await manager.refreshToken(TOKEN);
      await manager.refreshToken(TOKEN);
      expect(requests).toHaveLength(2);
    });

    it('does not share refreshes between resource servers', async () => {
      const requests = mockTokenEndpoint(async (refreshToken) => {
        await delay(10);
        return HttpResponse.json(
          refreshToken === 'groups-refresh-token'
            ? { ...TOKEN, resource_server: 'groups.api.globus.org', access_token: 'groups' }
            : { ...TOKEN, access_token: 'transfer' },
        );
      });
      const GROUPS = {
        ...TOKEN,
        resource_server: 'groups.api.globus.org',
        refresh_token: 'groups-refresh-token',
      };
      const manager = createManager(TOKEN);
      manager.addTokenResponse(GROUPS);
      const [transfer, groups] = await Promise.all([
        manager.refreshToken(TOKEN),
        manager.refreshToken(GROUPS),
      ]);
      expect(requests).toHaveLength(2);
      expect(transfer?.access_token).toBe('transfer');
      expect(groups?.access_token).toBe('groups');
    });
  });
});

describe('AuthorizationManager.getToken', () => {
  const EXPIRING = { ...TOKEN, expires_in: 10 };

  it('returns `null` when there is no token', async () => {
    const requests = mockTokenEndpoint();
    const manager = createManager();
    await expect(manager.getToken('transfer.api.globus.org')).resolves.toBeNull();
    await expect(
      manager.getToken('transfer.api.globus.org', { throwOnError: true }),
    ).resolves.toBeNull();
    expect(requests).toHaveLength(0);
  });

  it('returns the stored token when it is valid for at least `minValidityMs`', async () => {
    const requests = mockTokenEndpoint();
    const manager = createManager(TOKEN);
    const token = await manager.getToken('transfer.api.globus.org', { minValidityMs: 30_000 });
    expect(token?.access_token).toBe('access-token');
    expect(requests).toHaveLength(0);
  });

  it('refreshes a token that is not valid for `minValidityMs`', async () => {
    const requests = mockTokenEndpoint();
    const manager = createManager(EXPIRING);
    const token = await manager.getToken('transfer.api.globus.org', { minValidityMs: 30_000 });
    expect(requests).toEqual(['refresh-token']);
    expect(token?.access_token).toBe('refreshed-access-token');
    /* eslint-disable-next-line no-underscore-dangle */
    expect(token?.__metadata?.expires).toEqual(expect.any(Number));
    expect(manager.tokens.transfer?.access_token).toBe('refreshed-access-token');
  });

  it('makes one refresh request for concurrent calls', async () => {
    const requests = mockTokenEndpoint(async () => {
      await delay(20);
      return HttpResponse.json({ ...TOKEN, access_token: 'refreshed-access-token' });
    });
    const manager = createManager(EXPIRING);
    const tokens = await Promise.all(
      [1, 2, 3].map(() => manager.getToken('transfer.api.globus.org', { minValidityMs: 30_000 })),
    );
    expect(requests).toHaveLength(1);
    tokens.forEach((t) => expect(t?.access_token).toBe('refreshed-access-token'));
  });

  it('returns a token that can not be refreshed until it expires', async () => {
    const withoutRefresh: Token = { ...EXPIRING };
    delete withoutRefresh.refresh_token;
    const manager = createManager(withoutRefresh);
    const token = await manager.getToken('transfer.api.globus.org', { minValidityMs: 30_000 });
    expect(token?.access_token).toBe('access-token');

    const expired = createManager({ ...withoutRefresh, expires_in: 0 });
    await expect(expired.getToken('transfer.api.globus.org')).resolves.toBeNull();
  });

  it('falls back to the unexpired stored token when the refresh fails', async () => {
    mockTokenEndpoint(() => HttpResponse.json({}, { status: 503 }));
    const manager = createManager(EXPIRING);
    const token = await manager.getToken('transfer.api.globus.org', { minValidityMs: 30_000 });
    expect(token?.access_token).toBe('access-token');
  });

  it('returns `null` when an expired token can not be refreshed', async () => {
    mockTokenEndpoint(() => HttpResponse.json({ error: 'invalid_grant' }, { status: 400 }));
    const manager = createManager({ ...TOKEN, expires_in: 0 });
    await expect(manager.getToken('transfer.api.globus.org')).resolves.toBeNull();
  });

  it('throws the refresh error with `throwOnError`', async () => {
    mockTokenEndpoint(() => HttpResponse.json({ error: 'invalid_grant' }, { status: 400 }));
    const manager = createManager(EXPIRING);
    const error = await catchError(
      manager.getToken('transfer.api.globus.org', { minValidityMs: 30_000, throwOnError: true }),
    );
    expect(error).toMatchObject({ requiresReauthentication: true });
  });

  it('returns tokens without expiration metadata as-is', async () => {
    const requests = mockTokenEndpoint();
    const manager = createManager();
    manager.storage.setItem('client_id:transfer.api.globus.org', JSON.stringify(TOKEN));
    const token = await manager.getToken('transfer.api.globus.org', { minValidityMs: 30_000 });
    expect(token?.access_token).toBe('access-token');
    expect(requests).toHaveLength(0);
  });
});
