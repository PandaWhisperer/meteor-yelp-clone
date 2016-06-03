import { Template } from 'meteor/templating';
import { humanize, titleize } from 'underscore.string';
import PlaceTypes from './PlaceTypes.json';

import './PlaceSearch.html';

Template.PlaceSearch.helpers({
  placeTypes() {
    return PlaceTypes.map((type) => {
      return { type, display: titleize( humanize(type) ) };
    });
  }
})

Template.PlaceSearch.events({
  'change input, change select'(event, instance) {
    const { onQueryChanged } = Template.currentData();
    const query = {
      keyword: instance.$('input[name=keyword]').val(),
      type:    instance.$('select[name=type]').val()
    };
    console.log(query)

    if (typeof onQueryChanged === 'function') {
      onQueryChanged.call(instance, query);
    }
  }
})
