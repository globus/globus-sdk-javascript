import '../../../__mocks__/localStorage';
import { create } from '../../authorization';

describe('authorization', () => {
  it('should expose the create function', () => {
    expect(create).toBeDefined();
  });

  it('should create an instance of the AuthorizationManager', () => {
    const instance = create({
      client: 'client_id',
      redirect: 'redirect_uri',
      scopes: 'foobar baz',
    });
    expect(instance).toBeDefined();
  });
});
