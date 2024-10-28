import { Container } from 'inversify';
import { OfferService } from '../offer.service.js';
import { Component } from '../../../types/component.const.js';
import { types } from '@typegoose/typegoose';
import { Offer, OfferModel } from '../offer.js';

export const createOfferContainer = (): Container => {
  const offerContainer = new Container();

  offerContainer.bind<OfferService>(Component.OfferService).to(OfferService).inSingletonScope();
  offerContainer.bind<types.ModelType<Offer>>(Component.OfferModel).toConstantValue(OfferModel);

  return offerContainer;
};
