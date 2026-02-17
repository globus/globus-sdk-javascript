import type { Environment } from '../../core/global.js';
import { RESOURCE_SERVERS } from '../auth/config.js';

export const ID = 'TIMERS' as const;
export const RESOURCE_SERVER = RESOURCE_SERVERS[ID];
export const HOSTS: Partial<Record<Environment, string>> = {
  sandbox: 'sandbox.timer.automate.globus.org',
  production: 'timer.automate.globus.org',
  staging: 'staging.timer.automate.globus.org',
  integration: 'integration.timer.automate.globus.org',
  test: 'test.timer.automate.globus.org',
  preview: 'preview.timer.automate.globus.org',
};
