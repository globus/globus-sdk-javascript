import type { Environment } from '../../core/global.js';

export const ID = 'TIMER';
export const HOSTS: Partial<Record<Environment, string>> = {
  sandbox: 'sandbox.timer.automate.globus.org',
  production: 'timer.automate.globus.org',
  staging: 'staging.timer.automate.globus.org',
  integration: 'integration.timer.automate.globus.org',
  test: 'test.timer.automate.globus.org',
  preview: 'preview.timer.automate.globus.org',
};
