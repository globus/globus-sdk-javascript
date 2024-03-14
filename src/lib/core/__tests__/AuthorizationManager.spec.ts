import { AuthorizationManager } from '../authorization/AuthorizationManager';

import { LocalStorage } from '../storage/local-storage';
import { Event } from '../authorization/Event';

/**
 * Setup the local storage state for the tests.
 * @param state The initial state of the local storage.
 */
export function setup(state: Record<string, string> = {}) {
  let storage = { ...state };
  jest.spyOn(LocalStorage.prototype, 'get').mockImplementation((key: string) => storage[key]);
  jest.spyOn(LocalStorage.prototype, 'set').mockImplementation((key: string, value: unknown) => {
    storage[key] = JSON.stringify(value);
  });
  jest.spyOn(LocalStorage.prototype, 'clear').mockImplementation(() => {
    storage = {};
  });
}

describe('AuthorizationManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(AuthorizationManager).toBeDefined();
  });

  it('should create an instance of the AuthorizationManager', () => {
    setup();
    const instance = new AuthorizationManager({
      client_id: 'client_id',
      redirect_uri: 'https://redirect_uri',
      requested_scopes: 'foobar baz',
    });
    expect(instance).toBeDefined();
    expect(instance.authenticated).toBe(false);
  });

  it('should startSilentRenew on creation', () => {
    setup();
    const spy = jest.spyOn(AuthorizationManager.prototype, 'startSilentRenew');
    const instance = new AuthorizationManager({
      client_id: 'client_id',
      redirect_uri: 'https://redirect_uri',
      requested_scopes: 'foobar baz',
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
      client_id: 'client_id',
      redirect_uri: 'https://redirect_uri',
      requested_scopes: 'foobar baz',
    });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      isAuthenticated: true,
      token: { resource_server: 'auth.globus.org' },
    });
    expect(instance.authenticated).toBe(true);
  });

  it('supports reset', () => {
    setup({
      'client_id:auth.globus.org': JSON.stringify({ resource_server: 'auth.globus.org' }),
      'client_id:foobar': JSON.stringify({ resource_server: 'foobar' }),
      'client_id:baz': JSON.stringify({ resource_server: 'baz' }),
    });
    const instance = new AuthorizationManager({
      client_id: 'client_id',
      redirect_uri: 'https://redirect_uri',
      requested_scopes: 'foobar baz',
    });

    expect(instance.authenticated).toBe(true);

    const spy = jest.spyOn(Event.prototype, 'dispatch');
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

  it('supports adding an existing token', () => {
    const AUTH_TOKEN_FIXTURE = {
      access_token:
        'Ag3ndPXw9oBa35eY6wY5MKjKMgmOoVJPVOlpv2wXEeKPKYMbK1HVCrxNla8qK1zmgOb19GOBj1NDbbhd8omnySQ8dGqu0z19EC84xa3',
      scope: 'email profile openid',
      expires_in: 172800,
      token_type: 'Bearer',
      resource_server: 'auth.globus.org',
      state:
        'c6bc19336e8a1c23ac0ccdb6ed2251bc6a91e361dfe86067fb06b390774dde6fbec4ef04d0d940e9fe1ed16008e4ee2027e4e56bc231219e35e9affd73fa2abe',
      other_tokens: [
        {
          access_token:
            'Agb7XkBa2VrYpGy30pjqPD7V0oJ7l5EGN5K6voOPjNPNezJEd6F5CrOKkVMOEn2100n5k0Ej18PjQ9skN4Gn6hXWDx6',
          scope: 'urn:globus:auth:scope:transfer.api.globus.org:all',
          expires_in: 172800,
          token_type: 'Bearer',
          resource_server: 'transfer.api.globus.org',
          state:
            'c6bc19336e8a1c23ac0ccdb6ed2251bc6a91e361dfe86067fb06b390774dde6fbec4ef04d0d940e9fe1ed16008e4ee2027e4e56bc231219e35e9affd73fa2abe',
        },
      ],
      id_token:
        'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlMDYxZGY1YS1iN2I5LTQ1NzgtYTczYi02ZDRhNGVkZmQ2NmUiLCJvcmdhbml6YXRpb24iOiJUaGUgVW5pdmVyc2l0eSBvZiBDaGljYWdvIiwibmFtZSI6Ikpvc2VwaCBCb3R0aWdsaWVybyIsInByZWZlcnJlZF91c2VybmFtZSI6Impib3R0aWdsaWVyb0B1Y2hpY2Fnby5lZHUiLCJpZGVudGl0eV9wcm92aWRlciI6IjBkY2Y1MDYzLWJmZmQtNDBmNy1iNDAzLTI0Zjk3ZTMyZmE0NyIsImlkZW50aXR5X3Byb3ZpZGVyX2Rpc3BsYXlfbmFtZSI6IlVuaXZlcnNpdHkgb2YgQ2hpY2FnbyIsImVtYWlsIjoiamJvdHRpZ2xpZXJvQHVjaGljYWdvLmVkdSIsImxhc3RfYXV0aGVudGljYXRpb24iOjE3MDQ5MjM4NzAsImlkZW50aXR5X3NldCI6W3sic3ViIjoiZTA2MWRmNWEtYjdiOS00NTc4LWE3M2ItNmQ0YTRlZGZkNjZlIiwib3JnYW5pemF0aW9uIjoiVGhlIFVuaXZlcnNpdHkgb2YgQ2hpY2FnbyIsIm5hbWUiOiJKb3NlcGggQm90dGlnbGllcm8iLCJ1c2VybmFtZSI6Impib3R0aWdsaWVyb0B1Y2hpY2Fnby5lZHUiLCJpZGVudGl0eV9wcm92aWRlciI6IjBkY2Y1MDYzLWJmZmQtNDBmNy1iNDAzLTI0Zjk3ZTMyZmE0NyIsImlkZW50aXR5X3Byb3ZpZGVyX2Rpc3BsYXlfbmFtZSI6IlVuaXZlcnNpdHkgb2YgQ2hpY2FnbyIsImVtYWlsIjoiamJvdHRpZ2xpZXJvQHVjaGljYWdvLmVkdSIsImxhc3RfYXV0aGVudGljYXRpb24iOjE3MDQ5MjM4NzB9LHsic3ViIjoiODY0ZGMwZDgtYTczNS00MzlkLTg3NWItNjliNmM1MDZiZjQzIiwibmFtZSI6IkpvZSBCb3R0aWdsaWVybyIsInVzZXJuYW1lIjoiam9lYm90dEBnbG9idXMub3JnIiwiaWRlbnRpdHlfcHJvdmlkZXIiOiI5MjdkNzIzOC1mOTE3LTRlYjItOWFjZS1jNTIzZmE5YmEzNGUiLCJpZGVudGl0eV9wcm92aWRlcl9kaXNwbGF5X25hbWUiOiJHbG9idXMgU3RhZmYiLCJlbWFpbCI6ImpvZWJvdHRAZ2xvYnVzLm9yZyIsImxhc3RfYXV0aGVudGljYXRpb24iOjE3MTA0MzY4NzN9LHsic3ViIjoiMWNmMjk2NDktYjJlYy00MTJjLTk1YmItZGQ3ZThjNGViMWM4IiwibmFtZSI6IkpvZSBCb3R0aWdsaWVybyIsInVzZXJuYW1lIjoiam9lYm90dC5nbG9idXNAZ21haWwuY29tIiwiaWRlbnRpdHlfcHJvdmlkZXIiOiIyOWNhMGJhMC1jNzcwLTQwM2QtODgyNy04MjI0ZmJlZTMwMmEiLCJpZGVudGl0eV9wcm92aWRlcl9kaXNwbGF5X25hbWUiOiJHb29nbGUiLCJlbWFpbCI6ImpvZWJvdHQuZ2xvYnVzQGdtYWlsLmNvbSIsImxhc3RfYXV0aGVudGljYXRpb24iOjE3MDA1MTg1MjN9LHsic3ViIjoiYTI3NGQxMzQtZmVhYS00Y2VmLWJiOTMtN2I2YmE3YzkzZTU0Iiwib3JnYW5pemF0aW9uIjoiR2xvYnVzIiwibmFtZSI6IkpvZSBCb3R0aWdsaWVybyIsInVzZXJuYW1lIjoiamJvdHRpZ2xpZXJvQGdsb2J1c2lkLm9yZyIsImlkZW50aXR5X3Byb3ZpZGVyIjoiNDExNDM3NDMtZjNjOC00ZDYwLWJiZGItZWVlY2FiYTg1YmQ5IiwiaWRlbnRpdHlfcHJvdmlkZXJfZGlzcGxheV9uYW1lIjoiR2xvYnVzIElEIiwiZW1haWwiOiJqYm90dGlnbGllcm9AdWNoaWNhZ28uZWR1IiwibGFzdF9hdXRoZW50aWNhdGlvbiI6MTcwOTIzNTI0Mn0seyJzdWIiOiI3OTVmNjUxNi1lM2M0LTRjOGItODI4ZS1iNDk3MjBhMzJjMzciLCJuYW1lIjpudWxsLCJ1c2VybmFtZSI6ImpvZWJvdHRAb2lkYy5kOWNjNjguYTU2Ny5kYXRhLmdsb2J1cy5vcmciLCJpZGVudGl0eV9wcm92aWRlciI6IjY5YjNmODgwLTY1YjQtNDc5YS04ZTI0LWJlZjlhZDUxMjZlMCIsImlkZW50aXR5X3Byb3ZpZGVyX2Rpc3BsYXlfbmFtZSI6ImRlbW8uam9zaGJyeWFuLmdsb2J1c2NzLmluZm8iLCJlbWFpbCI6bnVsbCwibGFzdF9hdXRoZW50aWNhdGlvbiI6MTcwMTM3NDE4MX1dLCJpc3MiOiJodHRwczovL2F1dGguZ2xvYnVzLm9yZyIsImF1ZCI6ImZhMTk4ZjFjLWQxZDUtNDA3ZS1iMmUxLTY3YWZkZmYxZTFhOSIsImV4cCI6MTcxMDYxMDYzMCwiaWF0IjoxNzEwNDM3ODMwLCJhdF9oYXNoIjoiTWxnQ0s3X3RBMlo3cUI3bFl2eUdYMTJaVWtLQ25yNFA3NDE1elZHNkFRdyJ9.tUGJLySW9TiM8-0tT1pfYt4Gi9WDBZAz8gOGp1n5Jm0NtdY-zW5E5CaOyUc7YYxJryoPgp5MN7w6eC0ONjJWtP1t-Hzc9n-vwxwTKoh9zk-LruMXlwNVzyoV5h6Dcv9iSNWc3L875U6eDdGkgZifZku-0HZVli8v1XO3yUjRGOWNzT6PGq5qVYH33tkbjcjXMXaDUuDibrsS0geFxAhkIEvGEzk0bKSONgntQMucZMXJXz-GrgvnYXuBVEE3RkbACEWrn93yycI5ESywNwT8CvjTVi92EZMiSS9RPp-sgbo5zuebo65aqKDf2NY266818EElCIaFV-1fu2EaD9kRHA',
    };
    setup();
    const instance = new AuthorizationManager({
      client_id: 'client_id',
      redirect_uri: 'https://redirect_uri',
      requested_scopes: 'transfer.api.globus.org',
    });
    instance.addTokenResponse(AUTH_TOKEN_FIXTURE);
    expect(instance.authenticated).toBe(true);
    expect(instance.tokens.auth?.access_token).toBeDefined();
    expect(instance.tokens.transfer?.access_token).toBeDefined();
  });
});
