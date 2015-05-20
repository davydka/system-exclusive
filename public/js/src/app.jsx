// NPM installed js
var React = require('react');
//var MobileDetect = require('mobile-detect');
var QueryString = require('querystring');

var query = QueryString.parse(location.search.replace("?", ""));
var input = query.input;
var output = query.output;

var options = {
	initialInput: input,
	initialOutput: output
};


var Midi = require('./midi-engine');

var midiElement = React.createElement(Midi, options);

React.render(midiElement, document.querySelector('.container'));