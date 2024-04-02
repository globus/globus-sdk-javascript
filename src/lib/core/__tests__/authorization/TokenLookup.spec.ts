import { setup } from '../../../../__mocks__/localStorage';
import { AuthorizationManager } from '../../authorization/AuthorizationManager';
import { TokenLookup } from '../../authorization/TokenLookup';

describe('TokenLookup', () => {
  const manager = new AuthorizationManager({
    client_id: 'CLIENT_ID',
    redirect_uri: 'REDIRECT_URI',
    requested_scopes: 'REQUIRED_SCOPES',
  });

  const lookup = new TokenLookup({ manager });

  it('should return empty values for all defined services', () => {
    expect(lookup.auth).toBeNull();
    expect(lookup.transfer).toBeNull();
    expect(lookup.flows).toBeNull();
  });

  it('should return tokens for services when in storage', () => {
    const TOKEN = { resource_server: 'auth.globus.org' };

    setup({
      'CLIENT_ID:auth.globus.org': JSON.stringify(TOKEN),
    });
    expect(lookup.auth).not.toBeNull();
    expect(lookup.auth).toEqual(TOKEN);
    expect(lookup.transfer).toBeNull();
    expect(lookup.flows).toBeNull();
  });
});
