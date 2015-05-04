var React = require('react');
var ThumbnailList = require('./thumbnail-list');


var options = {
	thumbnailData: [{
		title:'Show Courses',
		number: 120,
		header: 'learn react',
		description: 'react is a fantastic new front end library for rendering web pages',
		imageUrl: 'https://placekitten.com/200/301'
	},{
		title:'Show Courses',
		number: 25,
		header: 'learn Gulp',
		description: 'gulp will speed up your development workflow',
		imageUrl: 'https://placekitten.com/200/304'
	}]
};

var element = React.createElement(ThumbnailList, options);

React.render(element, document.querySelector('.container'));