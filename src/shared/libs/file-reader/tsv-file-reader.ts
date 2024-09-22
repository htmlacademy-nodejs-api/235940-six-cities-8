import { IFileReader } from './types/file-reader.interface.js';
import { IOffer } from '../../types/offer.interface.js';
import { ECity } from '../../types/city.enum.js';
import { EFacility } from '../../types/facility.enum.js';
import { ICoordinates } from '../../types/coordinates.interface.js';
import { EHousingType } from '../../types/housing-type.enum.js';
import { DECIMAL_RADIX } from '../../constants/decimal-radix.const.js';
import { EUserType } from '../../types/user-type.enum.js';
import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';
import { CHUNK_SIZE } from './constants/chunk-size.const.js';

export class TSVFileReader extends EventEmitter implements IFileReader {
  constructor(
    private readonly filename: string
  ) {
    super();
  }

  private parseSemicolonSeparatedValues<T>(valuesString: string): T {
    return valuesString.split(';') as T;
  }

  private parseIntNumber(numberString: string): number {
    return Number.parseInt(numberString, DECIMAL_RADIX);
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
      name,
      email,
      avatar,
      password,
      userType,
      commentsNumber,
      coordinates,
    ] = line.split('\t');

    return {
      title,
      description,
      date: new Date(createDate),
      city: city as ECity,
      previewImage,
      images: this.parseSemicolonSeparatedValues<string[]>(images),
      isPremium: !!this.parseIntNumber(isPremium),
      rating: this.parseNumberWithDot(rating),
      housingType: housingType as EHousingType,
      roomsNumber: this.parseIntNumber(roomsNumber),
      guestsNumber: this.parseIntNumber(guestsNumber),
      price: this.parseIntNumber(price),
      facilities: this.parseSemicolonSeparatedValues<EFacility[]>(facilities),
      author: {
        name,
        email,
        avatar,
        password,
        userType: userType as EUserType
      },
      commentsNumber: this.parseIntNumber(commentsNumber),
      coordinates: this.parseCoordinates(coordinates),
    };
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);
        this.emit('line', parsedOffer);
      }
    }

    this.emit('end', importedRowCount);
  }
}
