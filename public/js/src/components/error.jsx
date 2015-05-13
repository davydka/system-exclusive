var React = require('react');

module.exports = React.createClass({
	render: function(){
		return <div className="alert alert-danger" role="alert">
			<span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
			<span className="sr-only">Error:</span>
			{this.props.message}
		</div>
	}
});