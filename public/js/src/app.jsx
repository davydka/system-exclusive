// NPM installed js
var React = require('react');
//var MobileDetect = require('mobile-detect');
//var QueryString = require('querystring');

var Midi = require('./midi-engine');

var midiElement = React.createElement(Midi);

React.render(midiElement, document.querySelector('.container'));