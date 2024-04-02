import '../../../../__mocks__/localStorage';
import { create } from '../../authorization';

describe('authorization', () => {
  it('should expose the create function', () => {
    expect(create).toBeDefined();
  });

  it('should create an instance of the AuthorizationManager', () => {
    const instance = create({
      client_id: 'client_id',
      redirect_uri: 'redirect_uri',
      requested_scopes: 'foobar baz',
    });
    expect(instance).toBeDefined();
  });
});
