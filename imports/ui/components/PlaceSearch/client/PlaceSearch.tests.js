/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import { ensureElement, ensureCallbackOnElementChange, withRenderedTemplate } from '../../../test-helpers.js';
import '../PlaceSearch.js';

describe('PlaceSearch component', function() {

  it('has a "keyword" input', function() {
    ensureElement('PlaceSearch', {}, 'input[name=keyword]');
  });

  it('has a "type" dropdown', function() {
    ensureElement('PlaceSearch', {}, 'select[name=type]');
  });

  it('calls "onQueryChanged" when keyword has changed', function(done) {
    ensureCallbackOnElementChange('PlaceSearch', {}, 'input[name=keyword]', { onQueryChanged(query) {
      chai.assert.equal(query.keyword, 'test');
      done();
    }}, 'test');
  });

  it('calls "onQueryChanged" when type has changed', function(done) {
    ensureCallbackOnElementChange('PlaceSearch', {}, 'select[name=type]', { onQueryChanged(query) {
      chai.assert.equal(query.type, 'airport');
      done();
    }}, 'airport');
  });

});
