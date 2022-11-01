import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { SharedArray } from 'k6/data';
import goToPage from '../actions/goToPage.js';

// Target equals 10% traffic increase
export const options = {
  stages: [
    { duration: '30s', target: 1 },
    // { duration: '15s', target: 2 },
    // { duration: '1m', target: 5 }, // scale up to normal load
    // { duration: '10s', target: 10 }, // spike to 10 users
    // { duration: '30s', target: 10 }, // stay at 10 for 3 minutes
    // { duration: '10s', target: 5 }, // scale down. Recovery stage.
    // { duration: '5s', target: 1 }, // stay at normal load.
    // { duration: '10s', target: 0 }, // scale to zero and end test.
  ],
};

const data = new SharedArray('urls', function () {
  // here you can open files, and then do additional processing or generate the array with data dynamically
  const f = JSON.parse(open('../utils/weightedUrls.json'));
  return f; // f must be an array[]
});

// Run by Virtual User once per iteration
export default function () {
  const createRandomURL = () => {
    // Average Weighted array
    const randomPath = randomItem(data);
    const basePath = 'https://www.shoesforcrews.com';
    return basePath + randomPath;
  };

  goToPage(createRandomURL());
}
