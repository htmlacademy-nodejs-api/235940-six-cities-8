import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { ICommand } from './types/command.interface.js';
import { IPackageJSONConfig } from './types/package-json-config.interface.js';

export class VersionCommand implements ICommand {
  constructor(
    private readonly filePath: string = 'package.json'
  ) {}

  private isPackageJSONConfig(value: unknown): asserts value is IPackageJSONConfig {
    if (!(
      typeof value === 'object' &&
      value !== null &&
      !Array.isArray(value) &&
      Object.hasOwn(value, 'version')
    )) {
      throw new Error();
    };
  }

  private readVersion(): string {
    const jsonContent = readFileSync(resolve(this.filePath), { encoding: 'utf-8' });
    const importedContent: unknown = JSON.parse(jsonContent);
    this.isPackageJSONConfig(importedContent);

    return importedContent.version;
  }

  public getName(): string {
    return '--version';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      console.info(version);
    } catch (error) {
      console.error(`Failed to read version from ${this.filePath}`);

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
