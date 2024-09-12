import { readFileSync } from 'node:fs';

import { IFileReader } from './file-reader.interface.js';
import { TOffer } from '../../types/index.js';
import { ECity } from '../../types/city.enum.js';
import { TFacility } from '../../types/facility.type.js';
import { TCoordinates } from '../../types/coordinates.type.js';
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

  private parseImages(imagesString: string): string[] {
    return imagesString.split(';');
  }

  private parseIntNumber(numberString: string): number {
    return Number.parseInt(numberString, 10);
  }

  private parseNumberWithDot(numberString: string): number {
    return Number.parseFloat(numberString);
  }

  private parseFacilities(facilitiesString: string): TFacility[] {
    return facilitiesString.split(';') as TFacility[];
  }

  private parseCoordinates(coordinatesString: string): TCoordinates {
    const coordinatesList = coordinatesString.split(';');
    return {
      latitude: this.parseNumberWithDot(coordinatesList[0]),
      longitude: this.parseNumberWithDot(coordinatesList[1]),
    } as TCoordinates;
  }

  private parseLineToOffer(line: string): TOffer {
    const [
      title,
      description,
      createDate,
      city,
      previewImage,
      images,
      isPremium,
      isSelected,
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
      city: ECity[city as keyof typeof ECity],
      previewImage,
      images: this.parseImages(images),
      isPremium: !!this.parseIntNumber(isPremium),
      isSelected: !!this.parseIntNumber(isSelected),
      rating: this.parseNumberWithDot(rating),
      housingType: housingType as THousingType,
      roomsNumber: this.parseIntNumber(roomsNumber),
      guestsNumber: this.parseIntNumber(guestsNumber),
      price: this.parseIntNumber(price),
      facilities: this.parseFacilities(facilities),
      author,
      commentsNumber: this.parseIntNumber(commentsNumber),
      coordinates: this.parseCoordinates(coordinates),
    };
  }

  private parseRawDataToOffers(): TOffer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): TOffer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
