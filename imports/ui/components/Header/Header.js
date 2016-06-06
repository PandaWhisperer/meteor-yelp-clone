import { Template } from 'meteor/templating';

import './Header.html';

Template.Header.helpers({
  title() {
    return Template.currentData().title ||
           Meteor.settings.public.appTitle;
  }
});
