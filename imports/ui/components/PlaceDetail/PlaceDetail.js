import { Template } from 'meteor/templating';

import './PlaceDetail.html';

Template.PlaceDetail.helpers({
  photoUrl(photo) {
    return 'getUrl' in photo ? photo.getUrl({
      maxWidth: 200, maxHeight: 200
    }) : null;
  },

  priceLevel(place) {
    const priceLevel = place.price_level;
    return new Array(priceLevel || 0).fill(1);
  }
});
