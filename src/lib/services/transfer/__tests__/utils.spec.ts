import { readableBytes, isDirectory, isFileDocument, getDomainFromEndpoint } from '../utils';

describe('readableBytes', () => {
  it('should return the correct readable string for bytes', () => {
    expect(readableBytes(90)).toBe('90 B');
    expect(readableBytes(1024)).toBe('1.02 KB');
    expect(readableBytes(1048576)).toBe('1.05 MB');
    expect(readableBytes(1073741824)).toBe('1.07 GB');
    expect(readableBytes(1099511627776)).toBe('1.10 TB');
    expect(readableBytes(1125899906842624)).toBe('1.13 PB');
  });

  it('should truncate the readable string based on the truncate parameter', () => {
    expect(readableBytes(1024, 0)).toBe('1 KB');
    expect(readableBytes(1048576, 1)).toBe('1.0 MB');
    expect(readableBytes(1073741824, 3)).toBe('1.074 GB');
  });
});

/**
 * @see https://docs.globus.org/api/transfer/file_operations/#file_document
 */
const FILE = {
  DATA_TYPE: 'file',
  type: 'file',
};

const DIR = {
  ...FILE,
  type: 'dir',
};

const INVALID_SYMLINK = {
  ...FILE,
  type: 'invalid_symlink',
};

describe('isDirectory', () => {
  it('should return true for directory objects', () => {
    expect(isDirectory(DIR)).toBe(true);
  });

  it('should return false for non-directory objects', () => {
    expect(isDirectory(FILE)).toBe(false);
    expect(isDirectory(INVALID_SYMLINK)).toBe(false);
  });
});

describe('isFileDocument', () => {
  it('should return true for all "File Document" objects', () => {
    expect(isFileDocument(FILE)).toBe(true);
    expect(isFileDocument(DIR)).toBe(true);
    expect(isFileDocument(INVALID_SYMLINK)).toBe(true);
  });
});

describe('getDomainFromEndpoint', () => {
  it('should return the domain from a valid endpoint', () => {
    /**
     * Custom Domain
     */
    expect(
      getDomainFromEndpoint({
        tlsftp_server: 'tlsftp://m-d3a2c3.collection.tutorials.globus.org:443',
      }),
    ).toBe('collection.tutorials.globus.org');

    expect(
      getDomainFromEndpoint({
        tlsftp_server: 'tlsftp://m-4d5adb.fa5e.bd7c.data.globus.org:443',
      }),
    ).toBe('m-4d5adb.fa5e.bd7c.data.globus.org');
  });

  it('should return null for invalid objects', () => {
    expect(getDomainFromEndpoint({})).toBeNull();
    expect(
      getDomainFromEndpoint({
        tlsftp_server: null,
      }),
    ).toBeNull();
  });
});
