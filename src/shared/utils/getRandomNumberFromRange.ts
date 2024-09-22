export const getRandomNumberFromRange = (min = 0, max = 1, digitsAfterDot = 0): number =>
  +((Math.random() * (max - min)) + min).toFixed(digitsAfterDot);
