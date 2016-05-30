/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import { withRenderedTemplate } from '../../../test-helpers.js';
import '../placeSearch.js';

describe('PlaceSearch component', function() {

  it('has a "keyword" input', function() {
    withRenderedTemplate('PlaceSearch', {}, el => {
      chai.assert.equal($(el).find('input[name=keyword]').length, 1);
    });
  });

  it('has a "type" dropdown', function() {
    withRenderedTemplate('PlaceSearch', {}, el => {
      chai.assert.equal($(el).find('select[name=type]').length, 1);
    });
  });

  it('calls "onQueryChanged" when keyword has changed', function(done) {
    const data = {
      onQueryChanged(query) {
        chai.assert.equal(query.keyword, 'test');
        done();
      }
    };

    withRenderedTemplate('PlaceSearch', data, el => {
      $(el).find('input[name=keyword]').val('test').change();
    });
  });

  it('calls "onQueryChanged" when type has changed', function(done) {
    const data = {
      onQueryChanged(query) {
        chai.assert.equal(query.type, 'airport');
        done();
      }
    };

    withRenderedTemplate('PlaceSearch', data, el => {
      $(el).find('select[name=type]').val('airport').change();
    });
  });

});
