/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import { ensureElement } from '../../../test-helpers.js';
import '../Menu.js';

describe('Menu component', function() {
  const title = 'Welp';
  const menuItems = [
    { title: 'Home',     link: '#' },
    { title: 'About',    link: '#' },
    { title: 'Services', link: '#' , active: true },
    { title: 'Contact',  link: '#' }
  ];

  it('renders a menu', function() {
    const data = { title, menuItems };
    ensureElement('Menu', data, '.pure-menu');
  });

  it('has a title', function() {
    const data = { title, menuItems };
    ensureElement('Menu', data, '.pure-menu-heading:contains(Welp)');
  });

  it('has a list of menu items', function() {
    const data = { title, menuItems };
    ensureElement('Menu', data, '.pure-menu-list');
    menuItems.forEach(item => {
      ensureElement('Menu', data, `.pure-menu-link:contains(${item.title})`);
    })
  });

});
