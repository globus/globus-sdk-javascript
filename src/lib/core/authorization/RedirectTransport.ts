import PKCE from 'js-pkce';
import type IConfig from 'js-pkce/dist/IConfig';

export class RedirectTransport {
  #pkce: PKCE;

  constructor(options: IConfig) {
    this.#pkce = new PKCE({
      ...options,
    });
  }

  send() {
    window.location.replace(this.#pkce.authorizeUrl());
  }

  async getToken() {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    if (!params.get('code')) return undefined;
    const response = await this.#pkce.exchangeForAccessToken(url.toString());
    params.delete('code');
    params.delete('state');
    url.search = params.toString();
    /**
     * Resets js-pkce state
     * @see https://github.com/bpedroza/js-pkce/blob/master/src/PKCE.ts
     */
    sessionStorage.removeItem('pkce_state');
    sessionStorage.removeItem('pkce_code_verifier');
    window.location.replace(url);
    return response;
  }
}
