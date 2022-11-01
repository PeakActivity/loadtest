import {
  randomIntBetween,
  uuidv4,
} from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { addToCart } from '../actions/addToCart.js';
import { goToPage } from '../actions/goToPage.js';
import { checkout } from '../actions/checkout.js';
import { group } from 'k6';
import { SharedArray } from 'k6/data';
import { goToRandomPage } from '../actions/goToRandomPage.js';

export const options = {
  stages: [
    { duration: '1s', target: 1 }, // below normal load
    { duration: '100s', target: 1 }, // below normal load
    // { duration: '10s', target: 3 },
    // { duration: '10s', target: 1400 }, // spike to 1400 users
    // { duration: '3m', target: 1400 }, // stay at 1400 for 3 minutes
    // { duration: '10s', target: 100 }, // scale down. Recovery stage.
    // { duration: '3m', target: 100 },
    // { duration: '10s', target: 0 },
  ],
};

const sharedData = new SharedArray('urls', function () {
  // here you can open files, and then do additional processing or generate the array with data dynamically
  const f = JSON.parse(open('../utils/catalogUrls.json'));
  const d = JSON.parse(open('../utils/productUrls.json'));
  return [f, d]; // f must be an array[]
});

// Run by Virtual User once per iteration
export default function () {
  const anonId = 'load_test_' + uuidv4();

  group('Go to home page', () => goToPage('https://www.shoesforcrews.com'));

  // 46.98% chance the user goes to PLP page
  const firstGate = randomIntBetween(1, 10000);
  if (firstGate <= 4698) return;

  group('Go to product listing page', () => {
    goToRandomPage('https://shoesforcrews.com', sharedData[0]);
  });

  // 56.76% chance the user goes to PDP page
  const secondGate = randomIntBetween(1, 10000);
  if (secondGate <= 5676) return;

  group('Go to product description page', () => {
    goToRandomPage('https://shoesforcrews.com', sharedData[1]);
  });

  // 9.30% chance the user adds to cart
  const thirdGate = randomIntBetween(1, 10000);
  if (thirdGate <= 930) return;
  group('Add item to cart', () => addToCart(anonId));

  // 5.60% chance the user checks out
  const fourthGate = randomIntBetween(1, 10000);
  if (fourthGate <= 560) return;
  group('Checkout', () => checkout(anonId));
}
