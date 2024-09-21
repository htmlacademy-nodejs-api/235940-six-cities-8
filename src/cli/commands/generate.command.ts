import got from 'got';
import { appendFile } from 'node:fs/promises';

import { ICommand } from './types/command.interface.js';
import { DECIMAL_RADIX } from '../../shared/libs/file-reader/constants/decimal-radix.const.js';
import { IMockServerData } from '../../shared/types/mock-server-data.interface.js';
import { TSVOfferGenerator } from '../../shared/libs/offer-generator/tsv-offer-generator.js';

export class GenerateCommand implements ICommand {
  private initialData: IMockServerData;

  private async load(url: string): Promise<void> {
    try {
      this.initialData = await got(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filePath: string, offersQuantity: number) {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    for (let i = 0; i < offersQuantity; i++) {
      await appendFile(filePath, `${tsvOfferGenerator.generate()}\n`, { encoding: 'utf8' });
    }
  }

  public getName(): string {
    return '--generate';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [quantity, filePath, url] = parameters;
    const offersQuantity = Number.parseInt(quantity, DECIMAL_RADIX);

    try {
      await this.load(url);
      await this.write(filePath, offersQuantity);
      console.info(`File ${filePath} was created!`);
    } catch (error: unknown) {
      console.error('Can\'t generate data');

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
