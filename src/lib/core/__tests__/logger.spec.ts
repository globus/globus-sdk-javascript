import { setLogger, log, setLogLevel } from '../logger';

describe('logger', () => {
  it('logs to a configured logger', () => {
    const mockLogger = {
      log: jest.fn(),
      warn: jest.fn(),
    };
    setLogger(mockLogger);
    setLogLevel('warn');
    log('warn', 'this should warn');
    expect(mockLogger.warn).toHaveBeenCalledWith('this should warn');
  });

  it('(default) log level ("error") is respected', () => {
    const mockLogger = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      info: jest.fn(),
      debug: jest.fn(),
    };
    setLogger(mockLogger);
    log('info', 'never');
    expect(mockLogger.info).not.toHaveBeenCalledWith('never');
    log('error', 'always');
    expect(mockLogger.error).toHaveBeenCalledWith('always');
  });

  it('falls back to "log" method', () => {
    const mockLogger = {
      log: jest.fn(),
    };
    setLogger(mockLogger);
    log('error', 'example');
    expect(mockLogger.log).toHaveBeenCalledWith('example');
  });
});
