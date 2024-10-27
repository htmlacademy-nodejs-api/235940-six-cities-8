import { IUser } from '../../types/database/user.interface.js';
import { EUserType } from '../../types/database/user-type.enum.js';
import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { createSHA256 } from '../../utils/createSHA256.js';

@modelOptions({ schemaOptions: { collection: 'users', timestamps: true, id: true } })
export class User extends defaultClasses.TimeStamps implements IUser {
  @prop({ required: true })
  public name: string;

  @prop({ required: true, unique: true })
  public email: string;

  @prop({ required: true })
  public password: string;

  @prop({ required: false, default: 'placeholder.png' })
  public avatar: string;

  @prop({ required: false, default: EUserType.Regular, enum: EUserType })
  public userType: EUserType;

  constructor(userData: IUser) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatar = userData.avatar;
    this.userType = userData.userType;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(User);
