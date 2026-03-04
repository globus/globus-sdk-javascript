import { setLogger, log, setLogLevel } from '../logger';

describe('logger', () => {
  it('logs to a configured logger', () => {
    const mockLogger = {
      log: vi.fn(),
      warn: vi.fn(),
    };
    setLogger(mockLogger);
    setLogLevel('warn');
    log('warn', 'this should warn');
    expect(mockLogger.warn).toHaveBeenCalledWith('this should warn');
  });

  it('(default) log level ("error") is respected', () => {
    const mockLogger = {
      log: vi.fn(),
      error: vi.fn(),
      warn: vi.fn(),
      info: vi.fn(),
      debug: vi.fn(),
    };
    setLogger(mockLogger);
    log('info', 'never');
    expect(mockLogger.info).not.toHaveBeenCalledWith('never');
    log('error', 'always');
    expect(mockLogger.error).toHaveBeenCalledWith('always');
  });

  it('falls back to "log" method', () => {
    const mockLogger = {
      log: vi.fn(),
    };
    setLogger(mockLogger);
    log('error', 'example');
    expect(mockLogger.log).toHaveBeenCalledWith('example');
  });
});
