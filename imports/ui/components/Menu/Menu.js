import { Template } from 'meteor/templating';
import { ActiveRoute } from 'meteor/zimme:active-route';

import './Menu.html';

Template.Menu.helpers({
  isActive(item) {
    return ActiveRoute.path(item.link) ? 'menu-item-divided pure-menu-selected' : '';
  }
});
