import http from 'k6/http';
import { check } from 'k6';
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import { weightedSleep } from '../utils/weightedSleep.js';

export const getProductInventory = (productUrl) => {
  const url = new URL(productUrl);
  const productName = url.pathname.replace('/product/', '');
  let productId = '';

  if (productName.includes('-')) {
    productId = productName.substring(0, productName.indexOf('-'));
  } else {
    productId = productName;
  }
  const response = http.get(
    `https://rev-api-proxy.shoesforcrews.com/api/inventory/US/${productId}`
  );

  check(response, {
    'is status 200': (r) => r.status === 200,
  });

  // weightedSleep(5, response);
};
