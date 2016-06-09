/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';

import { ensureElement } from '../../../test-helpers.js';
import '../PlaceDetail.js';

describe('PlaceDetail component', function() {
  const place = {
    name: "Moe's Tavern",
    price_level: 2,
    photos: [{
      getUrl() { return 'moes-tavern.jpg' }
    }],
    vicinity: "Springfield U.S.A."
  };

  it('shows a header with the place name', function() {
    ensureElement('PlaceDetail', { place }, "h2:contains(Moe's Tavern)");
  });

  it('shows the address of the place', function() {
    ensureElement('PlaceDetail', { place }, ".address:contains(Springfield U.S.A.)");
  });

  it('shows the price level if available', function() {
    ensureElement('PlaceDetail', { place }, "span.price-level .fa-dollar", 2);
  });

  it('shows photos of the place', function() {
    ensureElement('PlaceDetail', { place }, "h4:contains(Photos)");
    ensureElement('PlaceDetail', { place }, "img[src='moes-tavern.jpg']");
  });
});
