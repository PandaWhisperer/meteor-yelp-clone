import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './home.html';

Template.home.onCreated(function() {
  this.places = new ReactiveVar([]);
  this.placeId = () => FlowRouter.getParam('placeId');
  this.placePath = (place) => FlowRouter.path('place.show', { placeId: place.id });
})

Template.home.helpers({
  mapCenter() {
    return { lat: -37.8136, lng: 144.9631 };
  },

  defaultZoom() {
    return 15;
  },

  query() {
    return {
      type:    FlowRouter.getParam('category'),
      keyword: FlowRouter.getQueryParam('keyword')
    }
  },

  menuItems() {
    const places = Template.instance().places.get();
    return places.map((place) => ({
      title: place.name,
      rating: place.rating,
      link: Template.instance().placePath(place)
    })).sort((a, b) => (b.rating||0) - (a.rating||0));
  },

  placesChanged() {
    const places = Template.instance().places;
    return (results) => { places.set(results); }
  },

  placeSelected() {
    const placeId = Template.instance().placeId();
    const places = Template.instance().places.get();

    return places.find((place) => place.id == placeId);
  }
})
