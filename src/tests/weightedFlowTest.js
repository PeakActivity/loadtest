import {
  randomIntBetween,
  uuidv4,
} from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import {
  addToCart,
  goToPage,
  checkout,
  getProductInventory,
  getAfterPay,
  goToCart,
  goToRandomPage,
} from '../actions/index.js';
import { group } from 'k6';
import { SharedArray } from 'k6/data';
import { postGlobalPromo } from '../actions/postGlobalPromo.js';
import { calculateGlobalPromo } from '../actions/calculateGlobalPromo.js';

// 10 user = 1x
// 20 user = 2x ...
export const options = {
  stages: [
    { duration: '0s', target: 1 }, // Scale over 5 mins.
    { duration: '100s', target: 50 }, // Scale over 5 mins.
    { duration: '600s', target: 50 }, // Stay for 10 mins.
  ],
  ext: {
    loadimpact: {
      projectID: '3669207',
      name: 'Weighted User Flow Test',
    },
  },
};

// MAKE SURE THIS IS CANONICAL URL
const BASE_URL = 'https://www.shoesforcrews.com';

// Take pageviews into account
const IGNORE_GATES = false;

// Global Promo Code
const GLOBAL_PROMO_CODE = 'BKF635';

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
    group('Go to home page', () => goToPage(BASE_URL));
  }

  // 46.98% chance the user lands on the PLP page
  const firstGate = randomIntBetween(1, 10000);
  if (firstGate <= 4698 || IGNORE_GATES) {
    group('Go to product listing page', () => {
      // Go to product list page
      goToRandomPage(BASE_URL, sharedData[0], { name: 'Product Listing Page' });
      // Calculate promo prices
      postGlobalPromo(anonId, GLOBAL_PROMO_CODE);
    });
  }

  // 56.76% chance the user lands on the PDP page
  const secondGate = randomIntBetween(1, 10000);
  if (secondGate <= 5676 || IGNORE_GATES) {
    group('Go to product description page', () => {
      // Go to random product
      const response = goToRandomPage(BASE_URL, sharedData[1], {
        name: 'Product Detail Page',
      });

      // Get inventory for product
      getProductInventory(response);

      // Calculate Promo Price
      calculateGlobalPromo(anonId, GLOBAL_PROMO_CODE);

      // Get After Pay
      getAfterPay();
    });
  }

  // 9.30% chance the user adds to cart
  const thirdGate = randomIntBetween(1, 10000);
  if (thirdGate <= 930 || IGNORE_GATES) {
    group('Add item to cart', () => addToCart(anonId));

    // 5.60% chance the user checks out after adding to cart. 5.6/9.3 = 60.22% chance.
    const fourthGate = randomIntBetween(1, 10000);
    if (fourthGate <= 6022 || IGNORE_GATES) {
      group('Checkout', () => {
        goToCart(anonId);
        checkout(anonId);
      });
    }
  }
}
