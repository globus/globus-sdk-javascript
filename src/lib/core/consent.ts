import { getStorage } from "./storage/index.js";
import type { Token, TokenResponse } from "../services/auth/index.js";

import ITokenResponse from "js-pkce/dist/ITokenResponse";

function isValidToken(check: unknown): check is Token {
  const maybe = check as Token;
  return Boolean(maybe.token_type && maybe.access_token);
}

function store(token: ITokenResponse) {
  token.scope.split(" ").forEach((scope) => {
    getStorage().set(scope, token);
  });
}

export function addTokenResponse(token: ITokenResponse | TokenResponse) {
  store(token);
  if ("other_tokens" in token) {
    token.other_tokens.forEach(store);
  }
}

export function getTokenForScope(scope: string) {
  const token = getStorage().get(scope);
  if (!token || !isValidToken(token)) {
    return null;
  }
  return `${token.token_type} ${token.access_token}`;
}

export function reset() {
  getStorage().clear();
}
