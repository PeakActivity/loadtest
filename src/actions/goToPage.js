import http from 'k6/http';
import { check } from 'k6';
import { weightedSleep } from '../utils/weightedSleep.js';

export const goToPage = (url) => {
  console.log(`Go to page: ${url}`);
  const response = http.get(url);

  check(response, {
    'is status 200': (r) => r.status === 200,
  });

  weightedSleep(5, response);
};
