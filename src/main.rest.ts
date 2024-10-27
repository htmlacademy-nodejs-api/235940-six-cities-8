import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication } from './rest/index.js';
import { Component } from './shared/types/component.const.js';
import { createRestAppContainer } from './rest/utils/createRestAppContainer.js';
import { createUserContainer } from './shared/models/user/index.js';

const bootstrap = async () => {
  const appContainer = Container.merge(createRestAppContainer(), createUserContainer());

  const application = appContainer.get<RestApplication>(Component.RestApplication);
  await application.init();
};

bootstrap();
