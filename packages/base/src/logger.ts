enum LoggerLevelEnum {
  trace,
  info,
  debug,
  warn,
  error,
}

let loggerLevel = LoggerLevelEnum.trace;

function setLoggerLevel(level: LoggerLevelEnum) {
  loggerLevel = level;
}

const logger = {
  trace: (...args: Parameters<typeof console.log>) => {
    if (loggerLevel < LoggerLevelEnum.trace) {
      return;
    }

    console.log('[trace]: ', ...args);
  },

  info: (...args: Parameters<typeof console.log>) => {
    if (loggerLevel < LoggerLevelEnum.info) {
      return;
    }
    console.log('[info]: ', ...args);
  },

  debug: (...args: Parameters<typeof console.log>) => {
    if (loggerLevel < LoggerLevelEnum.debug) {
      return;
    }
    console.log('[debug]: ', ...args);
  },
  warn: (...args: Parameters<typeof console.warn>) => {
    if (loggerLevel < LoggerLevelEnum.warn) {
      return;
    }
    console.warn('[warn]: ', ...args);
  },
  error: (...args: Parameters<typeof console.error>) => {
    if (loggerLevel < LoggerLevelEnum.error) {
      return;
    }
    console.error('[error]: ', ...args);
  },
};

export { logger, setLoggerLevel, LoggerLevelEnum };
