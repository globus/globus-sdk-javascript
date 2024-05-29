import { addClientInfo, toString, getClientInfo } from '../info';
import pkg from '../../../../package.json';

describe('info', () => {
  it('returns default information for the sdk', () => {
    expect(getClientInfo()).toEqual(`product=javascript-sdk,version=${pkg.version}}`);
  });

  describe('toString', () => {
    it('converts single information object', () => {
      expect(
        toString({
          product: 'example',
          version: '2.0.3-alpha',
        }),
      ).toEqual('product=example,version=2.0.3-alpha');
    });
    it('converts array of information objects', () => {
      expect(
        toString([
          {
            product: 'example',
            version: '2.0.3-alpha',
          },
          {
            product: 'web-application',
            version: '10.10.10',
          },
        ]),
      ).toEqual('product=example,version=2.0.3-alpha;product=web-application,version=10.10.10');
    });
  });

  it('allows adding client information', () => {
    addClientInfo({
      product: 'data-portal',
      version: '1.0.0',
    });
    expect(getClientInfo()).toEqual(
      `product=javascript-sdk,version=${pkg.version};product=data-portal,version=1.0.0`,
    );
  });
});
