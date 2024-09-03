import { setup } from '../../../__mocks__/localStorage';
import { AuthorizationManager } from '../../authorization/AuthorizationManager';
import { TokenLookup } from '../../authorization/TokenLookup';

import { RESOURCE_SERVERS } from '../../../services/auth/config';

describe('TokenLookup', () => {
  const manager = new AuthorizationManager({
    client: 'CLIENT_ID',
    redirect: 'REDIRECT_URI',
    scopes: 'REQUIRED_SCOPES',
  });

  const lookup = new TokenLookup({ manager });

  it('should return empty values for all defined services', () => {
    expect(lookup.auth).toBeNull();
    expect(lookup.transfer).toBeNull();
    expect(lookup.flows).toBeNull();
    expect(lookup.groups).toBeNull();
    expect(lookup.search).toBeNull();
    expect(lookup.timer).toBeNull();
    expect(lookup.compute).toBeNull();
  });

  it('should return tokens for services when in storage', () => {
    const TOKEN = { resource_server: RESOURCE_SERVERS.AUTH, access_token: 'AUTH' };
    setup({
      'CLIENT_ID:auth.globus.org': JSON.stringify(TOKEN),
    });
    expect(lookup.auth).not.toBeNull();
    expect(lookup.auth).toEqual(TOKEN);
    expect(lookup.transfer).toBeNull();
    expect(lookup.flows).toBeNull();
    expect(lookup.groups).toBeNull();
    expect(lookup.search).toBeNull();
    expect(lookup.timer).toBeNull();
    expect(lookup.compute).toBeNull();
  });

  describe('getAll', () => {
    it('should return all tokens when in storage', () => {
      const TOKENS = [
        { resource_server: RESOURCE_SERVERS.AUTH, access_token: 'TOKEN-1' },
        { resource_server: RESOURCE_SERVERS.COMPUTE, access_token: 'TOKEN-2' },
      ];
      setup({
        [`CLIENT_ID:${RESOURCE_SERVERS.AUTH}`]: JSON.stringify(TOKENS[0]),
        [`CLIENT_ID:${RESOURCE_SERVERS.COMPUTE}`]: JSON.stringify(TOKENS[1]),
      });
      expect(lookup.getAll()).toEqual([TOKENS[0], TOKENS[1]]);
    });

    it('should return all tokens for the client regardless of association with a service (e.g., GCS)', () => {
      const GCS_ENDPOINT_UUID = '385d3079-5121-40bc-a52f-055296497631';
      const TOKENS = [
        { resource_server: RESOURCE_SERVERS.AUTH, access_token: 'TOKEN-1' },
        { resource_server: RESOURCE_SERVERS.COMPUTE, access_token: 'TOKEN-2' },
        { resource_server: GCS_ENDPOINT_UUID, access_token: 'GCS-TOKEN' },
        { resource_server: 'arbitrary', access_token: 'arbitrary' },
      ];
      setup({
        [`CLIENT_ID:${RESOURCE_SERVERS.AUTH}`]: JSON.stringify(TOKENS[0]),
        [`CLIENT_ID:${RESOURCE_SERVERS.COMPUTE}`]: JSON.stringify(TOKENS[1]),
        [`CLIENT_ID:${GCS_ENDPOINT_UUID}`]: JSON.stringify(TOKENS[2]),
        'some-storage-key': 'NOT-A-TOKEN',
        [`CLIENT_ID:arbitrary`]: JSON.stringify(TOKENS[3]),
      });
      expect(lookup.getAll()).toEqual([TOKENS[0], TOKENS[1], TOKENS[2], TOKENS[3]]);
      expect(lookup.getAll()).not.toContain('NOT-A-TOKEN');
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
    setup({
      [`CLIENT_ID:${GCS_ENDPOINT_UUID}`]: JSON.stringify(TOKENS[0]),
      [`CLIENT_ID:${FLOW_UUID}`]: JSON.stringify(TOKENS[1]),
      [`CLIENT_ID:${RESOURCE_SERVERS.AUTH}`]: JSON.stringify(TOKENS[2]),
    });

    expect(lookup.getByResourceServer(GCS_ENDPOINT_UUID)).toEqual(TOKENS[0]);
    expect(lookup.getByResourceServer(FLOW_UUID)).toEqual(TOKENS[1]);
    expect(lookup.getByResourceServer(RESOURCE_SERVERS.AUTH)).toEqual(TOKENS[2]);
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
    setup({
      [`CLIENT_ID:${GCS_ENDPOINT_UUID}`]: JSON.stringify(TOKENS[0]),
    });

    expect(lookup.gcs(GCS_ENDPOINT_UUID)).toEqual(TOKENS[0]);
  });
});
