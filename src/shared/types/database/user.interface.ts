import { EUserType } from './user-type.enum.js';

export interface IUser {
  name: string,
  email: string,
  avatar: string,
  password: string,
  userType: EUserType,
}
