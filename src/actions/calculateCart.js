import { weightedSleep } from '../utils/weightedSleep.js';
import http from 'k6/http';
import { check } from 'k6';
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const calculateCart = (anonId) => {
  console.log('calculate cart');
  const cartBody = {
    shippingAddress: {
      country: 'US',
      state: 'FL',
      postalCode: '32736',
      addressType: '',
      firstName: 'Default',
      lastName: 'Address',
      company: '',
      address: '4 Locust Street',
      address2: 'string',
      city: 'Hollywood',
      phoneNumber: 'string',
      isDefault: true,
    },
    cart: [
      {
        product: {
          id: '60a444b0eee8740010717ac8',
          sku: '22149-7',
          title: 'Everlight',
          finalPrice: 59.98,
          ourPrice: 59.98,
          discount: 0,
          catlevel1Name: 'Men',
          catlevel2Name: 'Category',
          catlevel3Name: 'Casual',
          product_type: 'shoes',
          modelnumber: '22149',
          taxCode: 'SHOE',
          shippingCategory: 'MATHB',
          size: ['7'],
          color: ['Black'],
          style: ['22149'],
          imageUrl: [
            'https://www.shoesforcrews.com/shared-imgs/productimages/us_en/22149/0000-1024.jpg',
          ],
          brand: ['Shoes For Crews'],
          gender: ['Men'],
          description: '',
          discontinued: 'false',
          inventory: 367,
          nextShipmentDate: 'November 04, 2022',
          sizeText: '7 (Med)',
          businessSelectPrice: '54.98',
          sizesApply: 'shoes',
          highestFinalPrice: 59.98,
          parentId: '22149',
        },
        quantity: 1,
        metaData: {
          id: '60a444b0eee8740010717ac8',
          sku: '22149-7',
          title: 'Everlight',
          finalPrice: 59.98,
          ourPrice: 59.98,
          discount: 0,
          catlevel1Name: 'Men',
          catlevel2Name: 'Category',
          catlevel3Name: 'Casual',
          product_type: 'shoes',
          modelnumber: '22149',
          taxCode: 'SHOE',
          shippingCategory: 'MATHB',
          size: ['7'],
          color: ['Black'],
          style: ['22149'],
          imageUrl: [
            'https://www.shoesforcrews.com/shared-imgs/productimages/us_en/22149/0000-1024.jpg',
          ],
          brand: ['Shoes For Crews'],
          gender: ['Men'],
          description: '',
          discontinued: 'false',
          inventory: 367,
          nextShipmentDate: 'November 04, 2022',
          sizeText: '7 (Med)',
          businessSelectPrice: '54.98',
          sizesApply: 'shoes',
          highestFinalPrice: 59.98,
          parentId: '22149',
        },
      },
    ],
    promo: '',
    identity: { anonId: anonId },
    isTaxExempt: false,
  };
  const response = http.post(
    'https://rev-api-proxy.shoesforcrews.com/api/cart/calculate',
    JSON.stringify(cartBody),
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
  return response;
};

export default function () {
  const anonId = 'load_test_' + uuidv4();
  const response = calculateCart(anonId);
}
