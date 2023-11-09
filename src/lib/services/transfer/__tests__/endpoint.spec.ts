import serviceTestSuite from '../../../../__utils__/service-test-suite';
import { endpoint } from '..';

const ENDPOINT = 'c591c905-2674-4227-9d31-1ff9485945a7';

serviceTestSuite('transfer', 'endpoint', (fetch) => {
  test('get', async () => {
    await endpoint.get(ENDPOINT);
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(
      `https://transfer.api.globusonline.org/v0.10/endpoint/${ENDPOINT}`,
      {
        headers: {},
      },
    );
  });
});
