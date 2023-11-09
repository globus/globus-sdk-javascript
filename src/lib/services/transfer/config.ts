import type { Environment } from '../../core/global.js';

export const ID = 'TRANSFER';
export const HOSTS: Partial<Record<Environment, string>> = {
  sandbox: 'transfer.sandbox.globuscs.info',
  production: 'transfer.api.globusonline.org',
  staging: 'transfer.api.staging.globuscs.info',
  integration: 'transfer.api.integration.globuscs.info',
  test: 'transfer.api.test.globuscs.info',
  preview: 'transfer.api.preview.globus.org',
};
