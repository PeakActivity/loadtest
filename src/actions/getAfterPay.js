import http from 'k6/http';
import { check } from 'k6';
import { weightedSleep } from '../utils/weightedSleep.js';

export const getAfterPay = () => {
  console.log('get after pay');
  const response = http.get(
    'https://rev-api-proxy.shoesforcrews.com/api/afterpay'
  );

  check(response, {
    'is status 200': (r) => r.status === 200,
  });

  // weightedSleep(5, response);
};
