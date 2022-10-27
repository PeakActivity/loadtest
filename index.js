import { sleep, check } from 'k6';
import {
  randomItem,
  randomIntBetween,
} from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { SharedArray } from 'k6/data';
import http from 'k6/http';

export const options = {
  stages: [
    { duration: '10s', target: 1 }, // below normal load
    //   { duration: '1m', target: 100 },
    //   { duration: '10s', target: 1400 }, // spike to 1400 users
    //   { duration: '3m', target: 1400 }, // stay at 1400 for 3 minutes
    //   { duration: '10s', target: 100 }, // scale down. Recovery stage.
    //   { duration: '3m', target: 100 },
    //   { duration: '10s', target: 0 },
  ],
};

const data = new SharedArray('urls', function () {
  // here you can open files, and then do additional processing or generate the array with data dynamically
  const f = JSON.parse(open('./urls.json'));
  return f; // f must be an array[]
});

// Run by Virtual User once per iteration
export default function () {
  const createRandomURL = () => {
    const randomPath = randomItem(data);
    return __ENV.BASE_URL + randomPath;
  };

  const res = http.get(createRandomURL());
  check(res, {
    'response code was 200': (res) => res.status == 200,
  });
  sleep(randomIntBetween(3, 5));
}
