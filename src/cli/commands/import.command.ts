import { ICommand } from './types/command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { IOffer } from '../../shared/types/database/offer.interface.js';
import { getErrorMessage } from '../../shared/utils/getErrorMessage.js';
import { IUserService, UserModel, UserService } from '../../shared/models/user/index.js';
import { IOfferService, OfferModel, OfferService } from '../../shared/models/offer/index.js';
import { IDatabaseClient } from '../../shared/libs/database-client/types/database-client.interface.js';
import { ILogger } from '../../shared/libs/logger/types/logger.interface.js';
import { ConsoleLogger } from '../../shared/libs/logger/console-logger.js';
import { MongoDatabaseClient } from '../../shared/libs/database-client/index.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './constants/database-creds.js';
import { getMongoURI } from '../../shared/utils/getMongoURI.js';

export class ImportCommand implements ICommand {
  private userService: IUserService;
  private offerService: IOfferService;
  private databaseClient: IDatabaseClient;
  private logger: ILogger;
  private salt: string;

  constructor() {
    this.onImportedOffer = this.onImportedOffer.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.userService = new UserService(this.logger, UserModel);
    this.offerService = new OfferService(this.logger, OfferModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public getName(): string {
    return '--import';
  }

  private async saveOffer(offer: IOffer) {
    const user = await this.userService.findOrCreate({
      ...offer.author,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.offerService.create({
      authorId: user.id,
      title: offer.title,
      description: offer.description,
      date: offer.date,
      city: offer.city,
      previewImage: offer.previewImage,
      images: offer.images,
      isPremium: offer.isPremium,
      rating: offer.rating,
      housing: offer.housingType,
      roomsNumber: offer.roomsNumber,
      guestsNumber: offer.guestsNumber,
      price: offer.price,
      facilities: offer.facilities,
      coordinates: offer.coordinates,
    });
  }

  private async onImportedOffer(offer: IOffer, resolve: () => void): Promise<void> {
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  public async execute(fileName: string, username: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI({username, password, host, port: DEFAULT_DB_PORT, databaseName: dbname});
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(fileName.trim());

    fileReader.on('line', this.onImportedOffer);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (err) {
      console.error(`Can't import data from file: ${fileName}`);
      console.error(getErrorMessage(err));
    }
  }
}
