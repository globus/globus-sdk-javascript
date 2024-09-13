export function isSupported() {
  return 'crypto' in globalThis;
}

function getCrypto(): Crypto {
  return 'webcrypto' in globalThis.crypto
    ? (globalThis.crypto.webcrypto as unknown as Crypto)
    : globalThis.crypto;
}

/**
 * Base64 URL encode a string.
 * @see https://www.oauth.com/oauth2-servers/pkce/authorization-request/
 */
const encode = (value: string) =>
  btoa(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

async function sha256(input: string) {
  const hashBuffer = await getCrypto().subtle.digest('SHA-256', new TextEncoder().encode(input));
  return String.fromCharCode(...new Uint8Array(hashBuffer));
}

/**
 * Character set allowed to be used in the PKCE `code_verifier`
 * @see https://www.rfc-editor.org/rfc/rfc7636#section-4.1
 */
const PKCE_SAFE_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
/**
 * Create a Code Verifier for PKCE
 * @see https://www.rfc-editor.org/rfc/rfc7636#section-4.1
 */
export function generateCodeVerifier() {
  /**
   * @todo Make length random between 43 and 128 characters
   */
  return Array.from(getCrypto().getRandomValues(new Uint8Array(43)))
    .map((v) => PKCE_SAFE_CHARSET[v % PKCE_SAFE_CHARSET.length])
    .join('');
}

/**
 * Create a Code Challenge from a provided Code Verifier (assumes S256 `code_challenge_method`).
 * @see https://www.rfc-editor.org/rfc/rfc7636#section-4.2
 */
export async function generateCodeChallenge(verifier: string) {
  const hashed = await sha256(verifier);
  return encode(hashed);
}

export function generateState() {
  return String.fromCharCode(...Array.from(getCrypto().getRandomValues(new Uint8Array(16))));
}

/**
 * @see https://www.oauth.com/oauth2-servers/pkce/authorization-code-exchange/
 */
export type AuthorizationCodeExchangeParameters = {
  code: string;
  code_verifier: string;
  client_id: string;
  client_secret?: string;
  redirect_uri: string;
  grant_type: 'authorization_code';
};

/**
 * @see https://www.oauth.com/oauth2-servers/pkce/authorization-request/
 */
export type AuthorizationRequestParameters = {
  client_id: string;
  redirect_uri: string;
  response_type: 'code';
  scope: string;
  state: string;
  code_challenge: string;
  code_challenge_method: 'S256' | 'plain';
};
