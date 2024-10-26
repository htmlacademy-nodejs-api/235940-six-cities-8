import { IDatabaseClient } from './types/database-client.interface.js';
import mongoose from 'mongoose';
import { injectable, inject } from 'inversify';
import { Component } from '../../types/component.const.js';
import { ILogger } from '../logger/types/logger.interface.js';

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
    this.mongoose = await mongoose.connect(uri);
    this.isConnected = true;
    this.logger.info('Database connection established.');
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
