import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './map.html';

Template.map.onRendered(function() {
  GoogleMaps.load();
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
