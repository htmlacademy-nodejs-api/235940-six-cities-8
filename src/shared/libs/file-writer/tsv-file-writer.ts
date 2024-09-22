import { IFileWriter } from './types/file-writer.interface.js';
import { WriteStream, createWriteStream } from 'node:fs';

export class TSVFileWriter implements IFileWriter {
  private readonly stream: WriteStream;

  constructor(fileName: string) {
    this.stream = createWriteStream(fileName, {
      flags: 'w',
      encoding: 'utf-8',
      autoClose: true,
    });
  }

  public async write(row: string): Promise<void> {
    const writeSuccess = this.stream.write(`${row}\n`);

    if (!writeSuccess) {
      return new Promise<void>((resolve) => {
        this.stream.once('drain',() => resolve());
      });
    }

    return Promise.resolve();
  }
}
