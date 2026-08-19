export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export interface Logger {
  debug(message: string, ...args: unknown[]): void
  info(message: string, ...args: unknown[]): void
  warn(message: string, ...args: unknown[]): void
  error(message: string, ...args: unknown[]): void
}

export class ConsoleLogger implements Logger {
  constructor(private readonly minLevel: LogLevel = LogLevel.WARN) {}

  debug(message: string, ...args: unknown[]): void {
    if (this.minLevel <= LogLevel.DEBUG) {
      console.debug(`[builder:debug] ${message}`, ...args)
    }
  }

  info(message: string, ...args: unknown[]): void {
    if (this.minLevel <= LogLevel.INFO) {
      console.info(`[builder:info] ${message}`, ...args)
    }
  }

  warn(message: string, ...args: unknown[]): void {
    if (this.minLevel <= LogLevel.WARN) {
      console.warn(`[builder:warn] ${message}`, ...args)
    }
  }

  error(message: string, ...args: unknown[]): void {
    if (this.minLevel <= LogLevel.ERROR) {
      console.error(`[builder:error] ${message}`, ...args)
    }
  }
}

export const logger = new ConsoleLogger(LogLevel.WARN)
