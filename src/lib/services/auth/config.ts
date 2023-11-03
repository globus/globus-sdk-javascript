import type { Environment } from "../../core/global";

export const ID = "AUTH";
export const HOSTS: Partial<Record<Environment, string>> = {
  integration: "auth.integration.globuscs.info",
  sandbox: "auth.sandbox.globuscs.info",
  production: "auth.globus.org",
  test: "auth.test.globuscs.info",
  staging: "auth.staging.globuscs.info",
  preview: "auth.preview.globus.org",
};
