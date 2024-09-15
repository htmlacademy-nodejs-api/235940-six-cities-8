import { readFileSync } from 'node:fs';

import { IFileReader } from './types/file-reader.interface.js';
import { IOffer } from '../../types/offer.interface.js';
import { ECity } from '../../types/city.enum.js';
import { TFacility } from '../../types/facility.type.js';
import { ICoordinates } from '../../types/coordinates.interface.js';
import { THousingType } from '../../types/housing-type.type.js';

export class TSVFileReader implements IFileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseSemicolonSeparatedValues<T>(valuesString: string): T {
    return valuesString.split(';') as T;
  }

  private parseIntNumber(numberString: string): number {
    return Number.parseInt(numberString);
  }

  private parseNumberWithDot(numberString: string): number {
    return Number.parseFloat(numberString);
  }

  private parseCoordinates(coordinatesString: string): ICoordinates {
    const coordinatesList = coordinatesString.split(';');
    return {
      latitude: this.parseNumberWithDot(coordinatesList[0]),
      longitude: this.parseNumberWithDot(coordinatesList[1]),
    } as ICoordinates;
  }

  private parseLineToOffer(line: string): IOffer {
    const [
      title,
      description,
      createDate,
      city,
      previewImage,
      images,
      isPremium,
      rating,
      housingType,
      roomsNumber,
      guestsNumber,
      price,
      facilities,
      author,
      commentsNumber,
      coordinates,
    ] = line.split('\t');

    return {
      title,
      description,
      date: new Date(createDate),
      city: ECity[city as ECity],
      previewImage,
      images: this.parseSemicolonSeparatedValues<string[]>(images),
      isPremium: !!this.parseIntNumber(isPremium),
      rating: this.parseNumberWithDot(rating),
      housingType: housingType as THousingType, // enum
      roomsNumber: this.parseIntNumber(roomsNumber),
      guestsNumber: this.parseIntNumber(guestsNumber),
      price: this.parseIntNumber(price),
      facilities: this.parseSemicolonSeparatedValues<TFacility[]>(facilities), // enum list
      author,
      commentsNumber: this.parseIntNumber(commentsNumber),
      coordinates: this.parseCoordinates(coordinates),
    };
  }

  private parseRawDataToOffers(): IOffer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length)
      .map((line) => this.parseLineToOffer(line));
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): IOffer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
