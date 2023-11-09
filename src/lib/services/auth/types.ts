import ITokenResponse from 'js-pkce/dist/ITokenResponse';

export namespace Globus.Auth {
  export type Token = ITokenResponse & {
    resource_server: string;
    id_token?: string;
  };
  /**
   * @see https://docs.globus.org/api/auth/reference/#authorization_code_grant_preferred
   */
  export type TokenResponse = Token & {
    state: string;
    other_tokens: Token[];
  };
}
