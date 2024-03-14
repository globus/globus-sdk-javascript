import PKCE from 'js-pkce';
import type IConfig from 'js-pkce/dist/IConfig';
import type IObject from 'js-pkce/dist/IObject';

export class RedirectTransport {
  #pkce: PKCE;

  #params: IObject = {};

  constructor(
    options: IConfig & {
      /**
       * Additional parameters to be included in the query string of the authorization request.
       */
      params?: IObject;
    },
  ) {
    const { params, ...config } = options;
    this.#pkce = new PKCE({
      ...config,
    });
    this.#params = {
      ...params,
    };
  }

  send() {
    window.location.replace(this.#pkce.authorizeUrl(this.#params));
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
