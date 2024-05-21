import type { FileDocument } from './service/file-operations';

export function isFileDocument(entry: unknown): entry is FileDocument {
  return (
    typeof entry === 'object' &&
    entry !== null &&
    'DATA_TYPE' in entry &&
    entry.DATA_TYPE === 'file'
  );
}

export function isDirectory(entry: unknown) {
  return isFileDocument(entry) && entry.type === 'dir';
}
