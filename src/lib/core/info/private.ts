import type { Info } from './index.js';

/**
 * @private
 */
export const CLIENT_INFO_HEADER = `X-Globus-ClientInfo`;

let ENABLED = true;
/**
 * Disable the client information header from being included in requests (enabled by default).
 * @private
 */
export function disable() {
  ENABLED = false;
}

/**
 * Enables the client information header to be included in requests.
 * @private
 */
export function enable() {
  ENABLED = true;
}

/**
 * Whether or not the client information header should be sent with requests.
 * @private
 */
export function isEnabled() {
  return ENABLED;
}

const INFOS_SEPERATOR = ';';
const INFO_ITEM_SEPARATOR = ',';

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
