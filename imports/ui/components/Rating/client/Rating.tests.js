/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { ensureElement } from '../../../test-helpers.js';

import '../Rating.js';

describe('Rating component', function() {
  const tests = {
    3.2: { full: 3, half: 0, empty: 2 },
    3.5: { full: 3, half: 1, empty: 1 },
    3.5: { full: 3, half: 1, empty: 1 },
    4.4: { full: 4, half: 1, empty: 0 },
    undefined: { full: 0, half: 0, empty: 5 }
  };

  Object.keys(tests).forEach(function(rating) {
    describe(`with ${rating} rating`, function() {
      const { full, half, empty } = tests[rating];
      const data = { rating };

      it(`shows ${full} full star(s)`, function() {
        ensureElement('Rating', data, 'i.fa.fa-star', full);
      });

      it(`shows ${half} half star(s)`, function() {
        ensureElement('Rating', data, 'i.fa.fa-star-half-o', half);
      });

      it(`shows ${empty} empty star(s)`, function() {
        ensureElement('Rating', data, 'i.fa.fa-star-o', empty);
      });
    });
  });
});
