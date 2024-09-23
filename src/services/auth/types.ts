import type { JwtPayload } from 'jwt-decode';

export type Token = {
  /**
   * @see https://datatracker.ietf.org/doc/html/rfc6749#appendix-A.12
   */
  access_token: string;
  /**
   * @see https://datatracker.ietf.org/doc/html/rfc6749#appendix-A.4
   */
  scope: string;
  /**
   * The lifetime in seconds of the access token.
   * @see https://datatracker.ietf.org/doc/html/rfc6749#appendix-A.14
   */
  expires_in: number;
  /**
   * @see https://datatracker.ietf.org/doc/html/rfc6749#appendix-A.13
   */
  token_type: string;
  resource_server: string;
  /**
   * @see https://datatracker.ietf.org/doc/html/rfc6749#appendix-A.17
   */
  refresh_token?: string;
};

export type TokenWithRefresh = Token & {
  /**
   * @see https://datatracker.ietf.org/doc/html/rfc6749#appendix-A.17
   */
  refresh_token: string;
};

/**
 * @see https://docs.globus.org/api/auth/reference/#authorization_code_grant_preferred
 */
export type TokenResponse = Token & {
  state: string;
  /**
   * Only included if your client requests the openid scope during the authorization request.
   */
  id_token?: string;
  other_tokens?: Token[];
};

type JwtUserIdentity = {
  sub: JwtPayload['sub'];
  organization?: string;
  name?: string;
  identity_provider?: string;
  identity_provider_display_name?: string;
  email?: string;
  last_authentication?: number;
};

/**
 * The properties of the decoded `id_token` are dictated by the scopes requested
 * during the authorization request; `openid profile email` will return a fully
 * populated object, while `openid` will return a minimal object.
 */
export type JwtUserInfo = Pick<JwtPayload, 'iss' | 'aud' | 'exp' | 'iat' | 'sub'> &
  JwtUserIdentity & {
    preferred_username?: string;
    identity_set?: JwtUserIdentity[];
  };
