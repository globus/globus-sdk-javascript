import { ID as TRANSFER } from '../transfer/config.js';
import { ID as FLOWS } from '../flows/config.js';
import { ID as TIMERS } from '../timers/config.js';
import { ID as GROUPS } from '../groups/config.js';
import { ID as SEARCH } from '../search/config.js';
import { ID as COMPUTE } from '../compute/config.js';

import type { Environment } from '../../core/global.js';

export const ID = 'AUTH' as const;
export const HOSTS: Partial<Record<Environment, string>> = {
  integration: 'auth.integration.globuscs.info',
  sandbox: 'auth.sandbox.globuscs.info',
  production: 'auth.globus.org',
  test: 'auth.test.globuscs.info',
  staging: 'auth.staging.globuscs.info',
  preview: 'auth.preview.globus.org',
};

export const SCOPES = {
  MANAGE_PROJECTS: 'urn:globus:auth:scope:auth.globus.org:manage_projects',
  VIEW_IDENTITIES: 'urn:globus:auth:scope:auth.globus.org:view_identities',
};

export const RESOURCE_SERVERS = {
  [ID]: 'auth.globus.org',
  [TRANSFER]: 'transfer.api.globus.org',
  [FLOWS]: 'flows.globus.org',
  [GROUPS]: 'groups.api.globus.org',
  [SEARCH]: 'search.api.globus.org',
  [TIMERS]: '524230d7-ea86-4a52-8312-86065a9e0417',
  [COMPUTE]: 'funcx_service',
};
