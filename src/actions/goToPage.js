import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
  stages: [
    { duration: '30s', target: 1 }, // below normal load
    // { duration: '30s', target: 6 },
    // { duration: '10s', target: 1400 }, // spike to 1400 users
    // { duration: '3m', target: 1400 }, // stay at 1400 for 3 minutes
    // { duration: '10s', target: 100 }, // scale down. Recovery stage.
    // { duration: '3m', target: 100 },
    // { duration: '10s', target: 0 },
  ],
};

export const goToPage = (url) => {
  const response = http.get(url);
  check(response, {
    'is status 200': (r) => r.status === 200,
  });
  const requestDuration = response.timings.duration / 1000;
  let fuzz = randomIntBetween(0, 1000) / 1000;
  const sign = randomIntBetween(0, 1);
  if (sign === 1) {
    fuzz *= -1;
  }
  console.log(5 + fuzz);
  sleep(5 - requestDuration + fuzz);
};

export default function () {
  goToPage('https://www.shoesforcrews.com');
}
