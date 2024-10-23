import { ILogger } from '../shared/libs/logger/types/logger.interface.js';

export class RestApplication {
  constructor(
    private readonly logger: ILogger
  ) {}

  public async init(): Promise<void> {
    this.logger.info('Application initialized');
  }
}
