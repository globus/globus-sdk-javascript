import { releases } from '../index';

import { mirror } from '../../../__mocks__/handlers';

describe('downloads.releases', () => {
  describe('gcs', () => {
    test('current', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(await releases.gcs.current());
      expect({
        url,
        method,
        headers,
      }).toMatchSnapshot();
    });

    test('all', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(await releases.gcs.all());
      expect({
        url,
        method,
        headers,
      }).toMatchSnapshot();
    });
  });

  describe('gcp', () => {
    test('current', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(await releases.gcp.current());
      expect({
        url,
        method,
        headers,
      }).toMatchSnapshot();
    });
  });

  test('does not send an Authorization header (unauthenticated API)', async () => {
    const results = await Promise.all([
      mirror(await releases.gcs.current()),
      mirror(await releases.gcs.all()),
      mirror(await releases.gcp.current()),
    ]);
    results.forEach(({ req: { headers } }) => {
      expect(headers).not.toHaveProperty('authorization');
    });
  });
});
