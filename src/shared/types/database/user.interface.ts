import { EUserType } from './user-type.enum.js';

export interface IUser {
  name: string,
  email: string,
  password: string,
  avatar: string,
  userType: EUserType,
}
