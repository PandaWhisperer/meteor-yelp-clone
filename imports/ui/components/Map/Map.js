import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './Map.html';

Template.Map.onCreated(function () {
  this.map = new ReactiveVar();
  this.places = new ReactiveVar([]);

  // automatically search places if query has changed
  this.autorun(() => {
    const map = this.map.get();
    const { query } = Template.currentData();

    if (map && query) {
      query.bounds = map.instance.getBounds();
      searchNearby(map, query, this.places);
    }
  })

  // automatically add markers to map when places have changed
  let markers = [];
  this.autorun(() => {
    const map = this.map.get();
    const places = this.places.get();
    // remove old markers from map before adding new ones
    markers.forEach((marker) => removeMarker(marker));
    markers = places.map((place) => addMarker(map, place));
  })

  // notify observers when places have changed
  const { onPlacesChanged } = Template.currentData();
  this.autorun(() => {
    const places = this.places.get();
    typeof onPlacesChanged === 'function' && onPlacesChanged(places);
  })
})

Template.Map.onRendered(function() {
  GoogleMaps.load({
    key: Meteor.settings.public.googleApiKey,
    libraries: 'places'
  });

  GoogleMaps.ready('map', (map) => {
    this.map.set(map);
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

// Creates a marker from a place, but doesn't add it to a map
function createMarker(place) {
  return new google.maps.Marker({
    position: place.geometry.location,
    title: place.name,
    animation: google.maps.Animation.DROP
  });
}

// Adds a marker to the given map
function addMarker(map, marker) {
  if (!(marker instanceof google.maps.Marker)) {
    marker = createMarker(marker);
  }
  marker.setMap(map.instance);

  return marker;
}

// Removes a marker from a map
function removeMarker(marker) {
  marker.setMap(null);
}

function searchNearby(map, query, places) {
  const service = new google.maps.places.PlacesService(map.instance);

  service.nearbySearch(query, (results, status, pagination) => {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log(results)
      places.set(results);
    } else {
      console.log(status)
    }
  })
}
