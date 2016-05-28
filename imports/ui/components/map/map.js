import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './map.html';

Template.map.onRendered(function() {
  GoogleMaps.load({
    key: Meteor.settings.public.googleApiKey
  });
})

Template.map.helpers({
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
