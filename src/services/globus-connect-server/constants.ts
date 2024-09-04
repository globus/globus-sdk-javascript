type Connector = {
  /**
   * The UUID of the connector recognized by Globus Connect Server
   */
  ID: string;
  /**
   * The string VALUE of the connector recognized by Globus Connect Server
   * @example `active-scale`
   */
  VALUE: string;
  /**
   * Human-readable name of the connector
   * @example `Azure Blob Storage`
   */
  DISPLAY_NAME: string;
};

/**
 * Well-known connectors recognized by Globus Connect Server.
 */
export const CONNECTORS: Record<string, Connector> = {
  POSIX: {
    ID: '145812c8-decc-41f1-83cf-bb2a85a2a70b',
    VALUE: 'posix',
    DISPLAY_NAME: 'POSIX',
  },
  POSIX_STAGING: {
    ID: '052be037-7dda-4d20-b163-3077314dc3e6',
    VALUE: 'posix-staging',
    DISPLAY_NAME: 'POSIX (Staging)',
  },
  BLACKPEARL: {
    ID: '7e3f3f5e-350c-4717-891a-2f451c24b0d4',
    VALUE: 'blackpearl',
    DISPLAY_NAME: 'BlackPearl',
  },
  BOX: {
    ID: '7c100eae-40fe-11e9-95a3-9cb6d0d9fd63',
    VALUE: 'box',
    DISPLAY_NAME: 'Box',
  },
  CEPH: {
    ID: '1b6374b0-f6a4-4cf7-a26f-f262d9c6ca72',
    VALUE: 'ceph',
    DISPLAY_NAME: 'Ceph',
  },
  DAOS: {
    ID: '0e1f3b25-da7b-4e84-aa7c-b193fc5840ab',
    VALUE: 'daos',
    DISPLAY_NAME: 'DAOS',
  },
  HPSS: {
    ID: 'fb656a17-0f69-4e59-95ff-d0a62ca7bdf5',
    VALUE: 'hpss',
    DISPLAY_NAME: 'HPSS',
  },
  IRODS: {
    ID: 'e47b6920-ff57-11ea-8aaa-000c297ab3c2',
    VALUE: 'irods',
    DISPLAY_NAME: 'iRODS',
  },
  ACTIVE_SCALE: {
    ID: '7251f6c8-93c9-11eb-95ba-12704e0d6a4d',
    VALUE: 'active-scale',
    DISPLAY_NAME: 'Quantum ActiveScale',
  },
  S3: {
    ID: '7643e831-5f6c-4b47-a07f-8ee90f401d23',
    VALUE: 's3',
    DISPLAY_NAME: 'AWS S3',
  },
  AZURE_BLOB: {
    ID: '9436da0c-a444-11eb-af93-12704e0d6a4d',
    VALUE: 'azure-blob',
    DISPLAY_NAME: 'Azure Blob Storage',
  },
  DROPBOX: {
    ID: '49b00fd6-63f1-48ae-b27f-d8af4589f876',
    VALUE: 'dropbox',
    DISPLAY_NAME: 'Dropbox',
  },
  GOOGLE_DRIVE: {
    ID: '976cf0cf-78c3-4aab-82d2-7c16adbcc281',
    VALUE: 'google-drive',
    DISPLAY_NAME: 'Google Drive',
  },
  GOOGLE_CLOUD_STORAGE: {
    ID: '56366b96-ac98-11e9-abac-9cb6d0d9fd63',
    VALUE: 'google-cloud-storage',
    DISPLAY_NAME: 'Google Cloud',
  },
  ONEDRIVE: {
    ID: '28ef55da-1f97-11eb-bdfd-12704e0d6a4d',
    VALUE: 'onedrive',
    DISPLAY_NAME: 'OneDrive',
  },
};
