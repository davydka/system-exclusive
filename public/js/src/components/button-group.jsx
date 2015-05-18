var React = require('react');

var Button = require('./button.jsx');

module.exports = React.createClass({
	render:function(){
		return <div className="btn-group">
			<button type="button" className="btn btn-default">Left</button>
			<button type="button" className="btn btn-default">Middle</button>
			<button type="button" className="btn btn-default">Right</button>
		</div>
	}
});