import { Template } from 'meteor/templating';

import './home.html';

Template.home.helpers({
  mapCenter() {
    return { lat: -37.8136, lng: 144.9631 }
  },

  defaultZoom() {
    return 15
  },

  query() {
    return { radius: '500', types: ['cafe'] }
  }
})
