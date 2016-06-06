/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import { ensureElement } from '../../../test-helpers.js';
import '../Header.js';

describe('Header component', function() {
  const data = { title: 'Welp' };

  it('has a title', function() {
    ensureElement('Header', data, '.app-title:contains(Welp)');
  });

  it('renders a horizontal menu', function() {
    ensureElement('Header', data, '.pure-menu.pure-menu-horizontal');
  });

});
