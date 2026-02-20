import { mirror } from '../../../__mocks__/handlers';
import { info, next } from '../service/versioning';

const mockConfiguration = {
  endpoint_id: 'ac9cb54b-fc48-4824-b801-1388baf0a909',
  host: 'https://fa5e.bd7c.data.globus.org',
};

describe('gcs - versioning', () => {
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
      const request = await next.info(mockConfiguration);
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
