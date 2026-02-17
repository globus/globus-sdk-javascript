import { subject } from '..';
import { mirror } from '../../../__mocks__/handlers';

describe('search – subject', () => {
  test('get', async () => {
    const request = await subject.get('524de2f6-d1a6-4b49-9286-d8dccb4196ae', {
      query: {
        subject: '123abc',
        result_format_version: '2017-09-01',
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

  describe('next', () => {
    test('get', async () => {
      const {
        req: { url, method, headers },
      } = await mirror(
        await subject.next.get({
          index_id: '524de2f6-d1a6-4b49-9286-d8dccb4196ae',
          request: {
            query: {
              subject: '123abc',
              result_format_version: '2017-09-01',
            },
          },
        }),
      );
      expect({
        url,
        method,
        headers,
      }).toMatchSnapshot();
    });
  });
});
