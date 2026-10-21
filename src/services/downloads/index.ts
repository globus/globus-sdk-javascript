/**
 * @description A wrapper around the Globus Downloads metadata API
 * @group Service
 * @module
 */
import { createServiceMethodFactory } from '../factory.js';
import { JSONFetchResponse } from '../types.js';
import * as DOWNLOADS from './config.js';

/**
 * @private
 * @internal
 */
export const CONFIG = DOWNLOADS;

/**
 * @description Represents the version information for the Globus Connect Server (GCS)
 */
export type GcsVersionInfo = {
  DATA_TYPE: 'gcs_version_info#1.0.0';
  /**
   * The URL to the changelog for this GCS version.
   */
  changelog_url: `https://{string}`;
  /**
   * The release date of this GCS version.
   */
  released: string;
  /**
   * The semantic version of this GCS release.
   */
  version: string;
  /**
   * The date when this version of GCS will reach end of (Transfer) support.
   */
  end_of_support?: string;
};

/**
 * @description Represents the (current) version information for the Globus Connect Personal (GCP)
 */
export type GcpVersionInfo = {
  DATA_TYPE: 'gcp_version_info#1.0.0';
  linux_version: string;
  linux_released: string;
  mac_version: string;
  mac_released: string;
  win_version: string;
  win_released: string;
  changelog_url: `https://{string}`;
  install_url: `https://{string}`;
};

export default {
  releases: {
    gcs: {
      /**
       * @description Retrieves the current version metadata for Globus Connect Server (GCS)
       */
      current: createServiceMethodFactory({
        service: DOWNLOADS.ID,
        path: `releases/gcs/current`,
      }).generate<
        {
          request?: never;
          data?: never;
        },
        JSONFetchResponse<[Omit<GcsVersionInfo, 'end_of_support'>]>
      >(),
      /**
       * @description Retrieves all available version metadata for Globus Connect Server (GCS)
       */
      all: createServiceMethodFactory({
        service: DOWNLOADS.ID,
        path: `releases/gcs/all`,
      }).generate<
        {
          request?: never;
          data?: never;
        },
        JSONFetchResponse<GcsVersionInfo[]>
      >(),
    },
    gcp: {
      /**
       * @description Retrieves the current version metadata for Globus Connect Personal (GCP)
       */
      current: createServiceMethodFactory({
        service: DOWNLOADS.ID,
        path: `releases/gcp/current`,
      }).generate<
        {
          request?: never;
          data?: never;
        },
        JSONFetchResponse<[GcpVersionInfo]>
      >(),
    },
  },
};
