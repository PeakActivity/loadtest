import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { goToPage } from './actions/goToPage.js';
import addToCart from './actions/addToCart.js';
import { checkout } from './actions/checkout.js';
import { group } from 'k6';

export const options = {
  stages: [
    { duration: '5s', target: 1 }, // below normal load
    // { duration: '1m', target: 100 },
    // { duration: '10s', target: 1400 }, // spike to 1400 users
    // { duration: '3m', target: 1400 }, // stay at 1400 for 3 minutes
    // { duration: '10s', target: 100 }, // scale down. Recovery stage.
    // { duration: '3m', target: 100 },
    // { duration: '10s', target: 0 },
  ],
};

// Run by Virtual User once per iteration
export default function () {
  group('Go to home page', () => goToPage('https://www.shoesforcrews.com'));

  // 46.98% chance the user goes to PLP page
  const firstGate = randomIntBetween(1, 10000);
  if (firstGate <= 4698) return;
  group('Go to product listing page', () =>
    goToPage('https://www.shoesforcrews.com/catalog/men-view-all')
  );

  // 56.76% change the user goes to PDP page
  const secondGate = randomIntBetween(1, 10000);
  if (secondGate <= 5676) return;
  group('Go to product description page', () =>
    goToPage('https://www.shoesforcrews.com/product/22149-everlight')
  );

  // 9.30% change the user adds to cart
  const thirdGate = randomIntBetween(1, 10000);
  if (thirdGate <= 930) return;
  group('Add item to cart', () => addToCart());

  // 5.60% chance the user checks out
  const fourthGate = randomIntBetween(1, 10000);
  if (fourthGate <= 560) return;
  group('Checkout', () => checkout());
}
