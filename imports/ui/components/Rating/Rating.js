import { Template } from 'meteor/templating';

import './Rating.html';

Template.Rating.onCreated(function() {
  this.rating = () => Math.round( Template.currentData().rating*2 ) / 2 || 0;
});

Template.Rating.helpers({
  stars() {
    let rating = Template.instance().rating();
    return new Array( Math.floor(rating) ).fill(1);
  },
  halfStars() {
    const rating = Template.instance().rating();
    return new Array( Math.ceil(rating) - Math.floor(rating) ).fill(1);
  },
  remainder() {
    const rating = Template.instance().rating();
    return new Array( 5 - Math.ceil(rating) ).fill(1);
  }
});
