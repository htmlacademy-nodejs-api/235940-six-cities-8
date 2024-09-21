import { getRandomNumberFromRange } from './getRandomNumberFromRange.js';

export const getRandomItemsFromArray = <T>(items: T[], quantity: number): T[] => {
  const itemsCopy = [...items];

  if (quantity >= itemsCopy.length) {
    return itemsCopy;
  }

  const result: T[] = [];

  for (let i = 0; i < quantity; i++) {
    const randomIndex = getRandomNumberFromRange(0, itemsCopy.length - 1);
    result.push(itemsCopy[randomIndex]);
    itemsCopy.splice(randomIndex, 1);
  }

  return result;
};
