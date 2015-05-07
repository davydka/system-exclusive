// NPM installed js
var React = require('react');
var MobileDetect = require('mobile-detect');
var QueryString = require('querystring');

// User built js.
var Data = require('./infinite-data');
var Midi = require('./midi-engine');




var after = QueryString.parse(location.search.replace("?", ""));
after = after.after;

var options = {
	source: "http://www.reddit.com/r/perfectLoops.json",
	mobile: new MobileDetect(window.navigator.userAgent),
	initialAfter: after
};

var element = React.createElement(Data, options);

React.render(element, document.querySelector('.container'));

// Midi only works on Chrome v43
var midiElement = React.createElement(Midi);
React.render(midiElement, document.querySelector('.midi'));