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

export function addClientInfo(info: Info) {
  INFOS = INFOS.concat(info);
}

export function getClientInfo(): string {
  return toString(INFOS);
}

/**
 * @private
 */
export const CLIENT_INFO_HEADER = `X-Globus-ClientInfo`;
