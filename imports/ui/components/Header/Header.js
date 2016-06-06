import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './Header.html';

Template.Header.onCreated(function() {
  this.setQuery = (query) =>
    FlowRouter.go(query.type ? 'category.show' : 'home',
      { category: query.type },
      { keyword: query.keyword });
});

Template.Header.helpers({
  title() {
    return Template.currentData().title ||
           Meteor.settings.public.appTitle;
  },

  queryChanged() {
    const instance = Template.instance();
    return (query) => { instance.setQuery(query); }
  }
});
