const LOG_LEVELS = ['debug', 'info', 'warn', 'error'] as const;

type LogLevel = (typeof LOG_LEVELS)[number];

type LogHandler = (...args: unknown[]) => void;

type Logger = {
  log: LogHandler;
  error?: LogHandler;
  warn?: LogHandler;
  info?: LogHandler;
  debug?: LogHandler;
};
/**
 * No logger is set by default.
 */
let logger: Logger | undefined;
/**
 * By default, the logger is set to `error`.
 */
let level: number = LOG_LEVELS.indexOf('error');
/**
 * Set the global logger for the SDK.
 * @param logMechanism The logger to use.
 * @example `log.setLogger(console)`
 */
export function setLogger(logMechanism: Logger) {
  logger = logMechanism;
}
/**
 * Set the global log level for the logger.
 * @param severity The severity to set the logger to.
 * @example `log.setLogLevel('info')`
 */
export function setLogLevel(severity: LogLevel) {
  level = LOG_LEVELS.indexOf(severity);
}
/**
 * Log a message to the logger.
 * @param severity The severity of the log entry.
 * @param args The message to log.
 * @private
 */
export function log(severity: LogLevel, ...args: unknown[]) {
  if (!logger) return;
  /**
   * If the severity of the entry is less than the logger's configured severity, do not log.
   */
  if (LOG_LEVELS.indexOf(severity) < level) {
    return;
  }
  /**
   * If the logger does not have a handler for the specified severity, use the default `log` handler.
   */
  const handler = logger[severity] ?? logger.log;
  handler(...args);
}
