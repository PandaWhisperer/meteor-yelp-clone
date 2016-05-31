# Meteor Tutorial: Building a React-Yelp-Clone Clone

**NOTE:** This tutorial is a work-in-progress. This notice will be removed when it's done.

## Motivation

[Someone][wuworkshop] over at [CodeBuddies][cb]' Slack Channel recently linked me to [Fullstack.io][fullstack]'s [React tutorial][react-tutorial]. Initially I was excited, as learning React has been on my to-do list for a while now. But as I started following along, I quickly got frustrated by how much work was involved. After half an hour, I still hadn't written a single line of actual app code, but I had already installed about 20 NPM packages, and written copious amounts of arcane configuration files.

Long story short, after scrolling forward for a bit and realizing I would still be spending at least another 20 minutes on my setup, I got impatient and decided to do this project in [Meteor][meteor] instead. This is the story of what happened next.

[wuworkshop]: https://github.com/wuworkshop
[cb]: http://codebuddies.org
[fullstack]: http://www.fullstack.io
[react-tutorial]: https://www.fullstackreact.com/articles/react-tutorial-cloning-yelp/
[react-yelp-clone]: https://github.com/fullstackreact/react-yelp-clone
[meteor]: https://www.meteor.com/

## Creating the app

First, we'll ask Meteor to create a new project for us. This couldn't be any simpler:

    meteor create meteor-yelp-clone

Now, we simply `cd` into the new directory and run `meteor`, and we already have a working server that we can visit in the browser.

    cd meteor-yelp-clone
    meteor

Compare that to the React version, which spends the first 10 minutes setting up the build environment. Granted, there isn't much to see here either, but at least there's a little button we can click on that increases a counter. Even an `npm start` script is already preconfigured for us.

![The default Meteor app](images/meteor-default-app.png)

The score so far: Meteor: 1, React: 0.

## Font Awesome

Again, this is pretty simple. There's already a number of prebuilt packages available, so all we have to do here is run

    meteor add fortawesome:fontawesome

and we're good to go. We don't even need to restart the server, it automatically detects the new package and loads it for us. Awesome.

To test that this is working, we can add a little `<i class="fa fa-star"></i>` to our main.html. And while the React Tutorial is still explaining `postcss` and CSS modules, we're already moving on to the next step. Meteor: 2 - React: 0.

![The default Meteor app, now with a star](images/meteor-font-awesome.png)

## Setting up Testing

This is something I don't have much experience with but from what I know so far, we'll want to start with the `practicalmeteor:mocha` package.

    meteor add practicalmeteor:mocha

This conveniently also adds sinon and chai for mocking and expectations.

![Adding the practicalmeteor:mocha package](images/meteor-package-add-mocha.png)

However, we have nothing to test yet, because unlike React, we don't need a dedicated app container. Meteor already does that for us. We can, however, already configure our `package.json` so we can run our tests easily by typing `npm test`. In order to do that, we simply add the following line to the `"scripts"` section:

```json
  "scripts": {
    "start": "meteor run",
    "test": "meteor test --driver-package=practicalmeteor:mocha --port 3030"
  }
```

The `meteor test` command needs us to specify the driver package (there are [several different ones available][meteor-test-driver-packages]). Since the [`practicalmeteor:mocha`][practicalmeteor:mocha] package includes an HTML test runner that will display all of our tests in a browser, it actually starts a full Meteor server. Because our app is already running on port 3000, we'll have to tell it to run on a different port.

![The practicalmeteor:mocha test runner](images/meteor-test-runner.png)

We don't have any tests yet (because there isn't really anything to test), but that will change soon.
And while the React folks are still tweaking their `karma.conf.js`, we're off to the next step. Meteor: 3 - React: still 0.

[meteor-test-driver-packages]: http://guide.meteor.com/testing.html#driver-packages
[practicalmeteor:mocha]: https://atmospherejs.com/practicalmeteor/mocha

## Creating the Directory Structure

Now before we start building our actual app, lets take a moment and create the directory structure we'll be using. For this article, I decided to go with the [recommendation][meteor-dir-structure] in the [official Meteor Guide][meteor-guide]. This means we will be using [ES2015 modules][es2015-modules], and most of our application code will live in various subdirectories of the the `imports` directory.

    mkdir -p imports/{startup,api,ui}
    mkdir -p imports/startup/{client,server}
    mkdir -p imports/ui/{components,layouts,pages}

[es2015-modules]: https://developer.mozilla.org/en/docs/web/javascript/reference/statements/import
[meteor-dir-structure]: http://guide.meteor.com/structure.html#example-app-structure
[meteor-guide]: http://guide.meteor.com

## Setting up Routing

We'll also need a way to route different URLs to different views, therefore we require a router. Again, we'll go with the recommendation from the official guide and use `kadira:flow-router`. We'll also need the `kadira:blaze-layout` package, so let's install both right now:

    meteor add kadira:flow-router kadira:blaze-layout

Again, going with the recommendation, we'll store our routes in `imports/startup/client/routes.js`. We'll start with just one route for the main URL, which we'll call home.

```javascript
import { FlowRouter } from 'meteor/kadira:flow-router'
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render("mainLayout", { content: "home" });
  }
});
```

This creates a route named "home", which renders a template named "home" within a layout named "mainLayout". Now we just need to create those two files. Let's start with the layout, which we'll store in `imports/ui/layouts/main.html`:

```handlebars
<template name="mainLayout">
  <header>
    {{>Template.dynamic template=header}}
  </header>

  <main>
    {{>Template.dynamic template=content}}
  </main>

  <footer>
    {{>Template.dynamic template=footer}}
  </footer>
</template>
```

And now here's our "home" template, `imports/ui/pages/home.html` (don't worry about the missing templates for header and footer for now, we'll be adding those later):

```handlebars
<template name="home">
  Hello from the import side
</template>
```

I know, we've going for a dangerously long time now without seeing anything happen in the browser, so let's fix that right now. For this purpose, we'll create a file named `imports/startup/client/index.js` with the following contents:

```javascript
// routes
import './routes.js';

// templates
import '../../ui/layouts/main.html';
import '../../ui/pages/home.html';
```

This file basically pulls together all the stuff we need on the client, so we can easily import it in our `client/main.js` file. Now we simply delete all the pre-generated content in that file and simply replace it with this line:

```javascript
import '/imports/startup/client';
```

We'll also have to delete the default `client/main.html`, because otherwise, Meteor will still end up rendering that.

    rm client/main.html

If you did everything correctly, your browser should now show this:

![](images/meteor-routing-home.png)

Let's see how the React folks are doing, shall we? There's probably still configuring the router. Let's skip ahead for a bit and do something more fun. Looks like they're going to be working on the Google Maps integration next.

## Building a Google Maps Component

So, over at Fullstack React, [they are using a pre-built React component][react-google-maps], so I'm sure it won't be considered cheating if we do the same. We'll use the [`dburles:google-maps`][meteor-google-maps] package, which can be installed by running

    meteor add dburles:google-maps

Now, let's create a [Blaze component][meteor-blaze-components] to use that map. First, we'll need a new directory to hold the files:

	mkdir imports/ui/components/map
	
The component has two parts: a (HTML) template and some JavaScript. First, here's the template, `imports/ui/components/Map/Map.html`:

```handlebars
<template name="Map">
  <div class="map-container">
    {{> googleMap name="map" options=mapOptions}}
  </div>
</template>
```

> **NOTE** 
>
> As a convention, I'm going to be naming all of my components starting with an uppercase letter, while I'm going to be naming my pages starting with a lowercase letter.

Now, here's the JavaScript part, `imports/ui/components/Map/Map.js`:

```javascript
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
	
import './Map.html';
	
Template.Map.onRendered(function() {
  GoogleMaps.load({
    key: Meteor.settings.public.googleApiKey
  });
})
	
Template.Map.helpers({
  mapOptions() {
    const { center, zoom } = Template.currentData();
	
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(center.lat, center.lng),
        zoom: zoom
      };
    }
  }
})
```

Here, we are using [Meteor.settings][meteor-settings] to inject our Google API key into the component. This is Meteor's way of storing configuration data. In order for this to work, we'll need to create a settings file, and then point the server to that file when we start it. Let's do that now.

First, here's the settings file, `settings/development.json`:

```json
{
  "public": {
    "googleApiKey": "YOUR_GOOGLE_API_KEY_HERE"
  }
}
```

Now, in order to have the server load this file on startup, we need to run it with the `--settings=settings/development.json` option. Since we don't want to have to remember to do that every time, we'll just put this into the `scripts` section of our `package.json`.

```json
"scripts": {
  "start:dev": "meteor run --settings=settings/development.json",
  "test": "meteor test --settings=settings/test.json --driver-package=practicalmeteor:mocha --port 3030"
}
```

As you can see, we also added this option to our `npm test` script, so that our tests have access to the settings as well. For now, the `settings/test.json` file is simply a copy of `settings/development.json`. 

	cp settings/development.json settings/test.json
    
Now we'll have to stop our currently running server and restart it again by typing

    npm run start:dev
    
And we're off to the races again. Now, all we have left to do is use our new component. First, we will add it to our `imports/startup/client/index.js` file so it is available in our app:

```javascript
// components
import '../../ui/components/Map/Map.js';
```

Then, we'll add it to our "home" template by modifiying it as follows:

```handlebars
<template name="home">
  Hello from the import side
	
  {{> Map center=mapCenter zoom=defaultZoom}}
</template>
```

Finally, we need to add some helpers for this template, to pass in the map center and the default zoom level. We need to create a new file, `imports/ui/pages/home.js` with the following content:

```javascript
import { Template } from 'meteor/templating';
	
import './home.html';
	
Template.home.helpers({
  mapCenter() {
    return { lat: -37.8136, lng: 144.9631 }
  },
	
  defaultZoom() {
    return 8
  }
})
```

Now, back in `imports/startup/client/index.js`, we simply change the line

```javascript
import '../../ui/pages/home.html';
```

to end in `.js` instead of `.html`:

```javascript
import '../../ui/pages/home.js';
```

Here's what you should be seeing now in your browser:

![](images/meteor-google-map.png)

[react-google-maps]:https://www.fullstackreact.com/articles/react-tutorial-cloning-yelp/#routing-to-maps
[meteor-google-maps]: https://github.com/dburles/meteor-google-maps
[meteor-blaze-components]: http://guide.meteor.com/blaze.html#reusable-components
[meteor-settings]: http://docs.meteor.com/api/core.html#Meteor-settings

## Writing a Test for the Map Component

So, we've finally achieved some significant functionality. Time to write a test! Again, we'll take a [page from the Meteor Guide][meteor-unit-test] and implement a simple unit test for our component. Before we do this, we'll need to add the [`imports/ui/test-helpers.js`][meteor-test-helper] mentioned in that guide. I won't reproduce the file here, since you can find it at the link above.

Now we can go ahead and write the test in `imports/ui/components/Map/client/Map.tests.js` as follows:

```javascript
/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
	
import { chai } from 'meteor/practicalmeteor:chai';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
	
import { withRenderedTemplate } from '../../../test-helpers.js';
import '../Map.js';
	
describe('Map component', function () {
  it('renders correctly with simple data', function () {
    const center = { lat: -37.8136, lng: 144.9631 };
    const zoom = 8;
    const data = { center, zoom };
	
    withRenderedTemplate('Map', data, el => {
      chai.assert.equal($(el).find('.map-canvas').length, 1);
    });
  });
});
```

If you did everything right, the test runner should now show a passing test:

![](images/meteor-map-test.png)

[meteor-unit-test]: http://guide.meteor.com/testing.html#simple-unit-test
[meteor-test-helper]: https://github.com/meteor/todos/blob/master/imports/ui/test-helpers.js

## Adding Place Search to our Map Component

Next, we want our Map component to be able to search for and display places matching a certain query. Since we want to keep all the Google Maps handling code local to our component (to ensure proper encapsulation), we need to implement this functionality *inside* the component.

We'll start by changing the `onRendered` callback in our Map component to load the places API alongside with Google Maps. We'll also store the `map` object that the API returns in a [`ReactiveVar`][meteor-reactive-var] that's scoped to the template:

```javascript
import { ReactiveVar } from 'meteor/reactive-var';
    
Template.Map.onCreated(function () {
  this.map = new ReactiveVar();
})

Template.Map.onRendered(function() {
  GoogleMaps.load({
    key: Meteor.settings.public.googleApiKey,
    libraries: 'places'
  });
	
  GoogleMaps.ready('map', (map) => {
    this.map.set(map);
  });
})
```

This ensures that whenever the `GoogleMaps.ready()` callback is called, the `map` instance is attached to the template, and anything that depends on it will automatically be re-computed thanks to [Meteor's reactivity tracker][meteor-tracker].

Now, we'll create a helper function to let us run an arbitrary query against a given Google Maps object (this will be a private function, so just drop it at the bottom of `Map.js`):
	
```javascript
function searchNearby(map, query) {
  const service = new google.maps.places.PlacesService(map.instance);
	
  service.nearbySearch(query, (results, status, pagination) => {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log(results)
    } else {
      console.log(status)
    }
  })
}
```
	
As you can see, this function creates a new `PlaceService` instance and runs the query against that. When the results are ready, a callback is called that prints them out to the terminal. We can immediately test this by adding the following code to the bottom of our `onCreated` callback:

```javascript
this.autorun(() => {
  const map = this.map.get();
  const query = { 
	center: map.options.center,
	radius: 500,
	type: 'cafe'
  };
  if (map) {
    searchNearby(map, query);
  }
})
```
	
Using `this.autorun()` ensures that Meteor will automatically detect any reactive dependencies used in the callback (that's why we made `this.map` a `ReactiveVar`) and re-run the callback when those dependencies change.

Once you saves this change, you should be able to see your Meteor app reload automatically, and if you open your browser's JavaScript console, you'll see the results of the place search logged there:

![](images/placesearch-results-console.png)

[meteor-reactive-var]: http://docs.meteor.com/api/reactive-var.html
[meteor-tracker]: http://docs.meteor.com/api/tracker.html

## Adding Markers to the Map

Now that we have a basic place search functionality going, it would be cool if our app was able to display the results on a map, instead of printing them to the console (where no user would ever bother to look). Let's do that next.

First, we'll create a couple more helper functions to work with markers (we'll add them to the end of our `imports/ui/components/Map/Map.js` file):

```javascript
// Creates a marker from a place, but doesn't add it to a map
function createMarker(place) {
  return new google.maps.Marker({
    position: place.geometry.location,
    title: place.name
  });
}
	
// Adds a marker to the given map
function addMarker(map, marker) {
  if (!(marker instanceof google.maps.Marker)) {
    marker = createMarker(marker);
  }
  marker.setMap(map.instance);
	
  return marker;
}
	
// Removes a marker from a map
function removeMarker(marker) {
  marker.setMap(null);
}
```

It's worthwile to note that the `addMarker` function is flexible and will accept a place object instead of a marker as its second argument for convenience. 

Now, we want our `searchNearby` function to create place markers whenever there are results available. However, in the interest of not letting this function become too complex, we'll handle this a bit differently. First, we'll add another `ReactiveVar` to our component. This one will store the place results. 

```javascript
Template.Map.onCreated(function () {
  this.map = new ReactiveVar();
  this.places = new ReactiveVar([]);
  
  this.autorun(() => { /* ... */ });
})
```
	
Next, we'll update the `searchNearby` function to store the results in this variable. We'll simply pass in the `ReactiveVar` as a third parameter, and have the function update its contents like this:

```javascript
function searchNearby(map, query, places) {
  const service = new google.maps.places.PlacesService(map.instance);
	
  service.nearbySearch(query, (results, status, pagination) => {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log(results)
      places.set(results)
    } else {
      console.log(status)
    }
  })
}
```

Now, we change our `this.autorun()` callback to pass this parameter along:

```javascript
 if (map) {
   searchNearby(map, query, this.places);
 }
```

> **NOTE**
>
> It it important to realize that even though `this.places` is a `ReactiveVar`, simply passing it along as a reference to `searchNearby` does NOT cause the `autorun` callback to be re-evaluated. A dependency is only created if we call `.get()` on that variable. Otherwise, we would be creating an endless loop here.

Next, we'll want to create place markers each there are new place results. For this, we'll add another `this.autorun()` block to our `onCreated` callback:

```javascript	
  // automatically add markers to map when places have changed
  let markers = [];
  this.autorun(() => {
    const map = this.map.get();
    const places = this.places.get();
    // remove old markers from map before adding new ones
    markers.forEach((marker) => removeMarker(marker));
    markers = places.map((place) => addMarker(map, place));
  })
```
	  
This block depends on both the `this.map` and the `this.places` reactive vars (it is helpful to declare them at the top of the block so the dependencies are immediately obvious). Since we'll have to remove the old markers before adding new ones (otherwise, the old ones will stay around forever, crowding up the map), we need to store them somewhere. We use a local variable called `markers` for this purpose, whose contents we overwrite each time the block is re-evaluated. Note that this variable has to be declared *outside* the callback. 

If you did everything right, when your app has reloaded, you should now see the map being populated with markers:

![](images/meteor-placesearch-basic.png)

> **NOTE**
>
> You'll noticed I've changed the default zoom setting here, so we can actually tell the different markers apart. Since we did a radius search, Google will prioritize places that are closes to the center of the map to those that are further away. The zoom level in this picture is set to `15`, which can be changed in `imports/ui/pages/home.js`.
	

To be continued...