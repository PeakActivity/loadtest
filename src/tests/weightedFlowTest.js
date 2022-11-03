import {
  randomIntBetween,
  uuidv4,
} from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { addToCart } from '../actions/addToCart.js';
import { goToPage } from '../actions/goToPage.js';
import { checkout } from '../actions/checkout.js';
import { getProductInventory } from '../actions/getProductInventory.js';
import { group } from 'k6';
import { SharedArray } from 'k6/data';
import { goToRandomPage } from '../actions/goToRandomPage.js';
import { getAfterPay } from '../actions/getAfterPay.js';

export const options = {
  stages: [
    { duration: '100s', target: 1 }, // below normal load
    // { duration: '60s', target: 1 }, // below normal load
    // { duration: '10s', target: 3 },
    // { duration: '10s', target: 1400 }, // spike to 1400 users
    // { duration: '3m', target: 1400 }, // stay at 1400 for 3 minutes
    // { duration: '10s', target: 100 }, // scale down. Recovery stage.
    // { duration: '3m', target: 100 },
    // { duration: '10s', target: 0 },
  ],
};

// MAKE SURE THIS IS CANONICAL URL
const BASE_URL = 'https://www.shoesforcrews.com';

// Take pageviews into account
const IGNORE_GATES = false;

const sharedData = new SharedArray('urls', function () {
  // here you can open files, and then do additional processing or generate the array with data dynamically
  const f = JSON.parse(open('../utils/catalogUrls.json'));
  const d = JSON.parse(open('../utils/productUrls.json'));
  return [f, d]; // must be an array[]
});

// Run by Virtual User once per iteration
export default function () {
  const anonId = 'load_test_' + uuidv4();

  // 27.42% chance the user lands on the home page
  const homeGate = randomIntBetween(1, 10000);
  if (homeGate <= 2742 || IGNORE_GATES) {
    console.log('home page');
    group('Go to home page', () => goToPage(BASE_URL));
  }

  // 46.98% chance the user lands on the PLP page
  const firstGate = randomIntBetween(1, 10000);
  if (firstGate <= 4698 || IGNORE_GATES) {
    console.log('PLP');
    group('Go to product listing page', () => {
      goToRandomPage(BASE_URL, sharedData[0]);
    });
  }

  // 56.76% chance the user lands on the PDP page
  const secondGate = randomIntBetween(1, 10000);
  if (secondGate <= 5676 || IGNORE_GATES) {
    console.log('PDP');
    group('Go to product description page', () => {
      // Go to random product
      const response = goToRandomPage(BASE_URL, sharedData[1]);

      // Get inventory for product
      getProductInventory(response);

      // Get After Pay
      getAfterPay();
    });
  }

  // 9.30% chance the user adds to cart
  const thirdGate = randomIntBetween(1, 10000);
  if (thirdGate <= 930 || IGNORE_GATES) {
    console.log('CART');
    group('Add item to cart', () => addToCart(anonId));

    // 5.60% chance the user checks out after adding to cart. 5.6/9.3 = 60.22% chance.
    const fourthGate = randomIntBetween(1, 10000);
    if (fourthGate <= 6022 || IGNORE_GATES) {
      console.log('CHECKOUT');
      group('Checkout', () => checkout(anonId));
    }
  }
}
