import { setup } from '../../../../__mocks__/localStorage';
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
});
