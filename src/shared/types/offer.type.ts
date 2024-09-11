import { ECity } from './city.enum.js';
import { EHousingType } from './housing-type.enum.js';
import { TFacility } from './facility.type.js';
import { TCoordinates } from './coordinates.type.js';

export type TOffer = {
  title: string,
  description: string,
  date: Date,
  city: ECity,
  previewImage: string,
  images: string[],
  isPremium: boolean,
  isSelected: boolean,
  rating: number,
  housingType: EHousingType,
  roomsNumber: number,
  guestsNumber: number,
  price: number,
  facilities: TFacility[],
  author: string,
  commentsNumber: number,
  coordinates: TCoordinates,
}
