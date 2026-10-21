/**
 * @description A wrapper around the Globus Downloads informational API
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

export type GcsVersionInfo = {
  DATA_TYPE: 'gcs_version_info#1.0.0';
  changelog_url: `https://{string}`;
  released: string;
  version: string;
};

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
      current: createServiceMethodFactory({
        service: DOWNLOADS.ID,
        path: `releases/gcs/current`,
      }).generate<
        {
          request?: never;
          data?: never;
        },
        JSONFetchResponse<[GcsVersionInfo]>
      >(),
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
