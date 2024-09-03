/**
 * This module is mostly intended for internal use, but can be helpful
 * identifying information about the SDK package you are using at runtime.
 */
import { toString, isEnabled, CLIENT_INFO_HEADER } from './private.js';
import { VERSION as _VERSION } from './version.js';

export type Version = string;

/**
 * The version of the `@globus/sdk` package that is in use.
 */
export const VERSION: Version = _VERSION;

export type Info = {
  product: string;
  version: Version;
};

/**
 * The client information identifier for this package.
 */
export const CLIENT_INFO: Info = {
  product: 'javascript-sdk',
  version: VERSION,
};

let INFOS: Info[] = [CLIENT_INFO];

/**
 * Add a client information identifier to the existing SDK information.
 */
export function addClientInfo(info: Info) {
  INFOS = INFOS.concat(info);
}
/**
 * Get the current client information as a string.
 */
export function getClientInfo(): string {
  return toString(INFOS);
}

export function getClientInfoRequestHeaders(): Record<string, string> {
  if (!isEnabled()) {
    return {};
  }
  return {
    [CLIENT_INFO_HEADER]: getClientInfo(),
  };
}
