import http from 'k6/http';
import { check } from 'k6';

export const goToPage = (url) => {
  const response = http.get(url);
  check(response, {
    'is status 200': (r) => r.status === 200,
  });
};
