import { sleep, check } from 'k6';
import {
  randomItem,
  randomIntBetween,
} from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { SharedArray } from 'k6/data';
import http from 'k6/http';
import { goToPage } from './actions/goToPage.js';
import addToCart from './actions/addToCart.js';
import { checkout } from './actions/checkout/checkout.js';

export const options = {
  stages: [
    // { duration: '10s', target: 1 }, // below normal load
    { duration: '1m', target: 100 },
    // { duration: '10s', target: 1400 }, // spike to 1400 users
    // { duration: '3m', target: 1400 }, // stay at 1400 for 3 minutes
    // { duration: '10s', target: 100 }, // scale down. Recovery stage.
    // { duration: '3m', target: 100 },
    // { duration: '10s', target: 0 },
  ],
};

// Run by Virtual User once per iteration
export default function () {
  goToPage('https://www.shoesforcrews.com');
  console.log('at home page');
  const firstGate = randomIntBetween(1, 10000);
  if (firstGate <= 4698) return;
  goToPage('https://www.shoesforcrews.com/catalog/men-view-all');
  console.log('at plp page');
  const secondGate = randomIntBetween(1, 10000);
  if (secondGate <= 5676) return;
  goToPage('https://www.shoesforcrews.com/product/22149-everlight');
  console.log('at pdp page');
  const thirdGate = randomIntBetween(1, 10000);
  if (thirdGate <= 930) return;
  addToCart();
  console.log('added product to cart');
  const fourthGate = randomIntBetween(1, 10000);
  if (fourthGate <= 560) return;
  checkout();
  console.log('checked out');
}
