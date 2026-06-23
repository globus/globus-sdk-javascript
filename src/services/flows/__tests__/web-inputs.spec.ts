import { mirror } from '../../../__mocks__/handlers';
import { webInputs } from '..';

const WEB_INPUT_ID = 'web-input-id';

describe('flows.webInputs', () => {
  test('get', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await webInputs.get(WEB_INPUT_ID));
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('getAll', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(await webInputs.getAll());
    expect({
      url,
      method,
      headers,
    }).toMatchSnapshot();
  });

  test('respond', async () => {
    const {
      req: { url, method, headers },
    } = await mirror(
      await webInputs.respond(WEB_INPUT_ID, {
        body: {
          response: { value: 'response' },
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
