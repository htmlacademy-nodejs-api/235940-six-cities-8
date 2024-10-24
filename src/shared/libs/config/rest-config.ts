import { IConfig } from './types/config.interface.js';
import { config } from 'dotenv';
import { ILogger } from '../logger/types/logger.interface.js';
import { IRestSchema } from './types/rest-schema.interface.js';
import { configRestSchema } from './rest-schema.js';
import { injectable, inject } from 'inversify';
import { Component } from '../../types/component.const.js';

@injectable()
export class RestConfig implements IConfig<IRestSchema> {
  private readonly config: IRestSchema;

  constructor(
    @inject(Component.Logger) private readonly logger: ILogger
  ) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }

    configRestSchema.load({});
    configRestSchema.validate({ allowed: 'strict', output: this.logger.info });

    this.config = configRestSchema.getProperties();
    this.logger.info('.env file found and successfully parsed!');
  }

  public get<T extends keyof IRestSchema>(key: T): IRestSchema[T] {
    return this.config[key];
  }
}
