import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const checkout = (anonId) => {
  const testBody = JSON.stringify({
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
      },
    ],
    promo: '',
    identity: {
      //TODO: Sync this with random anonId from addToCart().
      anonId: anonId,
    },
    shippingMethods: ['G'],
    isTaxExempt: false,
  });

  group('Go to checkout page', () => {
    const pageResponse = http.get('https://www.shoesforcrews.com/checkout');
    check(pageResponse, {
      'is status 200': (r) => {
        return r.status === 200;
      },
    });
  });

  group('Call get items API', () => {
    const getItemsResponse = http.post(
      'https://rev-cms.shoesforcrews.com/carts/getItems',
      {
        anonId: anonId,
        populate: false,
      }
    );
    check(getItemsResponse, {
      'is status 200': (r) => {
        return r.status === 200;
      },
    });
  });

  group('Call calculate cart API', () => {
    const calculateCartResponse = http.post(
      'https://rev-api-proxy.shoesforcrews.com/api/cart/calculate',
      testBody,
      params
    );
    check(calculateCartResponse, {
      'is status 200': (r) => {
        return r.status === 200;
      },
    });
  });

  group('Call inventory API', () => {
    const inventoryResponse = http.post(
      'https://rev-api-proxy.shoesforcrews.com/api/bulkinventory/',
      inventoryBody,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    check(inventoryResponse, {
      'is status 200': (r) => {
        return r.status === 200;
      },
    });
    const requestDuration = inventoryResponse.timings.duration / 1000;
    let fuzz = randomIntBetween(0, 1000) / 1000;
    const sign = randomIntBetween(0, 1);
    if (sign === 1) {
      fuzz *= -1;
    }
    sleep(5 - requestDuration + fuzz);
  });
};

const params = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const inventoryBody = JSON.stringify({
  countryCode: 'US',
  queryObject: [
    {
      partNumber: '22149',
      size: '7',
    },
  ],
});
