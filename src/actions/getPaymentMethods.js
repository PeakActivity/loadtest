import http from 'k6/http';
import { weightedSleep } from '../utils/weightedSleep.js';
import { check } from 'k6';

export const getPaymentMethods = () => {
  console.log('get payment methods');
  const response = http.get(
    'https://rev-api-proxy.shoesforcrews.com/api/orders/0/paymentMethods',

    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  check(response, {
    'is status 200': (r) => {
      return r.status === 200;
    },
  });
  weightedSleep(5, response);
};
