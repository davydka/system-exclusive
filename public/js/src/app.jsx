// NPM installed js
var React = require('react');
var MobileDetect = require('mobile-detect');

// User built js.
var Data = require('./infinite-data');

var options = {
	source: "http://www.reddit.com/r/perfectLoops.json",
	mobile: new MobileDetect(window.navigator.userAgent),
	initialAfter: ""
};

var element = React.createElement(Data, options);

React.render(element, document.querySelector('.container'));