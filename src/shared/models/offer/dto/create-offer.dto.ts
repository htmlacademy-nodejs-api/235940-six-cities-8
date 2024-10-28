import { ECity } from '../../../types/database/city.enum.js';
import { EHousingType } from '../../../types/database/housing-type.enum.js';
import { EFacility } from '../../../types/database/facility.enum.js';
import { ICoordinates } from '../../../types/database/coordinates.interface.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public date: Date;
  public city: ECity;
  public previewImage: string;
  public images: string[];
  public isPremium: boolean;
  public rating: number;
  public housing: EHousingType;
  public roomsNumber: number;
  public guestsNumber: number;
  public price: number;
  public facilities: EFacility[];
  public authorId: string;
  public coordinates: ICoordinates;
}
