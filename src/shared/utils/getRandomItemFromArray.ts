import { getRandomNumberFromRange } from './getRandomNumberFromRange.js';

export const getRandomItemFromArray = <T>(items: T[]): T => items[getRandomNumberFromRange(0, items.length - 1)];

