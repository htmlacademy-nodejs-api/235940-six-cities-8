import { ILogger } from '../shared/libs/logger/types/logger.interface.js';
import { IConfig } from '../shared/libs/config/types/config.interface.js';
import { IRestSchema } from '../shared/libs/config/types/rest-schema.interface.js';
import { inject, injectable } from 'inversify';
import { Component } from '../shared/types/component.const.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Config) private readonly config: IConfig<IRestSchema>,
  ) {}

  public async init(): Promise<void> {
    this.logger.info('Application initialized');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
