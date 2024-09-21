import dayjs from 'dayjs';

import { IOfferGenerator } from './types/offer-generator.interface.js';
import { IMockServerData } from '../../types/mock-server-data.interface.js';

import { getRandomItemFromArray } from '../../utils/getRandomItemFromArray.js';
import { getRandomItemsFromArray } from '../../utils/getRandomItemsFromArray.js';
import { getRandomNumberFromRange } from '../../utils/getRandomNumberFromRange.js';
import { SEMICOLON_SEPARATOR, TAB_SEPARATOR } from '../../constants/separators.const.js';
import { EOfferRating } from './types/offer-rating.enum.js';
import { ERoomsQuantity } from './types/rooms-quantity.enum.js';
import { EGuestsQuantity } from './types/guests-quantity.enum.js';
import { EPriceQuantity } from './types/price-quantity.enum.js';
import { EMockCommentsQuantity } from './types/mock-comments-quantity.enum.js';
import { EMockLatitude } from './types/mock-latitude.enum.js';
import { EMockLongitude } from './types/mock-longitude.enum.js';
import {
  COORDINATES_DIGITS_AFTER_DOT,
  FIRST_WEEK_DAY,
  LAST_WEEK_DAY, MIN_FACILITIES_QUANTITY,
  OFFER_IMAGES_QUANTITY,
  RATING_DIGITS_AFTER_DOT
} from './constants/common.const.js';

export class TSVOfferGenerator implements IOfferGenerator {
  constructor(private readonly mockData: IMockServerData) {}

  public generate(): string {
    const title = getRandomItemFromArray<string>(this.mockData.titles);
    const description = getRandomItemFromArray<string>(this.mockData.descriptions);
    const date = dayjs().subtract(getRandomNumberFromRange(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomItemFromArray<string>(this.mockData.cities);
    const previewImage = getRandomItemFromArray<string>(this.mockData.images);
    const images = getRandomItemsFromArray<string>(this.mockData.images, OFFER_IMAGES_QUANTITY);
    const isPremium = getRandomNumberFromRange();
    const rating = getRandomNumberFromRange(EOfferRating.MinValue, EOfferRating.MaxValue, RATING_DIGITS_AFTER_DOT);
    const housingType = getRandomItemFromArray<string>(this.mockData.housingTypes);
    const roomsNumber = getRandomNumberFromRange(ERoomsQuantity.MinValue, ERoomsQuantity.MaxValue);
    const guestsNumber = getRandomNumberFromRange(EGuestsQuantity.MinValue, EGuestsQuantity.MaxValue);
    const price = getRandomNumberFromRange(EPriceQuantity.MinValue, EPriceQuantity.MaxValue);
    const facilities = getRandomItemsFromArray(this.mockData.facilities, getRandomNumberFromRange(MIN_FACILITIES_QUANTITY, this.mockData.facilities.length));
    const author = {
      name: getRandomItemFromArray(this.mockData.userNames),
      email: getRandomItemFromArray(this.mockData.emails),
      avatar: getRandomItemFromArray(this.mockData.avatars),
      password: getRandomItemFromArray(this.mockData.passwords),
      userType: getRandomItemFromArray(this.mockData.userTypes),
    };
    const commentsNumber = getRandomNumberFromRange(EMockCommentsQuantity.MinValue, EMockCommentsQuantity.MaxValue);
    const coordinates = {
      latitude: getRandomNumberFromRange(EMockLatitude.MinValue, EMockLatitude.MaxValue, COORDINATES_DIGITS_AFTER_DOT),
      longitude: getRandomNumberFromRange(EMockLongitude.MinValue, EMockLongitude.MaxValue, COORDINATES_DIGITS_AFTER_DOT),
    };

    return [
      title,
      description,
      date,
      city,
      previewImage,
      images.join(SEMICOLON_SEPARATOR),
      isPremium,
      rating,
      housingType,
      roomsNumber,
      guestsNumber,
      price,
      facilities.join(SEMICOLON_SEPARATOR),
      Object.values(author).join(TAB_SEPARATOR),
      commentsNumber,
      Object.values(coordinates).join(SEMICOLON_SEPARATOR),
    ].join(TAB_SEPARATOR);
  }
}
