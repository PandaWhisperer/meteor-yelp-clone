import { _ } from 'meteor/underscore';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { Tracker } from 'meteor/tracker';
import { chai } from 'meteor/practicalmeteor:chai';

const withDiv = function withDiv(callback) {
  const el = document.createElement('div');
  document.body.appendChild(el);
  try {
    callback(el);
  } finally {
    document.body.removeChild(el);
  }
};

export const withRenderedTemplate = function withRenderedTemplate(template, data, callback) {
  withDiv((el) => {
    const ourTemplate = _.isString(template) ? Template[template] : template;
    Blaze.renderWithData(ourTemplate, data, el);
    Tracker.flush();
    callback(el);
  });
};

export const ensureElement = function ensureElement(template, data, selector, count=1) {
  withRenderedTemplate(template, data, el => {
    chai.assert.equal($(el).find(selector).length, count);
  });
};

export const ensureCallbackOnElementChange = function ensureCallbackOnElementChange(template, data, selector, callback, value) {
  data = Object.assign(data, callback);

  withRenderedTemplate(template, data, el => {
    $(el).find(selector).val(value).trigger('change');
  });
};
