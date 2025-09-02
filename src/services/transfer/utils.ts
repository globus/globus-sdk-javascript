import type { FileDocument } from './service/file-operations.js';

/**
 * Determines if the given entry is a Globus Transfer File Document.
 * @see https://docs.globus.org/api/transfer/file_operations/#file_document
 */
export function isFileDocument(entry: unknown): entry is FileDocument {
  return (
    typeof entry === 'object' &&
    entry !== null &&
    'DATA_TYPE' in entry &&
    entry.DATA_TYPE === 'file'
  );
}
/**
 * Determines if the given entry is a directory.
 * @see https://docs.globus.org/api/transfer/file_operations/#file_document
 */
export function isDirectory(entry: unknown) {
  return isFileDocument(entry) && entry.type === 'dir';
}

const KB = 1000;
const MB = KB * 1000;
const GB = MB * 1000;
const TB = GB * 1000;
const PB = TB * 1000;
/**
 * Returns a readable string for the given bytes, **rounded and truncated** to the given number of decimal places.
 * @param bytes The number of bytes to convert to a readable string.
 * @param [truncate=2] The number of decimal places to truncate the result to.
 */
export function readableBytes(bytes: number, truncate = 2) {
  let unit = 'B';
  let bytesInUnit = 1;
  if (bytes < KB) {
    return `${bytes} ${unit}`;
  }
  if (bytes < MB) {
    unit = 'KB';
    bytesInUnit = KB;
  } else if (bytes < GB) {
    unit = 'MB';
    bytesInUnit = MB;
  } else if (bytes < TB) {
    unit = 'GB';
    bytesInUnit = GB;
  } else if (bytes < PB) {
    unit = 'TB';
    bytesInUnit = TB;
  } else {
    unit = 'PB';
    bytesInUnit = PB;
  }
  const value = bytes / bytesInUnit;
  const [int, dec] = `${value}`.split('.');
  let rendered = `${int}`;
  if (dec && dec.length) {
    const truncated = dec.slice(0, truncate);
    if (truncated.length) {
      rendered = `${int}.${truncated}`;
    }
  }
  return `${rendered} ${unit}`;
}

/**
 * Known Globus DNS domains.
 */
export const GLOBUS_DNS_DOMAINS = [
  'dnsteam.globuscs.info',
  'data.globus.org',
  'dn.glob.us',
  'gaccess.io',
];

/**
 * Check the given hostname to determine if it is one of the known Globus DNS domains.
 * @param hostname The hostname to check.
 * @returns `true` if the hostname is a known Globus DNS domain, `false` otherwise.
 */
export function isGlobusHostname(hostname: string): boolean {
  return Boolean(GLOBUS_DNS_DOMAINS.find((d) => hostname.endsWith(`.${d}`)));
}

/**
 * Returns DNS domain, if any, for a collection or endpoint.
 *
 * - Custom domains will be displayed without any auto-generated wildcard subdomains.
 * - Globus domains will include the auto-generated section to make them identifiable.
 *
 * @param endpoint The endpoint to extract the domain from. While any object will be parsed, this function is intended for use with [Globus Transfer Endpoint or Collection Documents](https://docs.globus.org/api/transfer/endpoints_and_collections/#endpoint_or_collection_document).
 * @see https://docs.globus.org/globus-connect-server/v5.4/domain-guide/#custom_domains_new_in_v_5_4_13
 */
export function getDomainFromEndpoint(endpoint: Record<string, unknown>) {
  const { tlsftp_server: tls } = endpoint;
  if (!tls || typeof tls !== 'string') {
    return null;
  }
  /**
   * Swap the protocol to `https` so we can use the URL API to extract the hostname.
   */
  const { hostname } = new URL(tls.replace('tlsftp', 'https'));
  const hasCustomDomain = !isGlobusHostname(hostname);
  const customDomain =
    hasCustomDomain && /(?:[gm]-\w{6}.)?([\w-]+(\.[\w-]+)+)$/.exec(hostname)?.[1];

  return customDomain || hostname || null;
}
