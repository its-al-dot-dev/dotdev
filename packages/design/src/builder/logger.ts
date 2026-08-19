import pc from 'picocolors'

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
      console.log(pc.dim(`[d]`) + ` ${message}`, ...args)
    }
  }

  info(message: string, ...args: unknown[]): void {
    if (this.minLevel <= LogLevel.INFO) {
      console.log(pc.cyan(`[i]`) + ` ${message}`, ...args)
    }
  }

  warn(message: string, ...args: unknown[]): void {
    if (this.minLevel <= LogLevel.WARN) {
      console.warn(pc.yellow('[!]') + ` ${message}`, ...args)
    }
  }

  error(message: string, ...args: unknown[]): void {
    if (this.minLevel <= LogLevel.ERROR) {
      console.error(pc.red('[✗]') + ` ${message}`, ...args)
    }
  }
}

export const logger = new ConsoleLogger(LogLevel.WARN)
