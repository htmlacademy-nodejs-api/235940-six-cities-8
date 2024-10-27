import { DocumentType } from '@typegoose/typegoose';
import { CreateUserDto } from '../dto/create-user.dto.js';
import { User } from '../user.js';

export interface IUserService {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<User>>;
  findById(id: string): Promise<DocumentType<User> | null>;
  findByEmail(email: string): Promise<DocumentType<User> | null>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<User>>;
}
