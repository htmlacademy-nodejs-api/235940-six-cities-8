import { defaultClasses, getModelForClass, modelOptions, prop, Ref, Severity } from '@typegoose/typegoose';
import { ECity } from '../../types/database/city.enum.js';
import { EHousingType } from '../../types/database/housing-type.enum.js';
import { EFacility } from '../../types/database/facility.enum.js';
import { User } from '../user/index.js';
import { ICoordinates } from '../../types/database/coordinates.interface.js';

@modelOptions({ schemaOptions: { collection: 'offers', timestamps: true, id: true }, options: {allowMixed: Severity.ALLOW} })
export class Offer extends defaultClasses.TimeStamps {
  @prop({ required: true, trim: true })
  public title: string;

  @prop({ required: true, trim: true })
  public description: string;

  @prop({ required: true })
  public date: Date;

  @prop({ required: true, enum: ECity })
  public city: ECity;

  @prop({ required: true })
  public previewImage: string;

  @prop({ required: true })
  public images: string[];

  @prop({ required: true, default: false })
  public isPremium: boolean;

  @prop({ required: true, default: 0 })
  public rating: number;

  @prop({ required: true, enum: EHousingType })
  public housing: EHousingType;

  @prop({ required: true })
  public roomsNumber: number;

  @prop({ required: true })
  public guestsNumber: number;

  @prop({ required: true })
  public price: number;

  @prop({ required: true, type: () => [String], enum: EFacility })
  public facilities: EFacility[];

  @prop({ required: true, ref: User })
  public authorId: Ref<User>;

  @prop({ default: 0 })
  public commentsNumber: number;

  @prop({ required: true })
  public coordinates: ICoordinates;
}

export const OfferModel = getModelForClass(Offer);
