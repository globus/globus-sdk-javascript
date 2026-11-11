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
 * Generate a base64url-encoded string from `size` cryptographically random octets.
 *
 * Encoding random octets (rather than selecting characters with `value % charset.length`)
 * avoids modulo bias, so every character of the output is uniformly distributed.
 */
function generateRandom(size: number) {
  return encode(String.fromCharCode(...getCrypto().getRandomValues(new Uint8Array(size))));
}

/**
 * Create a Code Verifier for PKCE: 32 random octets, base64url-encoded (43 characters).
 * @see https://www.rfc-editor.org/rfc/rfc7636#section-4.1
 */
export function generateCodeVerifier() {
  return generateRandom(32);
}

/**
 * Create a Code Challenge from a provided Code Verifier (assumes S256 `code_challenge_method`).
 * @see https://www.rfc-editor.org/rfc/rfc7636#section-4.2
 */
export async function generateCodeChallenge(verifier: string) {
  const hashed = await sha256(verifier);
  return encode(hashed);
}

/**
 * Create a `state` value: 16 random octets, base64url-encoded (22 characters).
 * @see https://www.rfc-editor.org/rfc/rfc6749#section-10.12
 */
export function generateState() {
  return generateRandom(16);
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

/**
 * @private
 */
export const KEYS = {
  PKCE_STATE: 'pkce_state',
  PKCE_CODE_VERIFIER: 'pkce_code_verifier',
  PKCE_REDIRECT_URI: 'pkce_redirect_uri',
};

type Entries = 'state' | 'code_verifier' | 'redirect_uri';

const ENTRY_KEYS: Record<Entries, string> = {
  state: KEYS.PKCE_STATE,
  code_verifier: KEYS.PKCE_CODE_VERIFIER,
  redirect_uri: KEYS.PKCE_REDIRECT_URI,
};

export const store = {
  getKey(key: Entries) {
    return ENTRY_KEYS[key];
  },
  get: (entry: Entries) => sessionStorage.getItem(store.getKey(entry)),
  set: (entry: Entries, value: string) => sessionStorage.setItem(store.getKey(entry), value),
  reset: () => {
    Object.values(ENTRY_KEYS).forEach((key) => sessionStorage.removeItem(key));
  },
};
