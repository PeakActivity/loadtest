import http from 'k6/http';
import { check } from 'k6';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { weightedSleep } from '../utils/weightedSleep.js';

export const goToRandomPage = (basePath, weightedUrlArray, tags = {}) => {
  const url = randomItem(weightedUrlArray);
  const response = http.get(basePath + url, {
    tags: tags,
  });

  check(response, {
    'is status 200': (r) => r.status === 200,
  });

  weightedSleep(5, response);

  return basePath + url;
};
