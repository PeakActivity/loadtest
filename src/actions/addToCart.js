import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const addToCart = (anonId) => {
  let body = JSON.stringify({
    product: {
      variantId: '22149-7',
      id: '60a444b0eee8740010717ac8',
      sku: '22149-7',
      price: 0,
      ourPrice: 59.98,
      microPrice: 0,
      map: 0,
      mapEnforced: 'false',
      finalPrice: 59.98,
      discount: 0,
      description: '',
      availability: 'true',
      shipTypes: ['Standard'],
      fullDescription:
        "The Everlight™ shoe is breathable and lightweight, giving you a lift as you speed through your work day. Everlight™ features our patented Easy Clean slip-resistant outsole technology, keeping you safe on your feet throughout your day - all at a price that can't be beat!",
      onSale: 'false',
      images:
        '{"items":[{"alt":"Everlight right view","id":"Y6XVD4OUTLL9R2W6M2","type":"image","url":"https://www.shoesforcrews.com/shared-imgs/productimages/US_en/22149/0000-1024.jpg","sequenceNumber":"1"},{"alt":"Everlight three-quarter view","id":"6ZW37SS7L1SL9R2W6M2","type":"image","url":"https://www.shoesforcrews.com/shared-imgs/productimages/US_en/22149/0002-1024.jpg","sequenceNumber":"3"},{"alt":"Everlight left view","id":"0Y4J1APZ56BRL9R2W6M2","type":"image","url":"https://www.shoesforcrews.com/shared-imgs/productimages/US_en/22149/0003-1024.jpg","sequenceNumber":"4"},{"alt":"Everlight front view","id":"5HU5ZXNB1PFL9R2W6M2","type":"image","url":"https://www.shoesforcrews.com/shared-imgs/productimages/US_en/22149/0005-1024.jpg","sequenceNumber":"5"},{"alt":"Everlight back view","id":"2RJGC8QF0M4L9R2W6M2","type":"image","url":"https://www.shoesforcrews.com/shared-imgs/productimages/US_en/22149/0006-1024.jpg","sequenceNumber":"6"},{"alt":"Everlight top view","id":"QNLYSOFNOJL9R2W6M2","type":"image","url":"https://www.shoesforcrews.com/shared-imgs/productimages/US_en/22149/0007-1024.jpg","sequenceNumber":"7"},{"alt":"Everlight bottom view","id":"HQL5EJKGMXL9R2W6M2","type":"image","url":"https://www.shoesforcrews.com/shared-imgs/productimages/US_en/22149/0008-1024.jpg","sequenceNumber":"8"},{"alt":"Everlight detail view","id":"COUO430V3W5L9R2W6M2","type":"image","url":"https://www.shoesforcrews.com/shared-imgs/productimages/US_en/22149/0009-1024.jpg","sequenceNumber":"9"},{"alt":"Everlight default view","id":"33I5TTNO9BUL9R2W6M2","type":"image","url":"https://www.shoesforcrews.com/shared-imgs/productimages/US_en/22149/0001-1024.jpg","sequenceNumber":"10"}]}',
      metatitle: '',
      metadescription: '',
      pdfs: ['{"items":[]}'],
      containsImage: 'true',
      inventory: 367,
      size: ['7'],
      wide: 'false',
      sfc_sku: '22149-7',
      sizeText: '7 (Med)',
      parent_unbxd: false,
      parentId: '22149',
      timeStamp_unbxd: 1666886498868,
      unbxdFeedId: '7ba24bb9-a10b-42e8-afbf-bf2d26f6b67c',
      '3_unbxd_sku': ['22149-7'],
      '1_unbxd_text': [
        'Hospitality',
        'Knitted',
        'Water-resistant, breathable knitted upper',
        'Industrial',
        'TripGuard',
        'Supermarket',
        'Casual',
        'Black',
        'shoes',
        '22149',
        '3.75',
        'WIDE Shoes',
        'Foodservice',
        'Slip Resistant',
        'Featherlight foam midsole technology provides cushioned comfort',
        '7',
        'Men',
        'Athletic',
        'Healthcare',
        'Easy Clean',
        'Weight (per shoe): 6.75 oz',
        'Schools',
        'SpillGuard',
      ],
      sku_unbxdaq: ['22149-7'],
      title: 'Everlight',
      parentName: '22149',
      parentImage:
        'https://www.shoesforcrews.com/shared-imgs/productimages/US_en/22149/0000-1024.jpg',
      lowestFinalPrice: 59.98,
      highestFinalPrice: 59.98,
      brand: ['Shoes For Crews'],
      modelnumber: '22149',
      vendor: 'Shoes For Crews',
      catlevel1Name: 'Men',
      catlevel2Name: 'Category',
      catlevel3Name: 'Casual',
      categoryRoute: [
        'Men|men-parent>Category|men>Athletic|men-athletic',
        'Men|men-parent>Category|men>Casual|men-casual',
        'Men|men-parent>Category|men>WIDE Shoes|men-wide-shoes',
      ],
      collectionRoute: ['f22149everlight%20m'],
      collectionIds: ['62c58518db3b12001854ff34'],
      productUrl: '/product/22149-everlight/',
      imageUrl: [
        'https://www.shoesforcrews.com/shared-imgs/productimages/us_en/22149/0000-1024.jpg',
      ],
      productgroup: '60a44496e736ca00101b4d97',
      leadAttribute: 'size',
      brand_attribute: 'Shoes For Crews',
      color: ['Black'],
      features: ['Slip Resistant', 'Easy Clean', 'SpillGuard', 'TripGuard'],
      gender: ['Men'],
      new_item: 'false',
      product_style_group: ['Athletic', 'Casual'],
      style: ['22149'],
      upper_material: ['Knitted'],
      weight: '3.75',
      extraWide: 'false',
      gender_code: 'M',
      featureBullets: [
        'Water-resistant, breathable knitted upper',
        'Weight (per shoe): 6.75 oz',
        'Featherlight foam midsole technology provides cushioned comfort',
      ],
      featureicons: [
        'Slip Resistant: Superior SFC slip-resistant outsole.',
        'Easy Clean: Superior SFC slip-resistant outsole with our patented clog resistance built in.',
        'SpillGuard: A protective membrane lining that helps ward off liquids.',
        'TripGuard: Decreased trip hazard zone to allow fluid movement between slippery environments.',
      ],
      industryCode: [
        'Hospitality',
        'Healthcare',
        'Industrial',
        'Supermarket',
        'Foodservice',
        'Schools',
      ],
      industry:
        '[{"code":"E","industry":"Hospitality","rank":68.0},{"code":"H","industry":"Healthcare","rank":102.0},{"code":"I","industry":"Industrial","rank":152.0},{"code":"M","industry":"Supermarket","rank":69.0},{"code":"R","industry":"Foodservice","rank":912.0},{"code":"S","industry":"Schools","rank":31.0}]',
      product_type: 'shoes',
      sfc_color: 'Black',
      shippingCategory: 'MATHB',
      taxCode: 'SHOE',
      womens_size_difference: '0.0',
      discontinued: 'false',
      nextShipmentDate: 'November 04, 2022',
      sizesApply: 'shoes',
      businessSelectPrice: '54.98',
      sfcProductGroups: [
        'Water-Resistant',
        'TripGuard',
        'Athletic',
        'Casual',
        'Shoes For Crews',
      ],
      productTags: [
        'Clog Resistant',
        'Lightweight',
        'Removable Insoles',
        'Slip Resistant',
        'SpillGuard',
        'Water Resistant',
      ],
      productToeTypes: ['Soft Toe'],
      ds_id_unx_s:
        'e3c14193121ef5014c7098f68697b279a39c1977a2846ef22474922be5bb004f',
      categoryPath1: ['Men'],
      categoryPath2: ['Category'],
      categoryPath3: ['Athletic', 'Casual', 'WIDE Shoes'],
      categoryPath1_fq: ['Men'],
      categoryPath2_fq: ['Men>Category'],
      categoryPath3_fq: [
        'Men>Category>Casual',
        'Men>Category>WIDE Shoes',
        'Men>Category>Athletic',
      ],
      categoryPath: [
        'Men>Category',
        'Men>Category>Casual',
        'Men>Category>WIDE Shoes',
        'Men',
        'Men>Category>Athletic',
      ],
      autosuggest: 'Everlight',
      autosuggest_unstemmed: 'Everlight',
      modelnumber_unbxdaq: ['22149'],
      '3_unbxd_text': [
        'Category',
        'Everlight',
        'Men',
        'Casual',
        'Shoes For Crews',
      ],
      title_unbxdaq: ['Everlight'],
      doctype: 'POPULAR_PRODUCTS',
      '2_unbxd_text': ['22149'],
      _root_: '22149',
      score: 0.5,
      vId: '22149_22149-7',
    },
    populate: false,
    appendQuantity: 1,
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
    productId: '60a444b0eee8740010717ac8',
    anonId: anonId,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // dev link https://strapi.dev.sfc.merce.io/carts/addItem
  // Add To Cart request
  const response = http.post(
    'https://rev-cms.shoesforcrews.com/carts/addItem',
    body,
    params
  );

  check(response, {
    'is status 200': (r) => r.status === 200,
  });

  const requestDuration = response.timings.duration / 1000;
  let fuzz = randomIntBetween(0, 1000) / 1000;
  const sign = randomIntBetween(0, 1);
  if (sign === 1) {
    fuzz *= -1;
  }

  sleep(5 - requestDuration + fuzz);
};
