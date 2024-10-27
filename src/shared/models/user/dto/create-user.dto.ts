import { EUserType } from '../../../types/database/user-type.enum.js';

export class CreateUserDto {
  public name: string;
  public email: string;
  public password: string;
  public avatar: string;
  public userType: EUserType;
}
