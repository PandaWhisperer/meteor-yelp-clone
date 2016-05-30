import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './home.html';

Template.home.onCreated(function() {
  this.query = new ReactiveVar({});
})

Template.home.helpers({
  mapCenter() {
    return { lat: -37.8136, lng: 144.9631 };
  },

  defaultZoom() {
    return 15;
  },

  query() {
    return Template.instance().query.get();
  },

  queryChanged() {
    const instance = Template.instance();
    return (query) => { instance.query.set(query); }
  }
})
