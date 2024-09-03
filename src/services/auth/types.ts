import type { JwtPayload } from 'jwt-decode';

export type Token = {
  access_token: string;
  scope: string;
  expires_in: number;
  token_type: string;
  resource_server: string;
  refresh_token?: string;
};

export type TokenWithRefresh = Token & {
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
