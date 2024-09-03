import { entry } from '..';
import { mirror } from '../../../../__mocks__/handlers';

describe('search – entry', () => {
  test('get', async () => {
    const request = await entry.get('524de2f6-d1a6-4b49-9286-d8dccb4196ae', {
      query: {
        subject: '123abc',
      },
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
