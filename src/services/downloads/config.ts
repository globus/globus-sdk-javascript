import type { Environment } from '../../core/global.js';

export const ID = 'DOWNLOADS' as const;
export const HOSTS: Partial<Record<Environment, string>> = {
  sandbox: 'downloads.globus.org',
  production: 'downloads.globus.org',
  staging: 'downloads.globus.org',
  integration: 'downloads.globus.org',
  test: 'downloads.globus.org',
  preview: 'downloads.globus.org',
};
