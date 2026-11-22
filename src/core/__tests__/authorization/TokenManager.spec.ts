import { mockLocalStorage, setInitialLocalStorageState } from '../../../__mocks__/localStorage';
import { AuthorizationManager } from '../../authorization/AuthorizationManager';
import { TokenManager, TOKEN_STORAGE_VERSION, parseScopes } from '../../authorization/TokenManager';
import { MemoryStorage } from '../../storage/memory';
import { MapStorage } from '../../../__mocks__/map-storage';

import { RESOURCE_SERVERS } from '../../../services/auth/config';

import type { Token } from '../../../services/auth/types';

describe('TokenManager', () => {
  let manager: AuthorizationManager;
  let tokens: TokenManager;

  beforeEach(() => {
    mockLocalStorage();
    manager = new AuthorizationManager({
      client: 'CLIENT_ID',
      redirect: 'REDIRECT_URI',
      scopes: 'REQUIRED_SCOPES',
      storage: globalThis.localStorage,
    });
    tokens = new TokenManager({ manager });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return empty values for all defined services', () => {
    expect(tokens.auth).toBeNull();
    expect(tokens.transfer).toBeNull();
    expect(tokens.flows).toBeNull();
    expect(tokens.groups).toBeNull();
    expect(tokens.search).toBeNull();
    expect(tokens.timer).toBeNull();
    expect(tokens.compute).toBeNull();
  });

  it('should return tokens for services when in storage', () => {
    const TOKEN = { resource_server: RESOURCE_SERVERS.AUTH, access_token: 'AUTH' };
    setInitialLocalStorageState({
      'CLIENT_ID:TokenManager': JSON.stringify({
        version: TOKEN_STORAGE_VERSION,
        state: {
          tokens: {
            [TOKEN.access_token]: TOKEN,
          },
        },
      }),
    });

    expect(tokens.auth).not.toBeNull();
    expect(tokens.auth).toEqual(TOKEN);
    expect(tokens.transfer).toBeNull();
    expect(tokens.flows).toBeNull();
    expect(tokens.groups).toBeNull();
    expect(tokens.search).toBeNull();
    expect(tokens.timer).toBeNull();
    expect(tokens.compute).toBeNull();
  });

  describe('isTokenExpired', () => {
    it('processes a token without __metadata as expired', () => {
      const TOKEN: Token = {
        resource_server: RESOURCE_SERVERS.AUTH,
        access_token: 'AUTH',
        token_type: 'Bearer',
        scope: 'openid',
        expires_in: 1000,
      };
      /**
       * Expect raw token to be returned as `undefined`; Only includes relative `expires_in`.
       */
      expect(TokenManager.isTokenExpired(TOKEN)).toBe(undefined);
    });

    it('handles stored tokens', () => {
      const TOKEN: Token = {
        resource_server: RESOURCE_SERVERS.AUTH,
        access_token: 'AUTH_ACCESS_TOKEN',
        token_type: 'Bearer',
        scope: 'openid',
        expires_in: 1000,
      };
      const EXPIRED_TOKEN = {
        ...TOKEN,
        access_token: 'FLOWS_ACCESS_TOKEN',
        resource_server: RESOURCE_SERVERS.FLOWS,
        expires_in: 0,
      };

      tokens.add(TOKEN);
      tokens.add(EXPIRED_TOKEN);

      expect(TokenManager.isTokenExpired(tokens.auth)).toBe(false);
      expect(TokenManager.isTokenExpired(tokens.flows)).toBe(true);
      /**
       * `null` / Missing Token
       */
      expect(TokenManager.isTokenExpired(tokens.groups)).toBe(undefined);
    });

    it('supports remove', () => {
      const TOKEN: Token = {
        resource_server: RESOURCE_SERVERS.AUTH,
        access_token: 'AUTH',
        token_type: 'Bearer',
        scope: 'openid',
        expires_in: 1000,
      };
      tokens.add(TOKEN);
      tokens.add({ ...TOKEN, access_token: 'FLOWS', resource_server: RESOURCE_SERVERS.FLOWS });
      expect(tokens.auth).not.toBeNull();
      expect(tokens.flows).not.toBeNull();
      tokens.remove(TOKEN);
      expect(tokens.auth).toBeNull();
      expect(tokens.flows).not.toBeNull();
    });

    it('supports time augments', () => {
      const TOKEN: Token = {
        resource_server: RESOURCE_SERVERS.AUTH,
        access_token: 'AUTH',
        token_type: 'Bearer',
        scope: 'openid',
        expires_in: 5,
      };

      tokens.add(TOKEN);

      expect(TokenManager.isTokenExpired(tokens.auth, 4500)).toBe(false);
      expect(TokenManager.isTokenExpired(tokens.auth, 20 * 1000)).toBe(true);
    });
  });

  describe('getAll', () => {
    it('should return all tokens when in storage', () => {
      const TOKENS = [
        { resource_server: RESOURCE_SERVERS.AUTH, access_token: 'TOKEN-1' },
        { resource_server: RESOURCE_SERVERS.COMPUTE, access_token: 'TOKEN-2' },
      ];
      setInitialLocalStorageState({
        'CLIENT_ID:TokenManager': JSON.stringify({
          version: TOKEN_STORAGE_VERSION,
          state: {
            tokens: {
              [TOKENS[0].access_token]: TOKENS[0],
              [TOKENS[1].access_token]: TOKENS[1],
            },
          },
        }),
      });
      expect(tokens.getAll()).toEqual([TOKENS[0], TOKENS[1]]);
    });

    it('should return all tokens for the client regardless of association with a service (e.g., GCS)', () => {
      const GCS_ENDPOINT_UUID = '385d3079-5121-40bc-a52f-055296497631';
      const TOKENS = [
        { resource_server: RESOURCE_SERVERS.AUTH, access_token: 'TOKEN-1' },
        { resource_server: RESOURCE_SERVERS.COMPUTE, access_token: 'TOKEN-2' },
        { resource_server: GCS_ENDPOINT_UUID, access_token: 'GCS-TOKEN' },
        { resource_server: 'arbitrary', access_token: 'arbitrary' },
      ];
      setInitialLocalStorageState({
        'CLIENT_ID:TokenManager': JSON.stringify({
          version: TOKEN_STORAGE_VERSION,
          state: {
            tokens: {
              [TOKENS[0].access_token]: TOKENS[0],
              [TOKENS[1].access_token]: TOKENS[1],
              [TOKENS[2].access_token]: TOKENS[2],
              [TOKENS[3].access_token]: TOKENS[3],
            },
          },
        }),
        'some-storage-key': 'NOT-A-TOKEN',
      });
      expect(tokens.getAll()).toEqual([TOKENS[0], TOKENS[1], TOKENS[2], TOKENS[3]]);
      expect(tokens.getAll()).not.toContain('NOT-A-TOKEN');
    });
  });

  it('getByResourceServer', () => {
    const GCS_ENDPOINT_UUID = '385d3079-5121-40bc-a52f-055296497631';
    const FLOW_UUID = '99791f7d-6c2c-4675-af4b-b927db68bad0';
    const TOKENS = [
      {
        access_token: 'GCS-TOKEN',
        scope: `https://auth.globus.org/scopes/${GCS_ENDPOINT_UUID}/https`,
        expires_in: 172800,
        token_type: 'Bearer',
        resource_server: GCS_ENDPOINT_UUID,
        state: 'STATE',
        refresh_token: 'REFRESH-TOKEN',
      },
      {
        access_token: 'FLOW-TOKEN',
        resource_server: FLOW_UUID,
        scope: `https://auth.globus.org/scopes/${FLOW_UUID}/flow_${FLOW_UUID}_user`,
      },
      {
        resource_server: 'auth.globus.org',
        access_token: 'AUTH-TOKEN',
        scope: 'openid',
      },
    ];
    setInitialLocalStorageState({
      'CLIENT_ID:TokenManager': JSON.stringify({
        version: TOKEN_STORAGE_VERSION,
        state: {
          tokens: {
            [TOKENS[0].access_token]: TOKENS[0],
            [TOKENS[1].access_token]: TOKENS[1],
            [TOKENS[2].access_token]: TOKENS[2],
          },
        },
      }),
    });

    expect(tokens.getByResourceServer(GCS_ENDPOINT_UUID)).toEqual(TOKENS[0]);
    expect(tokens.getByResourceServer(FLOW_UUID)).toEqual(TOKENS[1]);
    expect(tokens.getByResourceServer(RESOURCE_SERVERS.AUTH)).toEqual(TOKENS[2]);
  });

  it('should provide access to GCS tokens', () => {
    const GCS_ENDPOINT_UUID = '385d3079-5121-40bc-a52f-055296497631';
    const TOKENS = [
      {
        access_token: 'GCS-TOKEN',
        scope: `https://auth.globus.org/scopes/${GCS_ENDPOINT_UUID}/https`,
        expires_in: 172800,
        token_type: 'Bearer',
        resource_server: GCS_ENDPOINT_UUID,
        state: 'STATE',
        refresh_token: 'REFRESH-TOKEN',
      },
    ];
    setInitialLocalStorageState({
      'CLIENT_ID:TokenManager': JSON.stringify({
        version: TOKEN_STORAGE_VERSION,
        state: {
          tokens: {
            [TOKENS[0].access_token]: TOKENS[0],
          },
        },
      }),
    });

    expect(tokens.gcs(GCS_ENDPOINT_UUID)).toEqual(TOKENS[0]);
  });
  it('supports .clear()', () => {
    const TOKENS = [
      { resource_server: RESOURCE_SERVERS.AUTH, access_token: 'TOKEN-1' },
      { resource_server: RESOURCE_SERVERS.COMPUTE, access_token: 'TOKEN-2' },
    ];
    setInitialLocalStorageState({
      'CLIENT_ID:TokenManager': JSON.stringify({
        version: TOKEN_STORAGE_VERSION,
        state: {
          tokens: {
            [TOKENS[0].access_token]: TOKENS[0],
            [TOKENS[1].access_token]: TOKENS[1],
          },
        },
      }),
    });
    expect(tokens.getAll().length).toBe(2);
    tokens.clear();
    expect(tokens.getAll().length).toBe(0);
  });

  describe('getAll', () => {
    it.each([
      ['MemoryStorage (default)', undefined],
      ['MemoryStorage (explicit)', () => new MemoryStorage()],
      ['a class implementing Storage', () => new MapStorage()],
    ])('returns all stored tokens using %s', (_, factory) => {
      const m = new AuthorizationManager({
        client: 'CLIENT_ID',
        scopes: 'REQUIRED_SCOPES',
        redirect: 'REDIRECT_URI',
        storage: factory?.(),
      });
      expect(m.tokens.getAll()).toEqual([]);
      m.storage.setItem('NOT_MANAGED', JSON.stringify({ access_token: 'IGNORED' }));
      m.addTokenResponse({
        access_token: 'AUTH',
        resource_server: RESOURCE_SERVERS.AUTH,
        token_type: 'Bearer',
        scope: 'openid',
        expires_in: 1000,
        other_tokens: [
          {
            access_token: 'TRANSFER',
            resource_server: RESOURCE_SERVERS.TRANSFER,
            token_type: 'Bearer',
            scope: 'urn:globus:auth:scope:transfer.api.globus.org:all',
            expires_in: 1000,
          },
        ],
      });
      expect(
        m.tokens
          .getAll()
          .map((t) => t.access_token)
          .sort(),
      ).toEqual(['AUTH', 'TRANSFER']);
    });
  });

  describe('TokenStorage', () => {
    const TRANSFER_ALL = 'urn:globus:auth:scope:transfer.api.globus.org:all';
    const DEPENDENT = `${TRANSFER_ALL}[*https://auth.globus.org/scopes/COLLECTION/data_access *https://auth.globus.org/scopes/OTHER/data_access]`;

    const token = (overrides: Partial<Token> = {}): Token => ({
      access_token: 'TRANSFER',
      resource_server: RESOURCE_SERVERS.TRANSFER,
      token_type: 'Bearer',
      scope: TRANSFER_ALL,
      expires_in: 1000,
      ...overrides,
    });

    const create = (storage: Storage) =>
      new AuthorizationManager({ client: 'CLIENT_ID', redirect: 'REDIRECT_URI', storage });

    describe('parseScopes', () => {
      it('splits on spaces outside of dependent scope brackets', () => {
        expect(parseScopes(`openid ${DEPENDENT} email`)).toEqual(['openid', DEPENDENT, 'email']);
        expect(parseScopes('  a   b ')).toEqual(['a', 'b']);
        expect(parseScopes('')).toEqual([]);
        expect(parseScopes(undefined)).toEqual([]);
      });
    });

    describe('migration', () => {
      it('migrates legacy tokens from a non-enumerable Storage and removes the legacy items', () => {
        const storage = new MapStorage();
        storage.setItem(
          'CLIENT_ID:auth.globus.org',
          JSON.stringify(
            token({
              access_token: 'AUTH',
              resource_server: RESOURCE_SERVERS.AUTH,
              scope: 'openid',
            }),
          ),
        );
        storage.setItem('CLIENT_ID:transfer.api.globus.org', JSON.stringify(token()));
        storage.setItem('CLIENT_ID:not-a-token', JSON.stringify({ foo: 'bar' }));
        storage.setItem(
          'OTHER_CLIENT:transfer.api.globus.org',
          JSON.stringify(token({ access_token: 'OTHER' })),
        );

        const am = create(storage);

        expect(am.authenticated).toBe(true);
        expect(
          am.tokens
            .getAll()
            .map((t) => t.access_token)
            .sort(),
        ).toEqual(['AUTH', 'TRANSFER']);
        expect(storage.getItem('CLIENT_ID:auth.globus.org')).toBeNull();
        expect(storage.getItem('CLIENT_ID:transfer.api.globus.org')).toBeNull();
        /**
         * Items that are not tokens, or are managed by another client, are left as-is.
         */
        expect(storage.getItem('CLIENT_ID:not-a-token')).not.toBeNull();
        expect(storage.getItem('OTHER_CLIENT:transfer.api.globus.org')).not.toBeNull();
      });

      it('does not write to storage when there is nothing to migrate', () => {
        const storage = new MapStorage();
        const am = create(storage);
        expect(am.tokens.getAll()).toEqual([]);
        expect(storage.length).toBe(0);
      });

      it('ignores (and does not throw for) an unreadable storage entry', () => {
        const storage = new MapStorage();
        storage.setItem('CLIENT_ID:TokenManager', '{not json');
        const am = create(storage);
        expect(am.tokens.getAll()).toEqual([]);
        am.addTokenResponse(token());
        expect(am.tokens.transfer?.access_token).toBe('TRANSFER');
      });
    });

    it('observes changes made by other instances sharing the storage', () => {
      const storage = new MapStorage();
      const a = create(storage);
      const b = create(storage);
      a.addTokenResponse(token({ scope: DEPENDENT }));
      expect(b.tokens.getByScope(DEPENDENT)?.access_token).toBe('TRANSFER');
      /**
       * A refresh in one instance (same resource server and scope) replaces the token for all instances.
       */
      b.addTokenResponse(token({ access_token: 'REFRESHED', scope: DEPENDENT }));
      expect(a.tokens.getByScope(DEPENDENT)?.access_token).toBe('REFRESHED');
      expect(a.tokens.getAll()).toHaveLength(1);
    });

    describe('multiple tokens for a resource server', () => {
      let am: AuthorizationManager;
      beforeEach(() => {
        jest.spyOn(Date, 'now').mockReturnValueOnce(1000).mockReturnValueOnce(2000);
        am = create(new MapStorage());
        am.addTokenResponse(token({ access_token: 'OLDER' }));
        am.addTokenResponse(token({ access_token: 'NEWER', scope: DEPENDENT }));
      });

      it('stores both tokens', () => {
        expect(
          am.tokens.getAllByResourceServer(RESOURCE_SERVERS.TRANSFER).map((t) => t.access_token),
        ).toEqual(['NEWER', 'OLDER']);
      });

      it('returns the most recently stored token by default', () => {
        expect(am.tokens.transfer?.access_token).toBe('NEWER');
        expect(am.tokens.getByResourceServer(RESOURCE_SERVERS.TRANSFER)?.access_token).toBe(
          'NEWER',
        );
      });

      it('returns the token matching a provided scope', () => {
        expect(
          am.tokens.getByResourceServer(RESOURCE_SERVERS.TRANSFER, TRANSFER_ALL)?.access_token,
        ).toBe('OLDER');
        expect(am.tokens.getByScope(TRANSFER_ALL)?.access_token).toBe('OLDER');
        expect(am.tokens.getByScope(DEPENDENT)?.access_token).toBe('NEWER');
      });

      it('falls back to the most recent token for the resource server when no token matches the scope', () => {
        am.tokens.remove(token({ access_token: 'OLDER' }));
        expect(
          am.tokens.getByResourceServer(RESOURCE_SERVERS.TRANSFER, TRANSFER_ALL)?.access_token,
        ).toBe('NEWER');
        expect(am.tokens.getByScope(TRANSFER_ALL)).toBeNull();
      });
    });

    it('replaces a token with the same resource server and scopes, regardless of scope order', () => {
      const am = create(new MapStorage());
      am.addTokenResponse(
        token({
          resource_server: RESOURCE_SERVERS.AUTH,
          scope: 'openid email profile',
          access_token: 'A',
        }),
      );
      am.addTokenResponse(
        token({
          resource_server: RESOURCE_SERVERS.AUTH,
          scope: 'profile openid email',
          access_token: 'B',
        }),
      );
      expect(am.tokens.getAll().map((t) => t.access_token)).toEqual(['B']);
    });
  });
});
