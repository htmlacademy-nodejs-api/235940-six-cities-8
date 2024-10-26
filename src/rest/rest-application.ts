import { ILogger } from '../shared/libs/logger/types/logger.interface.js';
import { IConfig } from '../shared/libs/config/types/config.interface.js';
import { IRestSchema } from '../shared/libs/config/types/rest-schema.interface.js';
import { inject, injectable } from 'inversify';
import { Component } from '../shared/types/component.const.js';
import { IDatabaseClient } from '../shared/libs/database-client/types/database-client.interface.js';
import { getMongoURI } from '../shared/utils/getMongoURI.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Config) private readonly config: IConfig<IRestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: IDatabaseClient,
  ) {}

  private async initDatabase(): Promise<void> {
    const mongoURI = getMongoURI({
      username: this.config.get('DB_USERNAME'),
      password: this.config.get('DB_PASSWORD'),
      host: this.config.get('DB_HOST'),
      port: this.config.get('DB_PORT'),
      databaseName: this.config.get('DB_NAME'),
    });

    return this.databaseClient.connect(mongoURI);
  }

  public async init(): Promise<void> {
    this.logger.info('Application initialized');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    this.logger.info('Init database…');
    await this.initDatabase();
    this.logger.info('Init database completed');
  }
}
