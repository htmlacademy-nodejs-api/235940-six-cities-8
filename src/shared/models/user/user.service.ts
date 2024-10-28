import { IUserService } from './types/user-service.interface.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { User } from './user.js';
import { injectable, inject } from 'inversify';
import { Component } from '../../types/component.const.js';
import { ILogger } from '../../libs/logger/types/logger.interface.js';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<User>
  ) {}

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<User>> {
    const user = new User(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  public async findById(id: string): Promise<DocumentType<User> | null> {
    return this.userModel.findOne({ id });
  }

  public async findByEmail(email: string): Promise<DocumentType<User> | null> {
    return this.userModel.findOne({ email });
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<User>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }
}
