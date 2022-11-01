import http from 'k6/http';
import { check, sleep } from 'k6';
import {
  randomIntBetween,
  randomItem,
} from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const goToRandomPage = (basePath, weightedUrlArray) => {
  const url = randomItem(weightedUrlArray);
  const response = http.get(basePath + url);

  check(response, {
    'is status 200': (r) => r.status === 200,
  });
  const requestDuration = response.timings.duration / 1000;
  let fuzz = randomIntBetween(0, 1000) / 1000;
  const sign = randomIntBetween(0, 1);
  if (sign === 1) {
    fuzz *= -1;
  }
  sleep(5 - requestDuration + fuzz);
};
