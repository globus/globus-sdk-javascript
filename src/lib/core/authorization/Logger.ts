const LOG_LEVELS = ['debug', 'info', 'warn', 'error'] as const;

export class Logger {
  constructor(readonly severity: (typeof LOG_LEVELS)[number] = 'debug') {}

  level = LOG_LEVELS.indexOf(this.severity);

  log(severity: (typeof LOG_LEVELS)[number], ...args: unknown[]) {
    /**
     * If the severity of the entry is less than the logger's configured severity, do not log.
     */
    if (LOG_LEVELS.indexOf(severity) < this.level) {
      return;
    }
    console.log(severity, ...args);
  }
}
