import 'reflect-metadata';
import { Container } from 'inversify';

import { PinoLogger } from './shared/libs/logger/index.js';
import { RestApplication } from './rest/index.js';
import { RestConfig } from './shared/libs/config/index.js';
import { MongoDatabaseClient } from './shared/libs/database-client/index.js';

import { Component } from './shared/types/component.const.js';

import { ILogger } from './shared/libs/logger/types/logger.interface.js';
import { IConfig } from './shared/libs/config/types/config.interface.js';
import { IRestSchema } from './shared/libs/config/types/rest-schema.interface.js';
import { IDatabaseClient } from './shared/libs/database-client/types/database-client.interface.js';

const bootstrap = async () => {
  const container = new Container();
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<ILogger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<IConfig<IRestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  container.bind<IDatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();

  const application = container.get<RestApplication>(Component.RestApplication);

  await application.init();
};

bootstrap();
