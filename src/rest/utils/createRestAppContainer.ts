import { Container } from 'inversify';
import { RestApplication } from '../rest-application.js';
import { Component } from '../../shared/types/component.const.js';
import { ILogger } from '../../shared/libs/logger/types/logger.interface.js';
import { PinoLogger } from '../../shared/libs/logger/index.js';
import { IConfig } from '../../shared/libs/config/types/config.interface.js';
import { IRestSchema } from '../../shared/libs/config/types/rest-schema.interface.js';
import { RestConfig } from '../../shared/libs/config/index.js';
import { IDatabaseClient } from '../../shared/libs/database-client/types/database-client.interface.js';
import { MongoDatabaseClient } from '../../shared/libs/database-client/index.js';

export const createRestAppContainer = (): Container => {
  const restAppContainer = new Container();

  restAppContainer.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  restAppContainer.bind<ILogger>(Component.Logger).to(PinoLogger).inSingletonScope();
  restAppContainer.bind<IConfig<IRestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  restAppContainer.bind<IDatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();

  return restAppContainer;
};
