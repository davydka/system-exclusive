var React = require('react');
var Data = require('./data-holder');
//var Data = require('./infinite-data');

var options = {
	source: "http://www.reddit.com/r/perfectLoops.json",
	fired: false
};

var element = React.createElement(Data, options);

React.render(element, document.querySelector('.container'));