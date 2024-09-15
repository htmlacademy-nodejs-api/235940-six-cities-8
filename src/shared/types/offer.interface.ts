import { ECity } from './city.enum.js';
import { THousingType } from './housing-type.type.js';
import { TFacility } from './facility.type.js';
import { ICoordinates } from './coordinates.interface.js';

export interface IOffer {
  title: string,
  description: string,
  date: Date,
  city: ECity,
  previewImage: string,
  images: string[],
  isPremium: boolean,
  rating: number,
  housingType: THousingType,
  roomsNumber: number,
  guestsNumber: number,
  price: number,
  facilities: TFacility[],
  author: string,
  commentsNumber: number,
  coordinates: ICoordinates,
}
