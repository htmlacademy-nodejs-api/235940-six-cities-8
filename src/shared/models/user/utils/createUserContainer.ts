import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../../types/component.const.js';
import { IUserService } from '../types/user-service.interface.js';
import { UserService } from '../user.service.js';
import { User, UserModel } from '../user.js';

export const createUserContainer = () : Container => {
  const userContainer = new Container();
  userContainer.bind<IUserService>(Component.UserService).to(UserService).inSingletonScope();
  userContainer.bind<types.ModelType<User>>(Component.UserModel).toConstantValue(UserModel);

  return userContainer;
};
