/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { ensureElement } from '../../../test-helpers.js';

import '../Rating.js';

describe('Rating component', function() {

  describe('with 3.2 rating', function() {
    const data = { rating: 3.2 };

    it('shows three full stars', function() {
      ensureElement('Rating', data, 'i.fa.fa-star', 3);
    });

    it('shows two empty stars', function() {
      ensureElement('Rating', data, 'i.fa.fa-star-o', 2);
    });
  });

  describe('with 3.5 rating', function() {
    const data = { rating: 3.5 };

    it('shows three full stars', function() {
      ensureElement('Rating', data, 'i.fa.fa-star', 3);
    });

    it('shows one half star', function() {
      ensureElement('Rating', data, 'i.fa.fa-star-half-o', 1);
    });

    it('shows one empty star', function() {
      ensureElement('Rating', data, 'i.fa.fa-star-o', 1);
    });
  });

  describe('with 4.4 rating', function() {
    const data = { rating: 4.4 };

    it('shows four full stars', function() {
      ensureElement('Rating', data, 'i.fa.fa-star', 4);
    });

    it('shows one half star', function() {
      ensureElement('Rating', data, 'i.fa.fa-star-half-o', 1);
    });

    it('shows zero empty stars', function() {
      ensureElement('Rating', data, 'i.fa.fa-star-o', 0);
    });
  });

  describe('with no rating', function() {
    const data = { rating: undefined };

    it('shows zero full stars', function() {
      ensureElement('Rating', data, 'i.fa.fa-star', 0);
    });

    it('shows zero half stars', function() {
      ensureElement('Rating', data, 'i.fa.fa-star-half-o', 0);
    });

    it('shows five empty stars', function() {
      ensureElement('Rating', data, 'i.fa.fa-star-o', 5);
    });
  });

});
