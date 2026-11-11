import {
  ORIGIN,
  listenerCount,
  popup,
  postMessage,
  resetPopup,
} from '../../../__mocks__/window-popup';
import { mockSessionStorage } from '../../../__mocks__/sessionStorage';
import { PopupTransport } from '../../authorization/PopupTransport';
import { store } from '../../authorization/pkce';
import { oauth2 } from '../../../services/auth';

const CONFIG = {
  client: 'CLIENT_ID',
  redirect: `${ORIGIN}/callback`,
  scopes: 'SCOPES',
};

const TOKEN = {
  access_token: 'ACCESS_TOKEN',
  resource_server: 'auth.globus.org',
  token_type: 'Bearer',
  scope: 'SCOPES',
  expires_in: 1000,
};

/**
 * `send()` awaits WebCrypto (for the code challenge), which settles outside of the fake timers'
 * control; wait (using real ticks) until the transport has registered its `message` listener.
 */
const realSetTimeout = setTimeout;
async function started() {
  /**
   * Up to ~2 seconds of real time; the digest can be slow when the test suite runs in parallel.
   */
  for (let i = 0; i < 400 && listenerCount() === 0; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => {
      realSetTimeout(resolve, 5);
    });
  }
  if (listenerCount() === 0) {
    throw new Error('PopupTransport did not register a "message" listener.');
  }
}

const message = (query: string) => ({ source: 'globus-sdk', url: `${CONFIG.redirect}?${query}` });

describe('PopupTransport', () => {
  beforeEach(() => {
    resetPopup();
    mockSessionStorage();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('is supported with the mocked window', () => {
    expect(PopupTransport.supported).toBe(true);
  });

  it('resolves with the token response and removes its listener', async () => {
    const exchange = jest
      .spyOn(oauth2.token, 'exchange')
      .mockImplementation(async () => Response.json(TOKEN));
    const result = new PopupTransport(CONFIG).send();
    await started();
    expect(listenerCount()).toBe(1);

    await postMessage(message(`code=CODE&state=${store.get('state')}`));

    await expect(result).resolves.toEqual(TOKEN);
    expect(popup.close).toHaveBeenCalled();
    expect(listenerCount()).toBe(0);
    expect(exchange).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: expect.objectContaining({ code: 'CODE', redirect_uri: CONFIG.redirect }),
      }),
    );
  });

  it('ignores messages from other origins and sources', async () => {
    const result = new PopupTransport(CONFIG).send();
    await started();
    await postMessage(message('code=CODE'), 'https://attacker.example');
    await postMessage({ source: 'other', url: `${CONFIG.redirect}?code=CODE` });
    expect(listenerCount()).toBe(1);
    const assertion = expect(result).rejects.toThrow(/closed/);
    popup.closed = true;
    await jest.advanceTimersByTimeAsync(500);
    await assertion;
  });

  it('rejects (instead of never settling) when the flow fails', async () => {
    const result = new PopupTransport(CONFIG).send();
    await started();
    await postMessage(message('code=CODE&state=FORGED'));
    await expect(result).rejects.toThrow('Invalid State');
    expect(listenerCount()).toBe(0);
  });

  it('rejects with the "error_description" of an error redirect', async () => {
    const result = new PopupTransport(CONFIG).send();
    await started();
    await postMessage(message('error=access_denied&error_description=Denied'));
    await expect(result).rejects.toThrow('Denied');
  });

  it('rejects when the window is closed before the flow completes', async () => {
    const result = new PopupTransport(CONFIG).send();
    await started();
    const assertion = expect(result).rejects.toThrow(/closed before the flow completed/);
    popup.closed = true;
    await jest.advanceTimersByTimeAsync(500);
    await assertion;
    expect(listenerCount()).toBe(0);
  });

  it('rejects (and removes its listener) when the window can not be opened', async () => {
    (window.open as jest.Mock).mockReturnValueOnce(null);
    await expect(new PopupTransport(CONFIG).send()).rejects.toThrow('Unable to open window');
    expect(listenerCount()).toBe(0);
  });

  it('does not accumulate listeners across flows', async () => {
    jest.spyOn(oauth2.token, 'exchange').mockImplementation(async () => Response.json(TOKEN));
    const first = new PopupTransport(CONFIG).send();
    await started();
    await postMessage(message(`code=A&state=${store.get('state')}`));
    await first;
    popup.closed = false;
    const second = new PopupTransport(CONFIG).send();
    await started();
    expect(listenerCount()).toBe(1);
    await postMessage(message(`code=B&state=${store.get('state')}`));
    await expect(second).resolves.toEqual(TOKEN);
  });
});
