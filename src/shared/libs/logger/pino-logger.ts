import { Logger, pino, transport } from 'pino';
import { ILogger } from './types/logger.interface.js';
import { resolve } from 'node:path';
import { getCurrentModulePath } from '../../utils/getCurrentModulePath.js';

export class PinoLogger implements ILogger {
  private readonly logger: Logger;

  constructor() {
    const modulePath = getCurrentModulePath();
    const logFilePath = 'logs/rest.log';
    const destination = resolve(modulePath, '../../../', logFilePath);

    const multiTransport = transport({
      targets: [
        {
          target: 'pino/file',
          level: 'debug',
          options: { destination }
        },
        {
          target: 'pino/file',
          level: 'info',
          options: {},
        }
      ],
    });

    this.logger = pino({},multiTransport);
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  public error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, message, ...args);
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }
}
