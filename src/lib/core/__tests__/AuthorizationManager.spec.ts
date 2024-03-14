import { AuthorizationManager } from '../authorization/AuthorizationManager';

import { LocalStorage } from '../storage/local-storage';
import { Event } from '../authorization/Event';

/**
 * Setup the local storage state for the tests.
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
});
