import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { IOfferService } from './types/offer-service.interface.js';
import { Component } from '../../types/component.const.js';
import { ILogger } from '../../libs/logger/types/logger.interface.js';
import { Offer } from './offer.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';

@injectable()
export class OfferService implements IOfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<Offer>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<Offer>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(id: string): Promise<DocumentType<Offer> | null> {
    return this.offerModel.findOne({ id });
  }
}
