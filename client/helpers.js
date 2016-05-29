// Simple debug helper to dump objects as JSON
Template.registerHelper('debug', function(data) {
  return JSON.stringify(data);
});

// This allows us to write inline objects in Blaze templates
// like so: {{> template param=(object key="value") }}
// => The template's data context will look like this:
// { param: { key: "value" } }
Template.registerHelper('object', function({ hash }) {
  return hash;
});

// This allows us to write inline arrays in Blaze templates
// like so: {{> template param=(array 1 2 3) }}
// => The template's data context will look like this:
// { param: [1, 2, 3] }
Template.registerHelper('array', function() {
  return Array.from(arguments).slice(0, arguments.length-1);
});
