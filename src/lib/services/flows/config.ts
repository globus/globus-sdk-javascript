import type { Environment } from "../../core/global";

export const ID = "FLOWS";
export const HOSTS: Partial<Record<Environment, string>> = {
  sandbox: "sandbox.flows.automate.globus.org",
  production: "flows.globus.org",
  staging: "staging.flows.automate.globus.org",
  integration: "integration.flows.automate.globus.org",
  test: "test.flows.automate.globus.org",
  preview: "preview.flows.automate.globus.org",
};

/**
 * @see https://docs.globus.org/api/flows/overview/#scopes
 */
export const SCOPES = {
  MANAGE_FLOWS:
    "https://auth.globus.org/scopes/eec9b274-0c81-4334-bdc2-54e90e689b9a/manage_flows",
  VIEW_FLOWS:
    "https://auth.globus.org/scopes/eec9b274-0c81-4334-bdc2-54e90e689b9a/view_flows",
  RUN: "https://auth.globus.org/scopes/eec9b274-0c81-4334-bdc2-54e90e689b9a/run",
  RUN_STATUS:
    "https://auth.globus.org/scopes/eec9b274-0c81-4334-bdc2-54e90e689b9a/run_status",
  RUN_MANAGE:
    "https://auth.globus.org/scopes/eec9b274-0c81-4334-bdc2-54e90e689b9a/run_manage",
};
