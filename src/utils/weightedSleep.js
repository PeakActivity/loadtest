import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { sleep } from 'k6';

export const weightedSleep = (avgTime, response) => {
  const requestDuration = response.timings.duration / 1000;
  let fuzz = randomIntBetween(0, 1000) / 1000;
  const sign = randomIntBetween(0, 1);
  if (sign === 1) {
    fuzz *= -1;
  }
  sleep(avgTime - requestDuration + fuzz);
};
