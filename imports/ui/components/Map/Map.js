import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './Map.html';

Template.Map.onRendered(function() {
  GoogleMaps.load({
    key: Meteor.settings.public.googleApiKey
  });
})

Template.Map.helpers({
  mapOptions() {
    const { center, zoom } = Template.currentData();

    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(center.lat, center.lng),
        zoom: zoom
      };
    }
  }
})
