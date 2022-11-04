import { group } from 'k6';
import calculateCart from './calculateCart.js';
import { getBulkInventory } from './getBulkInventory.js';
import { getCartItems } from './getCartItems.js';
import { goToPage } from './goToPage.js';

export const checkout = (anonId) => {
  group('Go to checkout page', () => {
    goToPage('https://www.shoesforcrews.com/checkout');
  });

  group('Call get items API', () => {
    getCartItems(anonId);
  });

  group('Call calculate cart API', () => {
    calculateCart(anonId);
  });

  group('Call inventory API', () => {
    getBulkInventory();
  });
};
