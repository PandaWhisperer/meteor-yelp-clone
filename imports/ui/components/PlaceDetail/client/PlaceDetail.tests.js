/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';

import { ensureElement } from '../../../test-helpers.js';
import '../PlaceDetail.js';

describe('PlaceDetail component', function() {
  const place = {
    name: "Moe's Tavern"
  };

  it('shows a header with the place name', function() {
    ensureElement('PlaceDetail', { place }, "h2:contains(Moe's Tavern)");
  });
});
