import type { Environment } from '../../core/global.js';
import { RESOURCE_SERVERS } from '../auth/config.js';

export const ID = 'SEARCH' as const;

export const RESOURCE_SERVER = RESOURCE_SERVERS[ID];

export const HOSTS: Partial<Record<Environment, string>> = {
  sandbox: 'search.api.sandbox.globuscs.info',
  production: 'search.api.globus.org',
  staging: 'search.api.staging.globuscs.info',
  integration: 'search.api.integration.globuscs.info',
  test: 'search.api.test.globuscs.info',
  preview: 'search.api.preview.globus.org',
};

/**
 * @see https://docs.globus.org/api/search/api_usage/#scopes
 */
export const SCOPES = {
  ALL: 'urn:globus:auth:scope:search.api.globus.org:all',
  INGEST: 'urn:globus:auth:scope:search.api.globus.org:ingest',
  SEARCH: 'urn:globus:auth:scope:search.api.globus.org:search',
};
