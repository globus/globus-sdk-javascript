import PKCE from 'js-pkce';
import type IConfig from 'js-pkce/dist/IConfig';
import type IObject from 'js-pkce/dist/IObject';

export type GetTokenOptions = {
  /**
   * Whether or not the URL should be replaced after processing the token.
   * @default true
   */
  shouldReplace?: boolean;
};

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

  /**
   * Parse the current URL for the authorization code (`?code=...`) and exchange it for an access token when available.
   * - When the URL is processed and exchanged for an access token, the page is redirected to the current URL without the `?code=...&state=...` parameters.
   */
  async getToken(options: GetTokenOptions = { shouldReplace: true }) {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    /**
     * If we don't have a `code` parameter, we can't exchange it for an access token.
     */
    if (!params.get('code')) return undefined;
    const response = await this.#pkce.exchangeForAccessToken(url.toString());
    /**
     * Resets js-pkce state
     * @see https://github.com/bpedroza/js-pkce/blob/master/src/PKCE.ts
     */
    sessionStorage.removeItem('pkce_state');
    sessionStorage.removeItem('pkce_code_verifier');
    if (options.shouldReplace) {
      /**
       * Remove the `code` and `state` parameters from the URL.
       */
      params.delete('code');
      params.delete('state');
      /**
       * Update the URL with the new query string.
       */
      url.search = params.toString();
      /**
       * Redirect the page to the new URL (without the `code` and `state` parameters)/
       */
      window.location.replace(url);
    }
    return response;
  }
}
