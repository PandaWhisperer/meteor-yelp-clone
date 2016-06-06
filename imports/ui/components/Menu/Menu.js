import { Template } from 'meteor/templating';

import './Menu.html';

Template.Menu.helpers({
  isActive(item) {
    return item.active ? 'menu-item-divided pure-menu-selected' : '';
  }
});
