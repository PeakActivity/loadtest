import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';

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

  const requestDuration = response.timings.duration / 1000;
  let fuzz = randomIntBetween(0, 1000) / 1000;
  const sign = randomIntBetween(0, 1);
  if (sign === 1) {
    fuzz *= -1;
  }
  sleep(5 - requestDuration + fuzz);
};
