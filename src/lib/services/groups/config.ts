import type { Environment } from '../../core/global.js';

export const ID = 'GROUPS' as const;
export const HOSTS: Partial<Record<Environment, string>> = {
  sandbox: 'groups.api.sandbox.globuscs.info',
  production: 'groups.api.globus.org',
  staging: 'groups.api.staging.globuscs.info',
  integration: 'groups.api.integration.globuscs.info',
  test: 'groups.api.test.globuscs.info',
  preview: 'groups.api.preview.globuscs.info',
};

/**
 * @see https://docs.globus.org/api/groups/#scopes
 */
export const SCOPES = {
  ALL: 'urn:globus:auth:scope:groups.api.globus.org:all',
  VIEW_MY: 'urn:globus:auth:scope:groups.api.globus.org:view_my_groups_and_membership',
};
