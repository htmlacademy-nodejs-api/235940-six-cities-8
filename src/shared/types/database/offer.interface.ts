import { ECity } from './city.enum.js';
import { EHousingType } from './housing-type.enum.js';
import { EFacility } from './facility.enum.js';
import { ICoordinates } from './coordinates.interface.js';
import { IUser } from './user.interface.js';

export interface IOffer {
  title: string,
  description: string,
  date: Date,
  city: ECity,
  previewImage: string,
  images: string[],
  isPremium: boolean,
  rating: number,
  housingType: EHousingType,
  roomsNumber: number,
  guestsNumber: number,
  price: number,
  facilities: EFacility[],
  author: IUser,
  commentsNumber: number,
  coordinates: ICoordinates,
}
