/**
 * @description Session and authorization management via PKCE.
 * @group Core
 * @module
 * @experimental
 */
import PKCE from "js-pkce";

import type IConfig from "js-pkce/dist/IConfig";
import type ITokenResponse from "js-pkce/dist/ITokenResponse";
import { getAuthorizationEndpoint, getTokenEndpoint } from "../services/auth";
import {
  addTokenResponse,
  getTokenForScope,
  reset as resetTokens,
} from "./consent";

import { createStorage, StorageSystem } from "./storage";

let storage: StorageSystem;

type PKCEConfiguration = {
  client_id?: IConfig["client_id"];
  requested_scopes: IConfig["requested_scopes"];
  redirect_uri: IConfig["redirect_uri"];
};

/**
 * @experimental
 */
export class PKCEAuthorization {
  #pkce: PKCE;
  #configuration: IConfig;
  #response: ITokenResponse | undefined;

  constructor(configuration: PKCEConfiguration) {
    storage = createStorage("localStorage");
    if (!configuration.client_id) {
      throw new Error("You must provide a `client_id`.");
    }
    this.#configuration = {
      client_id: configuration.client_id,
      authorization_endpoint: getAuthorizationEndpoint(),
      token_endpoint: getTokenEndpoint(),
      ...configuration,
    };
    this.#pkce = this.#createPKCEInstance();
  }

  #createPKCEInstance() {
    return new PKCE(this.#configuration);
  }

  #resetPKCE() {
    /**
     * Resets js-pkce state
     * @see https://github.com/bpedroza/js-pkce/blob/master/src/PKCE.ts
     */
    sessionStorage.removeItem("pkce_state");
    sessionStorage.removeItem("pkce_code_verifier");
  }

  reset() {
    this.#resetPKCE();
    resetTokens();
  }

  redirect() {
    this.reset();
    window.location.replace(this.#pkce.authorizeUrl());
  }

  async handleCodeRedirect(options = { removeStateAndReplaceLocation: true }) {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    if (!params.get("code")) return;
    const response = await this.#pkce.exchangeForAccessToken(url.toString());
    this.#response = response;
    addTokenResponse(this.#response);
    // Remove PKCE-state from the URL since we have a token.
    if (options.removeStateAndReplaceLocation) {
      params.delete("code");
      params.delete("state");
      url.search = params.toString();
      window.location.replace(url);
    }
  }

  hasToken(): boolean {
    return this.#configuration.requested_scopes
      .split(" ")
      .every((scope) => Boolean(getTokenForScope(scope)));
  }

  revoke() {
    this.reset();
  }
}

/**
 * @experimental
 */
export function pkce(configuration: PKCEConfiguration) {
  return new PKCEAuthorization(configuration);
}

/**
 * @experimental
 */
export function incremental(configuration: PKCEConfiguration) {
  return new PKCEAuthorization(configuration);
}
