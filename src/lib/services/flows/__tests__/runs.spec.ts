import serviceTestSuite from '../../../../__utils__/service-test-suite';
import { runs } from '..';

serviceTestSuite('flows', 'runs', (fetch) => {
  test('getAll', async () => {
    await runs.getAll();
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(`https://flows.globus.org/runs`, {
      headers: {},
    });
  });
});
