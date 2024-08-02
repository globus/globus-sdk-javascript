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
  return `${value.toFixed(truncate)} ${unit}`;
}
