import { create } from '../authorization';

import { setup } from './AuthorizationManager.spec';

describe('authorization', () => {
  it('should expose the create function', () => {
    expect(create).toBeDefined();
  });

  it('should create an instance of the AuthorizationManager', () => {
    setup();
    const instance = create({
      client_id: 'client_id',
      redirect_uri: 'redirect_uri',
      requested_scopes: 'foobar baz',
    });
    expect(instance).toBeDefined();
  });
});
