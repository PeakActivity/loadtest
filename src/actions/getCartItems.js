import http from 'k6/http';
import { weightedSleep } from '../utils/weightedSleep.js';
import { check } from 'k6';

export const getCartItems = (anonId) => {
  console.log('get cart items');
  const response = http.post(
    'https://rev-cms.shoesforcrews.com/carts/getItems',
    {
      anonId: anonId,
      populate: false,
    }
  );
  check(response, {
    'is status 200': (r) => {
      return r.status === 200;
    },
  });
  // weightedSleep(5, response);
};
