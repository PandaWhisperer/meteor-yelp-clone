import { Template } from 'meteor/templating';

import './Menu.html';

Template.Menu.helpers({
  menuItems() {
    return Template.currentData().menuItems || [
      { title: 'Home',     link: '#' },
      { title: 'About',    link: '#' },
      { title: 'Services', link: '#' , active: true },
      { title: 'Contact',  link: '#' }
    ];
  },
  isActive(item) {
    return item.active ? 'menu-item-divided pure-menu-selected' : '';
  }
});
