import http from 'k6/http';
import { check } from 'k6';

export const checkout = (id) => {
  // Go to checkout page
  const pageResponse = http.get('https://www.shoesforcrews.com/checkout');
  check(pageResponse, {
    'is status 200': (r) => {
      if (r.status !== 200) {
        console.log(r);
      }
      return r.status === 200;
    },
  });

  // Call get items API
  const getItemsResponse = http.post(
    'https://rev-cms.shoesforcrews.com/carts/getItems',
    {
      anonId: '2EVF4NE7B5IL755UFZQ',
      populate: false,
    }
  );
  check(getItemsResponse, {
    'is status 200': (r) => {
      if (r.status !== 200) {
        console.log(r);
      }
      return r.status === 200;
    },
  });

  // Call Calculate Cart API
  const calculateCartResponse = http.post(
    'https://rev-api-proxy.shoesforcrews.com/api/cart/calculate',
    testBody,
    params
  );
  check(calculateCartResponse, {
    'is status 200': (r) => {
      if (r.status !== 200) {
        console.log(r);
      }
      return r.status === 200;
    },
  });

  // Call inventory API
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
      if (r.status !== 200) {
        console.log(r);
      }
      return r.status === 200;
    },
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
    anonId: '2EVF4NE7B5IL755UFZQ',
  },
  shippingMethods: ['G'],
  isTaxExempt: false,
});
