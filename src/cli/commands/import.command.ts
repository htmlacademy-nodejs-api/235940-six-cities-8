import { ICommand } from './types/command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { IOffer } from '../../shared/types/database/offer.interface.js';
import { getErrorMessage } from '../../shared/utils/getErrorMessage.js';

export class ImportCommand implements ICommand {
  private onImportedOffer(offer: IOffer): void {
    console.info(offer);
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
  }

  public getName(): string {
    return '--import';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [fileName] = parameters;

    if (!fileName || fileName.trim() === '') {
      throw new Error('File name is missing.');
    }

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
