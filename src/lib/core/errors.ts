export class EnvironmentConfigurationError extends Error {
  override name = 'EnvironmentConfigurationError';

  constructor(variable: string, value: unknown) {
    super();
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    this.message = `Invalid configuration value provided for ${variable} (${value}).`;
  }
}
