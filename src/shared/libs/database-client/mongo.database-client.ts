import mongoose from 'mongoose';
import { setTimeout } from 'node:timers/promises';
import { injectable, inject } from 'inversify';

import { Component } from '../../types/component.const.js';

import { IDatabaseClient } from './types/database-client.interface.js';
import { ILogger } from '../logger/types/logger.interface.js';

const RETRY_MAX_COUNT = 5;
const RETRY_TIMEOUT = 1000;

@injectable()
export class MongoDatabaseClient implements IDatabaseClient {
  private mongoose: typeof mongoose;
  private isConnected: boolean;

  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
  ) {
    this.isConnected = false;
  }

  public isConnectedToDatabase() {
    return this.isConnected;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnectedToDatabase()) {
      throw new Error('MongoDB client already connected');
    }

    this.logger.info('Trying to connect to MongoDB…');

    let attemptNumber = 0;
    while (attemptNumber < RETRY_MAX_COUNT) {
      try {
        this.mongoose = await mongoose.connect(uri);
        this.isConnected = true;
        this.logger.info('Database connection established.');
        return;
      } catch (error) {
        attemptNumber++;
        this.logger.error(`Failed to connect to the database. Attempt ${attemptNumber}`, error as Error);
        await setTimeout(RETRY_TIMEOUT);
      }
    }

    throw new Error(`Unable to establish database connection after ${RETRY_MAX_COUNT} attempts`);
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnectedToDatabase()) {
      throw new Error('Not connected to the database');
    }

    await this.mongoose.disconnect?.();
    this.isConnected = false;
    this.logger.info('Database connection closed.');
  }
}
