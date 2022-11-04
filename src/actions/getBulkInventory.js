import http from 'k6/http';
import { weightedSleep } from '../utils/weightedSleep.js';
import { check } from 'k6';

export const getBulkInventory = () => {
  console.log('get bulk inventory');
  const response = http.post(
    'https://rev-api-proxy.shoesforcrews.com/api/bulkinventory/',
    inventoryBody,
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
  // weightedSleep(5, response);
};

const inventoryBody = JSON.stringify({
  countryCode: 'US',
  queryObject: [
    {
      partNumber: '22149',
      size: '7',
    },
  ],
});
