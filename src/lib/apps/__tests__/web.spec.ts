const webapp = require('../web');

describe('web', () => {
  it('should export HOSTS', () => {
    expect(webapp.HOSTS).toBeDefined();
  });

  it('host', () => {
    expect(webapp.host).toBeDefined();
    expect(webapp.host()).toEqual('app.globus.org');
    expect(webapp.host('preview')).toEqual('app.preview.globus.org');
  });

  describe('url', () => {
    it('returns a base url when no path is provided', () => {
      expect(webapp.url()).toEqual(new URL('https://app.globus.org'));
    });
    it('returns a url with a path', () => {
      expect(webapp.url('/activity')).toEqual(new URL('https://app.globus.org/activity'));
    });
    it('supports SDKOptions (environment) as argument', () => {
      expect(webapp.url('/activity/example-uuid/overview', { environment: 'sandbox' })).toEqual(
        new URL('https://app.sandbox.globuscs.info/activity/example-uuid/overview'),
      );
    });
    it('supports GLOBUS_SDK_ENVIRONMENT environment configuration', () => {
      const ENV = process.env;
      process.env['GLOBUS_SDK_ENVIRONMENT'] = 'test';
      expect(webapp.url('/file-manager/collections/example-uuid/overview')).toEqual(
        new URL('https://app.test.globuscs.info/file-manager/collections/example-uuid/overview'),
      );
      process.env = ENV;
    });
  });
});
