import { FlowRouter } from 'meteor/kadira:flow-router'
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render("mainLayout", { content: "home", header: "Header" });
  }
});

FlowRouter.route('/category/:category', {
  name: 'category.show',
  action() {
    BlazeLayout.render("mainLayout", { content: "home", header: "Header" });
  }
});

FlowRouter.route('/place/:placeId', {
  name: 'place.show',
  action() {
    BlazeLayout.render("mainLayout", { content: "home", header: "Header" });
  }
})
