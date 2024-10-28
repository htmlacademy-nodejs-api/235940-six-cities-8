import { CreateOfferDto } from '../dto/create-offer.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { Offer } from '../offer.js';

export interface IOfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<Offer>>;
  findById(offerId: string): Promise<DocumentType<Offer> | null>;
}
