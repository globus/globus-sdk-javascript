import type { Environment } from '../../core/global.js';

export const ID = 'COMPUTE' as const;
export const HOSTS: Partial<Record<Environment, string>> = {
  sandbox: 'compute.api.sandbox.globuscs.info',
  production: 'compute.api.globus.org',
  staging: 'compute.api.staging.globuscs.info',
  integration: 'compute.api.integration.globuscs.info',
  test: 'compute.api.test.globuscs.info',
  preview: 'compute.api.preview.globus.org',
};

export const SCOPES = {
  ALL: 'https://auth.globus.org/scopes/facd7ccc-c5f4-42aa-916b-a0e270e2c2a9/all',
};
