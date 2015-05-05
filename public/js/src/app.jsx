var React = require('react');
var Button = require('./button');

var options = {
	title: "Cool Button",

	className: "btn-primary",
	subTitleClassName: "",
	subTitle: "1",
};

var element = React.createElement(Button, options);

React.render(element, document.querySelector('.container'));