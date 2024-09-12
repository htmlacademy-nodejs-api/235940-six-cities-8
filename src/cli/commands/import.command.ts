import { ICommand } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';

export class ImportCommand implements ICommand {
  public getName(): string {
    return '--import';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [fileName] = parameters;
    const fileReader = new TSVFileReader(fileName.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {

      if (!(err instanceof Error)) {
        throw err;
      }

      console.error(`Can't import data from file: ${fileName}`);
      console.error(`Details: ${err.message}`);
    }
  }
}
