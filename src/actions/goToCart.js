import { getAfterPay } from './getAfterPay.js';
import { goToPage } from './goToPage.js';
import { getBulkInventory } from './getBulkInventory.js';
import { getPaymentMethods } from './getPaymentMethods.js';
import { calculateCart } from './calculateCart.js';
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const goToCart = (anonId) => {
  // Go to cart page
  goToPage('https://www.shoesforcrews.com/cart');

  // Get afterpay
  getAfterPay();

  // Get Bulk Inventory
  getBulkInventory();

  // Get Payment Methods
  getPaymentMethods();

  // Calculate Cart
  calculateCart(anonId);
};

export default function () {
  const anonId = 'load_test_' + uuidv4();
  goToCart(anonId);
}
