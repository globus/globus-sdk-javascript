/**
 * This module is mostly intended for internal use, but can be helpful
 * identifying information about the SDK package you are using at runtime.
 */
import pkg from '../../../package.json';

export type Version = string;

/**
 * The version of the @globus/sdk package that is in use.
 */
export const VERSION: Version = pkg.version;

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

const INFOS_SEPERATOR = ';';
const INFO_ITEM_SEPARATOR = ',';

let INFOS: Info[] = [CLIENT_INFO];

/**
 * Exported for test purposes only.
 * @private
 */
export function toString(info: Info | Info[]) {
  const infos = Array.isArray(info) ? info : [info];
  return infos
    .map((i) =>
      Object.entries(i)
        .map(([key, value]) => `${key}=${value}`)
        .join(INFO_ITEM_SEPARATOR),
    )
    .join(INFOS_SEPERATOR);
}
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

let ENABLED = true;
/**
 * Disable the client information header from being included in requests (enabled by default).
 */
export function disable() {
  ENABLED = false;
}

/**
 * Enables the client information header to be included in requests.
 */
export function enable() {
  ENABLED = true;
}

/**
 * Whether or not the client information header should be sent with requests.
 */
export function isEnabled() {
  return ENABLED;
}

/**
 * @private
 */
export const CLIENT_INFO_HEADER = `X-Globus-ClientInfo`;
