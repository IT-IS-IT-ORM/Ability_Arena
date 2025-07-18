export function getRandomNumber({ min, max, isInteger = false }) {
  if (isInteger) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return Number((Math.random() * (max - min) + min).toFixed(2));
}
