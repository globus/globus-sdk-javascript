import { AuthorizationManager } from '../authorization/AuthorizationManager';

import { LocalStorage } from '../storage/local-storage';
import { Event } from '../authorization/Event';

/**
 * Setup the local storage state for the tests.
 */
export function setup(token?: Record<string, string>) {
  jest
    .spyOn(LocalStorage.prototype, 'get')
    .mockImplementation(() => JSON.stringify(token || undefined));
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
    setup({ token: 'example' });
    const spy = jest.spyOn(Event.prototype, 'dispatch');
    const instance = new AuthorizationManager({
      client_id: 'client_id',
      redirect_uri: 'https://redirect_uri',
      requested_scopes: 'foobar baz',
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      isAuthenticated: true,
      token: { token: 'example' },
    });
    expect(instance.authenticated).toBe(true);
  });
});
