import { fetch } from '../lib/core/internals/fetch';
import { createStorage } from '../lib/core/storage';

jest.mock('../lib/core/internals/fetch');

/**
 * Generate a Test Suite (`jest.describe`) for a service, providing a test function.
 *
 * The generated suite will:
 * - Mock (and provide) `fetch`
 * - Configure SDK storage to be Node compatiable ("memory")
 *
 * @param serviceName The name of the service to be tested.
 * @param featureSet The name of the service feature set being tested.
 * @param fn The Jest test function
 */
export default function suite(
  serviceName: string,
  featureSet: string,
  fn: (fetchMock: typeof fetch) => void,
) {
  describe(`${serviceName} - ${featureSet}`, () => {
    beforeEach(() => {
      createStorage('memory');
    });
    afterEach(() => {
      jest.clearAllMocks();
    });
    fn(fetch);
  });
}
