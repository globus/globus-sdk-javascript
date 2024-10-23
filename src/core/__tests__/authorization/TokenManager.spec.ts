import { mockLocalStorage, setInitialLocalStorageState } from '../../../__mocks__/localStorage';
import { AuthorizationManager } from '../../authorization/AuthorizationManager';
import { TokenManager } from '../../authorization/TokenManager';

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
      'CLIENT_ID:auth.globus.org': JSON.stringify(TOKEN),
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
        access_token: 'AUTH',
        token_type: 'Bearer',
        scope: 'openid',
        expires_in: 1000,
      };
      const EXPIRED_TOKEN = {
        ...TOKEN,
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
        [`CLIENT_ID:${RESOURCE_SERVERS.AUTH}`]: JSON.stringify(TOKENS[0]),
        [`CLIENT_ID:${RESOURCE_SERVERS.COMPUTE}`]: JSON.stringify(TOKENS[1]),
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
        [`CLIENT_ID:${RESOURCE_SERVERS.AUTH}`]: JSON.stringify(TOKENS[0]),
        [`CLIENT_ID:${RESOURCE_SERVERS.COMPUTE}`]: JSON.stringify(TOKENS[1]),
        [`CLIENT_ID:${GCS_ENDPOINT_UUID}`]: JSON.stringify(TOKENS[2]),
        'some-storage-key': 'NOT-A-TOKEN',
        [`CLIENT_ID:arbitrary`]: JSON.stringify(TOKENS[3]),
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
      [`CLIENT_ID:${GCS_ENDPOINT_UUID}`]: JSON.stringify(TOKENS[0]),
      [`CLIENT_ID:${FLOW_UUID}`]: JSON.stringify(TOKENS[1]),
      [`CLIENT_ID:${RESOURCE_SERVERS.AUTH}`]: JSON.stringify(TOKENS[2]),
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
      [`CLIENT_ID:${GCS_ENDPOINT_UUID}`]: JSON.stringify(TOKENS[0]),
    });

    expect(tokens.gcs(GCS_ENDPOINT_UUID)).toEqual(TOKENS[0]);
  });
});
