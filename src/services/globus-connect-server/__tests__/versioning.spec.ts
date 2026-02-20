import { mirror } from '../../../__mocks__/handlers';
import { info, next } from '../service/versioning';

describe('gcs - versioning', () => {
  const mockConfiguration = {
    endpoint_id: 'ac9cb54b-fc48-4824-b801-1388baf0a909',
    host: 'https://fa5e.bd7c.data.globus.org',
  };

  it('info', async () => {
    const request = await info(mockConfiguration);
    const {
      req: { url, method, headers },
    } = await mirror(request);
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  describe('next', () => {
    it('info', async () => {
      const request = await next.info({
        host: mockConfiguration.host,
      });
      const {
        req: { url, method, headers },
      } = await mirror(request);
      expect({
        url,
        method,
        headers,
      }).toMatchSnapshot();
    });
  });
});
